<template>
  <div>
    <span style="color: skyblue">{{ itemData.id }} </span>
    {{ itemData.value }}
  </div>
</template>

<script>
import { reactive, } from "vue";
export default {
  props: ["item"],
  setup(props) {
    const itemData = reactive(props.item);
    return { itemData };
  },
};
</script>

<style lang="scss" scoped></style>
