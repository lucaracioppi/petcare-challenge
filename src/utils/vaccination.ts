import type { Vaccine, Vet } from "@/interfaces/vaccination";

export const vaccinesData: Vaccine[] = [
  { name: "Rabies", type: "Overdue", date: "01 Dec 2023", vet: "" },
  {
    name: "Bordetella",
    type: "Noncore",
    date: "11 Dec 2024",
    vet: "James Grey",
  },
  { name: "Distemper", type: "Core", date: "27 Jun 2024", vet: "Jim Brown" },
  {
    name: "Calicivirus",
    type: "Core",
    date: "16 Sep 2024",
    vet: "Helen Brooks",
  },
];

export const vets: Vet[] = ["Dr. Alice", "Dr. Bob", "Dr. Carol"];
