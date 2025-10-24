<template>
  <v-card class="pa-4 border" elevation="0" rounded="lg">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-4">
      <span class="text-subtitle-2 text-textPrimary text-uppercase opacity-70">
        Health Monitoring
      </span>

      <v-select
        v-model="period"
        :items="periods"
        density="compact"
        hide-details
        variant="outlined"
        class="w-auto"
        style="max-width: 120px"
      />
    </div>

    <!-- Stats -->
    <v-sheet
      color="secondary"
      rounded="lg"
      class="d-flex flex-wrap ga-4 mb-6 pa-2 border"
    >
      <v-btn
        v-for="metric in metrics"
        :key="metric.key"
        :variant="activeMetric === metric.key ? 'flat' : 'text'"
        :color="
          activeMetric === metric.key ? 'primary' : 'textPrimary opacity-70'
        "
        rounded="lg"
        @click="activeMetric = metric.key"
        :prepend-icon="metric.icon"
        class="flex-grow-1 text-none"
      >
        {{ metric.label }}
      </v-btn>
    </v-sheet>

    <v-sheet color="secondary" class="pa-4 rounded-lg">
      <div class="d-flex">
        <!-- Y axis -->
        <div class="d-none d-md-flex flex-column justify-space-between mr-2">
          <span
            v-for="(val, index) in exampleValues"
            :key="index"
            class="text-textPrimary opacity-70"
          >
            {{ val }}
          </span>
        </div>

        <div class="flex-grow-1 position-relative">
          <div class="sparkline-grid">
            <div
              v-for="(val, index) in exampleValues"
              :key="index"
              class="sparkline-grid-line"
              :style="{ top: `${(index / (exampleValues.length - 1)) * 100}%` }"
            ></div>
          </div>

          <v-sparkline
            :model-value="values"
            color="primary"
            height="120"
            padding="10"
            line-width="2"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            :smooth="false"
          />

          <!-- X axis -->
          <div class="d-flex justify-space-between mt-1 px-1">
            <span
              v-for="(month, index) in months"
              :key="index"
              class="text-textPrimary opacity-70"
            >
              {{ month }}
            </span>
          </div>
        </div>
      </div>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  periods,
  metrics,
  metricsValues,
  periodLabels,
  exampleValues,
} from "@/utils/healthMonitoringData";

const period = ref("Weekly");
const activeMetric = ref("stress");

const values = ref<number[]>(
  metricsValues[activeMetric.value]?.[period.value] || []
);
const months = ref(periodLabels[period.value]);

watch([activeMetric, period], () => {
  values.value = metricsValues[activeMetric.value]?.[period.value] || [];
  months.value = periodLabels[period.value];
});
</script>

<style scoped>
.position-relative {
  position: relative;
  height: 100%;
}

.sparkline-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
}

.sparkline-grid-line {
  position: absolute;
  width: 100%;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  transform: translateY(-50%);
}
</style>
