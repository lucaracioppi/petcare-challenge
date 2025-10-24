<template>
  <TheSidebar />
  <TheNavbar />

  <!-- Main content: el scroll principal se gestiona aquí -->
  <v-main class="bg-accent">
    <v-container fluid class="pa-6">
      <slot />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import TheSidebar from "@/components/TheSidebar.vue";
import TheNavbar from "@/components/TheNavbar.vue";
</script>
