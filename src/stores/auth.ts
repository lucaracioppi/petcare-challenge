import { defineStore } from "pinia";
import { ref, computed } from "vue";

type StoredUser = { email: string; password: string };
type AuthUser = { email: string } | null;

export const useAuthStore = defineStore("auth", () => {
  const users = ref<StoredUser[]>([
    { email: "user@test.com", password: "12345678" },
  ]);
  const user = ref<AuthUser>(null);

  const isAuthenticated = computed(() => user.value !== null);

  const login = (email: string, password: string) => {
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
    const exists = users.value.some((u) => u.email === email);
    if (!exists) {
      users.value.push({ email, password });
      return true;
    }
    return false;
  };

  const recoverPassword = (email: string, newPassword: string) => {
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
