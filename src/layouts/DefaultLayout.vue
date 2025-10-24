<template>
  <TheSidebar />
  <TheNavbar />

  <v-main class="bg-accent">
    <v-container fluid class="pa-6">
      <slot />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import TheSidebar from "@/components/layout/TheSidebar.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";
</script>
