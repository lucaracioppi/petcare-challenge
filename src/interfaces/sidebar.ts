export interface SidebarItem {
  title: string;
  to: string;
  icon: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarMenu {
  menu: SidebarSection;
  analytics: SidebarSection;
  schedule: SidebarSection;
  help: SidebarSection;
}
