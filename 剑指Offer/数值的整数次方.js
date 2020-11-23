// 为了方便讨论，假设指数exponent是正数。那么递归式如下：

// 如果exponent是偶数，Power(base, exponent) = Power(base, exponent / 2) * Power(base, exponent / 2)
// 如果exponent是奇数，Power(base, exponent) = base * Power(base, exponent / 2) * Power(base, exponent / 2)
// 对于负指数exponent的情况，取其绝对值先计算。将最后结果取倒数即可。

let myPow = function (x, n) {
  const isNegative = n < 0; // 是否是负指数
  const result = absMyPow(x, Math.abs(n));
  return isNegative ? 1 / result : result;
};
function absMyPow (base, exponent) {
  if(exponent === 0) return 1
  if(exponent === 1) return base
  const subResult = absMyPow(base, Math.floor(exponent / 2))
  return exponent % 2 ? subResult * subResult * base : subResult * subResult;
}