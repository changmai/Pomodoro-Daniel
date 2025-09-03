
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerResult {
  timeLeft: number;
  isActive: boolean;
  start: () => void;
  pause: () => void;
  reset: (newTime?: number) => void;
}

export const useTimer = (initialTime: number, onComplete: () => void): UseTimerResult => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearTimerInterval();
            setIsActive(false);
            onComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearTimerInterval();
    }

    return clearTimerInterval;
  }, [isActive, onComplete, clearTimerInterval]);
  
  useEffect(() => {
      setTimeLeft(initialTime);
  }, [initialTime]);


  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsActive(true);
    }
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback((newTime?: number) => {
    setIsActive(false);
    setTimeLeft(newTime !== undefined ? newTime : initialTime);
  }, [initialTime]);

  return { timeLeft, isActive, start, pause, reset };
};
