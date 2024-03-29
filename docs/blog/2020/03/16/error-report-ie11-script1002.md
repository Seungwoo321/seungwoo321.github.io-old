---
front_matter_title: IE 11 Syntax Error - Script1002
author: Seungwoo Lee
date: 2020-03-16
tags: ["IE", "trouble shooting"]
description: Internet Explorer 11 에서 Script1002 에러를 경험하고 해결한 내용을 정리 한다.
---

# Internet Explorer 11 에서 Script1002 에러를 만나다

## 개요

vue-pivottable 컴포넌트의 스타일을 수정하고 최종적으로 프로젝트에서는 `import { VsPivottable, VsPivottableUi } from 'vs-pivottable'` 과 같이 커스텀 된 형태로 사용하고 싶었다. 그런데 Internet Explorer 11 에서 확인시 빈 페이지가 로딩되고 콘솔창에는 Script1002 오류만 찍혀 있었다.

### 코드

코드는 이렇다.

```js
import './pivottable.css'
import { VuePivottable, VuePivottableUi } from 'vue-pivottable'

const VsPivottable = VuePivottable
const VsPivottableUi = VuePivottableUi

function install (Vue) {
    Vue.component('vs-pivottable', VuePivottable)
    Vue.component('vs-pivottable-ui', VuePivottableUi)
}

export {
    VsPivottable,
    VsPivottableUi
}

export default install
```

### 원인 파악1

Script1002는 Syntax error 로 콘솔창에서는 구문오류라고만 표시되어 정확한 원인이 되는 코드는 확인 할 수 없었지만, 검색을 통해 Polyfill과 관련된 내용이 많음을 알 수 있다.
> main.js 에 Polyfill을 추가하거나 babel.config.js 의 설정을 변경하는 방법등을 시도했으나, 해결되지 않음.

### 원인 파악2

`import VuePivottable from 'vue-pivottable'` 구문을 `import VuePivottable from 'vue-pivottable/dist/vue-pivottable.umd.js'` 으로 변경시에는 정상적으로 렌더링이 된다.
> vue-pivottable 이 빌드된 파일에서 `import { VsPivottable, VsPivottableUi } from 'vs-pivottable'` 을 사용할 수 있도록 해보았으나, 잘 되지 않음.

### 원인 파악3

git 레포지토리 `vue-pivottable` 의 demo 프로젝트에서 실행시에서는 Internet Explorer 11 에서 정상 렌더링 된다.
> `vue-pivottable`의 문제는 아닌 것을 확인.

### 원인 정리

`node_module`에서 `vue-pivottable` 패키지를 임포트하면 es6로 작성된 `src/index.js` 등을 불러 오게 되는데, 이때 vue-cli3 의 `webpack-dev-server`에서 개발서버로 실행하고 Internet Explorer 11 에서 확인하면 es6문법을 제대로 인식하지 못해서 구문오류가 발생된다.

### 해결

vue.config.js 의 `transpileDependencies` 옵션을 사용하여 Babel을 적용할 라이브러리를 지정할 수 있다. 내 코드는 `vue-pivottable` 만  사용하기 때문에 `transpileDependencies: ['vue-pivottable']` 만 추가하면 된다. 이후 Internet Explorer 11 에서 정상 렌더링 되었다.

## 참조링크

* [runtimecompiler vuejs 공식문서](https://cli.vuejs.org/config/#runtimecompiler)

<Comment/>
