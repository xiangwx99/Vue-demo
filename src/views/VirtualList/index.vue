/** 简述:
虚拟列表其实是按需显示的一种实现，即只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到极高的渲染性能。
假设有1万条记录需要同时渲染，我们屏幕的可见区域的高度为500px,而列表项的高度为50px，则此时我们在屏幕中最多只能看到10个列表项，那么在首次渲染的时候，我们只需加载10条即可。
优化1: 刚开始将每个Item的高度都是固定的，所以这很方便的计算出列表的高度,
如果此时每个列表的高度都不是固定的应该怎么做呢？方案一：将列表项渲染到屏幕外，对其高度进行测量并缓存，然后再将其渲染至可视区域内。由于预先渲染至屏幕外，再渲染至屏幕内，这导致渲染成本增加一倍，这对于数百万用户在低端移动设备上使用的产品来说是不切实际的。方案二:给与每个Item一个预估高度先行渲染，然后获取真实的高度并且缓存。
**/
<template>
  <VirtualList :dataList="dataList" :itemSize="50" v-slot="slotProps">
    <Item :item="slotProps.item" />
  </VirtualList>
</template>

<script>
import { reactive } from "vue";
import VirtualList from "./cpn/VirtualList.vue";
import Item from "./cpn/Item.vue";
import faker from "faker";
export default {
  components: {
    VirtualList,
    Item,
  },
  setup() {
    let dataList = [];
    for (let id = 0; id < 1000; id++) {
      dataList.push({
        id: `_${id}`,
        value: faker.lorem.sentences(), // 长文本
      });
    }
    dataList = reactive(dataList);
    return { dataList };
  },
};
</script>

<style lang="scss" scoped></style>
