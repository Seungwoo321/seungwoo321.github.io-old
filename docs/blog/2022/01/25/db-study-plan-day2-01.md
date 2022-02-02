---
front_matter_title: leetcodes Dynamic Programming - Climbing Stairs / javascript
author: Seungwoo Lee
date: 2022-01-25
tags: ["TIL", "leetcode"]
description: leetcode의 StudyPlan Dynamic Programming I - Day 2의 첫 번째 문제 Climbing Stairs에 메모이제이션 기법(Memoization)을 연습합니다.
---

# leetcodes - Dynamic Programming - Climbing Stairs

leetcode의 StudyPlan Dynamic Programming I - Day 2의 첫 번째 문제 Climbing Stairs에 메모이제이션 기법(Memoization)을 연습합니다.

## Climbing Stairs

* <https://leetcode.com/problems/climbing-stairs/>

### 문제

You are climbing a staircase. It takes n steps to reach the top.
> 당신은 계단을 오르고 있습니다. 정상에 도달하려면 n 단계가 필요합니다.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
> 매번 1 또는 2개의 계단을 오를 수 있습니다. 얼마나 많은 독특한 방법으로 정상에 오를 수 있습니까?

**Example1:**

* Input: n = 2
* Output: 2
* Explanation: There are two ways to climb to the top.
* 1. 1 step + 1 step
* 2. 2 steps

**Example2:**

* Input: n = 3
* Output: 3
* Explanation: There are three ways to climb to the top.
* 1. 1 step + 1 step + 1 step
* 2. 1 step + 2 steps
* 3. 2 steps + 1 step

**Constraints:**

* `1 <= n <= 45`

### 풀이

먼저 재귀로 접근을 풀고 `{}`을 파라미터를 추가하면 메모이제이션 기법이 쉽게 적용 됩니다.

**풀이1 (재귀):**

```js
var climbStairs = function(n) {
    if (n === 1 || n === 0) return 1;
    return climbStairs(n - 1) + climbStairs(n - 2);
};
```

**풀이2 (메모이제이션):**

```js
var climbStairs = function(n, memo = {}) {
    if (n === 1 || n === 0) return 1;
    if (n in memo) return memo[n];
    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
    return memo[n];
};
```
