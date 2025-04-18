import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define our settings type
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  voiceType: 'male' | 'female';
  speechRate: number;
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  colorBlindMode: boolean;
  customTheme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

// Define the context type
interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

// Create the context with default values
const SettingsContext = createContext<SettingsContextType>({
  settings: {
    language: 'en-US',
    voiceType: 'female',
    speechRate: 1.0,
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    colorBlindMode: false,
    customTheme: {
      primary: '#000000',
      secondary: '#FFFFFF',
      background: '#FFFFFF',
      text: '#000000',
    },
  },
  updateSettings: () => {},
});

// Create a provider component
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en-US',
    voiceType: 'female',
    speechRate: 1.0,
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    colorBlindMode: false,
    customTheme: {
      primary: '#000000',
      secondary: '#FFFFFF',
      background: '#FFFFFF',
      text: '#000000',
    },
  });

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the settings context
export const useSettings = () => useContext(SettingsContext);