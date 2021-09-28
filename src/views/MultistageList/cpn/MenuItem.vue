<template>
  <li class="menu-item">
    <slot />
  </li>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  line-height: 32px;
  padding-left: 12px;
}
</style>
