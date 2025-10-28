<template>
  <v-card class="w-100 pa-6 border" elevation="0" rounded="lg">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <span class="text-body-1 text-textPrimary text-uppercase opacity-70">
        Vaccination Schedule
      </span>

      <div class="w-50 d-flex align-center ga-6">
        <v-text-field
          v-model="search"
          dense
          hide-details
          variant="plain"
          elevation="0"
          clearable
          density="compact"
          append-inner-icon="mdi-magnify"
          class="w-25"
        />

        <v-select
          v-model="order"
          :items="selects"
          density="compact"
          hide-details
          variant="outlined"
          class="w-25"
          :disabled="!(selects && selects.length)"
        />
      </div>
    </div>

    <!-- Table -->
    <v-table class="rounded-lg border">
      <thead class="bg-accent text-textPrimary opacity-70">
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Type</th>
          <th class="text-left">Date</th>
          <th class="text-right">Veterinary</th>
        </tr>
      </thead>
      <tbody class="text-textPrimary">
        <tr v-if="filteredVaccines.length === 0">
          <td colspan="4" class="text-center opacity-50">No vaccines found</td>
        </tr>

        <tr v-for="(vaccine, index) in filteredVaccines" :key="index">
          <td>{{ vaccine.name ?? "Unknown" }}</td>
          <td>
            <v-btn
              :color="getTypeColor(vaccine.type ?? '')"
              rounded="lg"
              variant="outlined"
              size="small"
              class="w-75"
              :class="`btn-${(vaccine.type ?? '').toLowerCase()}`"
            >
              {{ vaccine.type ?? "Unknown" }}
            </v-btn>
          </td>
          <td>{{ vaccine.date ?? "-" }}</td>
          <td class="text-right">
            <v-btn
              :color="!vaccine.vet ? 'primary' : 'textPrimary'"
              :variant="!vaccine.vet ? 'flat' : 'outlined'"
              rounded="lg"
              class="text-none w-75"
              :class="{ 'outlined-opacity': vaccine.vet }"
              @click="openVetDialog(vaccine)"
            >
              {{ vaccine.vet || "Find veterinary" }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Modal - select veterinary -->
    <v-dialog v-model="vetDialog" max-width="400">
      <v-card>
        <v-card-title class="text-primary">Select Veterinary</v-card-title>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="vet in vets" :key="vet" @click="selectVet(vet)">
            <v-list-item-title>{{ vet }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="text-textPrimary"
            variant="outlined"
            class="opacity-70"
            @click="vetDialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { vaccinesData, vets as vetsData } from "@/utils/vaccination";
import type { Vaccine, Vet } from "@/interfaces/vaccination";

const search = ref<string>("");

const selects = ["By type", "By date"] as const;
type OrderType = (typeof selects)[number];
const order = ref<OrderType>(selects[0]);

const vaccines = ref<Vaccine[]>([...(vaccinesData ?? [])]);

const vetDialog = ref(false);
const selectedVaccine = ref<Vaccine | null>(null);
const vets: Vet[] = vetsData ?? [];

const filteredVaccines = computed<Vaccine[]>(() => {
  let filtered = vaccines.value ?? [];

  // Filter by search
  if (search.value) {
    filtered = filtered.filter((v: Vaccine) =>
      (v.name ?? "").toLowerCase().includes(search.value.toLowerCase())
    );
  }

  // Order by type or date
  if (order.value === "By type") {
    filtered = [...filtered].sort((a, b) =>
      (a.type ?? "").localeCompare(b.type ?? "")
    );
  } else if (order.value === "By date") {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime()
    );
  }

  return filtered;
});

const shuffleArray = <T>(array: T[]): T[] =>
  (array ?? [])
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

const getTypeColor = (type: Vaccine["type"] | string): string => {
  const colors: Record<string, string> = {
    Overdue: "error",
    Noncore: "warning",
    Core: "success",
  };
  return colors[type] ?? "grey";
};

const openVetDialog = (vaccine: Vaccine | null): void => {
  if (!vaccine) return;
  selectedVaccine.value = vaccine;
  vetDialog.value = true;
};

const selectVet = (vet: Vet): void => {
  if (selectedVaccine.value) {
    selectedVaccine.value.vet = vet;
  }
  vetDialog.value = false;
  selectedVaccine.value = null;
};

onMounted(() => {
  vaccines.value = shuffleArray(vaccines.value);
});
</script>

<style scoped>
.outlined-opacity {
  border-color: rgba(var(--v-theme-textPrimary), 0.5) !important;
}

.btn-overdue {
  background-color: rgba(var(--v-theme-error), 0.12);
}
.btn-noncore {
  background-color: rgba(var(--v-theme-warning), 0.12);
}
.btn-core {
  background-color: rgba(var(--v-theme-success), 0.12);
}
.btn-unknown {
  background-color: rgba(var(--v-theme-grey), 0.12);
}

:deep(.v-table) {
  thead tr {
    height: 70px;
  }
  tbody tr {
    height: 86px;
  }

  th,
  td {
    min-width: 6rem;
    white-space: nowrap;
  }
}
@media (max-width: 1599px) {
  :deep(.v-table) {
    thead tr {
      height: 56px !important;
    }
    tbody tr {
      height: 64px !important;
    }
  }
}
</style>
