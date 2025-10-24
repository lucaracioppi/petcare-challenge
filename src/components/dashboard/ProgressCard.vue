<template>
  <v-card
    class="pa-4 d-flex w-100 flex-column align-center justify-center border"
    elevation="0"
    rounded="lg"
  >
    <!-- Header -->
    <div class="d-flex justify-space-between align-center w-100 mb-4">
      <span class="text-subtitle-2 text-textPrimary text-uppercase opacity-70">
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
    <div class="position-relative d-flex align-center justify-center mt-2">
      <v-progress-circular
        :model-value="currentProgress"
        :size="size"
        :width="width"
        :color="progressColor"
        class="mb-2"
      />
      <div class="position-absolute text-h3 font-weight-bold text-textPrimary">
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
const size = props.size ?? 200;
const width = props.width ?? 15;

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
  min-width: 180px;
}
</style>
