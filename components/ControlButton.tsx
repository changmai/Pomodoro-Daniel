import React from 'react';

interface ControlButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  color: string;
  variant?: 'primary' | 'secondary-icon' | 'secondary-text';
}

export const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children, ariaLabel, color, variant = 'secondary-icon' }) => {

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'w-32 py-3 text-xl font-bold rounded-full';
      case 'secondary-text':
        return 'w-32 py-3 text-xl font-bold rounded-full border';
      case 'secondary-icon':
      default:
        return 'w-12 h-12 rounded-full flex items-center justify-center border';
    }
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: color, color: '#FFFFFF' };
      case 'secondary-text':
      case 'secondary-icon':
      default:
        return { borderColor: color, color: color };
    }
  };

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        ${getVariantClasses()}
        transition-opacity duration-200 ease-in-out hover:opacity-80
      `}
      style={getVariantStyles()}
    >
      {children}
    </button>
  );
};