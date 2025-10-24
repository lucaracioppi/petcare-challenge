<template>
  <v-card class="pa-4 w-100 rounded-lg" elevation="1">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-4">
      <span
        class="text-subtitle-2 font-weight-medium text-uppercase opacity-70"
      >
        Chat
      </span>
    </div>

    <!-- Chats -->
    <div class="chat-list">
      <v-row
        v-for="(chat, index) in chats"
        :key="index"
        class="align-center chat-row"
        style="cursor: pointer"
        @click="openChatOverlay(chat)"
      >
        <v-col cols="1">
          <span v-if="chat.status" :class="['status-dot', chat.status]"></span>
          <img :src="chat.avatar" alt="avatar" class="avatar-img" />
        </v-col>

        <v-col cols="10 text-textPrimary">
          <p>{{ chat.name }}</p>
          <v-card-subtitle class="pa-0 opacity-70">
            {{ chat.message.slice(0, 50)
            }}{{ chat.message.length > 50 ? "..." : "" }}
          </v-card-subtitle>
        </v-col>

        <v-col cols="1" class="pa-0">
          <span class="text-textPrimary opacity-70" style="font-size: 14px">{{
            chat.time
          }}</span>
          <div v-if="chat.unread" class="bg-error unread-badge">
            {{ chat.unread }}
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Overlay - Complete message -->
    <v-dialog v-model="overlay" max-width="400">
      <v-card>
        <v-card-title class="d-flex align-center mt-4">
          <img :src="selectedChat?.avatar" class="avatar-img me-2" />
          <span>{{ selectedChat?.name }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ selectedChat?.message }}</p>
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
import { chatsData } from "@/utils/chats";

const chats = ref(chatsData);
const selectedChat = ref<any>(null);
const overlay = ref(false);

const openChatOverlay = (chat: any) => {
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
  border: 2px solid white;
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
  border-radius: 50%;
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
