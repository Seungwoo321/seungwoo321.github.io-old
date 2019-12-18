---
title: Padding Hack을 이용한 반응형 SVG 그리기
author: Seungwoo Lee
date: 2019-12-15
tags: vue-datamaps, vue, datamaps
description: Padding Hack을 이용해 SVG를 쉽게 반응형으로 구현해볼 수 있다.
---

## 개요
jQuery 기반의 라이브러리 datamaps를 Vue 컴포넌트로 변환하는 과정에서 반응형 SVG 맵으로 구현하기 위해 Padding Hack을 적용한 사례를 정리한다.


## 이슈



## 해결



### Padding Hack 이란 ?




### 예제

#### 반응형 SVG Map

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
      viewBox: {
        width: 0,
        height: 0
      }
    }
  },
  props: {
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 500
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
    width: 100%;
    height: 0;
    position: relative;
    padding-top: 66%;
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
  props: {
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 500
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
    width: 100%;
    height: 0;
    position: relative;
    padding-top: 66%;
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

