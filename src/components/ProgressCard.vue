<template>
  <v-card
    class="w-100 pa-4 d-flex flex-column align-center justify-center border"
    elevation="0"
    rounded="lg"
  >
    <!-- Header -->
    <div class="d-flex justify-space-between align-center w-100 mb-4">
      <span class="text-subtitle-2 text-textPrimary text-uppercase opacity-70">
        {{ title }}
      </span>

      <v-select
        v-model="selectedPeriod"
        :items="periodOptions"
        density="compact"
        color="textPrimary"
        hide-details
        variant="outlined"
        class="w-auto"
        style="max-width: 120px"
      />
    </div>

    <!-- Circular progress -->
    <div class="position-relative d-flex align-center justify-center mt-2">
      <v-progress-circular
        :model-value="progress"
        :size="200"
        :width="15"
        :color="progressColor"
        class="mb-2"
      />
      <div class="position-absolute text-h3 font-weight-bold text-textPrimary">
        {{ progress }}%
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  progress: number;
  title: string;
}

const props = defineProps<Props>();

// Select de periodo
const periodOptions = ["Daily", "Weekly", "Monthly"];
const selectedPeriod = ref("Daily");

// Color dinámico según progreso
const progressColor = computed(() => {
  if (props.progress < 40) return "error"; // rojo
  if (props.progress < 75) return "warning"; // amarillo
  return "success"; // verde
});
</script>

<style scoped>
.v-card {
  border-radius: 16px;
  min-width: 220px;
  background-color: #f9fbfd;
}

.v-progress-circular {
  background-color: #eef2f6;
  border-radius: 50%;
}
</style>
