import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "main",
    path: "/",
    component: () => import("./pages/MainPage"),
    props: true,
  },
  {
    name: "handle-code",
    path: "/handle-code",
    component: () => import("./pages/HandleCodePage"),
    props: route => ({
        code: route.query.code
    }),
  },
];

export default new VueRouter({
  routes,
  mode: "history",
});
