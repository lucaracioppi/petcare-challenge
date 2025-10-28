<template>
  <v-app-bar app color="secondary" flat height="96" class="pl-6 pr-6">
    <!-- Search -->
    <v-text-field
      v-model="search"
      variant="outlined"
      density="comfortable"
      placeholder="Search..."
      prepend-inner-icon="mdi-magnify"
      hide-details
      class="w-25"
    />

    <v-spacer />

    <!-- Icons -->
    <div class="d-flex ga-3 ga-md-6">
      <v-icon size="24" color="textPrimary" class="opacity-70 cursor-pointer"
        >mdi-help-rhombus-outline</v-icon
      >
      <v-icon size="24" color="textPrimary" class="opacity-70 cursor-pointer"
        >mdi-bell-outline</v-icon
      >
    </div>

    <!-- Add Widget -->
    <v-btn
      color="primary"
      variant="flat"
      class="d-none d-md-flex ml-6 text-none"
      rounded="lg"
    >
      Add widget
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";

const search = ref<string>("");
</script>
