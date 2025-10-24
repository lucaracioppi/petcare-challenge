<template>
  <DefaultLayout>
    <v-row>
      <v-col cols="12" lg="7">
        <div class="d-md-flex ga-2 ga-xl-6 justify-space-between">
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
      </v-col>
      <v-col cols="12" lg="5">
        <VaccinationSchedule />
        <div class="mt-6">
          <ChatCard />
        </div>
      </v-col>
    </v-row>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ProgressCard from "@/components/dashboard/ProgressCard.vue";
import VaccinationSchedule from "@/components/dashboard/VaccinationSchedule.vue";
import HealthMonitoring from "@/components/dashboard/HealthMonitoring.vue";
import ChatCard from "@/components/dashboard/ChatCard.vue";
</script>
