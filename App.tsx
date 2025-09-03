import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTimer } from './hooks/useTimer';
import type { Settings, TimerMode } from './types';
import { DEFAULT_SETTINGS, MODES } from './constants';
import { TimerDisplay } from './components/TimerDisplay';
import { ModeButton } from './components/ModeButton';
import { ControlButton } from './components/ControlButton';
import { SettingsModal } from './components/SettingsModal';

const GearIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ResetIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.13-5.22m2.09 3.99a9 9 0 01-5.22 14.13" />
  </svg>
);


function App() {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const savedSettings = localStorage.getItem('pomodoroSettings');
      return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
    } catch (error) {
      return DEFAULT_SETTINGS;
    }
  });

  const [mode, setMode] = useState<TimerMode>('focus');
  const [pomodorosToday, setPomodorosToday] = useState<number>(() => {
    try {
      const savedProgress = localStorage.getItem('pomodoroProgress');
      if (savedProgress) {
        const { date, count } = JSON.parse(savedProgress);
        const today = new Date().toDateString();
        return date === today ? count : 0;
      }
    } catch (error) {
       // ignore error
    }
    return 0;
  });
  
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleTimerComplete = useCallback(() => {
    document.title = "Time's up! - Pomodoro";
    if (mode === 'focus') {
      const newCount = pomodorosToday + 1;
      setPomodorosToday(newCount);
      const isLongBreak = newCount % settings.longBreakInterval === 0;
      const nextMode = isLongBreak ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
    } else {
      setMode('focus');
    }
  }, [mode, pomodorosToday, settings.longBreakInterval]);

  const { timeLeft, isActive, start, pause, reset } = useTimer(
    settings.durations[mode],
    handleTimerComplete
  );

  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('pomodoroProgress', JSON.stringify({ date: today, count: pomodorosToday }));
  }, [pomodorosToday]);

  useEffect(() => {
    document.body.style.backgroundColor = settings.colors.background;
    document.body.style.color = settings.colors.primary;
  }, [settings.colors]);

  useEffect(() => {
    reset(settings.durations[mode]);
    if (mode !== 'focus') {
      start();
    }
  }, [mode, settings.durations]);

  useEffect(() => {
    if (isActive) {
      const minutes = Math.floor(timeLeft / 60);
      document.title = `${minutes}:${(timeLeft % 60).toString().padStart(2, '0')} - ${mode}`;
    } else {
      document.title = 'Pomodoro Timer';
    }
  }, [timeLeft, isActive, mode]);


  const handleModeChange = useCallback((newMode: TimerMode) => {
    if (isActive) {
        pause();
    }
    setMode(newMode);
  }, [isActive, pause]);
  
  const handleSaveSettings = useCallback((newSettings: Settings) => {
    const oldDuration = settings.durations[mode];
    setSettings(newSettings);
    if (newSettings.durations[mode] !== oldDuration) {
        reset(newSettings.durations[mode]);
    }
  }, [mode, reset, settings.durations]);

  const handleReset = useCallback(() => {
    reset(settings.durations[mode]);
  }, [mode, reset, settings.durations]);

  const handleStartPause = useCallback(() => {
    isActive ? pause() : start();
  }, [isActive, pause, start]);

  const modeOrder = MODES.map(m => m.id);
  const activeModeIndex = modeOrder.indexOf(mode);
  const sliderPosition = `calc(${activeModeIndex * 100}%)`;


  return (
    <div className="h-full w-full flex items-center justify-center font-sans transition-colors duration-500">
      <div 
        className="flex flex-col items-center p-4 transition-transform duration-300"
        style={{ transform: `scale(${settings.scale})` }}
      >

        <p className="mb-4 text-sm font-semibold tracking-wider opacity-80">
          POMODOROS TODAY: {pomodorosToday}
        </p>

        <div className="relative flex items-center bg-black/5 p-1 rounded-full mb-4">
           <div
            className="absolute top-0 left-0 h-full w-1/3 p-1 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${sliderPosition})` }}
          >
             <div className="w-full h-full rounded-full" style={{ backgroundColor: settings.colors.primary }}></div>
          </div>
          {MODES.map(({id, label}) => (
            <ModeButton
              key={id}
              label={label}
              isActive={mode === id}
              onClick={() => handleModeChange(id)}
              activeColor={settings.colors.primary}
            />
          ))}
        </div>

        <TimerDisplay seconds={timeLeft} />

        <div className="flex items-center gap-4">
          <ControlButton
            onClick={handleStartPause}
            ariaLabel={isActive ? 'Pause timer' : 'Start timer'}
            color={settings.colors.primary}
            isTextButton
          >
            {isActive ? 'PAUSE' : 'START'}
          </ControlButton>
          <ControlButton
            onClick={handleReset}
            ariaLabel="Reset timer"
            color={settings.colors.primary}
          >
            <ResetIcon color={settings.colors.primary} />
          </ControlButton>
          <ControlButton
            onClick={() => setIsSettingsModalOpen(true)}
            ariaLabel="Open settings"
            color={settings.colors.primary}
          >
            <GearIcon color={settings.colors.primary} />
          </ControlButton>
        </div>
      </div>
      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={handleSaveSettings}
        currentSettings={settings}
      />
    </div>
  );
}

export default App;
