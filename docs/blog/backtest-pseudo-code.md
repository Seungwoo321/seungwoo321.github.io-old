---
title: Backtest pseudo code
author: Seungwoo Lee
date: 2021-06-07
tags: ["backtest", "grademark", "trading bot"]
description: grademark 의 backtest.ts 를 의사코드로 작성해보자
---


# Backtest pseudo code
grademark 로 백테스트한 매매 로직을 node.js로 거래소 API 를 연동해 6개월 동안 자동 매매를 해본 결과, 거의 동일하게 동작해서 비슷한 결과를 내지만, 일부의 다르게 동작하는 부분으로 인해서 때로는 큰 차이를 만들어 내는 것으로 보인다. 시간이 지나서 오늘을 다시 시뮬레이션 했을 때 최대한 동일한 타이밍에서 매매가 이루어 지도록 하는 봇 개발의 필요를 느끼게 되었다. 그래서 백테스트에 사용한 grademark 의 백테스트 로직을 오로지 내가 이해 하기 쉬운 텍스트로 정리 해보았다. 


```js

case 포지션 상태가 None 일 때
    strategy.entryRule 메서드 호출 (enterPosition와 옵션을 파라메터로 전달)
    - (enterPosition 함수는 포지션 상태와 진입 할 방향, 트리거된 가격을 업데이트 한다, 바로 진입 x) 

case 포지션 상태가 Enter 일 때

    // 1. 진입을 해야하는지 추세 확인 
    if 방향이 롱 인데 고가가 트리거 가격보다 낮으면
        추세가 상방으로 판단되지 않으므로 정지
        break;

    if 방향이 숏 인데 저가가 트리거 가격보다 크면
        추세가 하방으로 판단되지 않으므로 정지
        break;

    // 진입 가격 = 시가
    entryPrice = bar.open

    // 2. 신규 포지션을 정의
    openPosition = {
        direction
        entryTime
        entryPrice: 트리거 가격 or 시가 
        growth: 1로 초기화
        profit: 0으로 초기화
        profitPct: 0으로 초기화
        holdingPeriod: 0으로 초기화
    }

    // 3 - 1 curStopPrice 값을 정의
    if stopLoss 전략이 있으면
        기본 스탑 차이 정의 = stopLoss 메서드 호출
        오픈 포지션의 initialStopPrice 값 정의 = 
            롱이면 진입 가격에서 기본 스탑 차이 만큼 뺀다
            숏이면 진입 가격에 기본 스탑 차이 만큼 더한다 
        오픈 포지션의 curStopPrice 값 정의 = 
            오픈포지션의 initialStopPrice

    // 3 - 2 curStopPrice 값을 정의
    if trailingStopLoss 전략이 있으면
        후행 스탑 차이 정의 = trailingStopLoss 메서드 호출 
        후행 스탑 가격 정의 = 
            롱이면 진입 가격에서 후행 스탑 차이 만큼 뺀다
            숏이면 진입 가격에서 후행 스탑 차이 만큼 더한다

        if 오픈 포지션의 initialStopPrice 가 정의되지 않았으면 
            오픈 포지션의 initialStopPrice 값 정의 = 후행 스탑 가격 (trailingStopPrice)

        else (정의 되어있으면)
            오픈 포지션의 initialStopPrice 값 정의 =
                롱이면 오픈 포지션의 initialStopPrice 와 후행 스탑 가격 (trailingStopPrice) 중 큰 값
                숏이면 오픈 포지션의 initialStopPrice 와 후행 스탑 가격 (trailingStopPrice) 중 작은 값

        오픈 포지션의 curStopPrice 값 정의 = 
            오픈포지션의 initialStopPrice

        if 백테스트 옵션의 recordStopPrice 가 true 이면 
            openPosition.stopPriceSeries 값 정의 = {
                time: bar.time,
                value: openPosition.curStopPrice
            }

    // 4. (3) 에서 최종 정의 된 손절가격으로 리스크 정의 및 기록
    if openPosition.curStopPrice 가 정의되어 있으면 
        openPosition.initialUnitRisk 값 정의 = 
            롱이면 진입 가격에서 openPosition.curStopPrice 을 뺀 값
            숏이면 openPosition.curStopPrice 에서 진입 가격을 뺀 값

        openPosition.initialRiskPct 값 정의 = (openPosition.initialUnitRisk  / 진입가격) * 100
        openPosition.curRiskPct = openPosition.initialRiskPct 
        openPosition.curRMultiple = 0

    if 백테스트 옵션의 recordRisk 값이 true 이면
        openPosition.riskSeries  값 정의 = [
            {
                time: bar.time,
                value: openPosition.curRiskPct
            }
        ]

    // 5. 수익 목표 전략이 있으면 목표가에 주문 
    if profitTarget 전략이 있으면 
        수익 차이를 정의 = profitTarget 메서드를 호출 
        openPosition.profitTarget 값 정의 = 
            롱이면 진입가격 + 수익 차이 
            숏이면 진입가격 - 수익 차이

    // 6. 포지션 상태를 Position 으로 업데이트
    positionStatus = PositionStatus.Position;

    // 7. 포지션 진입 로직 종료
    종료 
    break; 

case 포지션 상태가 Position 일 때

    // 1. 진입방향에 따라 손절 진행 
    if openPosition 의 curStopPrice 가 정의되어 있으면

        if 롱이면
            if curStopPrice 이 저가보다 작거나 같으면 
                포지션 종료 (closePosition 함수 호출)
                break; 
        else 숏이면  
            if curStopPrice 이 고가보다 크거나 같으면
                포지션 종료 (closePosition 함수 호출)
                break;

    // 2. 후행 정지 가격이 손절가격보다 더 좋으면 적용 
    if trailingStopLoss 전략이 정의되어 있으면

        후행 정지 차이 (trailingStopDistance) 값 정의 =
            trailingStopLoss 메서드 호출 

        if 방향이 롱이면 
            새로운 후행 정지 가격 값 정의 = 종가 - 후행 가격 차이
            if 새로운 후행 정지 가격이 curStopPrice 보다 크면
                curStopPrice 값 정의 = 새로운 후행 정지 가격 

        else 방향이 숏이면
            새로운 후행 정지 가격 값 정의 = 종가 + 후행 가격 차이
            if 새로운 후행 정지 가격이 curStopPrice 보다 작으면
                curStopPrice 값 정의 = 새로운 후행 정지 가격 

        if 백테스트 옵션의 recordStopPrice 값이 true 이면
            오픈 포지션의 stopPriceSeries 배열에 값을 푸시 ({
                time: bar.time,
                value: openPosition!.curStopPrice
            )}

    // 3. 수익목표에 따른 포지션 정리 
    if 수익목표가 정의되어 있으면

        if 방향이 롱이면
            if 고가가 수익목표가 보다 크거나 같으면
                포지션 종료 (closePosition 함수 호출)
                break;

        else 방향이 숏이면
            if 저가가 수익 목표가 보다 작거나 같으면
                포지션 종료 (closePosition 함수 호출)
                break;

    // 4. 포지션 업데이트
    updatePosition(openPosition!, bar)
        수익금, 수익률 업데이트
        리스크 업데이트
        홀딩 기간 += 1

    // 5. 옵션 여부에 따라 리스크 기록 
    if curRiskPct 가 정의되어 있고 백테스트 옵션의 recordRisk 값이 true 이면
        오픈 포지션에 riskSeries 배열에 값을 푸시 ({
            time: bar.time,
            value: openPosition!.curRiskPct!
        )}

    // 6. 포지션 정리
    if exitRule 전략이 있으면
        strategy.exitRule 메서드 호출  (exitPosition 와 옵션을 파라메터로 전달)
        포지션 상태를 Exit 로 변경

    // 7. 포지션이 있을 때 로직 종료 
    break;

case 포지션 상태가 Exit 일 때
    // 1. 포지션 정리 
    closePosition 함수 호출 
        시가로 포지션 정리
        포지션 상태를 None 으로 변경
        break;
```



## Comment
* 로직을 상세하기 확인하기 전까지는 모르고 있었던 trailing Stop 에 대해서 알게 되었다.
* 지금 실행중인 매매 로직과 차이가 나는 부분을 명확하게 이해 할 수 있었다. 
* 그냥 하는 것보다 확실히 더 쉽게 개발이 가능 할 것 같다.


## 참조링크
* [원본 코드 backtest.ts](https://github.com/Grademark/grademark/blob/0ce580cfa1c9d56e9f0788ce97f9b8f4df2eea21/src/lib/backtest.ts)
* [Trailing Stop 이란](https://www.thebalance.com/trailing-stop-1031394)