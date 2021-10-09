<template>
  <div class="wrapper" @wheel="handleMousewheel($event)">
    <div
      class="image-box"
      :style="{
        top: position.top + 'px',
        left: position.left + 'px',
        transform: `scale(${zoom})`,
      }"
    >
      <div style="width: 100px; height: 100px; background: red"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { limitImage, calcScaleSpeed } from "./util";
export default {
  setup() {
    const NAV_LEFT = 150;
    const position = reactive({
      top: 0,
      left: 0,
    });
    const zoom = ref(1);

    onMounted(() => {
      // 居中显示
      position.top = document.body.clientHeight / 2 - 150;
      position.left = (document.body.clientWidth - NAV_LEFT) / 2 - 150;
    });

    const handleMousewheel = (event) => {
      event.preventDefault();
      // 处理元素的放大缩小
      if (event.metaKey || event.ctrlKey) {
        const speed = calcScaleSpeed(event);
        // 缩小到最小
        if (event.deltaY > 0 && zoom.value === 0.02) {
          return;
        }
        // 放大到最大
        if (event.deltaY < 0 && zoom.value === 2) {
          return;
        }
        zoomImage(zoom.value * speed, event);
        return;
      }
      // 处理元素的移动
      position.top = limitImage(
        position.top - event.deltaY,
        "top",
        300 * zoom.value,
        null
      );
      position.left = limitImage(
        position.left - event.deltaX,
        "left",
        null,
        450 * zoom.value
      );
      console.log(position);
    };

    // 放大缩小图片
    const zoomImage = (val, e) => {
      let zoomSize = zoom.value + val;
      zoomSize = Math.min(zoomSize, 2);
      zoomSize = Math.max(0.02, zoomSize);
      zoom.value = zoomSize;
      console.log(zoomSize, e);
    };

    return { position, handleMousewheel, zoom };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ececec;
  overflow: hidden;
}
.image-box {
  position: absolute;
  width: 300px;
  height: 300px;
  background: #ddd;
}
</style>
