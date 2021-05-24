---
title: Programmers - Greedy 1 체육복
author: Seungwoo Lee
date: 2021-05-24
tags: ["programmers", "TIL", "algorithm"]
description: TIL - Greedy 문제 체육복을 풀면서 공부한 내용을 정리하자.
---

# Programmers - Greedy 1 체육복

![01.png](/img/20210524/01.png)

## 문제 


## 문제
점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요

## 제한사항
* 전체 학생의 수는 2명 이상 30명 이하입니다.
* 체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
* 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
* 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
* 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.

## 풀이

### 코드1

```js
function solution(n, lost, reserve) {

    const arr = lost.slice();
    while (arr.length) {
        const value = arr.shift();
        if (reserve.includes(value)) {
            lost.splice(lost.indexOf(value), 1);
            reserve.splice(reserve.indexOf(value), 1);
        }
    }
 
    while (reserve.length) {
        
        const first = reserve.shift();
        const beforeMember = lost.indexOf(first - 1);
        const afterMember = lost.indexOf(first + 1);

        if (beforeMember > -1) {
            lost.splice(beforeMember, 1);
        } else if (afterMember > -1) {
            lost.splice(afterMember, 1);
        }
    }

    return n - lost.length;
}
```

### 코드2
```js

function solution (n, lost, reserve) {

    const myReserve = lost.filter(l => reserve.includes(l));
    const realReserve = reserve.filter(r => !myReserve.includes(r));

    const borrow = realReserve.reduce((accumulator, currentValue) => {
        const before = currentValue - 1;
        const after = currentValue + 1;

        if (!accumulator.includes(before) && !myReserve.includes(before) && lost.includes(before)) {
            accumulator.push(before);

        } else if (!accumulator.includes(after) && !myReserve.includes(after) && lost.includes(after)) {
            accumulator.push(after);

        }
        return accumulator;
    }, [])

    return n - lost.length + myReserve.length + borrow.length
}
```

## 테스트 케이스

|n | lost | reserve|answer
---|------|--------|------
|5|[2, 5]|[1, 3, 5]|5
|5|[2, 4]|[3]|4
|3|[3]|[1]|2
|12|[1, 2, 3, 5, 8, 9, 11]|[4, 2, 10]|8
|5|[1, 5]|[3]|3
|4|[3, 1, 2]|[2, 4, 3]|3
|2|[2, 1]|[1, 2]|2 

## Comment
* 잃어버린 학생 중 자신의 여벌이 있는 학생을 먼저 제외 시키는 것이 중요하다. 처음에는 한번의 반복문에서 처리하려고 해서, 테스트 케이스가 통과되지 않았으나, 여별이 있는 학생은 제외시키고 남은 학생 목록에서 앞 번호 혹은 뒷 번호에 체육복을 빌려주니 쉽게 풀렸다.
* `while` 문으로 풀고나서 `filter`, `reduce` 도 사용해서 풀어보았다.
* 다른 사람의 풀이를 보니, 

## 링크
* https://programmers.co.kr/learn/courses/30/lessons/42862