export type Period = "Daily" | "Weekly" | "Monthly";

export interface Metric {
  key: string;
  label: string;
  icon: string;
}

export interface MetricsValues {
  [metricKey: string]: {
    [period in Period]?: number[];
  };
}

export type PeriodLabels = {
  [period in Period]: string[];
};

export type ExampleValues = number[];
