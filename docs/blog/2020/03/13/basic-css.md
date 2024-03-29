---
front_matter_title: CSS 기본 정리
author: Seungwoo Lee
date: 2020-03-13
tags: ["CSS"]
description: CSS 기본 정리 
---

# CSS

[[toc]]

> 이 글은 freeCodeCamp 의 Basic CSS를 진행하면서 주요 내용을 정리한 글 입니다.

## CSS란 ?

CSS (Cascading Style Sheets)는 HTML로 작성하는 텍스트 및 기타 내용을 표시하는 방법을 브라우저에 알려준다.

## CSS를 적용하는 방법

* style 속성을 사용해서 HTML 요소에 인라인으로 스타일을 적용한다.

```html
<h2 style="color: blue;"> Blue Text </h2>
```

* HTML문서의 태그내에 `<style></style>`블록을 배치하고 `CSS 선택기`를 사용해서 스타일을 적용한다.

```html
<style>
    h2 {
        color: red;
    }
</style>
```

* 외부 스타일 시트에 CSS 규칙을 작성한 다음 HTML 문서에서 해당 파일을 참조한다.

index.html

```html
<link href="./style.css" rel="stylesheet" type="text/css">
```

style.css

```css
/* ... */
```

## Class를 사용한 스타일 지정

* Class를 사용하여 여러 HTML 요소에 스타일을 적용 할 수 있다.

```css
.blue-text {
    color: blue;
}
```

## 고유한 id 속성을 사용한 스타일 지정

* 각 HTML 요소의 고유한 `id` 속성을 사용하여 단일 요소의 스타일을 지정 할 수 있다.
* 브라우저는 강제 하지 않지만, `id` 속성은 고유해야하는 것이 널리 권장되는 모범 사례이다.

```css
#app-title {
    color: red;
}
```

## 속성 선택기를 사용하여 스타일 지정

* `id` 및 `class` 선택기 외에 `[attr=value]` 속성 선택기(attribute selector) 를 사용해서 스타일을 지정할 요소 그룹을 선택 할 수 있다.

```css
[type='radio'] {
    margin: 20px 0px 20px 0px;
}
```

## 글꼴 스타일 지정하기

* `font-size` 글꼴 크기를 지정
* `font-family: FAMILY_NAME, GENERIC_NAME;` `FAMILY_NAME` 로 글꼴을 설정하고 없을 경우에는 `GENERIC_NAME을` 사용한다.

## 글꼴 스타일 구글 폰트 사용하기

* 운영체제에서 사용되는 일반적인 글꼴 외에도 사용자 정의 웹 글꼴을 지정 할 수 있다.
* [Google Fonts](https://fonts.google.com/)는 글꼴의 URL을 참조하여 CSS에서 사용 할 수 있는 무료 웹 글꼴 라이브러리이다.

```html
<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">
<style>
p {
    font-family: Lobster, "Open Sans"
}
</style>
```

## 글꼴 스타일 오픈 타입 사용하기

* 글꼴을 다운로드 받은 후, 다음과 같이 `@font-face` 로 선언하고 사용 할 수 있다.

```css
@font-face {
  font-family: 'Quesat Light Italic';
  src: url('./assets/fonts/Quesat/Quesat Light Italic Demo.otf') format('opentype');
}
.logo {
    font-family: 'Quesat Bold Italic';
}
```

## 이미지의 사이즈

* 요소의 너비를 제어하는 `width` 속성을 사용한다.
* 글꼴과 마찬가지로 `px`(픽셀)을 사용하여 이미지 너비를 지정한다.

## 테두리 스타일 지정하기

* `border`(테두리)에 `style`, `color`, `width` 같은 속성을 사용해서 테두리를 만들 수 있다.

```css
.red-border {
    border-width: 5px;
    border-solid: solid;
    border-color: red;
}
.blue-border {
    border: 1px solid blue;
}
```

## 테두리 모서리를 둥글게

* `border-raduis` 속성은 모서리를 둥글에 반올림 한다.
* `px` (픽셀) 외에 `%` (퍼센티지)로 설정 할 수 있다.

```css
.red-border {
    border-radius: 5px;
}
.blue-border {
    border-radius: 50%;
}
```

## 요소의 패딩 조정

* HTML 요소는 기본적으로 작은 사각형이다.
* HTML 요소를 둘러싸는 공간을 제어 하는 중요한 세 가지 속성은 `padding`, `margin`, `border` 이다.
* `padding`은 요소의 내용과 요소의 `border` 사이의 공간을 제어한다.
* 각 측면마다 다른 값을 갖도록 정의 할 수 있다.

```css
.blue-box {
    padding-top: 40px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 40px;
}

```

## 요소의 마진 조정

* `margin`은 요소의 `border`와 주변 요소 사이의 간격을 제어한다
* `margin` 을 음수 값으로 설정하면 요소가 커진다.
* 각 측면 마다 다른 값을 갖도록 정의 할 수 있다.

```css
.red-box {
    margin-top: 40px;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-left: 40px;
}
```

## 시계 방향 표기법을 사용하여 패딩 지정

* `padding-top`, `padding-right`, `padding-bottom`, `padding-left`를 시계방향으로 한줄에 모두 지정 할 수 있다.

```css
padding: 10px 20px 10px 20px;
```

## 시계 방향 표기법 사용하여 마진 지정

* `margin-top`, `margin-right`, `margin-bottom`, `margin-left`도 시계방향으로 한줄에 모두 지정 할 수 있다.

```css
margin: 20px 40px 20px 40px;
```

## 절대 단위와 상대 단위

* `px`(픽셀)은 길이 단위의 한 유형으로, 브라우저에 항목 크기 또는 간격을 지정하는 방법을 알려준다.
* CSS에는 `px`(픽셀) 외에도 사용 할 수 있는 다양한 길이 단위 옵션이 있다.
* 길이 단위의 두 가지 주요 유형은 `absoluted`(절대적)과 `relative`(상대적)이 있다.
* `absolute`(절대적인) 단위는 물리적은 길이 단위로 `in`과 `mm`으로 각각 인치 및 밀리미터를 제공한다. 절대 길이 단위는 실제 측정값과 비슷하지만, 화면의 해상도에 따라 약간의 차이가 있다.
* `relative`(상대적) 단위는 `em` 또는 `rem`으로 `em`은 요소의 글꼴의 크기를 기반으로 한다. 예를 들어, `font-size` 속성을 사용하면 부모의 `font-size` 속성과 관련이 있다.

## CSS 상속

* 모든 HTML페이지에는 `body` 요소가 있고, 스타일을 지정하면 다른 모든 요소가 스타일을 상속한다.

```css
body {
    background-color: black;
    color: green;
    font-family: monospace;
}

```

```html
<h1>
    Hello World
</h1>
```

## 스타일링 우선순위

* 때로는 HTML 요소가 서로 충돌하는 여러 스타일을 수신 할 수 있다.
* 브라우저는 선언 순서대로 CSS를 위에서 아래로 읽는다.
* 즉, 충돌이 발생하면 브라우저는 마지막에 온 CSS 선언을 사용한다.
* 그런데, 요소에 id를 부여하면 id에 대한 스타일링이 우선시 된다.
* 그리고 id 보다는 inline 스타일링 우선시 된다.
* 하지만 가장 강력한 방법은 `!important` 이다.

```css
body {
    background-color: black;
    color: green;
    font-family: monospace;
}
#orange-text {
    color: orange;
}
.pink-text {
    color: pink;
}
.blue-text {
    color: blue;
}
```

```html
<h1 class="pink-text blue-text">
    Blue
</h1>
<h1 id="orange-text" class="pink-text blue-text">
    Orange
</h1>
<h1 id="orange-text" class="pink-text blue-text" style="color:white">
    White
</h1>
```

> !important > inline > id > 마지막에 온 선언

## 16진수 코드를 사용하여 색상 표현

* CSS에서 색상을 표현하는 방법으로 16진수 코드를 사용한다.
* 예를들어 `#000000` 은 검은색이다.

```css
body {
    color: #000000; /* black */
}
```

## 16진수 코드를 사용하여 색상 혼합

* 16진수 코드는 6개의 16진수 숫자를 사용하여 각각 2개의 빨강(R). 녹색(G), 파랑(B)의 구성요소로 색상을 나타낸다.
* 이 세 가지 순수한 색상(빨강, 녹색, 파랑)은 각각의 양을 변화 시켜서 1600만개 이상의 다른 색상을 만들 수 있다.
* 예를들어, 주황색은 순수한 빨강이며, 녹색과 섞여 있고 파랑은 없다. 16진수로는 `#ffa500`
* 숫자 `0`은 16진수 코드에서 가장 낮은 숫자이며 색상이 완전히 없음을 나타낸다.
* 숫자 `f`는 16진수 코드에서 가장 높은 숫자이며 가능한 최대 밝기를 나타낸다.

## 축약된 16진수 코드 사용하기

* 1600만 가지의 넘는 색상의 16진수 코드를 기억하기는 어렵다.
* 16진수 코드는 단축 할 수 있다.
* 빨간색 #FF0000 은 #F00으로 단축 된다.
* 이 단축된 양식은 한 자리는 빨간색, 한 자리는 녹색, 한 자리는 파란색을 나타낸다.
* 이렇게 약 4000개의 색상을 나타낼 수 있다.

Color|Short Hex Code
-----|--------------
Cyan | #0ff
Green| #0f0
Red  | #f00
Fuchsia | #f0f

## RGB값을 사용하여 색상 표현

* CSS에서 색상을 표현할 수 있는 또 다른 방법은 `RGB` 값을 사용 하는 것이다.
* 검은색은 `rgb(0, 0, 0)` 이다.
* 흰색은 `rgb(255, 255, 255)` 이다.
* 16진수 코드에서와 같이 6개의 16진수를 사용하는 대신 `RGB` 0과 255사이의 숫자로 각 색상의 밝기를 지정한다.
* 한 색상의 두 자리 숫자가 16곱하기 16으로 총 256개의 값이 제공된다.
* 따라서 `RGB`와 16진수 코드는 정확히 같은 수의 색상을 나타낸다.

## RGB값을 사용하여 색상 혼합

* 16진수 코드와 마찬가지로 서로 다른 값을 조합하여 RGB로 색상을 혼합할 수 있다.

Color | RGB
------|----
Blue | rgb(0, 0, 255)
Red | rgb(255, 0, 0)
Orchid | rgb(218, 112, 214)
Sienna | rgb(160, 82, 45)

## 커스텀 CSS 변수 만들기

* 앞에 두 개의 하이픈이 있는 이름으로 지정하고 값을 지정한다.

```css
#app {
    --primary: blue;
    --success: green;
    --warning: yellow;
    --danger: red;
}
```

## 커스텀 CSS 변수 사용하기

* 변수를 만든 후에는 지정한 이름을 참조하여 다른 CSS 속성에 해당 값을 할당 할 수 있다.
* 지정된 변수가 유효하지 않은 경우 브라우저에서 되돌릴 fallback 값을 설정 할 수 있다.

```css
.primary-color {
    color: var(--primary, #00f);
}
.success-color {
    color: var(--success, #0f0);
}
.warning-color {
    color: var(--warning, #ff0);
}
.danger-color {
    color: var(--danger, #f00);
}
```

## CSS변수의 브라우저 호환성 문제

* CSS로 작업 할 때 브라우저 호환성 문제가 발생 할 수 있다. 잠재적인 문제를 피하기 위해 브라우저 fallback 을 제공하는 것이 중요하다.
* 브라우저가 웹 페이지의 CSS를 구문 분석할 때 인식하지 않거나 지원하지 않는 속성은 무시한다.
* 예를 들어 CSS변수를 사용하여 사이트에 배경색을 지정하면 Internet Explorer는 CSS변수를 지원하지 않으므로 배경색을 무시한다. 이 경우 브라우저는 해당 속성에 대한 값을 사용하고 다른 값을 찾을 수 없으면 기본값으로 되돌린다.
* 즉, 브라우저 fallback 을 제공하려는 경우 선언 직전에 더 널리 지원되는 다른 값을 제공하는 것이 좋다.

```css
:root {
    --background-color: #dfdfdf;
}
.container {
    background: #fff;
    background: var(--background-color);
}
```

## CSS 변수 상속

* 변수를 작성 할 때 변수를 작성하는 선택기에서 사용 할 수 있고, 해당 선택기의 모든 하위항목에서도 사용 할 수 있다.
* 이는 일반적인 속성과 마찬가지로 CSS변수가 상속되기 때문에 발생한다.
* 상속을 사용하기 위해 CSS변수는 종종 :root 요소에 정의된다.
* `:root`는 문서의 루트요소, 일반적인 html 와 일치하는 __pseudo-class__ 선택기다.
* `:root`에서 변수를 작성하면 전역으로 사용하능 하며 스타일 시트의 다른 선택기에서 접근 할 수 있다.
* `:root`에 작성한 변수를 특정 요소내에서 다시 설정하여 덮어 쓸 수도 있다.

```css
:root: {
    --background-color: #dfdfdf;
}
.container {
    --background-color: #efefef;
    background-color: var(--background-color);
}
```

## 미디어 쿼리에서 CSS 변수 활용 하기

```css
:root {
    --size: 300px;

}
@media (max-width: 350px) {
    :root {
        --size: 200px;
    } 
}
```

<Comment/>
