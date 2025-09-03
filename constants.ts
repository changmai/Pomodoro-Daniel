
import type { Settings, TimerMode } from './types';

export const DEFAULT_SETTINGS: Settings = {
  durations: {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  },
  colors: {
    background: '#FDF0E9',
    primary: '#E85B5B',
  },
  longBreakInterval: 4,
  scale: 1,
};

export const MODES: { id: TimerMode; label: string }[] = [
  { id: 'shortBreak', label: 'Short Break' },
  { id: 'focus', label: 'Focus' },
  { id: 'longBreak', label: 'Long Break' },
];
