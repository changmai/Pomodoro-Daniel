
export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface Settings {
  durations: Record<TimerMode, number>;
  colors: {
    background: string;
    primary: string; 
  };
  longBreakInterval: number;
  scale: number;
}
