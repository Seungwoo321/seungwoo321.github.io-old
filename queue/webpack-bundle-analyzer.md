---
title: webpack-bundle-analyzer 사용 경험 정리 
author: Seungwoo Lee
date: 2020-02-19
tags: []
description: webpack-bundle-analyzer 사용한 경험을 정리하자

---

# webpack-bundle-analyzer 사용 경험 정리 

## 기능을 추가 하고 배포하였더니 

vue-pivottable 에 plotly 를 추가하고 빌드하고 배포하였는데, 용량이 너무 크다 

## 용량을 줄이기 위한 노력 
빌드시 map 파일을 제외하고  webpack-bundle-analyzer 를 사용해서 용량을 살펴보았고, 최대한 줄였다.


## 실무에서 활용 
vuesign 템플릿 에서도 빌드시 용량이 너무 커서, 기본만 남기고 특수한 목적을 갖는 컴포넌트들은 제외하여 패키지를 분리 하였다 

장점 ? 
- 관리 용이, 의존성 제거
단점 ?
- 귀찮음 

토스트에 영감을 받음.