export type ChatStatus = "online" | "offline" | "away";

export interface Chat {
  name: string;
  avatar: string;
  status: ChatStatus;
  message: string;
  time: string;
  unread: number;
}
