export interface Vaccine {
  name: string;
  type: "Overdue" | "Noncore" | "Core";
  date: string;
  vet: string;
}

export type Vet = string;
