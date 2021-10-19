import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/multistage-list",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/MultistageList/index.vue"
      ),
  },
  {
    path: "/element-spacing",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/ElementSpacing/index.vue"
      ),
  },
  {
    path: "/virtual-list",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VirtualList/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
