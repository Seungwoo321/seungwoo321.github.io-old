---
title: InfluxDB 에서 캔들 데이터 분석을 위한 쿼리문 작성하기
author: Seungwoo Lee
date: 2021-04-24
tags: ["InfluxDB", "InfluxQL", "flux"]
description: InlfuxDB 1.8 버전과 2.0 버전 각각에서 데이터 분석을 위해 작성한 쿼리문를 정리하자. 
---

# InfluxDB 데이터 분석을 해보자

## 개요
InlfuxDB 1.8 버전과 2.0 버전 각각에서 데이터 분석을 위해 작성한 쿼리문를 정리하자. 


## 배경
* 가상화폐 자동매매 프로그램에서 데이터 분석을 위한 데이터 조회에 InfluxDB 1.8 에서 제공하는 SQL인 InfluxQL을 사용했다.
* 프로그램 고도화가 필요한데, Influx 2.0 버전이 출시되면서 데이터 분석을 위해 새롭게 제공하는 Flux 라는 스크립팅 언어의 공부가 먼저 필요하게 되었다.
* 기본적인 개념이나, 설치 방법등에 대해서는 공식 문서를 참고하고 여기서는 데이터 분석을 위해 작성한 쿼리문에만 집중 한다. 


## InfluxDB 1.8

### 데이터 수집 및 저장

* trade 라는 measurements(=테이블)에 다음과 같이 실시간으로 비트맥스 거래소의 거래내역을 저장하고 있다

![01_trade.png](/img/202104024/01_trade.png)


### 캔들 데이터 만들기
* 실시간으로 거래내역(시간, 가격)을 아주 쉽게 캔들 데이터로 만들어서 조회 해 볼 수 있다.


```sql
select first(price) as open, max(price) as high, min(price) as low, last(price) as close, sum(grossValue) as volume  from trade where symbol='XBTUSD' group by time(30m) fill(previous)
```




