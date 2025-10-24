export interface StoredUser {
  email: string;
  password: string;
}

export type AuthUser = { email: string } | null;
