<template>
  <DefaultLayout>
    <v-row>
      <v-col cols="12" lg="7">
        <div class="d-md-flex ga-2 ga-xl-6 justify-space-between">
          <ProgressCard title="Activity" :progress="25" />
          <ProgressCard title="Sleep" :progress="79" class="mt-6 mt-md-0" />
          <ProgressCard title="Welness" :progress="52" class="mt-6 mt-md-0" />
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
import ProgressCard from "@/components/ProgressCard.vue";
import VaccinationSchedule from "@/components/VaccinationSchedule.vue";
import HealthMonitoring from "@/components/HealthMonitoring.vue";
import ChatCard from "@/components/ChatCard.vue";
</script>
