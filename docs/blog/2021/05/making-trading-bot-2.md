---
front_matter_title: InfluxDB 를 사용해 bot 을 만들다.
author: Seungwoo Lee
date: 2021-05-20
tags: ["InfluxDB", "InfluxQL", "flux", "trading bot"]
description: 트레이딩 봇 만들기(2) InlfuxDB 1.8 버전으로 캔들 데이터를 만들고 분석한 경험을 정리하자.
---

# InfluxDB 를 사용해 bot 을 만들다

## 시작하게 된 계기

이전 Kinesis + Glue + Athena SQL 로 캔들데이터 생성을 위해 어렵게 작업했던 AWS 리소스를 정리하고 다른 방법을 찾기 시작했다. 구글링을 통해서 시계열 데이터베이스 라는 것을 알게 되었다. 데이터베이스는 MySQL 와 같은 관계형 데이터 베이스, MongoDB 와 같은 NoSQL, Redis 와 같이 키 값 구조의 데이터 구조를 가진 스토어 정도 밖에 모르고 있었기에, InfluxDB 의 공식 문서를 보는 것은 아주 재미있고 신기했다.

> 새로운 것을 배우고 공부하는 것은 언제나 재미있다.

## 데이터 수집 및 저장

* node.js 에서 작성한 스크립트에서 bitmex 거래소의 Websokect 이벤트를 구독해서 실시간으로 거래 정보 받는다.
* inlfuxDB의 trade 라는 measurements(=테이블)에 다음과 같이 저장한다.

![01_trade.png](/img/202104024/01_trade.png)

## 캔들 데이터 조회

* 실시간으로 저장된 거래 정보를 정말 쉽게 원하는 타임프레임의 캔들 데이터로 조회해 볼 수 있다.

```sql
-- 30분 캔들
select 
    first(price) as open,
    max(price) as high,
    min(price) as low,
    last(price) as close, 
    sum(grossValue) as volume 
from trade 
    where symbol='XBTUSD'
group by time(30m) fill(previous)


-- 4시간 캔들
select 
    first(price) as open,
    max(price) as high,
    min(price) as low,
    last(price) as close, 
    sum(grossValue) as volume 
from trade 
    where symbol='XBTUSD'
group by time(4h) fill(previous)
```

## 실시간 캔들 데이터 만들기

* 실시간으로 쌓이는 데이터는 여전히 실시간 거래 가격 정보 뿐이다.
* InlfuxDB 에서 제공하는 연속쿼리를 이용해서 실시간으로 쌓이는 거래 정보를 캔들로 변환해서 저장 할 수 있다.

### 연속쿼리 형식

```sql
CREATE CONTINUOUS QUERY <cq_name> ON <database_name>
RESAMPLE EVERY <infterval> FOR <interval>
BEGIN 
    <cq_query>
```

### 연속 쿼리 만들기

```sql
-- 30분 캔들
CREATE
    CONTINUOUS QUERY trade_bitmex_to_xbt_usd_candles_30m ON bitmex 
RESAMPLE EVERY 10s FOR 5h 
BEGIN 
    select 
        first(price) as open,
        max(price) as high,
        min(price) as low,
        last(price) as close,
        sum(grossValue) as volume 
    into trade_bitmex_to_xbt_usd_candles_30m 
    from bitmex.autogen.trade
        where symbol='XBTUSD'
    group by time(30m) fill(previous)
END

-- 4시간 캔들
CREATE
    CONTINUOUS QUERY trade_bitmex_to_xbt_usd_candles_4h ON bitmex
RESAMPLE EVERY 10s FOR 40h
BEGIN
    select first(price) as open,
        max(price) as high,
        min(price) as low,
        last(price) as close,
        sum(grossValue) as volume
    into trade_bitmex_to_xbt_usd_candles_4h
    from trade
        where symbol='XBTUSD'
    group by time(4h) fill(previous)
END;

```

## 백테스트 & 시뮬레이션

다음 세 가지의 라이브러리를 사용해서 InlfuxDB 에서 조회한 캔들 데이터에 필요한 지표값을 추가해서 백테스팅을 해볼 수 있었다.

* `data-forge`: JavaScript 의 데이터 분석을 위한 툴킷이다. Python 데이터 분석 라이브러리 Pandans 가 생각난다.
* `data-forge-indicators`: data-forge 와 함께 사용 가능한 라이브러리로, 트레이딩에 필요한 지표를 만드는데 사용한다. 내가 주로 쓰는 Stochastic 지표를 제공하지 않아서, 처음으로 TypeScript 를 공부하면서, pull request 까지 진행 해보게 되었다.

> [pull-request 보기](https://github.com/data-forge/data-forge-indicators/pull/3)

* `grademark`: data-forge 를 기반으로 알고리즘 거래 및 백테스팅을 위한 툴킷이다.

## 트레이딩 봇 개발 & 6개월 후기

처음 백테스팅을 진행하고 이를 기반으로 작성한 매매 알고리즘 그대로 거래소에 연동해서 주문을 수행하는 스크립트를 만드는데는 1주일이 채걸리지 않았다. node.js 에서 작성된 이 스크립트는 5분 간격부터 1시간, 2시간, 4시간 간격까지 cron jop 으로 다양하게 실행하고 매매 알고리즘도 수회의 수정 거치며 시행착오를 겪고 6개월이 지났다.

* 동일한 매매 알고리즘이라 하더라도 백테스팅에 사용한 `grademark` 라이브러리는 주문 조건을 충족해도 바로 매매하지 않기 때문에 조건을 충족하면 바로 주문을 실행하는 봇과는 차이가 있다.
* 그럼에도 불구하고 특정 매매 알고리즘에서는 비슷한 효과를 낸다.

그리고 다음과 같은 결론을 내렸다.

* 봇과 동일하게 바로 매매하는 백테스팅 라이브러리를 만들던가, `grademark` 라이브러리와 동일하게 동작하는 봇을 만들어서 최대한 동일하게 동작하는 상태에서 다시 비교를 해보자.
