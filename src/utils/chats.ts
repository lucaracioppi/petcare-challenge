import type { Chat } from "@/interfaces/chat";

export const chatsData: Chat[] = [
  {
    name: "Helen Brooks",
    avatar: "/avatars/user1.jpeg",
    status: "online",
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
      "The best way to treat an ear infection is to visit your local vet clinic and get a prescription for ear drops. The ear drops will help clear the infection and reduce the inflammation.",
    time: "Wed",
    unread: 2,
  },
  {
    name: "James Grey",
    avatar: "/avatars/user2.jpeg",
    status: "offline",
    message:
      "You should follow the instructions on the ear drops label, but usually you need to apply them twice a day for 7 to 10 days. You should clean her ears once a day, preferably before applying the ear drops.",
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
