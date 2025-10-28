<template>
  <v-card
    class="w-100 d-flex flex-column align-center justify-center border"
    elevation="0"
    rounded="lg"
  >
    <!-- Header -->
    <div class="d-flex justify-space-between align-center w-100 ga-2 mb-6 mt-2">
      <span class="text-body-1 text-textPrimary text-uppercase opacity-70">
        {{ title || "Progress" }}
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
        :disabled="periodOptions.length === 0"
      />
    </div>

    <!-- Circular progress -->
    <div class="progress-wrapper d-flex align-center justify-center">
      <v-progress-circular
        :model-value="currentProgress"
        :width="15"
        :color="progressColor"
        class="progress-circle mb-2"
      />
      <div
        class="position-absolute text-h3 font-weight-medium text-textPrimary"
      >
        {{ currentProgress }}%
      </div>
    </div>

    <div v-if="periodOptions.length === 0" class="text-center opacity-50 mt-2">
      No data available
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ProgressProps, Period } from "@/interfaces/progress";

const props = defineProps<ProgressProps>();

const title = props.title || "Progress";

const periodOptions: Period[] = Object.keys(props.progress ?? {}) as Period[];
const selectedPeriod = ref<Period>(periodOptions[0] ?? ("Daily" as Period));

const currentProgress = computed<number>(
  () => props.progress?.[selectedPeriod.value] ?? 0
);

const progressColor = computed<string>(() => {
  if (currentProgress.value < 40) return "error";
  if (currentProgress.value < 75) return "warning";
  return "success";
});
</script>

<style scoped>
.v-card {
  width: 31.5%;
  padding: 1.5rem;
}

.progress-wrapper {
  width: 95%;
  aspect-ratio: 1 / 1;
  max-height: 14rem;
  position: relative;
}

.progress-circle {
  width: 100% !important;
  height: 100% !important;
}
</style>
