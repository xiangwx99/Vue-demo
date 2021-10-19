/**
虚拟列表其实是按需显示的一种实现，即只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到极高的渲染性能。
假设有1万条记录需要同时渲染，我们屏幕的可见区域的高度为500px,而列表项的高度为50px，则此时我们在屏幕中最多只能看到10个列表项，那么在首次渲染的时候，我们只需加载10条即可。
**/
<template>
  <VirtualList :dataList="dataList" :itemSize="200">
    <!-- <Item :item="slotProps.item" /> -->
  </VirtualList>
</template>

<script>
import { reactive } from "vue";
import VirtualList from "./cpn/VirtualList.vue";
// import Item from "./cpn/Item.vue";
export default {
  components: {
    VirtualList,
    // Item,
  },
  setup() {
    let dataList = [];
    for (let i = 0; i < 100; i++) {
      dataList.push(i);
    }
    dataList = reactive(dataList);
    return { dataList };
  },
};
</script>

<style lang="scss" scoped></style>
