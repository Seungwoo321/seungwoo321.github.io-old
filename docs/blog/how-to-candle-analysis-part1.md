---
title:  Kinesis + Glue + Athena 서비스를 사용한 데이터 수집 및 캔들 데이터 생성하기
author: Seungwoo Lee
date: 2021-04-25
tags: ["Kinesis", "Glue", "Athena"]
description: Athena SQL을 사용해서 원하는 시간의 캔들 데이터를 만들어 본 경험을 정리하자.
---

# Kinesis + Glue + Athena 서비스를 사용한 데이터 수집 및 캔들 데이터 생성하기

> 이 글은 2018년 4월 8일 메모한 내용을 바탕으로 작성 되었습니다.

![01_sql.png](/img/20210425/01_sql.png)
![02_result.png](/img/20210425/02_result.png)


## 자동매매 프로그램을 위한 시장 데이터 분석 - 1탄

## 개요
* 모든 거래소에서 원하는 시간의 캔들 데이터를 동일한 포맷으로 제공하지 않아서 원하는 시간의 캔들 데이터 생성을 위해 Kinesis + Glue + Athena 서비스를 사용해보았다.
* 주식/암호화폐 거래 혹은 IoT 같은 실시간 데이터를 기반으로 하는 데이터 분석을 위해서는 시계열 데이터베이스가 적절하다고 판단 할 수 있었던 계기가 되었다.

## Kinesis를 이용한 시장 데이터 수집하기

### 필요한 데이터는 무엇인가 ? 
* 이동평균선, 스토캐스틱, 볼린저밴드등과 같은 보조지표를 사용하기 위해서 원하는 시간대의 캔들 데이터가 기본으로 필요하다.
* 캔들은 `종가(close), 고가(high), 저가(low), 시가(open)` 로 구성되어 있고, 다음과 같이 정리 할 수 있다. 
    - 종가(close) = (open + high + low + close) / 4
    - 고가(high) = highest
    - 저가(low) = lowest
    - 시가(open) = close of previous bar

### 무슨 데이터를 수집 할 것인가 ? 
- 수집한 데이터를 어디에 저장 할 것인가 `S3`
- 저장된 데이터를 어떻게 가공 할 것인가 `Glue + Athena`

### 수집 프로세스
1. node로 시장 데이터 request
    - (코빗 거래소에서 `GET https://api.korbit.co.kr/v1/ticker` API를 정기적으로 호출)
2. Kinesis로 시간과 거래가격, 거래종목을 전송 
3. Kinesis 스트림 데이터를 S3에 저장 
4. Glue 서비스로 정기적으로 Athena 테이블 생성
    
    
    

## Athena SQL 사용해서 데이터 가공하기

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
- SQL이 너무 길고 복잡하다.
- 비용면에서 최적의 솔루션이 아니다. (Athena, Kinesis, Glue)
- Glue 에서 S3의 데이터를 Athena 에서 사용 가능한 테이블로 변환하는것이 배치성이라서 실시간이 아니다.
- AWS 서비스에 의존적이다.


