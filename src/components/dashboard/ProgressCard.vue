<template>
  <v-card
    class="pa-4 d-flex w-100 flex-column align-center justify-center border"
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
        :model-value="currentProgress"
        :size="200"
        :width="15"
        :color="progressColor"
        class="mb-2"
      />
      <div class="position-absolute text-h3 font-weight-bold text-textPrimary">
        {{ currentProgress }}%
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  title: string;
  progress: Record<string, number>;
}

const props = defineProps<Props>();

const periodOptions = Object.keys(props.progress);
const selectedPeriod = ref<string>(periodOptions[0] || "");

const currentProgress = computed(
  () => props.progress[selectedPeriod.value] ?? 0
);

const progressColor = computed(() => {
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
