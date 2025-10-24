<template>
  <v-app-bar app color="secondary" flat height="72" class="pl-6 pr-6">
    <!-- Search -->
    <v-text-field
      v-model="search"
      variant="outlined"
      density="compact"
      placeholder="Search..."
      prepend-inner-icon="mdi-magnify"
      hide-details
      class="mr-4"
      style="max-width: 500px"
    />

    <v-spacer />

    <!-- Icons -->
    <div class="d-flex ga-6">
      <v-icon size="24" color="textPrimary" class="opacity-70 cursor-pointer"
        >mdi-help-rhombus-outline</v-icon
      >
      <v-icon size="24" color="textPrimary" class="opacity-70 cursor-pointer"
        >mdi-bell-outline</v-icon
      >
    </div>

    <!-- Add Widget -->
    <v-btn color="primary" variant="flat" class="ml-6 text-none" rounded="lg">
      Add widget
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";

const search = ref("");
</script>
