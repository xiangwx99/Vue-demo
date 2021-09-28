<template>
  <div id="nav">
    <div class="nav-left">
      <router-link to="/multistage-list">多级列表</router-link>
    </div>
    <div class="nav-content">
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
@import "./assets/css/base.css";
#nav {
  display: flex;
  justify-content: space-between;
}
.nav-left {
  width: 150px;
  height: 100vh;
  border-right: 1px solid #ececee;
  padding-left: 16px;
  line-height: 36px;
}
.nav-content {
  width: calc(100% - 150px);
  height: 100vh;
}
.router-link-active {
  color: skyblue;
}
</style>
