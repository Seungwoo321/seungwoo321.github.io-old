---
front_matter_title: leetcodes Data Structure I - Contains Duplicate / javascript
author: Seungwoo Lee
date: 2022-02-03
tags: ["TIL", "leetcode"]
description: leetcode의 StudyPlan Data Structure I - Day 1의 첫 번째 문제 Contains Duplicate 풀이
---

# leetcodes Data Structure I - Contains Duplicate / javascript

leetcode의 StudyPlan Data Structure I - Day 1의 첫 번째 문제 Contains Duplicate 풀이

## Contains Duplicate

* <https://leetcode.com/problems/contains-duplicate//>

### 문제

Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
> 정수 배열 nums가 주어지면 값이 배열에 두 번 이상 나타나면 true를 반환하고 모든 요소가 고유하면 false를 반환합니다.

**Example1:**

* Input: nums = [1,2,3,1]
* Output: true

**Example2:**

* Input: nums = [1,2,3,4]
* Output: false

**Example3:**

* Input: nums = [1,1,1,3,3,4,3,2,4,2]
* Output: true

**Constraints:**

* `1 <= nums.length <= 105`
* `-109 <= nums[i] <= 109`

### 풀이

문제의 태그 `Hash Table`와 `Sorting`을 이용해서 풀었습니다.

**풀이1 (Hash Table):**

```js
var containsDuplicate = function(nums) {
    const checked = {}
    for (let n of nums) {
        if (n in checked) return true;
        checked[n] = n;
    }
    return false;
};
```

**풀이2 (Sorting):**

```js
var containsDuplicate = function(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 1; i ++) {
        if (nums[i] === nums[i + 1]) return true;
    }
    return false;
};
```

<Comment/>
