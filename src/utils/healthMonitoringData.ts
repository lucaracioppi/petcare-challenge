export const periods = ["Daily", "Weekly", "Monthly"];

export const metrics = [
  { key: "stress", label: "Stress level", icon: "mdi-heart-flash" },
  { key: "pulse", label: "Pulse", icon: "mdi-pulse" },
  { key: "temperature", label: "Temperature", icon: "mdi-thermometer" },
  { key: "calories", label: "Calories burned", icon: "mdi-fire" },
];

export const metricsValues: Record<string, Record<string, number[]>> = {
  stress: {
    Daily: [2, 5, 3, 6, 4, 7, 5, 6, 3, 4],
    Weekly: [3, 7, 4, 9, 6, 10, 5, 8, 2, 7],
    Monthly: [4, 8, 6, 10, 7, 9, 6, 8, 5, 9],
  },
  pulse: {
    Daily: [60, 65, 63, 62, 64, 66, 65, 63, 64, 62],
    Weekly: [65, 70, 72, 68, 75, 73, 69, 71, 74, 70],
    Monthly: [68, 72, 70, 74, 71, 73, 72, 70, 75, 69],
  },
  temperature: {
    Daily: [36, 36.2, 36.1, 36.3, 36.4, 36.2, 36.1, 36.5, 36.3, 36.2],
    Weekly: [36, 36.5, 37, 36.8, 37.2, 36.9, 36.7, 37, 36.6, 36.8],
    Monthly: [36.2, 36.7, 36.8, 37, 36.9, 36.8, 37, 36.6, 36.7, 36.9],
  },
  calories: {
    Daily: [200, 300, 250, 400, 350, 450, 300, 400, 250, 350],
    Weekly: [200, 450, 300, 500, 400, 600, 350, 450, 300, 500],
    Monthly: [300, 500, 400, 600, 500, 700, 450, 600, 400, 550],
  },
};

export const periodLabels: Record<string, string[]> = {
  Daily: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  Weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
  Monthly: ["October", "November", "December", "January"],
};

export const exampleValues = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
