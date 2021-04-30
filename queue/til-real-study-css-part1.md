---
title: 실무로 알게된 CSS 스터디 - 1편 
author: Seungwoo Lee
date: 2021-04-29
tags: ["codility", "TIL"]
description: TIL - 실무를 통해서 알게된 CSS 속성에 대해서 공부하고 정리해보자 
---


1. vue-pivottable 을 사용한 페이지 리뷰 중 피벗 컬럼이 늘어남에 따라서 레이아웃이 옆으로 같이 늘어나서 보기에 불편함
- table-layout: fixed 속성으로 고정함 
- 원본 코드로 구현된 피벗테이블 스타일을 다시한번 살펴 보고 찾음 

2. 테이블의 헤더를 고정 
- 헤더용 바디용 테이블이나 div를 각각 구현방식을 사용했었으나, position: stickt 를 사용해서 쉽게 구현이 가능함
- 실무에서 구현된 코드를 통해서 확인 함 


3. safari 브라우저에서 div 로 구현된 테이블 형태의 ui가 잔상이 남으면서 깨지는 현상
- isolate 라는 속성을 사용하여 해결 했다는 내용을 듣고 찾아서 공부해서 정리