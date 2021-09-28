<template>
  <ul class="wrapper">
    <menu-item v-for="item in listData" :key="item.name">
      <template v-if="item.children">
        <div class="floder" @click="handleToggleShow(item)">
          {{ item.name }}
        </div>
        <Menu :listData="item.children" v-show="item.isShow"></Menu>
      </template>
      <div v-else class="floder-item">{{ item.name }}</div>
    </menu-item>
  </ul>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import { ref } from "vue";
export default {
  props: {
    type: Array,
    listData: [],
  },
  components: {
    MenuItem,
  },
  setup() {
    const toggleShow = ref(false);
    const handleToggleShow = (item) => {
      item.isShow = !item.isShow;
      toggleShow.value = !toggleShow.value;
    };
    return {
      handleToggleShow,
      toggleShow,
    };
  },
};
</script>

<style lang="scss" scoped>
.floder:hover,
.floder-item:hover {
  background-color: #ececec;
}
</style>
