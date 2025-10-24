<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    width="260"
    color="secondary"
    class="d-flex flex-column"
    :class="rail ? 'pa-1' : 'pa-4'"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <!-- Contenedor principal -->
    <div class="flex-grow-1">
      <!-- Logo -->
      <div class="d-flex align-center justify-space-between">
        <div v-if="!rail" class="d-flex align-center mt-4 ml-4">
          <img src="/logo-petcare.png" alt="PetCare Logo" height="24" />
        </div>
        <v-btn
          :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          variant="text"
          class="mt-4"
          @click.stop="rail = !rail"
        ></v-btn>
      </div>

      <!-- Menú principal -->
      <v-list v-if="!rail" nav density="comfortable" class="mt-10">
        <template v-for="(section, key) in menu" :key="key">
          <v-list-subheader class="sidebar-title">
            {{ section.title }}
          </v-list-subheader>

          <v-list-item
            v-for="item in section.items"
            :key="item.title"
            :to="item.to"
            :ripple="true"
            clickable
            class="sidebar-item d-flex align-center justify-space-between"
            :class="{ 'bg-primary': isActive(item.to) }"
          >
            <div class="d-flex align-center">
              <v-icon
                :color="
                  isActive(item.to) ? 'secondary' : 'textPrimary opacity-70'
                "
                size="20"
                class="mr-3"
              >
                {{ item.icon }}
              </v-icon>
              <v-list-item-title
                :class="
                  isActive(item.to)
                    ? 'text-secondary'
                    : 'text-textPrimary opacity-70'
                "
              >
                {{ item.title }}
              </v-list-item-title>
            </div>

            <!-- Extra contenido segun item -->
            <template v-slot:append>
              <div v-if="item.to === '/appointments'" class="position-relative">
                <v-badge
                  color="error"
                  content="2"
                  inline
                  bordered
                  class="mr-2"
                ></v-badge>
              </div>

              <div
                v-else-if="item.to === '/chat'"
                class="d-flex align-center justify-end user-avatars"
              >
                <img
                  v-for="(src, index) in chatUsers"
                  :key="index"
                  :src="src"
                  alt="User"
                  class="chat-avatar"
                  :style="{ left: `${index * 14}px` }"
                />
              </div>
            </template>
          </v-list-item>

          <v-divider class="my-4" />
        </template>
      </v-list>
    </div>

    <!-- Logout -->
    <template v-slot:append>
      <v-btn
        v-if="!rail"
        block
        variant="text"
        color="error"
        class="text-none mb-4"
        spaced="end"
        @click="handleLogout"
      >
        <v-icon start>mdi-logout</v-icon>
        Log out
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

const drawer = ref(true);
const rail = ref(false);
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

const isActive = (path: string) => route.path === path;

// Avatares del chat (pueden ser locales o URLs)
const chatUsers = [
  "/avatars/user1.jpeg",
  "/avatars/user2.jpeg",
  "/avatars/user3.jpeg",
];

// Estructura de menú
const menu = {
  menu: {
    title: "Menu",
    items: [
      {
        title: "Dashboard",
        to: "/dashboard",
        icon: "mdi-view-dashboard-outline",
      },
      {
        title: "Pet Profile",
        to: "/pets",
        icon: "mdi-paw-outline",
      },
    ],
  },
  analytics: {
    title: "Analytics",
    items: [
      {
        title: "Health Monitoring",
        to: "/health",
        icon: "mdi-heart-box-outline",
      },
      {
        title: "Vaccination Schedule",
        to: "/vaccines",
        icon: "mdi-needle",
      },
    ],
  },
  schedule: {
    title: "Schedule",
    items: [
      { title: "Chat", to: "/chat", icon: "mdi-message-text-outline" },
      {
        title: "Appointments",
        to: "/appointments",
        icon: "mdi-calendar-month-outline",
      },
    ],
  },
  help: {
    title: "Help",
    items: [
      { title: "Settings", to: "/settings", icon: "mdi-cog-outline" },
      {
        title: "Documentation",
        to: "/docs",
        icon: "mdi-file-document-outline",
      },
    ],
  },
};
</script>

<style scoped>
.sidebar-title {
  font-size: 12px;
  color: var(--v-theme-textPrimary);
  opacity: 0.7;
  text-transform: uppercase;
}

.sidebar-item {
  border-radius: 8px;
  position: relative;
}

/* Avatares superpuestos */
.user-avatars {
  position: relative;
  width: 60px;
  height: 24px;
}

.chat-avatar {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid var(--v-theme-secondary);
  position: absolute;
  transition: transform 0.2s ease;
  object-fit: cover;
}

.chat-avatar:hover {
  transform: scale(1.1);
  z-index: 5;
}
</style>
