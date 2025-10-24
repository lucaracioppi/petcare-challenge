<template>
  <AuthLayout>
    <template #default>
      <v-card-title class="text-textPrimary mb-2">Register</v-card-title>
      <v-card-text>
        <v-form ref="formRef">
          <v-text-field
            label="Email"
            placeholder="example@email.com"
            v-model="email"
            type="email"
            :rules="rulesEmail"
            class="mb-2"
            variant="outlined"
            required
          />

          <v-text-field
            label="Password"
            placeholder="********"
            v-model="password"
            type="password"
            :rules="rulesPassword"
            variant="outlined"
            required
          />

          <v-btn
            @click="handleRegister"
            type="button"
            color="primary"
            class="mt-4"
            elevation="0"
            block
            :disabled="!isFormValid"
          >
            Register
          </v-btn>
        </v-form>

        <v-divider class="mt-6 mb-2" />

        <p class="text-body-2 text-textPrimary">
          Already have an account?
          <v-btn
            text
            elevation="0"
            color="primary"
            class="text-capitalize px-2"
            variant="text"
            @click="goToLogin"
          >
            Login
          </v-btn>
        </p>
      </v-card-text>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useToastStore } from "@/stores/toastStore";
import { VForm } from "vuetify/components";
import AuthLayout from "@/layouts/AuthLayout.vue";

const router = useRouter();
const authStore = useAuthStore();
const toast = useToastStore();

const email = ref<string>("");
const password = ref<string>("");

const formRef = ref<InstanceType<typeof VForm>>();

const rulesEmail = [
  (v: string) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "Invalid email",
];
const rulesPassword = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 4 || "Password must be at least 4 characters",
];

const isFormValid = computed(() => {
  const emailValid = rulesEmail.every((rule) => rule(email.value) === true);
  const passwordValid = rulesPassword.every(
    (rule) => rule(password.value) === true
  );
  return emailValid && passwordValid;
});

const handleRegister = () => {
  // Validation
  if (!formRef.value || !formRef.value.validate()) return;

  const safeEmail = email.value.trim();
  const safePassword = password.value.trim();
  if (!safeEmail || !safePassword) return;

  try {
    const result =
      typeof authStore.register === "function"
        ? authStore.register(safeEmail, safePassword)
        : false;

    if (result) {
      toast.trigger("User registered successfully.", "success");
      router.push("/login").catch(() => {});
    } else {
      toast.trigger("User already exists or registration failed.", "error");
    }
  } catch (err: any) {
    alert(err.message || "User already exists or registration failed.");
  }
};

const goToLogin = () => router.push("/login").catch(() => {});
</script>
