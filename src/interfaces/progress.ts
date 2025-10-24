export interface ProgressProps {
  title: string;
  progress: Record<string, number>;
  size?: number;
  width?: number;
}

export type Period = string;
