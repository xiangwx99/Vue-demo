<template>
  <div
    ref="rootElement"
    class="infinite-list-container"
    @scroll="scrollEvent($event)"
  >
    <div
      class="infinite-list-phantom"
      ref="phantomElement"
      :style="{ height: listHeight + 'px' }"
    ></div>
    <div class="infinite-list" :style="{ transform: getTransform }" ref="contentElement">
      <div
        :ref="setItemRef"
        class="infinite-list-item"
        v-for="(item) in visibleData"
        :id="item.index"
        :key="item.id"
      >
        <slot :item="item" ref="slot"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUpdated, onBeforeUpdate, nextTick } from "vue";
export default {
  props: ["dataList", "itemSize"],
  setup(props) {
    const setItemRef = el => el && itemRefs.push(el)
    const rootElement = ref(null);
    const phantomElement = ref(null);
    const contentElement = ref(null);
    //所有列表数据
    const listData = reactive(props.dataList || []);
    let positions = reactive(null);
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

    // 初始化高度
    const initPositions = function() {
      positions = listData.map((d, index) => ({
        index,
        height: itemSize.value,
        top: index * itemSize.value,
        bottom: (index + 1) * itemSize.value
      }));
    }
    initPositions()
    onMounted(() => {
      nextTick(() => {
        screenHeight.value = rootElement.value.clientHeight;
        start.value = 0;
        end.value = start.value + visibleCount.value;
      });
    });

    // 存储各个item元素
    let itemRefs = []
    onBeforeUpdate(() => {
      itemRefs = []
    })
    onUpdated(() => {
      nextTick(function() {
        if (!itemRefs.length) return
        //获取真实元素大小，修改对应的尺寸缓存
        updateItemsSize();
        //更新列表总高度
        let height = positions[positions.length - 1].bottom;
        phantomElement.value.style.height = height + "px";
        //更新真实偏移量
        setStartOffset();
      });
    })

    // 滚动
    const scrollEvent = function() {
      //当前滚动位置
      let scrollTop = rootElement.value.scrollTop;
      //此时的开始索引
      // start.value = Math.floor(scrollTop / itemSize.value);
      start.value = getStartIndex(scrollTop);
      //此时的结束索引
      end.value = start.value + visibleCount.value;
      //此时的偏移量
      // startOffset.value = scrollTop - (scrollTop % itemSize.value);
      setStartOffset()
    };

    //获取列表项的当前尺寸
    const updateItemsSize = function(){
      let nodes = itemRefs;
      nodes.forEach(node => {
        let rect = node.getBoundingClientRect();
        let height = rect.height;
        let index = +node.id.slice(1);
        let oldHeight = positions[index].height;
        let dValue = oldHeight - height;
        //存在差值
        if (dValue) {
          positions[index].bottom = positions[index].bottom - dValue;
          positions[index].height = height;

          for (let k = index + 1; k < positions.length; k++) {
            positions[k].top = positions[k - 1].bottom;
            positions[k].bottom = positions[k].bottom - dValue;
          }
        }
      });
    }
    //获取当前的偏移量
    const setStartOffset = function() {
      let startOffset =
        start.value >= 1 ? positions[start.value - 1].bottom : 0;
      contentElement.value.style.transform = `translate3d(0,${startOffset}px,0)`;
    }

    //获取列表起始索引
    const getStartIndex = function (scrollTop = 0) {
      //二分法查找
      return binarySearch(positions, scrollTop);
    }

    const binarySearch = function (list, value) {
      let start = 0;
      let end = list.length - 1;
      let tempIndex = null;
      while (start <= end) {
        let midIndex = parseInt((start + end) / 2);
        let midValue = list[midIndex].bottom;
        if (midValue === value) {
          return midIndex + 1;
        } else if (midValue < value) {
          start = midIndex + 1;
        } else if (midValue > value) {
          if (tempIndex === null || tempIndex > midIndex) {
            tempIndex = midIndex;
          }
          end = end - 1;
        }
      }
      return tempIndex;
    }

    return {
      positions,
      listData,
      visibleData,
      screenHeight,
      startOffset,
      start,
      end,
      scrollEvent,
      getTransform,
      listHeight,
      setItemRef,
      rootElement,
      phantomElement,
      contentElement
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
