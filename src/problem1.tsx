// Problem 1: Array Manipulation

// Task: Implement a function to find the maximum sum of a contiguous subarray using Kadane’s algorithm.
// 	•	Requirements:
// 	•	Input: An array of integers.
// 	•	Output: The maximum sum of a contiguous subarray.
// 	•	Example Input:
// [-2,1,-3,4,-1,2,1,-5,4]
// 	•	Example Output:
// 6 (subarray: [4,-1,2,1])

function maxSubArray(nums: number[]) {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// Example Usage
const input1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(input1)); // Output: 6 (subarray: [4, -1, 2, 1])
