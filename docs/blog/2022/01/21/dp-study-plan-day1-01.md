---
front_matter_title: leetcodes Dynamic Programming - Fibonacci Number / javascript
author: Seungwoo Lee
date: 2022-01-21
tags: ["Algorithm"]
description: leetcode의 StudyPlan Dynamic Programming I - Day 1의 문제 Fibonacci Number의 풀이입니다. 재귀로 먼저 풀고 파라미터를 추가하는 요령으로 메모이제이션 기법(Memoization)을 적용해 보았습니다.
---

# leetcodes - Dynamic Programming - Fibonacci Number 와 N-th Tribonacci Number

leetcode의 StudyPlan Dynamic Programming I - Day 1의 문제 Fibonacci Number의 풀이입니다. 재귀로 먼저 풀고 파라미터를 추가하는 요령으로 메모이제이션 기법(Memoization)을 적용해 보았습니다.

## Fibonacci Number

<https://leetcode.com/problems/fibonacci-number/>

### 문제

* 피보나치 수열 구하기

F(0) = 0, F(1) = 1

F(n) = F(n - 1) + F(n - 2), for n > 1.

### 풀이 1

먼저 재귀를 사용해서 풀어봅니다.

```js
var fib = function(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
};
```

### 풀이 2

파라미터로 `memo = {}`을 추가해서 아주 쉽게 메모이제이션 기법을 적용할 수 있습니다.

```js
var fib = function(n, memo = {}) {
    if (n < 2) return n;
    if (!memo[n]) {
        memo[n] = fib(n - 2, memo) + fib(n - 1, memo);    
    } 
    return memo[n];
    
};
```
