---
front_matter_title: absolute와 relative의 차이에 대해서 설명하세요
author: Seungwoo Lee
date: 2022-02-02
tags: ["Frontend", "CSS"]
description: CSS 포지션 absolute와 relative의 차이에 대해 정리하자
---

# absolute와 relative의 차이에 대해서 설명하세요

CSS 포지션 absolute와 relative의 차이에 대해 정리하자

## absolute vs relative

> <https://developer.mozilla.org/en-US/docs/Web/CSS/position>

**absolute:**

* 페이지 레이아웃에서 요소를 위한 공간이 생성되지 않습니다
* 가장 가까운 위치에 있는 조상을 기준으로 오프셋을 적용합니다.

**relative:**

* 페이지 레이아웃의 요소에 제공된 공간은 `static`일 때와 동일합니다.
* 자기 자신을 기준으로 오프셋을 적용합니다.

## 예제

**absolute 일 때:**

* `position:absolute`
* `top:20px`
* `left:20px`

<iframe width="100%" height="200" src="//jsfiddle.net/seungwoo321/qfw5ekmL/embedded/result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

**relative 일 때:**

* `position:relative`
* `top:20px`
* `left:20px`

<iframe width="100%" height="200" src="//jsfiddle.net/seungwoo321/0Lhcqrzm/embedded/result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

**static 일 때:**

* `position:static`
* `top:20px` (효과없음)
* `left:20px` (효과없음)

<iframe width="100%" height="200" src="//jsfiddle.net/seungwoo321/pyh71a9u/embedded/result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

<Comment/>
