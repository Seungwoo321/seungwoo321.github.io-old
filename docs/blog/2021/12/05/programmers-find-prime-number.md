---
front_matter_title: 프로그래머스 level 1 - 소수 찾기 / javascript
author: Seungwoo Lee
date: 2021-12-05
tags: ["Programmers", "TIL"]
description: 1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하는 함수, solution을 만들어 보세요. 소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다. (1은 소수가 아닙니다.)
---

# 프로그래머스 level 1 - 소수 찾기 / javascript

## 문제

1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하는 함수, solution을 만들어 보세요.
소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다. (1은 소수가 아닙니다.)

### 제한조건

* n은 2이상 1000000이하의 자연수입니다.

### 입출력 예

n|result
--|-----
10|4
5|3

### 입출력 예 설명

입출력 예 #1

* 1부터 10 사이의 소수는 [2,3,5,7] 4개가 존재하므로 4를 반환

입출력 예 #2

* 1부터 5 사이의 소수는 [2,3,5] 3개가 존재하므로 3를 반환

## 풀이

* **에라토스테네스의 체** 알고리즘을 그대로 구현했다.
  * 배수를 지우고 남아 있는 다음 첫 번째 수는 소수이므로 기본값이 `true`인 배열을 만든다.
  * 1은 소수가 아니므로 0번째를 false로 변경한다.
  * 2부터 n의 제곱 근까지 각 배수를 `false`로 지운 다음 남은 `true`의 개수를 반환한다.

```js
function solution (n) {
    let arr = new Array(n).fill(true);
    arr[0] = false;
    for (let i = 1; i < Math.sqrt(n); i++) {
        if (arr[i]) {
            for (let j = i + (i + 1); j < n; j += i + 1) {
                arr[j] = false;
            }
        }
    }
    return arr.filter(n => n).length;
}
```

## 참조링크

* [wikipedia - 에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)
* [유튜브 Let's Do Math - Finding Prime Numbers](https://www.youtube.com/watch?v=FBbHzy7v2Kg&t=1s)

<Comment/>
