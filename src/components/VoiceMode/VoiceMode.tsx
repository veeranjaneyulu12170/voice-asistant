import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, RefreshCw, Settings, HelpCircle, BookOpen, Search, FileText } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';
import { SpeechRecognitionService } from '../../services/speechRecognition';

const WAKE_WORD = 'hey assistant'; // You can change this to any wake word you prefer

const VoiceMode: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [lastCommand, setLastCommand] = useState('');
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const speechRecognitionRef = useRef<SpeechRecognitionService | null>(null);
  const wakeWordRecognitionRef = useRef<SpeechRecognitionService | null>(null);
  const wakeWordTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { settings } = useSettings();
  const navigate = useNavigate();

  // Initialize speech synthesis voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Load voices when they become available
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Initial load
    loadVoices();
  }, []);

  useEffect(() => {
    // Initialize speech recognition services
    speechRecognitionRef.current = new SpeechRecognitionService(settings.language);
    wakeWordRecognitionRef.current = new SpeechRecognitionService(settings.language);
    
    // Start listening for wake word
    startWakeWordDetection();

    return () => {
      // Cleanup
      if (wakeWordTimeoutRef.current) {
        clearTimeout(wakeWordTimeoutRef.current);
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      if (wakeWordRecognitionRef.current) {
        wakeWordRecognitionRef.current.stop();
      }
    };
  }, [settings.language]);

  const startWakeWordDetection = () => {
    if (!wakeWordRecognitionRef.current) return;

    // Clear any existing timeout
    if (wakeWordTimeoutRef.current) {
      clearTimeout(wakeWordTimeoutRef.current);
    }

    wakeWordRecognitionRef.current.start(
      (transcript) => {
        const normalizedTranscript = transcript.toLowerCase().trim();
        if (normalizedTranscript === WAKE_WORD) {
          speakText("Yes, I'm listening");
          startCommandMode();
        }
      },
      (error) => {
        console.error('Wake word detection error:', error);
        // Retry wake word detection after a delay
        wakeWordTimeoutRef.current = setTimeout(startWakeWordDetection, 2000);
      }
    );
  };

  const startCommandMode = () => {
    if (!speechRecognitionRef.current) return;

    // Stop wake word detection
    if (wakeWordRecognitionRef.current) {
      wakeWordRecognitionRef.current.stop();
    }

    speechRecognitionRef.current.start(
      (transcript) => {
        setLastCommand(transcript);
        setCommandHistory(prev => [transcript, ...prev]);
        processCommand(transcript);
      },
      (error) => {
        setIsNetworkError(error.includes('Network error'));
        setFeedback(error);
        setIsListening(false);
        // Restart wake word detection after command mode ends
        startWakeWordDetection();
      }
    );
    setIsListening(true);
    setFeedback('Listening for command...');
  };

  const stopCommandMode = () => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
    }
    setIsListening(false);
    setFeedback('Waiting for wake word...');
    // Restart wake word detection
    startWakeWordDetection();
  };

  const processCommand = (command: string) => {
    const normalizedCommand = command.toLowerCase().trim();
    
    // Check for stop command
    if (normalizedCommand.includes('stop') || normalizedCommand.includes('goodbye')) {
      speakText("Goodbye! I'll be waiting for your next command.");
      stopCommandMode();
      return;
    }

    // Process other commands
    if (normalizedCommand.includes('open')) {
      const website = normalizedCommand.split('open')[1].trim();
      speakText(`Opening ${website}`);
      window.open(`https://${website}`, '_blank');
    } else if (normalizedCommand.includes('time')) {
      const time = new Date().toLocaleTimeString();
      speakText(`The current time is ${time}`);
    } else if (normalizedCommand.includes('weather')) {
      fetchWeather();
    } else if (normalizedCommand.includes('news')) {
      fetchNews();
    } else if (normalizedCommand.includes('help')) {
      speakText("I can help you with: opening websites, checking time, weather, and news. Just say 'hey assistant' followed by your command.");
    } else {
      speakText("I'm not sure about that. Try saying 'help' to know what I can do.");
    }

    // Stop listening after processing command
    stopCommandMode();
  };

  const speakText = (text: string) => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.speechRate;

    // Find the appropriate voice based on settings
    const voiceType = settings.voiceType === 'male' ? 'Male' : 'Female';
    const selectedVoice = voices.find(voice => 
      voice.name.includes(voiceType) || 
      voice.lang.includes(settings.language)
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Set up event handlers
    utterance.onend = () => {
      console.log('Speech finished');
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event);
    };

    // Speak the text
    speechSynthesis.speak(utterance);
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric');
      const data = await response.json();
      const weather = `${data.weather[0].description}, ${Math.round(data.main.temp)}°C`;
      speakText(`Current weather: ${weather}`);
    } catch (error) {
      speakText("I couldn't fetch the weather information right now.");
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY');
      const data = await response.json();
      const headlines = data.articles.slice(0, 3).map((article: any) => article.title);
      speakText(`Here are today's top headlines: ${headlines.join('. ')}`);
    } catch (error) {
      speakText("I couldn't fetch the news right now.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AccessEase: Voice Mode</h1>
          <p className="text-xl text-gray-300">Use your voice to navigate and control the application</p>
        </header>

        <main className="space-y-6">
          {/* Voice Input Section */}
          <section className="bg-gray-900 rounded-lg p-6">
            <div className="flex flex-col items-center space-y-4">
              <button
                ref={buttonRef}
                onClick={startCommandMode}
                disabled={isNetworkError}
                className={`w-32 h-32 rounded-full flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                  isListening 
                    ? 'bg-red-500 focus:ring-red-300' 
                    : isNetworkError
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300'
                }`}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening ? (
                  <MicOff className="h-16 w-16 text-white" />
                ) : (
                  <Mic className="h-16 w-16 text-white" />
                )}
              </button>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setLastCommand(commandHistory[commandHistory.length - 1] || '');
                    processCommand(commandHistory[commandHistory.length - 1] || '');
                  }}
                  disabled={!commandHistory.length}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Retry</span>
                </button>
              </div>

              {lastCommand && (
                <div className="text-center">
                  <p className="text-lg font-medium">You said:</p>
                  <p className="text-2xl font-bold text-blue-400">{lastCommand}</p>
                </div>
              )}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => speakText('Opening notes')}
                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FileText className="h-5 w-5 inline-block mr-2" />
                Open Notes
              </button>
              <button 
                onClick={() => speakText('Opening search')}
                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Search className="h-5 w-5 inline-block mr-2" />
                Search
              </button>
              <button 
                onClick={() => speakText('Opening settings')}
                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Settings className="h-5 w-5 inline-block mr-2" />
                Settings
              </button>
              <button 
                onClick={() => speakText('Opening help')}
                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <HelpCircle className="h-5 w-5 inline-block mr-2" />
                Help
              </button>
            </div>
          </section>

          {/* Navigation Hints */}
          <section className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Navigation Hints</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-400" />
                <span>Say "Open Notes" to open your notes</span>
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-400" />
                <span>Say "Go Back" to return to previous screen</span>
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-400" />
                <span>Say "Help" for more commands</span>
              </li>
            </ul>
          </section>

          {/* Feedback Area */}
          {feedback && (
            <div className="bg-blue-900 rounded-lg p-4">
              <p className="text-lg">{feedback}</p>
            </div>
          )}

          {/* Command History */}
          <section className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Commands</h2>
            <div className="space-y-2">
              {commandHistory.map((command, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg">
                  <Volume2 className="h-5 w-5 text-blue-400" />
                  <span>{command}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default VoiceMode;