/**
 * @param {number} n
 * @return {number}
 */
// var fib = function(n) {
//   if (n > 1) return (fib(n - 1) + fib(n - 2)) % 1000000007;
//   if (n === 0) return 0;
//   if (n === 1) return 1;
// };

var fib = function(n) {
  if (n > 1) return (fib(n - 1) + fib(n - 2)) % 1000000007;
  if (n === 0) return 0;
  if (n === 1) return 1;
  let sum = 0, 
};

var fib = function(n) {
  const MOD = 1000000007;
  if (n < 2) {
      return n;
  }
  let p = 0, q = 0, r = 1;
  for (let i = 2; i <= n; ++i) {
      p = q; 
      q = r; 
      r = (p + q) % MOD;
  }
  return r;
};


console.log(fib(44));
