---
front_matter_title: leetcodes Dynamic Programming I - Min Cost Climbing Stairs / javascript
author: Seungwoo Lee
date: 2022-01-27
tags: ["TIL", "leetcode"]
description: leetcode의 StudyPlan Dynamic Programming I - Day 2의 두 번째 문제 Min Cost Climbing Stairs에 메모이제이션 기법(Memoization)을 연습합니다.
---

# leetcodes Dynamic Programming I - Min Cost Climbing Stairs / javascript

leetcode의 StudyPlan Dynamic Programming I - Day 2의 두 번째 문제 Min Cost Climbing Stairs에 메모이제이션 기법(Memoization)을 연습합니다.

## Min Cost Climbing Stairs

* <https://leetcode.com/problems/min-cost-climbing-stairs/>

### 문제

You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
> 비용[i]이 계단에서 i번째 단계의 비용인 정수 배열 비용이 주어집니다. 비용을 지불하면 한 계단 또는 두 계단을 오를 수 있습니다.

You can either start from the step with index 0, or the step with index 1.
> 인덱스가 0인 단계에서 시작하거나 인덱스가 1인 단계에서 시작할 수 있습니다.

Return the minimum cost to reach the top of the floor.
> 바닥 꼭대기에 도달하기 위한 최소 비용을 반환합니다.

**Example1:**

* Input: cost = [10,15,20]
* Output: 15
* Explanation: You will start at index 1.
* (Pay 15 and climb two steps to reach the top.)
* The total cost is 15.

**Example2:**

* Input: cost = [1,100,1,1,1,100,1,1,100,1]
* Output: 6
* Explanation: You will start at index 0.
* (Pay 1 and climb two steps to reach index 2.)
* (Pay 1 and climb two steps to reach index 4.)
* (Pay 1 and climb two steps to reach index 6.)
* (Pay 1 and climb one step to reach index 7.)
* (Pay 1 and climb two steps to reach index 9.)
* (Pay 1 and climb one step to reach the top.)
* The total cost is 6.

**Constraints:**

* `2 <= cost.length <= 1000`
* `0 <= cost[i] <= 999`

### 풀이

문제의 난이도는 동일한 Easy인데 이전과 동일한 요령으로 쉽게 풀리지는 않았습니다. 그래서 더 좋은 연습이 된 것 같습니다.

**풀이1 (재귀):**

```js
var minCostClimbingStairs = function (cost, i = 0) {
    if (!(i in cost)) return 0;
    return Math.min(cost[i] + minCostClimbingStairs(cost, i + 1), (cost[i + 1] || 0) + minCostClimbingStairs(cost, i + 2));
};
```

* 259 / 283 test cases passed.
* Status: Time Limit Exceeded

**풀이2 (메모이제이션):**

```js
var minCostClimbingStairs = function (cost, i = 0 , memo = {}) {
    if (!(i in cost)) return 0;
    if (i in memo) return memo[i];
    memo[i] = Math.min(cost[i] + minCostClimbingStairs(cost, i + 1, memo), (cost[i + 1] || 0) + minCostClimbingStairs(cost, i + 2, memo));
    return memo[i];
};
```

* 283 / 283 test cases passed.
* Status: Accepted

<Comment/>
