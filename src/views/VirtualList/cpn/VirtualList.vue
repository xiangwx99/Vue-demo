<template>
  <div
    ref="rootElement"
    class="infinite-list-container"
    @scroll="scrollEvent($event)"
  >
    <div
      class="infinite-list-phantom"
      :style="{ height: listHeight + 'px' }"
    ></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        ref="listElement"
        class="infinite-list-item"
        v-for="(item, index) in visibleData"
        :key="index"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, nextTick } from "vue";
export default {
  props: ["dataList", "itemSize"],
  setup(props) {
    const listElement = ref(null);
    const rootElement = ref(null);
    //所有列表数据
    const listData = reactive(props.dataList || []);
    //每项高度
    let itemSize = ref(props.itemSize || 200);
    //可视区域高度
    let screenHeight = ref(0);
    //偏移量
    let startOffset = ref(0);
    //起始索引
    let start = ref(0);
    //结束索引
    let end = ref(null);
    // 列表总高度
    const listHeight = computed(() => listData.length * itemSize.value);
    //可显示的列表项数
    const visibleCount = computed(() =>
      Math.ceil(screenHeight.value / itemSize.value)
    );
    //偏移量对应的style
    const getTransform = computed(
      () => `translate3d(0,${startOffset.value}px,0)`
    );
    //获取真实显示列表数据
    const visibleData = computed(() =>
      listData.slice(start.value, Math.min(end.value, listData.length))
    );

    onMounted(() => {
      nextTick(() => {
        screenHeight.value = rootElement.value.clientHeight;
        start.value = 0;
        end.value = start.value + visibleCount.value;
      });
    });

    // 滚动
    const scrollEvent = function() {
      //当前滚动位置
      let scrollTop = rootElement.value.scrollTop;
      //此时的开始索引
      start.value = Math.floor(scrollTop / itemSize.value);
      //此时的结束索引
      end.value = start.value + visibleCount.value;
      //此时的偏移量
      startOffset.value = scrollTop - (scrollTop % itemSize.value);
    };

    return {
      listData,
      visibleData,
      screenHeight,
      startOffset,
      start,
      end,
      scrollEvent,
      getTransform,
      listHeight,
      listElement,
      rootElement,
    };
  },
};
</script>

<style lang="scss" scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
