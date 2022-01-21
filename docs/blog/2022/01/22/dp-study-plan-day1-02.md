---
front_matter_title: leetcodes Dynamic Programming - N-th Tribonacci Number / javascript
author: Seungwoo Lee
date: 2022-01-22
tags: ["Algorithm"]
description: leetcode의 StudyPlan Dynamic Programming I - Day 1의 문제 N-th Tribonacci Number의 풀이입니다. 재귀로 먼저 풀고 파라미터를 추가하는 요령으로 메모이제이션 기법(Memoization)을 적용해 보았습니다.
---

# leetcodes - Dynamic Programming - N-th Tribonacci Number

leetcode의 StudyPlan Dynamic Programming I - Day 1의 문제 N-th Tribonacci Number의 풀이입니다. 재귀로 먼저 풀고 파라미터를 추가하는 요령으로 메모이제이션 기법(Memoization)을 적용해 보았습니다.

## N-th Tribonacci Number

* <https://leetcode.com/problems/n-th-tribonacci-number/>

### 문제

* N번째 트리보나치 수열 구하기

The Tribonacci sequence T_n is defined as follows:

T_0 = 0, T_1 = 1, T_2 = 1, and T_(n+3) = T_n + T_(n+1) + T_(n+2) for n >= 0.

Given `n`, return the value of `T_n`.

### 예제

* 예제 1

```no
Input: n = 4
Output: 4
Explanation:
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4
```

* 예제 2

```no
Input: n = 25
Output: 1389537
```

### 제약조건

* `0 <= n <= 37`
* The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`.

### 풀이 1

이전 문제 "Fibonacci Number"와 동일한 요령으로 먼저 재귀를 사용해서 풀어보면 `Time Limit Exceeded`가 발생합니다.

```js
var tribonacci = function(n) {
    if (n < 0) return 0;
    if (n < 2) return n;
    return tribonacci(n - 3) + tribonacci(n - 2) + tribonacci(n - 1);
}
```

### 풀이 2

파라미터로 `memo = {}`을 추가해서 메모이제이션 기법을 적용하고 제출하면 leetcode의 테스트 케이스가 모두 통과됩니다.

```js
var tribonacci = function(n, memo = {}) {
    if (n < 0) return 0;
    if (n < 2) return n;
    if (n in memo) return memo[n]
    memo[n] = tribonacci(n - 3, memo) + tribonacci(n - 2, memo) + tribonacci(n - 1, memo);
    return memo[n];
}
```
