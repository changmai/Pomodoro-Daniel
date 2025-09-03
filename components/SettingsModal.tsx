
import React, { useState, useEffect } from 'react';
import type { Settings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newSettings: Settings) => void;
  currentSettings: Settings;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentSettings }) => {
  const [settings, setSettings] = useState<Settings>(currentSettings);

  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Settings['durations']) => {
    setSettings(prev => ({
      ...prev,
      durations: {
        ...prev.durations,
        [key]: parseInt(e.target.value, 10) * 60
      }
    }));
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Settings['colors']) => {
    setSettings(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: e.target.value
      }
    }));
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      scale: parseFloat(e.target.value),
    }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2">Durations (minutes)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="focus" className="block text-sm font-medium text-gray-600">Focus</label>
              <input type="number" id="focus" value={settings.durations.focus / 60} onChange={(e) => handleDurationChange(e, 'focus')} className="mt-1 w-full p-2 border rounded-md"/>
            </div>
            <div>
              <label htmlFor="shortBreak" className="block text-sm font-medium text-gray-600">Short Break</label>
              <input type="number" id="shortBreak" value={settings.durations.shortBreak / 60} onChange={(e) => handleDurationChange(e, 'shortBreak')} className="mt-1 w-full p-2 border rounded-md"/>
            </div>
            <div>
              <label htmlFor="longBreak" className="block text-sm font-medium text-gray-600">Long Break</label>
              <input type="number" id="longBreak" value={settings.durations.longBreak / 60} onChange={(e) => handleDurationChange(e, 'longBreak')} className="mt-1 w-full p-2 border rounded-md"/>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2">Appearance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <label htmlFor="background" className="font-medium text-gray-600">Background</label>
              <input type="color" id="background" value={settings.colors.background} onChange={(e) => handleColorChange(e, 'background')} className="w-10 h-10 rounded-md border-none cursor-pointer"/>
            </div>
             <div className="flex items-center gap-3">
              <label htmlFor="primary" className="font-medium text-gray-600">Primary</label>
              <input type="color" id="primary" value={settings.colors.primary} onChange={(e) => handleColorChange(e, 'primary')} className="w-10 h-10 rounded-md border-none cursor-pointer"/>
            </div>
          </div>
          <div className="mt-6">
              <label htmlFor="scale" className="block text-sm font-medium text-gray-600 mb-2">App Size</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="scale"
                  min="0.5"
                  max="1"
                  step="0.05"
                  value={settings.scale ?? 1}
                  onChange={handleScaleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: currentSettings.colors.primary }}
                />
                <span className="font-semibold text-gray-700 w-12 text-right">
                  {Math.round((settings.scale ?? 1) * 100)}%
                </span>
              </div>
            </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            style={{ backgroundColor: currentSettings.colors.primary }}
            className="text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
