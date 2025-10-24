<template>
  <AuthLayout>
    <template #default>
      <v-card-title class="text-textPrimary mb-2"
        >Recover Password</v-card-title
      >
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
            label="New Password"
            v-model="newPassword"
            type="password"
            :rules="rulesPassword"
            class="mb-2"
            variant="outlined"
            required
          />
          <v-text-field
            label="Confirm Password"
            v-model="confirmPassword"
            type="password"
            :rules="rulesConfirmPassword"
            variant="outlined"
            required
          />

          <v-btn
            @click="handleRecoverPassword"
            type="button"
            color="primary"
            class="mt-4"
            elevation="0"
            block
          >
            Recover Password
          </v-btn>
        </v-form>

        <v-divider class="mt-6 mb-2" />

        <p class="text-body-2 text-textPrimary">
          Remembered your password?
          <v-btn
            text
            elevation="0"
            color="primary"
            class="text-capitalize px-2"
            variant="text"
            @click="goToLogin"
          >
            Back to Login
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
const newPassword = ref("");
const confirmPassword = ref("");

const formRef = ref<InstanceType<typeof VForm>>();

const rulesEmail = [
  (v: string) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "Invalid email",
];

const rulesPassword = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 4 || "Password must be at least 4 characters",
];

const rulesConfirmPassword = [
  (v: string) => !!v || "Confirm password is required",
  (v: string) => v === newPassword.value || "Passwords must match",
];

const handleRecoverPassword = () => {
  if (!formRef.value?.validate()) return;

  if (authStore.recoverPassword(email.value, newPassword.value)) {
    alert("Password updated successfully.");
    router.push("/login");
  } else {
    alert("User not found.");
  }
};

const goToLogin = () => router.push("/login");
</script>
