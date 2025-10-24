/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import { authMiddleware } from "@/middlewares/auth";

const routes = [
  { path: "/login", component: () => import("@/pages/auth/LoginForm.vue") },
  {
    path: "/register",
    component: () => import("@/pages/auth/RegisterForm.vue"),
  },
  {
    path: "/recover-password",
    component: () => import("@/pages/auth/RecoverPasswordForm.vue"),
  },
  { path: "/dashboard", component: () => import("@/pages/DashboardPage.vue") },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (localStorage.getItem("vuetify:dynamic-reload")) {
      console.error("Dynamic import error, reloading page did not fix it", err);
    } else {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    }
  } else {
    console.error(err);
  }
});

router.beforeEach(authMiddleware);

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
