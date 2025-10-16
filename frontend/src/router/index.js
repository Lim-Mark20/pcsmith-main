import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Builds from "../views/Builds.vue"; // We'll create this next
import AdminParts from "../views/AdminParts.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/builds",
    name: "Builds",
    component: Builds,
  },
  {
    path: "/compare",
    name: "Compare",
    component: () => import("../views/Comparison.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminParts,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
