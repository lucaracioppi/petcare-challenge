import type { SidebarMenu } from "@/interfaces/sidebar";

export const sidebarMenu: SidebarMenu = {
  menu: {
    title: "Menu",
    items: [
      {
        title: "Dashboard",
        to: "/dashboard",
        icon: "mdi-view-dashboard-outline",
      },
      { title: "Pet Profile", to: "/pets", icon: "mdi-paw-outline" },
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
      { title: "Vaccination Schedule", to: "/vaccines", icon: "mdi-needle" },
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
