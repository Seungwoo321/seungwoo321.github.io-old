---
title: 타입과 문법, 스코프와 클로저 YOU DON'T KNOW JS 책을 읽다
author: Seungwoo Lee
date: 2021-05-02
tags: ["javascript", "closure", "독후감"]
description: 클로저 이해하기
---


## 타입과 문법, 스코프와 클로저 YOU DON'T KNOW JS 책을 읽다

![happy-javascript.jpg](/img/20210502/happy-javascript.jpg)
~~저도 기뻐요~~

나는 클로저를 이해하고 있다고 생각했지만, 실제로 말로 설명이 되지 않는다는걸 깨닫고 이 책을 읽기 시작했다. 클로저 외에도 평소에 모르고 넘어 갈 수 있었던 부분에 대해 생각보다 많은 도움이 된 책이다. 이미 클로저는 수차례 반복해서 읽었지만, 이번 한번의 완독으로 끝내는 것이 아니라, 완벽하게 남을 때 까지 반복해서 읽을 생각이다.




### 인상 깊은 구절

(1)
> 잠시 이 책을 덮어보라. 한 가지 과제를 주겠다. 최근에 작성한 자바스크립트 코드를 열어 보라. 함수를 값으로 사용한 경우를 찾아보고, 알지 못했지만 이미 클로저를 사용하고 있는 부분을 확인해보자. 기다리겠다. 자 ... 이제 보이는가! p.245

(2)
> 클로저는 함수를 렉시컬 스코프 밖에서 호출해도 함수는 자신의 렉시컬 스코프를 기억하고 접근할 수 있는 특성을 의미한다. p. 255


#### 클로저 사용 찾아보기
* 첫 번째 인상깊은 구절을 보고 클로저를 사용한 코드를 찾아보니, vue-pivottable 의 Issues 중 #19, #38 를 해결 하면서 작성한 예제용 코드에서 클로저를 사용한 예를 찾을 수 있었다.     


./src/helper/utils.js
```js{12}
/** Global */
const numberFormat = function (optsIn) {
  /** 외부 함수 */
  const defaults = {
    digitsAfterDecimal: 2,
    scaler: 1,
    thousandsSep: ',',
    decimalSep: '.',
    prefix: '',
    suffix: ''
  }
  const opts = Object.assign({}, defaults, optsIn)
  return function (x) {
    /** 내부 함수 */
    if (isNaN(x) || !isFinite(x)) {
      return ''
    }
    const result = addSeparators(
      (opts.scaler * x).toFixed(opts.digitsAfterDecimal),
      opts.thousandsSep,
      opts.decimalSep
    )
    return `${opts.prefix}${result}${opts.suffix}`
  }
}
```
* numberFormat() 함수의 렉시컬 스코프는 글로벌과 함수 자신의 내부이다.
* 내부에 정의된 x를 받는 익명 함수의 렉시컬 스코프는 글로벌, 외부함수인 numberFormat, 자신의 내부이다.



./demo/example-vue-cli3/src/App.vue
```html{9-15}
<script>
import { PivotUtilities } from 'vue-pivottable'
export default {
  /*
    생략 (...)
  */
  computed: {
    aggregators () {
      const usFmt = PivotUtilities.numberFormat()
      const usFmtInt = PivotUtilities.numberFormat({ digitsAfterDecimal: 0 })
      const usFmtPct = PivotUtilities.numberFormat({
        digitsAfterDecimal: 1,
        scaler: 100,
        suffix: '%'
      })

      return ((tpl) => ({
        'Count': tpl.count(usFmtInt),
        'Count Unique Values': tpl.countUnique(usFmtInt),
        'List Unique Values': tpl.listUnique(', '),
        Sum: tpl.sum(usFmt)
        'Integer Sum': tpl.sum(usFmtInt),
        'Average': tpl.average(usFmt),
        'Median': tpl.median(usFmt),
        'Sample Variance': tpl.var(1, usFmt),
        'Sample Standard Deviation': tpl.stdev(1, usFmt),
        'Minimum': tpl.min(usFmt),
        'Maximum': tpl.max(usFmt),
        'First': tpl.first(usFmt),
        'Last': tpl.last(usFmt),
        'Sum over Sum': tpl.sumOverSum(usFmt),
        'Sum as Fraction of Total': tpl.fractionOf(tpl.sum(), 'total', usFmtPct),
        'Sum as Fraction of Rows': tpl.fractionOf(tpl.sum(), 'row', usFmtPct),
        'Sum as Fraction of Columns': tpl.fractionOf(tpl.sum(), 'col', usFmtPct),
        'Count as Fraction of Total': tpl.fractionOf(tpl.count(), 'total', usFmtPct),
        'Count as Fraction of Rows': tpl.fractionOf(tpl.count(), 'row', usFmtPct),
        'Count as Fraction of Columns': tpl.fractionOf(tpl.count(), 'col', usFmtPct)
      })
      )(PivotUtilities.aggregatorTemplates)
    }
  }
  /*
    생략 (...)
  */
}
</script>

```

* PivotUtilities 객체의 메서드로 사용된 numberFormat() 함수는 내부 익명함수를 반환한다. 각각의 독립적인 스코프가 생성된 usFmt, usFmInt, usFmtPct 가 다시 호출 되어 내부 함수가 실행 될 때 본래 자신의 렉시컬 스코프 환경을 유지해서, opts 변수를 참조할 수 있게 된다.








## 참조링크
* [MDN에서 Closures 학습하기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)






