---
front_matter_title: leetcodes Dynamic Programming - N-th Tribonacci Number / javascript
author: Seungwoo Lee
date: 2022-01-22
tags: ["TIL", "leetcode"]
description: leetcode의 StudyPlan Dynamic Programming I - Day 1의 두 번째 문제 N-th Tribonacci Number에 메모이제이션 기법(Memoization)을 연습합니다.
---

# leetcodes - Dynamic Programming - N-th Tribonacci Number

leetcode의 StudyPlan Dynamic Programming I - Day 1의 두 번째 문제 N-th Tribonacci Number에 메모이제이션 기법(Memoization)을 연습합니다.

## N-th Tribonacci Number

* <https://leetcode.com/problems/n-th-tribonacci-number/>

### 문제

The Tribonacci sequence T_n is defined as follows:
> 트리보나치 수열 Tn은 다음과 같이 정의됩니다.

T_0 = 0, T_1 = 1, T_2 = 1, and T_(n+3) = T_n + T_(n+1) + T_(n+2) for n >= 0.

Given `n`, return the value of `T_n`.
> n이 주어지면 Tn의 값을 반환합니다.

**Example1:**

* Input: n = 4
* Output: 4
* Explanation:
* T_3 = 0 + 1 + 1 = 2
* T_4 = 1 + 1 + 2 = 4

**Example2:**

* Input: n = 25
* Output: 1389537

**Constraints:**

* `0 <= n <= 37`
* The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`.

### 풀이

**풀이1 (재귀):**

먼저 재귀를 사용해서 풀어보면 `Time Limit Exceeded`가 발생합니다.

```js
var tribonacci = function(n) {
    if (n < 0) return 0;
    if (n < 2) return n;
    return tribonacci(n - 3) + tribonacci(n - 2) + tribonacci(n - 1);
}
```

**풀이2 (메모제이션):**

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

<Comment/>
