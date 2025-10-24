import type { NavigationGuard } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export const authMiddleware: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore();

  const isAuth = authStore?.isAuthenticated ?? false;
  const authPages = ["/login", "/register", "/recover-password"];
  const path = typeof to.path === "string" ? to.path : "/";

  // user NOT authenticated - only allow auth pages
  if (!isAuth && !authPages.includes(path) && path !== "/login") {
    return next("/login");
  }

  // user authenticated - block access to auth pages
  if (isAuth && authPages.includes(path) && path !== "/dashboard") {
    return next("/dashboard");
  }

  next();
};
