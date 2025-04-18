import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/shared/Header';
import Home from './components/Home';
import VoiceMode from './components/VoiceMode/VoiceMode';
import SignLanguageMode from './components/SignLanguageMode/SignLanguageMode';
import Settings from './components/Settings/Settings';
import BottomNavbar from './components/shared/BottomNavbar';
import { SettingsProvider } from './contexts/SettingsContext';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="min-h-screen bg-slate-100 flex flex-col">
          <Header />
          <main className="flex-grow pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/voice-mode" element={<VoiceMode />} />
              <Route path="/sign-language-mode" element={<SignLanguageMode />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <BottomNavbar />
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;