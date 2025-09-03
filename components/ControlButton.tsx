
import React from 'react';

interface ControlButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  color: string;
  isTextButton?: boolean;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children, ariaLabel, color, isTextButton }) => {
  const buttonStyle: React.CSSProperties = {
    borderColor: color,
    color: color,
  };

  const textButtonStyle: React.CSSProperties = {
    backgroundColor: color,
    color: '#FFFFFF'
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        ${isTextButton ? 'w-32 py-3 text-xl font-bold rounded-full' : 'w-12 h-12 rounded-full flex items-center justify-center border'}
        transition-opacity duration-200 ease-in-out hover:opacity-80
      `}
      style={isTextButton ? textButtonStyle : buttonStyle}
    >
      {children}
    </button>
  );
};
