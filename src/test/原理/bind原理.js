Function.prototype._bind = function() {
  const param = Array.from(arguments);
  const that = param[0];
  const arg = param.slice(1);
  const fn = this;
  const fBound = function() {
    fn.apply(
      this instanceof fn ? this : that,
      arg.concat(Array.from(arguments))
    );
  };
  const fNOP = function() {};
  // 避免修改fBound的原型链时将fn的原型链也修改了
  fNOP.prototype = fn.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
