<template>
  <v-card class="pa-6 border" elevation="0" rounded="lg">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <span class="text-body-1 text-textPrimary text-uppercase opacity-70">
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
        :disabled="periods.length === 0"
      />
    </div>

    <!-- Stats -->
    <v-sheet
      color="secondary"
      rounded="lg"
      class="metrics-grid mb-6 pa-2 border"
    >
      <v-btn
        v-for="metric in metrics"
        :key="metric.key"
        :variant="activeMetric === metric.key ? 'flat' : 'text'"
        :color="
          activeMetric === metric.key ? 'primary' : 'textPrimary opacity-70'
        "
        rounded="lg"
        height="48"
        @click="activeMetric = metric.key"
        :prepend-icon="metric.icon"
        class="text-none"
      >
        {{ metric.label }}
      </v-btn>
      <span v-if="metrics.length === 0" class="opacity-50"
        >No metrics available</span
      >
    </v-sheet>

    <v-sheet color="secondary" class="rounded-lg">
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
            v-if="values.length > 0"
            :model-value="values"
            color="primary"
            height="120"
            padding="10"
            line-width="2"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            class="mt-4"
            :smooth="false"
          />
          <div v-else class="text-center opacity-50 mt-2">
            No data to display
          </div>

          <!-- X axis -->
          <div class="d-flex justify-space-between mt-1 px-1">
            <span
              v-for="(month, index) in months"
              :key="index"
              class="text-textPrimary opacity-70"
            >
              {{ month }}
            </span>
            <span v-if="months.length === 0" class="opacity-50">No labels</span>
          </div>
        </div>
      </div>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type {
  Period,
  Metric,
  MetricsValues,
  PeriodLabels,
} from "@/interfaces/healthMonitoring";
import {
  periods as periodsData,
  metrics as metricsData,
  metricsValues as metricsValuesData,
  periodLabels as periodLabelsData,
  exampleValues as exampleValuesData,
} from "@/utils/healthMonitoringData";

const periods: Period[] = periodsData ?? [];
const metrics: Metric[] = metricsData ?? [];
const metricsValues: MetricsValues = metricsValuesData ?? {};
const periodLabels: PeriodLabels = periodLabelsData ?? {};
const exampleValues: number[] = exampleValuesData ?? [];

const period = ref<Period>(periods[0] ?? "Weekly");
const activeMetric = ref<string>(metrics[0]?.key ?? "");

const values = ref<number[]>(
  metricsValues[activeMetric.value]?.[period.value] ?? []
);
const months = ref<string[]>(periodLabels[period.value] ?? []);

watch([activeMetric, period], () => {
  values.value = metricsValues[activeMetric.value]?.[period.value] ?? [];
  months.value = periodLabels[period.value] ?? [];
});
</script>

<style scoped>
.position-relative {
  position: relative;
  height: 100%;
}

.metrics-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 1600px) {
  .metrics-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1366px) and (max-width: 1599px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 960px) and (max-width: 1365px) {
  .metrics-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 768px) and (max-width: 959px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
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
