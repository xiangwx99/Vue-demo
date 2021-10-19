<template>
  <div class="wrapper" @wheel="handleMousewheel($event)">
    <div
      class="image-box"
      :style="{
        width: imgBoxInfo.width * zoom + 'px',
        height: imgBoxInfo.height * zoom + 'px',
        top: imgBoxInfo.top + 'px',
        left: imgBoxInfo.left + 'px',
      }"
    >
      <!-- <div style="width: 100px; height: 100px; background: red"></div> -->
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { limitImage, calcScaleSpeed } from "./util";
export default {
  setup() {
    const NAV_LEFT = 150;
    // 元素的信息
    const imgBoxInfo = reactive({
      height: 300,
      width: 300,
      top: 0,
      left: 0,
    });
    const zoom = ref(1);

    onMounted(() => {
      // 居中显示
      imgBoxInfo.top = document.body.clientHeight / 2 - imgBoxInfo.height / 2;
      imgBoxInfo.left =
        (document.body.clientWidth - NAV_LEFT) / 2 - imgBoxInfo.width / 2;
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
      imgBoxInfo.top = limitImage(
        imgBoxInfo.top - event.deltaY,
        "top",
        null,
        imgBoxInfo.height * zoom.value
      );
      imgBoxInfo.left = limitImage(
        imgBoxInfo.left - event.deltaX,
        "left",
        imgBoxInfo.width * zoom.value,
        null
      );
    };

    // 放大缩小图片
    const zoomImage = (val, e) => {
      let zoomSize = zoom.value + val;
      zoomSize = Math.min(zoomSize, 2);
      zoomSize = Math.max(0.02, zoomSize);
      console.log(e);
      /**
       * 计算放大后图片的位置和大小
       *  1. 计算起初图片相对于鼠标的位置
       * **/
      let ratioL =
        (e.clientX - imgBoxInfo.left - NAV_LEFT) /
        (imgBoxInfo.width * zoom.value);
      let ratioT =
        (e.clientY - imgBoxInfo.top) / (imgBoxInfo.height * zoom.value);
      console.log(ratioL, ratioT);
      // let left = e.clientX - imgBoxInfo.width * zoomSize * ratioL;
      // let top = e.clientY - imgBoxInfo.height * zoomSize * ratioT;
      // imgBoxInfo.left = left;
      // imgBoxInfo.top = top;
      // 修改此时的放大倍数
      zoom.value = zoomSize;
    };

    return { imgBoxInfo, handleMousewheel, zoom };
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
