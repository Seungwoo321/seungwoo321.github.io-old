---
title: Padding Hack을 이용한 반응형 SVG 그리기
author: Seungwoo Lee
date: 2019-12-15
tags: vue-datamaps, vue, datamaps
description: Padding Hack을 이용해 SVG를 쉽게 반응형으로 구현해볼 수 있다.
---

## 개요
Padding Hack을 이용해 SVG를 쉽게 반응형으로 구현해볼 수 있다. 

## Padding Hack 이란 ?
패딩 핵(Padding Hack) 의 기본 개념은 요소의 패딩과 너비의 관계를 사용하는 것이다. 패딩이 백분율로 설정되면 요소의 너비를 기준으로 백분율이 계산된다.

## Padding Hack 적용하기

### 1단계
height 와 width 속성을 제거한다 

### 2단계
SVG를 div 컨테이너로 감싼다 

### 3단계 
다음 규칙에 따라 div 컨테이너에 스타일 적용한다 
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
컨테이너 내부에 absolute 를 지정하고 컨테이너의 높이와 너비를 갖도록 크기를 조정한다 
```css
svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

```

## 예제

### 반응형 SVG Map

:::demo
```html
<template>
    <div class="container" style="margin: 0 auto;" ref="container">
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
      viewBox: {
        width: 0,
        height: 0
      }
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
        return this.viewBox.width
      },
      set (element) {
        this.viewBox.width = element.getBoundingClientRect().width
      }
    },
    svgHeight: {
      get () {
        return this.viewBox.height
      },
      set (element) {
        this.viewBox.height = element.getBoundingClientRect().height
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
    width: 90%;
    height: 0;
    position: relative;
    padding-top: 60%;
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
      viewBox: {
        width: 0,
        height: 0
      }
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
        return this.viewBox.width
      },
      set (element) {
        this.viewBox.width = element.getBoundingClientRect().width
      }
    },
    svgHeight: {
      get () {
        return this.viewBox.height
      },
      set (element) {
        this.viewBox.height = element.getBoundingClientRect().height
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
    width: 90%;
    height: 0;
    position: relative;
    padding-top: 60%;
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

