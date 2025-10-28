<template>
  <v-card class="pa-6 w-100 rounded-lg" elevation="1">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <span class="text-body-1 font-weight-medium text-uppercase opacity-70">
        Chat
      </span>
    </div>

    <!-- Chats -->
    <div>
      <v-row
        v-for="(chat, index) in chats"
        :key="index"
        class="align-center chat-row"
        @click="openChatOverlay(chat)"
      >
        <v-col
          cols="2"
          md="1"
          class="d-flex justify-center pa-0 position-relative"
        >
          <div>
            <span
              v-if="chat?.status"
              :class="['status-dot', chat.status]"
            ></span>
            <img
              :src="chat?.avatar || '/avatars/placeholder-avatar.png'"
              alt="avatar"
              class="avatar-img"
            />
          </div>
        </v-col>

        <v-col cols="10" class="text-textPrimary">
          <p>{{ chat?.name || "Unknown" }}</p>
          <v-card-subtitle class="pa-0 opacity-70">
            {{ chat?.message || "" }}
          </v-card-subtitle>
        </v-col>

        <v-col
          cols="0"
          md="1"
          class="pa-0 d-none d-md-flex flex-column align-end"
        >
          <span class="text-textPrimary opacity-70" style="font-size: 14px">
            {{ chat?.time || "--:--" }}
          </span>
          <div v-if="chat?.unread" class="bg-error unread-badge">
            {{ chat.unread }}
          </div>
        </v-col>
      </v-row>

      <!-- fallback if no chats -->
      <v-row v-if="!chats || chats.length === 0" class="justify-center">
        <v-col cols="12" class="text-center opacity-50">
          No chats available
        </v-col>
      </v-row>
    </div>

    <!-- Overlay - Complete message -->
    <v-dialog v-model="overlay" max-width="400">
      <v-card v-if="selectedChat">
        <v-card-title class="d-flex align-center mt-4">
          <img
            :src="selectedChat?.avatar || '/avatars/placeholder-avatar.png'"
            class="avatar-img me-2"
          />
          <span>{{ selectedChat?.name || "Unknown" }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ selectedChat?.message || "" }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="overlay = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Chat } from "@/interfaces/chat";
import { chatsData } from "@/utils/chats";

const chats = ref<Chat[]>(Array.isArray(chatsData) ? chatsData : []);
const selectedChat = ref<Chat | null>(null);
const overlay = ref(false);

const openChatOverlay = (chat: Chat | null) => {
  if (!chat) return;
  selectedChat.value = chat;
  overlay.value = true;
};
</script>

<style scoped>
.status-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid white;
}

.status-dot.online {
  background-color: #4caf50;
}
.status-dot.away {
  background-color: #ff9800;
}
.status-dot.offline {
  background-color: #f44336;
}

.chat-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.chat-row:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 20%;
  object-fit: cover;
}

.unread-badge {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  margin-left: 8px;
}
</style>
