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

    <!-- Métricas -->
    <v-sheet
      color="secondary"
      rounded="lg"
      class="d-flex ga-4 mb-6 pa-2 border"
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

    <!-- Gráfico -->
    <v-sheet color="secondary" class="pa-4 rounded-lg">
      <div class="d-flex">
        <!-- Eje Y (valores 1 a 10) -->
        <div class="d-flex flex-column justify-space-between mr-2">
          <span
            v-for="(val, index) in exampleValues"
            :key="index"
            class="text-textPrimary opacity-70"
          >
            {{ val }}
          </span>
        </div>

        <!-- Sparkline con líneas -->
        <div class="flex-grow-1 position-relative">
          <!-- Líneas horizontales -->
          <div class="sparkline-grid">
            <div
              v-for="(val, index) in exampleValues"
              :key="index"
              class="sparkline-grid-line"
              :style="{ top: `${(index / (exampleValues.length - 1)) * 100}%` }"
            ></div>
          </div>

          <!-- Gráfico -->
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

          <!-- Eje X -->
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
import { ref } from "vue";

const period = ref("Weekly");
const periods = ["Daily", "Weekly", "Monthly"];

const activeMetric = ref("stress");

const metrics = [
  { key: "stress", label: "Stress level", icon: "mdi-heart-flash" },
  { key: "pulse", label: "Pulse", icon: "mdi-pulse" },
  { key: "temperature", label: "Temperature", icon: "mdi-thermometer" },
  { key: "calories", label: "Calories burned", icon: "mdi-fire" },
];

// Datos simulados
const values = ref([3, 7, 4, 9, 6, 10, 5, 8, 2, 7]);
const exampleValues = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]; // invertidos para eje Y visual
const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
];
</script>

<style scoped>
.v-card {
  border-radius: 16px;
  background-color: #f9fbfd;
}

.position-relative {
  position: relative;
  height: 100%;
}

.sparkline-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%; /* flexible */
  pointer-events: none;
}

.sparkline-grid-line {
  position: absolute;
  width: 100%;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  transform: translateY(
    -50%
  ); /* para centrar la línea sobre la posición exacta */
}
</style>
