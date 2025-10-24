<template>
  <v-app>
    <router-view />
    <v-snackbar v-model="toast.show" :color="toast.color" top right>
      {{ toast.message }}
      <template #actions>
        <v-btn text @click="toast.close">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import { useToastStore } from "@/stores/toastStore";

const toast = useToastStore();
</script>
