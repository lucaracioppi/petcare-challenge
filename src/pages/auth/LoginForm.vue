<template>
  <AuthLayout>
    <template #default>
      <v-card-title class="text-textPrimary mb-2">Login</v-card-title>
      <v-card-text>
        <v-form ref="formRef">
          <v-text-field
            label="Email"
            v-model="email"
            type="email"
            :rules="rulesEmail"
            class="mb-2"
            variant="outlined"
            required
          />
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            :rules="rulesPassword"
            variant="outlined"
            required
          />
          <p
            class="text-right text-body-2 text-textPrimary"
            style="margin-top: -1rem"
          >
            <v-btn
              text
              elevation="0"
              size="small"
              color="primary"
              class="text-capitalize px-2"
              variant="text"
              @click="goToRecoverPassword"
            >
              Forgot Password?
            </v-btn>
          </p>

          <v-btn
            @click="handleLogin"
            type="button"
            color="primary"
            class="mt-6"
            elevation="0"
            block
          >
            Login
          </v-btn>
        </v-form>

        <v-divider class="mt-6 mb-2" />

        <p class="text-body-2 text-textPrimary">
          Don't have an account?
          <v-btn
            text
            elevation="0"
            color="primary"
            class="text-capitalize px-2"
            variant="text"
            @click="goToRegister"
          >
            Register
          </v-btn>
        </p>
      </v-card-text>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { VForm } from "vuetify/components";
import AuthLayout from "@/layouts/AuthLayout.vue";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const formRef = ref<InstanceType<typeof VForm>>();

const rulesEmail = [
  (v: string) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "Invalid email",
];

const rulesPassword = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 4 || "Password must be at least 4 characters",
];

const handleLogin = () => {
  if (!formRef.value?.validate()) return;

  if (authStore.login(email.value, password.value)) {
    router.push("/dashboard");
  } else {
    alert("Invalid credentials or user not found.");
  }
};

const goToRegister = () => router.push("/register");
const goToRecoverPassword = () => router.push("/recover-password");
</script>
