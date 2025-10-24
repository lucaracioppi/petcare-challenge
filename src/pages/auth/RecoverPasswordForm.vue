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
            placeholder="example@email.com"
            v-model="email"
            type="email"
            :rules="rulesEmail"
            class="mb-2"
            variant="outlined"
            required
          />

          <v-text-field
            label="New Password"
            placeholder="********"
            v-model="newPassword"
            type="password"
            :rules="rulesPassword"
            class="mb-2"
            variant="outlined"
            required
          />

          <v-text-field
            label="Confirm Password"
            placeholder="********"
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
            :disabled="!isFormValid"
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
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");

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

const isFormValid = computed(() => {
  const emailValid = rulesEmail.every((rule) => rule(email.value) === true);
  const newPasswordValid = rulesPassword.every(
    (rule) => rule(newPassword.value) === true
  );
  const confirmPasswordValid = rulesConfirmPassword.every(
    (rule) => rule(confirmPassword.value) === true
  );
  return emailValid && newPasswordValid && confirmPasswordValid;
});

const handleRecoverPassword = () => {
  // Validation
  if (!formRef.value || !formRef.value.validate()) return;

  const safeEmail = email.value.trim();
  const safeNewPassword = newPassword.value.trim();
  const safeConfirmPassword = confirmPassword.value.trim();

  if (!safeEmail || !safeNewPassword || !safeConfirmPassword) return;
  if (safeNewPassword !== safeConfirmPassword) return;

  const result =
    typeof authStore.recoverPassword === "function"
      ? authStore.recoverPassword(safeEmail, safeNewPassword)
      : false;

  if (result) {
    toast.trigger("Password updated successfully.", "success");
    router.push("/login").catch(() => {});
  } else {
    toast.trigger("User not found.", "error");
  }
};

const goToLogin = () => router.push("/login").catch(() => {});
</script>
