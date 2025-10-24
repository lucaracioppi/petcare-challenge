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

    <!-- Lista de mensajes -->
    <div class="chat-list">
      <v-row v-for="(chat, index) in chats" :key="index" class="align-center">
        <!-- Avatar -->
        <v-col cols="1">
          <span v-if="chat.status" :class="['status-dot', chat.status]"></span>
          <img :src="chat.avatar" alt="avatar" class="avatar-img" />
        </v-col>

        <!-- Contenido -->
        <v-col cols="10 text-textPrimary">
          <p>{{ chat.name }}</p>
          <v-card-subtitle class="pa-0 opacity-70">{{
            chat.message
          }}</v-card-subtitle>
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
  </v-card>
</template>

<script setup lang="ts">
const chats = [
  {
    name: "Helen Brooks",
    avatar: "/avatars/user1.jpeg",
    status: "online", // online, away, offline
    message:
      "Luna has been scratching her ears a lot lately and shaking her head. I checked her ears and they look red and inflamed. She also seems to be in pain when I touch them.",
    time: "15:56",
    unread: 0,
  },
  {
    name: "Kathryn Murphy",
    avatar: "/avatars/user3.jpeg",
    status: "online",
    message:
      "The best way to treat an ear infection is to visit your local vet clinic and get a prescription for ear drops. The ear drops will help clear the infection and reduce th",
    time: "Wed",
    unread: 2,
  },
  {
    name: "James Grey",
    avatar: "/avatars/user2.jpeg",
    status: "offline",
    message:
      "You should follow the instructions on the ear drops label, but usually you need to apply them twice a day for 7 to 10 days. You should clean her ears once a day, preferably before applying the ear drops",
    time: "Tue",
    unread: 0,
  },
  {
    name: "Jim Brown",
    avatar: "/avatars/user1.jpeg",
    status: "offline",
    message: "Hi, I have a question about my cat.",
    time: "Tue",
    unread: 0,
  },
];
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
