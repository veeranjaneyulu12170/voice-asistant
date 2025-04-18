import React, { useState } from 'react';
import { Settings as SettingsIcon, Volume2, Video, Globe, Moon } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<'voice' | 'sign' | 'display'>('voice');

  const handleVoiceTypeChange = (type: string) => {
    updateSettings({ ...settings, voiceType: type });
  };

  const handleSpeechSpeedChange = (speed: number) => {
    updateSettings({ ...settings, speechSpeed: speed });
  };

  const handleVolumeChange = (volume: number) => {
    updateSettings({ ...settings, volume: volume });
  };

  const handleGestureSensitivityChange = (sensitivity: string) => {
    updateSettings({ ...settings, gestureSensitivity: sensitivity });
  };

  const handleDisplayTranslationChange = (enabled: boolean) => {
    updateSettings({ ...settings, displayTranslation: enabled });
  };

  const handleAutoSpeakChange = (enabled: boolean) => {
    updateSettings({ ...settings, autoSpeak: enabled });
  };

  const handleLanguageChange = (language: string) => {
    updateSettings({ ...settings, language });
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'high-contrast') => {
    updateSettings({ ...settings, theme });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-xl text-gray-600">Customize your accessibility preferences</p>
        </header>

        <main className="bg-white rounded-lg shadow-md p-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('voice')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                activeTab === 'voice'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Volume2 className="h-5 w-5" />
              <span>Voice Mode</span>
            </button>
            <button
              onClick={() => setActiveTab('sign')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                activeTab === 'sign'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Video className="h-5 w-5" />
              <span>Sign Mode</span>
            </button>
            <button
              onClick={() => setActiveTab('display')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                activeTab === 'display'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Moon className="h-5 w-5" />
              <span>Display</span>
            </button>
          </div>

          {/* Voice Mode Settings */}
          {activeTab === 'voice' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Voice Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voice Type</label>
                    <select
                      value={settings.voiceType}
                      onChange={(e) => handleVoiceTypeChange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Speech Speed</label>
                    <select
                      value={settings.speechSpeed}
                      onChange={(e) => handleSpeechSpeedChange(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="0.5">Slow</option>
                      <option value="1">Normal</option>
                      <option value="1.5">Fast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sign Mode Settings */}
          {activeTab === 'sign' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign Language Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gesture Sensitivity</label>
                    <select
                      value={settings.gestureSensitivity}
                      onChange={(e) => handleGestureSensitivityChange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Display Translation</label>
                    <button
                      onClick={() => handleDisplayTranslationChange(!settings.displayTranslation)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.displayTranslation ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.displayTranslation ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Auto Speak</label>
                    <button
                      onClick={() => handleAutoSpeakChange(!settings.autoSpeak)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.autoSpeak ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.autoSpeak ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Display Settings */}
          {activeTab === 'display' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Language</h3>
                <div className="space-y-4">
                  <div>
                    <select
                      value={settings.language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="en-US">English</option>
                      <option value="hi-IN">Hindi</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Theme</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Dark Mode</label>
                    <button
                      onClick={() => handleThemeChange(settings.theme === 'dark' ? 'light' : 'dark')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">High Contrast</label>
                    <button
                      onClick={() => handleThemeChange(settings.theme === 'high-contrast' ? 'light' : 'high-contrast')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.theme === 'high-contrast' ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.theme === 'high-contrast' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;