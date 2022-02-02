---
front_matter_title: leetcodes Dynamic Programming - Fibonacci Number / javascript
author: Seungwoo Lee
date: 2022-01-21
tags: ["TIL", "leetcode"]
description: leetcode의 StudyPlan Dynamic Programming I - Day 1의 문제 첫 번째 문제 Fibonacci Number에 메모이제이션 기법(Memoization)을 연습했습니다.
---

# leetcodes Dynamic Programming - Fibonacci Number / javascript

leetcode의 StudyPlan Dynamic Programming I - Day 1의 문제 첫 번째 문제 Fibonacci Number에 메모이제이션 기법(Memoization)을 연습했습니다.

## Fibonacci Number

* <https://leetcode.com/problems/fibonacci-number/>

### 문제

The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,
> 일반적으로 F(n)으로 표시되는 피보나치 수는 피보나치 수열이라고 하는 수열을 형성하므로 각 수는 0과 1에서 시작하는 앞의 두 수의 합입니다. 즉,

F(0) = 0, F(1) = 1

F(n) = F(n - 1) + F(n - 2), for n > 1.

Given n, calculate F(n).
> n이 주어지면 F(n)을 계산합니다.

**Example1:**

* Input: n = 2
* Output: 1
* Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

**Example2:**

* Input: n = 3
* Output: 2
* Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

**Example3`:**

* Input: n = 4
* Output: 3
* Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.

**Constraints:**

* `0 <= n <= 30`

### 풀이

먼저 재귀로 푼 다음 파라미터로 `memo = {}`을 추가해보면 아주 쉽게 메모이제이션 기법을 적용할 수 있습니다.

**풀이1 (재귀):**

```js
var fib = function(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
};
```

**풀이2 (메모제이션):**

```js
var fib = function(n, memo = {}) {
    if (n < 2) return n;
    if (!memo[n]) {
        memo[n] = fib(n - 2, memo) + fib(n - 1, memo);    
    } 
    return memo[n];
};
```
