---
front_matter_title: leetcodes Dynamic Programming - Min Cost Climbing Stairs / javascript
author: Seungwoo Lee
date: 2022-01-27
tags: ["Algorithm", "leetcode"]
description: leetcode의 StudyPlan Dynamic Programming I - Day 2의 두 번째 문제는 바로 쉽게 풀지는 못했지만 메모이제이션 기법(Memoization) 연습을 해볼 수 있었습니다.
---

# leetcodes - Dynamic Programming - Min Cost Climbing Stairs

leetcode의 StudyPlan Dynamic Programming I - Day 2의 두 번째 문제는 바로 쉽게 풀지는 못했지만 메모이제이션 기법(Memoization) 연습을 해볼 수 있었습니다.

## Min Cost Climbing Stairs

* <https://leetcode.com/problems/min-cost-climbing-stairs/>

### 문제

비용[i]이 계단에서 i번째 단계의 비용인 정수 배열 비용이 주어집니다. 비용을 지불하면 한 계단 또는 두 계단을 오를 수 있습니다.

인덱스가 0인 단계에서 시작하거나 인덱스가 1인 단계에서 시작할 수 있습니다.

바닥 꼭대기에 도달하기 위한 최소 비용을 반환합니다.

**Example1:**

```no
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
```

**Example2:**

```no
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
```

**Constraints:**

* `2 <= cost.length <= 1000`
* `0 <= cost[i] <= 999`

### 풀이

문제의 난이도는 동일한 Easy인데 이전과 동일한 요령으로 쉽게 풀리지는 않았습니다. 그래서 더 좋은 연습이 된 것 같습니다.

**풀이1 (메모이제이션):**

```js
var minCostClimbingStairs = function (cost, memo = {}) {

    const minCost = function (cost, i, memo) {
        if (i >= cost.length) return 0;
        if (i in memo) return memo[i];
        memo[i] = cost[i] + Math.min(minCost(cost, i + 1, memo), minCost(cost, i + 2, memo));
        return memo[i];
    }
    return Math.min(minCost(cost, 0, memo), minCost(cost, 1, memo));
};
```
