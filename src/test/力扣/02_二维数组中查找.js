/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  let [row, col] = [matrix.length - 1, 0];
  while (row >= 0 && col <= matrix[0].length - 1) {
    const item = matrix[row][col];
    if (item === target) {
      return true;
    } else if (item < target) {
      col++;
    } else {
      row--;
    }
  }
  return false;
};

findNumberIn2DArray(
  [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
  ],
  5
);
