import { useAuthStore } from "@/stores/auth";

export function authMiddleware(to: any, from: any, next: any) {
  const authStore = useAuthStore();

  const isAuth = authStore.isAuthenticated;
  const authPages = ["/login", "/register", "/recover-password"];

  // user NOT authenticated - only allow auth pages
  if (!isAuth && !authPages.includes(to.path)) {
    return next("/login");
  }

  // user authenticated - not access auth pages
  if (isAuth && authPages.includes(to.path)) {
    return next("/dashboard");
  }

  next();
}
