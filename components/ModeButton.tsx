import React from 'react';

interface ModeButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  activeColor: string;
}

export const ModeButton: React.FC<ModeButtonProps> = ({ label, isActive, onClick, activeColor }) => {
  const buttonStyle: React.CSSProperties = {
    color: isActive ? '#FFFFFF' : activeColor,
  };
  
  return (
    <button
      onClick={onClick}
      className="relative z-10 py-2 rounded-full text-base font-semibold transition-colors duration-300 ease-in-out w-32 text-center"
      style={buttonStyle}
    >
      {label}
    </button>
  );
};
