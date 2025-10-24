<template>
  <DefaultLayout>
    <v-row>
      <v-col cols="7">
        <div class="d-flex ga-6 justify-space-between">
          <ProgressCard title="Activity" :progress="25" />
          <ProgressCard title="Sleep" :progress="79" />
          <ProgressCard title="Welness" :progress="52" />
        </div>
        <div class="mt-6">
          <HealthMonitoring />
        </div>
      </v-col>
      <v-col cols="5">
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
