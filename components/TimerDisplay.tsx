
import React from 'react';

interface TimerDisplayProps {
  seconds: number;
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ seconds }) => {
  return (
    <div className="my-4">
      <h1 className="text-[160px] md:text-[200px] font-bold tracking-tighter">
        {formatTime(seconds)}
      </h1>
    </div>
  );
};
