// 限制图片的位置 ===> 始终在可滚动区
export const limitImage = (spacing, type, width = 450, height = 300) => {
  if (type === "left") {
    const MAX_LEFT = document.body.clientWidth + width - 150;
    if (spacing > MAX_LEFT) return MAX_LEFT;
    if (spacing < -width) return -width;
    return spacing;
  } else if (type === "top") {
    const MAX_TOP = document.body.clientHeight + height;
    if (spacing > MAX_TOP) return MAX_TOP;
    if (spacing < -height) return -height;
    return spacing;
  }
};

// 决定放大缩小的速度
export const calcScaleSpeed = (e) => {
  let d = Math.abs(e.deltaY);
  if (d > 4) {
    d = 4 + (d - 4) * 0.05;
  } else if (d > 2) {
    d = 2 + (d - 2) * 0.2;
  } else if (d > 1) {
    d = 1 + (d - 1) * 0.3;
  }
  if (d > 20) {
    d = 20 + (20 - 4) * 0.05;
  }
  let speed = e.deltaY > 0 ? -d / 50 : d / 50;
  let isTouchWheel = e.ctrlKey;
  return isTouchWheel ? speed * normalZoomSpeed() : speed;
};

// 缩放倍率
function normalZoomSpeed() {
  let inNum = 400;
  const inMax = 522;
  const inMin = 270;
  const outMax = 3;
  const outMin = 0.125;
  return ((inNum - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}
