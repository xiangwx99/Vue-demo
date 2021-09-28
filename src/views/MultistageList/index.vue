<template>
  <div>
    <Menu :listData="listData"></Menu>
  </div>
</template>

<script>
import Menu from "./cpn/Menu.vue";
import { reactive } from "vue";
export default {
  components: {
    Menu,
  },
  setup() {
    const listData = reactive([
      {
        name: "食物",
        path: "食物",
        children: [
          {
            name: "蔬菜",
            path: "蔬菜",
          },
          {
            name: "水果",
            path: "水果",
            children: [
              {
                name: "香蕉",
                path: "香蕉",
                children: [
                  {
                    name: "香蕉 A",
                    path: "香蕉 A",
                  },
                  {
                    name: "香蕉 B",
                    path: "香蕉 B",
                  },
                ],
              },
              {
                name: "苹果",
                path: "苹果",
                children: [
                  {
                    name: "苹果 A",
                    path: "苹果 A",
                  },
                  {
                    name: "苹果 B",
                    path: "苹果 B",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "人类",
        path: "人类",
        children: [
          {
            name: "教师",
            path: "教师",
          },
        ],
      },
    ]);
    return { listData };
  },
};
</script>

<style lang="scss" scoped></style>
