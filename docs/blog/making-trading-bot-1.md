---
front_matter_title:  Kinesis + Glue + Athena 서비스를 사용한 데이터 수집 및 캔들 데이터 생성하기
author: Seungwoo Lee
date: 2021-04-25
tags: ["Kinesis", "Glue", "Athena", "trading bot"]
description: 트레이딩 봇 만들기(1) Athena SQL을 사용해 원하는 시간 프레임의 캔들 데이터를 만들어 본 경험을 정리하자.
---

# Kinesis + Glue + Athena 서비스를 사용한 데이터 수집 및 캔들 데이터 생성하기

> 이 글은 2018년 4월 8일 메모한 내용을 바탕으로 작성 되었습니다.

![01_sql.png](/img/20210425/01_sql.png)
![02_result.png](/img/20210425/02_result.png)

## 자동매매 프로그램을 위한 시장 데이터 분석 - 1탄

### 시작하게 된 계기

* 거래소가 원하는 시간 프레임의 캔들 데이터를 제공하지 않는다.
* 거래소가 제공하지 않는 원하는 시간 프레임의 캔들 데이터는 실시간 데이터를 가공해서 만들어야 한다.
* AWS 의 데이터 분석을 위한 서비스 Glue 와 Athena 를 사용해보자.

### 필요한 데이터는 무엇인가 ?

* 캔들은 `종가(close), 고가(high), 저가(low), 시가(open)` 로 구성되어 있고, 다음과 같이 정리 할 수 있다.
  * 종가(close) = (open + high + low + close) / 4
  * 고가(high) = highest
  * 저가(low) = lowest
  * 시가(open) = close of previous bar

### 수집 및 데이터 가공

* 프로세스

node.js 에서 작성한 스크립트에서 코빗 거래소의 (<https://api.korbit.co.kr/v1/ticker>) API를 정기적으로 호출해서 종목과 가격과 시간 데이터를 Kinesis 로 전송하고 Glue 서비스를 사용해서 Athena 에 테이블을 생성 한다.

* 문제점

Glue 에서 ETL 작업을 구성해서 ticker 데이터를 캔들 데이터로 가공하고 싶었으나, Glue 서비스 및 ETL 작업에 대한 이해가 부족해서 하지 못 했다.

* 해결방법

ticker 데이터를 그대로 생성한 테이블에 SQL 을 사용해서 캔들 데이터를 생성했다.

### Athena SQL 로 데이터 가공하기 (캔들 데이터 생성)

* 5분 캔들 데이터

```SQL

select
    a1.timestamp
    , a1.open_timestamp
    , b1.col1 as open
    , a1.close_timestamp
    , c1.col1 as close
    , a1.high
    , a1.low
from (
    select
        case floor(minute(from_iso8601_timestamp(col0)) / 5)
            when 0 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:00')
            when 1 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:05')
            when 2 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:10')
            when 3 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:15')
            when 4 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:20')
            when 5 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:25')
            when 6 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:30')
            when 7 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:35')
            when 8 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:40')
            when 9 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:45')
            when 10 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:50')
            when 11 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:55')
        end as timestamp
        , min(from_iso8601_timestamp(col0)) as open_timestamp
        , max(from_iso8601_timestamp(col0)) as close_timestamp
        , max(col1) as high
        , min(col1) as low
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    group by 1
    order by 1
) a1
left join (
    select distinct
        from_iso8601_timestamp(col0) as original_timestamp
        , col1
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    order by 1
) b1
on a1.open_timestamp = b1.original_timestamp
left join (
    select distinct
        from_iso8601_timestamp(col0) as original_timestamp
        , col1
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    order by 1
) c1
on a1.close_timestamp = c1.original_timestamp
where a1.timestamp is not null
order by 1
```

* 30분 캔들 데이터

```SQL
select
    a1.timestamp
    , a1.open_timestamp
    , b1.col1 as open
    , a1.close_timestamp
    , c1.col1 as close
    , a1.high
    , a1.low
from (
    select
        case floor(minute(from_iso8601_timestamp(col0)) / 30)
        when 0 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:00')
        when 1 then date_format(date_trunc('second', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:30')
        end as timestamp
        , min(from_iso8601_timestamp(col0)) as open_timestamp
        , max(from_iso8601_timestamp(col0)) as close_timestamp
        , max(col1) as high
        , min(col1) as low
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    group by 1
    order by 1
) a1
left join (
    select distinct
        from_iso8601_timestamp(col0) as original_timestamp
        , col1
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    order by 1
) b1
on a1.open_timestamp = b1.original_timestamp
left join (
    select distinct
        from_iso8601_timestamp(col0) as original_timestamp
        , col1
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    order by 1
) c1
on a1.close_timestamp = c1.original_timestamp
where a1.timestamp is not null
order by 1
```

* 1시간 캔들 데이터

```SQL
select
    a1.timestamp
    , a1.open_timestamp
    , b1.col1 as open
    , a1.close_timestamp
    , c1.col1 as close
    , a1.high
    , a1.low
from (
    select
        case floor(minute(from_iso8601_timestamp(col0)))
        when 0 then date_format(date_trunc('hour', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d %H:00')
        end as timestamp
        , min(from_iso8601_timestamp(col0)) as open_timestamp
        , max(from_iso8601_timestamp(col0)) as close_timestamp
        , max(col1) as high
        , min(col1) as low
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    group by 1
    order by 1
) a1 left join (
    select distinct
        from_iso8601_timestamp(col0) as original_timestamp
        , col1
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    order by 1
) b1
on a1.open_timestamp = b1.original_timestamp
left join (
    select distinct
        from_iso8601_timestamp(col0) as original_timestamp
        , col1
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    order by 1
) c1
on a1.close_timestamp = c1.original_timestamp
where a1.timestamp is not null
order by 1
```

* 4시간 캔들 데이터

```SQL
select
    a1.timestamp
    , a1.open_timestamp
    , b1.col1 as open
    , a1.close_timestamp
    , c1.col1 as close
    , a1.high
    , a1.low
from (
    select
        case floor(hour(from_iso8601_timestamp(col0)) / 4)
        when 0 then date_format(date_trunc('hour', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d 00:00')
        when 1 then date_format(date_trunc('hour', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d 04:00')
        when 2 then date_format(date_trunc('hour', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d 08:00')
        when 3 then date_format(date_trunc('hour', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d 12:00')
        when 4 then date_format(date_trunc('hour', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d 16:00')
        when 5 then date_format(date_trunc('hour', from_iso8601_timestamp(col0)) + interval '9' hour, '%Y-%m-%d 18:00')
        end as timestamp
        , min(from_iso8601_timestamp(col0)) as open_timestamp
        , max(from_iso8601_timestamp(col0)) as close_timestamp
        , max(col1) as high
        , min(col1) as low
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    group by 1
    order by 1
) a1 left join (
        select distinct
        from_iso8601_timestamp(col0) as original_timestamp
        , col1
        from trading.swlee_ticker
    where col2 = 'eth_krw'
    order by 1
) b1
on a1.open_timestamp = b1.original_timestamp
left join (
    select distinct
        from_iso8601_timestamp(col0) as original_timestamp
        , col1
    from trading.swlee_ticker
    where col2 = 'eth_krw'
    order by 1
) c1
on a1.close_timestamp = c1.original_timestamp
where a1.timestamp is not null
order by 1

```

## 정리

원하는 시간 프레임별로 캔들 데이터를 생성 했으나, 다음과 같은 이유로 작업에 사용한 AWS 리소스를 모두 지우고 다른 방법을 찾게 되었다.

* 기본 캔들만 만들어서 조회하는데 복잡하고 비용이 너무 많이 든다.
* Glue 서비스의 ticker 테이블 생성이 배치라서 실시간으로 캔들 데이터를 조회 할 수 없다
