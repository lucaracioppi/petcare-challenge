<template>
  <v-card class="w-100 pa-4 border" elevation="0" rounded="lg">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-4">
      <span class="text-subtitle-2 text-textPrimary text-uppercase opacity-70">
        Vaccination Schedule
      </span>

      <div class="d-flex align-center ga-6">
        <v-icon color="textPrimary" size="20" class="opacity-70"
          >mdi-magnify</v-icon
        >

        <v-select
          v-model="filter"
          :items="filters"
          density="compact"
          hide-details
          variant="outlined"
          class="w-auto"
          style="max-width: 120px"
        />
      </div>
    </div>

    <!-- Tabla -->
    <v-table class="rounded-lg border">
      <thead class="bg-accent text-textPrimary opacity-70" height="70">
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Type</th>
          <th class="text-left">Date</th>
          <th class="text-right">Veterinar</th>
        </tr>
      </thead>
      <tbody class="text-textPrimary">
        <tr
          v-for="(vaccine, index) in filteredVaccines"
          :key="index"
          height="80"
        >
          <td>{{ vaccine.name }}</td>
          <td>
            <v-btn
              :color="getTypeColor(vaccine.type)"
              variant="tonal"
              size="small"
              class="w-75"
            >
              {{ vaccine.type }}
            </v-btn>
          </td>
          <td>{{ vaccine.date }}</td>
          <td class="text-right">
            <v-btn
              :color="!vaccine.vet ? 'primary' : 'textPrimary opacity-70'"
              :variant="!vaccine.vet ? 'flat' : 'outlined'"
              class="text-none w-75"
            >
              {{ vaccine.vet || "Find veterinar" }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const search = ref("");
const filter = ref("By type");
const filters = ["By type", "By date"];

const vaccines = ref([
  { name: "Rabies", type: "Overdue", date: "01 Dec 2023", vet: "" },
  {
    name: "Bordetella",
    type: "Noncore",
    date: "11 Dec 2024",
    vet: "James Grey",
  },
  { name: "Distemper", type: "Core", date: "27 Jun 2024", vet: "Jim Brown" },
  {
    name: "Calicivirus",
    type: "Core",
    date: "16 Sep 2024",
    vet: "Helen Brooks",
  },
]);

const getTypeColor = (type: string) => {
  switch (type) {
    case "Overdue":
      return "error";
    case "Noncore":
      return "warning";
    case "Core":
      return "success";
    default:
      return "grey";
  }
};

const filteredVaccines = computed(() => {
  if (!search.value) return vaccines.value;
  return vaccines.value.filter((v) =>
    v.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<style scoped>
.v-table tbody tr {
  min-height: 500px !important; /* altura mínima de la fila */
}

.v-table thead tr {
  min-height: 60px; /* más alto para el header */
}
</style>
