<template>
  <DefaultLayout>
    <div class="dashboard-grid w-100">
      <!-- Left column -->
      <div class="dashboard-left">
        <div class="d-md-flex ga-6 justify-space-between">
          <ProgressCard
            title="Activity"
            :progress="{ Daily: 25, Weekly: 50, Monthly: 75 }"
          />
          <ProgressCard
            title="Sleep"
            :progress="{ Daily: 60, Weekly: 79, Monthly: 42 }"
            class="mt-6 mt-md-0"
          />
          <ProgressCard
            title="Welness"
            :progress="{ Daily: 90, Weekly: 52, Monthly: 70 }"
            class="mt-6 mt-md-0"
          />
        </div>
        <div class="mt-6">
          <HealthMonitoring />
        </div>
      </div>

      <!-- Right column -->
      <div class="dashboard-right">
        <VaccinationSchedule />
        <div class="mt-6">
          <ChatCard />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ProgressCard from "@/components/dashboard/ProgressCard.vue";
import VaccinationSchedule from "@/components/dashboard/VaccinationSchedule.vue";
import HealthMonitoring from "@/components/dashboard/HealthMonitoring.vue";
import ChatCard from "@/components/dashboard/ChatCard.vue";
</script>

<style scoped>
.dashboard-grid {
  display: flex;
  gap: 24px; /* espacio entre columnas */
}

.dashboard-left {
  width: 56%;
  gap: 24px;
}
.dashboard-right {
  width: 43%;
  gap: 24px;
}

@media (max-width: 1365px) {
  .dashboard-grid {
    flex-direction: column;
  }

  .dashboard-left,
  .dashboard-right {
    width: 100%;
  }
}
</style>
