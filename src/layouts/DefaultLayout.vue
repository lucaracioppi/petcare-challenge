<template>
  <v-app>
    <TheSidebar />
    <TheNavbar />

    <!-- Main content -->
    <v-main class="bg-accent">
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TheSidebar from "@/components/TheSidebar.vue";
import TheNavbar from "@/components/TheNavbar.vue";
</script>
