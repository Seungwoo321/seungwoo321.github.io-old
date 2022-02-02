---
front_matter_title: leetcodes Dynamic Programming - House Robber / javascript
author: Seungwoo Lee
date: 2022-02-01
tags: ["TIL", "leetcode"]
description: leetcode의 StudyPlan Dynamic Programming I - Day 3의 첫 번째 문제 House Robber에 메모이제이션 기법(Memoization)을 연습합니다.
---

# leetcodes - Dynamic Programming - House Robber

leetcode의 StudyPlan Dynamic Programming I - Day 3의 첫 번째 문제 House Robber에 메모이제이션 기법(Memoization)을 연습합니다.

## House Robber

* <https://leetcode.com/problems/house-robber/>

### 문제

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
> 당신은 거리에서 집을 털려고 계획하는 전문 강도입니다. 각 집에는 일정 금액의 돈이 숨겨져 있습니다. 각 집에서 도둑질을 하는 것을 막는 유일한 제약은 인접한 집에 보안 시스템이 연결되어 있고 같은 밤에 인접한 두 집에 침입한 경우 자동으로 경찰에 연락한다는 것입니다.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
> 각 집의 금액을 나타내는 정수 배열 숫자가 주어지면 경찰에 알리지 않고 오늘 밤 도둑질할 수 있는 최대 금액을 반환하십시오.

**Example1:**

* Input: nums = [1,2,3,1]
* Output: 4
* Explanation: Rob house 1 (money = 1) and then rob house 3
* (money = 3).
* Total amount you can rob = 1 + 3 = 4.

**Example2:**

* Input: nums = [2,7,9,3,1]
* Output: 12
* Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
* Total amount you can rob = 2 + 9 + 1 = 12.

**Constraints:**

* `1 <= nums.length <= 100`
* `0 <= nums[i] <= 400`

### 풀이

주어진 배열에서 인접하지 않은 요소들의 최대 합을 구하는 문제입니다. 재귀로 풀고 다시 메모제이션 기법을 적용하는 순서로 연습을 했습니다.

**풀이1 (재귀):**

```js
var rob = function (nums, i = 0) {
    if (!(i in nums)) return 0;
    return Math.max(nums[i] + rob(nums, i + 2), (nums[i + 1] || 0) + rob(nums, i + 3));
};
```

* 58 / 68 test cases passed.
* Status: Time Limit Exceeded

**풀이2 (메모제이션):**

```js
var rob = function (nums, i = 0, memo = {}) {
    if (!(i in nums)) return 0;
    if (i in memo) return memo[i];
    memo[i] = Math.max(nums[i] + rob(nums, i + 2, memo), (nums[i + 1] || 0) + rob(nums, i + 3, memo));
    return memo[i];
};
```

* 68 / 68 test cases passed.
* Status: Accepted
