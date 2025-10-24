import { useAuthStore } from "@/stores/auth";

export function authMiddleware(to: any, from: any, next: any) {
  const authStore = useAuthStore();

  const isAuth = authStore.isAuthenticated;
  const authPages = ["/login", "/register", "/recover-password"];

  // Si el usuario NO está autenticado
  if (!isAuth && !authPages.includes(to.path)) {
    // Solo puede acceder a las páginas de login/register/recover
    return next("/login");
  }

  // Si el usuario está autenticado y trata de ir a una página pública
  if (isAuth && authPages.includes(to.path)) {
    return next("/dashboard");
  }

  // Caso normal
  next();
}
