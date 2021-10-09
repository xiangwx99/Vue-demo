/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
  for (let i of nums) {
    if (nums.indexOf(i) !== nums.lastIndexOf(i)) {
      console.log(i);
      return i;
    }
  }
};

findRepeatNumber([2, 3, 1, 0, 2, 5, 3]);
