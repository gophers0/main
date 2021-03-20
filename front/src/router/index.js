import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Main,
    meta: { requiresAuth: false },
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.user) {
    //     next({
    //       path: "/profile",
    //     });
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile-page" */ "../views/Profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(async (to, from, next) => {
  let user = store.getters.user;
  const token = localStorage.token;
  if (!user && token) {
    user = await store.dispatch("fetchUser", token);
  }
  const loggedIn = !!user;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next();
      // next({
      //   path: "/",
      //   // query: { redirect: to.fullPath },
      // });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
