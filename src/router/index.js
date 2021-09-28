import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/multistage-list",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/MultistageList/index.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
