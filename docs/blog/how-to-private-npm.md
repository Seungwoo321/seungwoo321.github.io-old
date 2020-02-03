---
title: 비공개 NPM 저장소 구축하기
author: Seungwoo Lee
date: 2020-02-02
tags: ["private npm", "npm", "sinopia"]
description: 오픈소스 sinopia를 사용해서 Prvate NPM 저장소를 구성하는 방법과 겪은 스코프 문제를 해결한 경험을 정리하자.
meta: 
    - name: description
      content: 오픈소스 sinopia를 사용해서 Prvate NPM 저장소를 구성하는 방법과 겪은 스코프 문제를 해결한 경험을 정리하자.
    - name: keywords
      content: Private NPM
---

# 비공개 NPM 저장소 구축하기

## 개요
오픈소스 Sinopia를 사용해서 Prvate NPM 저장소를 구성하면서 겪은 스코프 문제를 해결한 경험을 정리하자.

## 배경 
프론트엔드 개발과 관련된 세미나를 듣던 중 `디자인 시스템`, `Atomic Design` 이라는 키워드에 영감을 받아서 Vue 프레임워크 기반의 비공개 UI 템플릿을 만들게 되었다. 그런데 이 템플릿을 사용해 개발된 프로젝트에서 수시로 업데이트된 내용이 배포 되어야 한다. 패키지 관리는 npm 을 사용하고 있으므로, Private NPM 저장소를 구축하기로 했다.NPM에서 제공하는 서비스는 비용 문제가 있어서 sinopia 라는 오픈소스를 사용해서 구축하기로 했다.

<!-- ## sinopia 란?
[깃허브 문서](https://github.com/rlidwka/sinopia)의 사용사례를 보면 나의 주목적인 `개인 패키지 사용` 외에도 `npmjs.org 레지스트리 캐시`와 `공개 패키지 재정의(버그 수정등)` 가 있고, 각 목적에 맞게  -->

## 설치 및 사용자 생성
아래는 최소한의 내용으로 반드시 [Github의 README를](https://github.com/rlidwka/sinopia)를 확인하자.
```bash
# 글로벌로 패키지 설치
$ npm install -g sinopia
# 서비스 실행
$ sinopia
# 사용자 생성  
npm adduser --registry http://localhost:4873/
```
:::tip
브라우저에서 http://localhost:4873/ 혹은 외부IP:4873 포트로 접속해서 위에서 생성한 사용자로 로그인 해서 정상 설치여부를 확인 하자.
:::


## 사용방법
레지스트리를 `비공개 NPM 저장소`로 설정하면 된다.
```bash
$ npm config --registry http://localhost:4873
```
public 패키지와 비공개 패키지를 배포 할 때, 
```bash
$ npm i 
```


## 주요 이슈 및 해결 방법


