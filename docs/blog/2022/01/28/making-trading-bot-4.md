---
front_matter_title: 트레이딩 봇 2.0 개발 후기
author: Seungwoo Lee
date: 2022-01-28
tags: ["Trading Bot"]
description: 위의 시뮬레이션으로 테스트된 전략을 실제로 적용해 보기 위해서 grademark의 src/lib/backtest.ts 파일의 로직을 그대로 작성하면서 단지 원본 코드에서 사용하는 포지션 상태 값을 sqlite로 관리하도록 하고 거래소와의 REST API 통신으로 실제 매매를 수행하도록 했습니다.
---

# 트레이딩 봇 2.0

## 시물레이션

오픈소스로 제공되는 grademark는 기간 캔들 데이터와 외부파일에 작성한 매매 전략을 제공하면 캔들의 타이프레임(Timeframe) 마다 포지션 상태(None, Enter, Postion, Exit)에 따라서 제공된 전략을 수행하거나 포지션 상태를 업데이트 하면서 가상의 거래 기록을 남깁니다. 이렇게 기록된 거래 내역을 바탕으로 승률과 수익률과 같은 백테스팅 결과를 제공합니다.

* strategy.js

```js
module.exports = {
    entryRule: (enterPosition, args) => {
        if (args.bar.close < args.bar.sma) { // Buy when price is below average.
            enterPosition();
        }
    },

    exitRule: (exitPosition, args) => {
        if (args.bar.close > args.bar.sma) {
            exitPosition(); // Sell when price is above average.
        }
    },

    stopLoss: args => { // Intrabar stop loss.
        return args.entryPrice * (5/100); // Stop out on 5% loss from entry price.
    },
};
```

이런 식으로 매매 규칙을 모듈마다 작성해서 다음과 같이 매매 전략을 테스트했습니다.

* backtest.js

```js
const { backtest } = require('grademark');
const strategy = require('./strategy.js')
; (async function main () {
    const inputSeries = ... // Call candle data
    const trades = backtest(strategy, inputSeries);
})()
```

## 봇 개발

위의 시뮬레이션으로 테스트된 전략을 실제로 적용해 보기 위해서 grademark의 src/lib/backtest.ts 파일의 로직을 그대로 작성하면서 단지 원본 코드에서 사용하는 포지션 상태 값을 sqlite로 관리하도록 하고 거래소와의 REST API 통신으로 실제 매매를 수행하도록 했습니다.

<img src="./img/bot2.png" width="100%" height="100%">

## 다음 버전에서 개선해야 될 점

첫 번째로 포지션 상태 값 관리입니다. 여러 종목을 매매할 때 데이터를 동시에 업데이트할 필요가 있어서 SQLite는 적합하지 않았습니다. 그래서 MySQL로 변경할 예정입니다. 두 번째로 거래소와의 통신 중에서 데이터를 가져오기만 하는 것은 GraphQL을 활용하려고 합니다. 세 번째는 InlfuxDB를 2버전으로 업데이트하는 것인데 쿼리 작성 문법이 완전히 바뀌어서 학습이 필요하고 쿼리문을 최적화해도 1.8 버전에 비해 서버의 자원 사용률이 높아서 어떻게 해야 될지 고민을 하고 있습니다.
