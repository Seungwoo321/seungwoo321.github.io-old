---
title: Padding Hack으로 반응형 SVG 만들기
author: Seungwoo Lee
date: 2019-12-15
tags: vue-datamaps, vue, datamaps, 반응형, svg
description: Padding Hack을 이용해 SVG를 쉽게 반응형으로 구현해볼 수 있었다.
---
![vue-datamaps-example.png](/vue-datamaps-example.png)

## 개요
SVG 지도를 반응형으로 구현하기 위해 패딩 핵(Padding Hack)을 학습하고 사용한 경험을 정리하자.

## 배경
지역 관련 데이터를 표현하기 위한 고민을 하던 중 D3를 사용하여 지도를 그리고, 이를 javascript 에서 쉽게 사용 할 수 있도록 구현된 라이브러리 [DataMaps](https://datamaps.github.io/)를 탐색하게 되었다. 원하는 기능을 커스텀 하고 Vue 프레임워크 기반의 프로젝트에서 바로 가져다 쓸 수 있도록 하고 싶어서 단순히 Vue 로 감싸는 것이 아닌, 소스내 로직을 직접 Vue로 옮긴 [vue-datamaps](https://github.com/Seungwoo321/vue-datamaps#readme)를 작성하게 되었다.

## DataMaps 에서 구현된 반응형
반응형과 관련된 부분의 코드를 살펴 보면 옵션으로 `responsive: true` 을 설정 했을 때 내부요소인 SVG에 패딩 핵(Padding Hack)을 사용하는 스타일이 적용된다. 그리고 window 창의 resize 이벤트 마다 현재크기에서 이전크기를 나눠서 새로운 scale 값으로 변경하는 `Datamaps.prototype.resize` 메서드가 실행된다. [문서](https://github.com/markmarkoh/datamaps#responsive-maps)에서는 SVG를 감싸는 외부 요소인 container에 패딩 핵(Padding Hack)을 위한 스타일링에 대해 설명 하고 있다.

## vue-datamaps 에서 구현한 반응형
옵션이 아닌 기본으로 패딩 핵(Padding Hack) 스타일링이 적용되어 있어서, 항상 `responsive` 하다. 직접 스케일값을 변경하는 `Datamaps.prototype.resize`의 로직은 제외하였다.

## Padding Hack 이란 ?
패딩 핵(Padding Hack) 의 기본 개념은 요소의 패딩과 너비의 관계를 사용하는 것이다. 패딩이 백분율로 설정되면 요소의 너비를 기준으로 그 백분율의 값이 계산된다. 

예를 들어 최대 너비가 400px인 요소가 있을 때 `padding-bottom` 또는 `padding-top`에 50%를 설정하면 `padding-bottom` 또는 `padding-top`의 값은 200px이 될 것 이다.

* padding-top 10% :
:::demo
```html
  <div style="width:100%;height:0;padding-top:10%;background-color: yellow;"></div>
```
:::

* padding-bottom 20%
:::demo
```html
  <div style="width:100%;height:0;padding-bottom:20%;background-color: yellow;"></div>
```
:::

* width 50%; pading-top 30%
:::demo
```html
  <div style="width:50%;height:0;padding-top:30%;background-color: yellow;"></div>
```
:::

* 외부 요소의 크기가 400px 이고, 내부 요소의 width 100%, padding-top 50%

:::demo
```html
<div style="position:relative;width:400px;height:400px;border:1px solid;">
  <div style="position:abosolute;width:100%;height:0;padding-top:50%;background-color: yellow;"></div>
</div>
```
:::
* 외부 요소의 크기가 400px 이고, 내부 요소의 width 50%, padding-bottom 50%

:::demo
```html
<div style="position:relative;width:400px;height:400px;border:1px solid;">
  <div style="position:abosolute;width:50%;height:0;padding-bottom:50%;background-color: yellow;"></div>
</div>
```
:::

## Padding Hack 적용하기 
다음은 `SVG`에 패딩핵(Padding Hack)을 적용하는 내용이므로 `img`나 `ifream`에 적용할 때는 차이가 있을 수 있다. 상세한 내용은 글 하단의 `참조링크`를 확인하자.

### 1단계
SVG의 height 와 width 속성을 제거한다.
```html

<svg class="map">
  <!-- ... -->
</svg>

```

### 2단계
SVG를 div 컨테이너로 감싼다.

```html
<div class="container">
  <svg class="map">
    <!-- ... -->
  </svg>
</div>
```


### 3단계 
다음 규칙에 따라 div 컨테이너에 스타일 적용한다.
```css
.container {
  height: 0;
  width: width-value;
  padding-top: (svg height / svg width) * width-value
  position: relative;
}
```
먼저 컨테이너 높이를 축소한다. 백분율로 원하는 너비를 지정하고 다음 수식 (svg height / svg width) * width-value 을 사용하면 컨테이너의 가로 세로 비율이 svg 의 가로 세로 비율과 같아진다. 

### 4단계 
컨테이너 내부에 absolute 를 지정하고 컨테이너의 높이와 너비를 갖도록 크기를 조정한다.
```css
svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

```

### 반응형 SVG 지도 Vue 컴포넌트
위 단계에 따라 Vue 에서 SVG 지도에 Padding Hack 을 적용해서 반응형으로 구현한 예제이다.

:::demo
```html
<template>
    <div class="container" ref="container">
        <svg class="map">
            <g>
                <path v-for="(item, index) in pathData" :key="index"
                    :d="path(item)"></path>
            </g>
        </svg>
    </div>
</template>

<script>
import geojson from '@/world.json'
import { geoEquirectangular, geoPath } from 'd3-geo'
export default {
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  computed: {
    projection () {
      return geoEquirectangular()
        .scale((this.svgWidth + 1) / 2 / Math.PI)
        .translate([this.svgWidth / 2, this.svgHeight / 1.8])
    },
    path () {
      return geoPath().projection(this.projection)
    },
    pathData () {
      return geojson.features.slice().filter(feature => feature.id !== 'ATA')
    },
    svgWidth: {
      get () {
        return this.width
      },
      set (element) {
        this.width = element.getBoundingClientRect().width
      }
    },
    svgHeight: {
      get () {
        return this.height
      },
      set (element) {
        this.height = element.getBoundingClientRect().height
      }
    }
  },
  methods: {
    resize () {
      this.svgWidth = this.$refs.container
      this.svgHeight = this.$refs.container
    }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>
<style>
.container {
    width: 100%;
    height: 0;
    position: relative;
    padding-top: 66.66%;
}
svg.map {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
path {
    stroke: #777;
    stroke-width: 0.7px;
    stroke-opacity: .5;
    pointer-events: none;
}
</style>

```
:::



<script>
import geojson from '../.vuepress/world.json'
import { geoEquirectangular, geoPath } from 'd3-geo'
export default {
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  computed: {
    projection () {
      return geoEquirectangular()
        .scale((this.svgWidth + 1) / 2 / Math.PI)
        .translate([this.svgWidth / 2, this.svgHeight / 1.8])
    },
    path () {
      return geoPath().projection(this.projection)
    },
    pathData () {
      return geojson.features.slice().filter(feature => feature.id !== 'ATA')
    },
    svgWidth: {
      get () {
        return this.width
      },
      set (element) {
        this.width = element.getBoundingClientRect().width
      }
    },
    svgHeight: {
      get () {
        return this.height
      },
      set (element) {
        this.height = element.getBoundingClientRect().height
      }
    }
  },
  methods: {
    resize () {
      this.svgWidth = this.$refs.container
      this.svgHeight = this.$refs.container
    }
  },
  updated () {
    this.resize()
  },
  mounted () {
    if (this.$refs.container) this.resize()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>
<style>
.container {
    width: 100%;
    height: 0;
    position: relative;
    padding-top: 66.66%;
}
svg.map {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
path {
    stroke: #777;
    stroke-width: 0.7px;
    stroke-opacity: .5;
    pointer-events: none;
}
</style>


## 참조링크
* [Padding Hack 으로 이미지가 로딩되기전 컨테이너 크기 조정하기](https://www.andyshora.com/css-image-container-padding-hack.html)
* [CSS를 사용하여 SVG를 반응형으로 만들기](https://tympanus.net/codrops/2014/08/19/making-svgs-responsive-with-css/)
* [예제 코드 import 구문의 world.json](https://github.com/Seungwoo321/vue-datamaps/blob/master/public/data/world.json)