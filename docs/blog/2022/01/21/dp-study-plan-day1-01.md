---
front_matter_title: leetcodes Dynamic Programming - Fibonacci Number / javascript
author: Seungwoo Lee
date: 2022-01-21
tags: ["Algorithm"]
description: leetcode의 StudyPlan Dynamic Programming I - Day 1의 문제 Fibonacci Number의 풀이입니다. 재귀로 먼저 풀고 파라미터를 추가하는 요령으로 메모이제이션 기법(Memoization)을 적용해 보았습니다.
---

# leetcodes Dynamic Programming - Fibonacci Number / javascript

leetcode의 StudyPlan Dynamic Programming I - Day 1의 문제 Fibonacci Number의 풀이입니다. 재귀로 먼저 풀고 파라미터를 추가하는 요령으로 메모이제이션 기법(Memoization)을 적용해 보았습니다.

## Fibonacci Number

* <https://leetcode.com/problems/fibonacci-number/>

### 문제

* 피보나치 수열 구하기

F(0) = 0, F(1) = 1

F(n) = F(n - 1) + F(n - 2), for n > 1.

### 예제

* 예제 1

```no
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
```

* 예제 2

```no
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
```

* 예제 3

```no
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
```

### 제약조건

* `0 <= n <= 30`

### 풀이 1

먼저 재귀를 사용해서 풀어줍니다.

```js
var fib = function(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
};
```

### 풀이 2

다음 파라미터로 `memo = {}`을 추가해보면 아주 쉽게 메모이제이션 기법을 적용할 수 있습니다.

```js
var fib = function(n, memo = {}) {
    if (n < 2) return n;
    if (!memo[n]) {
        memo[n] = fib(n - 2, memo) + fib(n - 1, memo);    
    } 
    return memo[n];
};
```
