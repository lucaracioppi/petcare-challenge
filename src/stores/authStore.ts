import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { StoredUser, AuthUser } from "@/interfaces/auth";

export const useAuthStore = defineStore("auth", () => {
  const users = ref<StoredUser[]>([
    { email: "user@test.com", password: "12345678" },
  ]);

  const user = ref<AuthUser>(
    JSON.parse(localStorage.getItem("auth_user") || "null")
  );

  const isAuthenticated = computed<boolean>(() => user.value !== null);

  const login = (email: string, password: string) => {
    if (!email || !password) return false;

    const foundUser = users.value.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      user.value = { email };
      return true;
    }
    return false;
  };

  const register = (email: string, password: string) => {
    if (!email || !password) return false;

    const exists = users.value.some((u) => u.email === email);
    if (!exists) {
      users.value.push({ email, password });
      return true;
    }
    return false;
  };

  const recoverPassword = (email: string, newPassword: string) => {
    if (!email || !newPassword) return false;

    const u = users.value.find((u) => u.email === email);
    if (u) {
      u.password = newPassword;
      return true;
    }
    return false;
  };

  const logout = () => {
    user.value = null;
  };

  // Automatic persistence in localStorage
  watch(user, (newUser) => {
    localStorage.setItem("auth_user", JSON.stringify(newUser || null));
  });

  return {
    user,
    users,
    isAuthenticated,
    login,
    register,
    recoverPassword,
    logout,
  };
});
