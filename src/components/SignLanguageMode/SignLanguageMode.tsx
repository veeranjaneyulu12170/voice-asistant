import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Volume2, Settings, BookOpen, TestTube2 } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const SignLanguageMode: React.FC = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { settings } = useSettings();

  // Check camera availability
  useEffect(() => {
    const checkCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setIsCameraAvailable(true);
      } catch (error) {
        console.error('Camera access denied:', error);
        setIsCameraAvailable(false);
        setFeedback('Camera access is required for sign language detection. Please enable it in your browser settings.');
      }
    };

    checkCamera();
  }, []);

  // Start/stop camera
  const toggleCamera = async () => {
    if (!isCameraAvailable) {
      setFeedback('Camera access is required. Please enable it in your browser settings.');
      return;
    }

    if (!isDetecting) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setIsDetecting(true);
          setFeedback('Camera started. Make a sign to detect it.');
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setFeedback('Error accessing camera. Please try again.');
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setIsDetecting(false);
        setFeedback('Camera stopped.');
      }
    }
  };

  // Text-to-Speech using Web Speech API
  const speakText = (text: string) => {
    setFeedback(text);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.speechSpeed || 1;
      utterance.voice = speechSynthesis.getVoices().find(voice => 
        voice.name.includes(settings.voiceType || '')
      ) || null;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AccessEase: Sign Mode</h1>
          <p className="text-xl text-gray-600">Use sign language to communicate with the application</p>
        </header>

        <main className="space-y-6">
          {/* Camera Feed Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full max-w-2xl aspect-video bg-gray-200 rounded-lg overflow-hidden border-4 border-gray-300">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!isDetecting && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 text-white">
                    <Video className="h-16 w-16 mb-4" />
                    <p className="text-xl font-medium">Camera is off</p>
                    <p className="text-sm">Press the Start button to begin sign detection</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleCamera}
                  disabled={!isCameraAvailable}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                    isDetecting 
                      ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300' 
                      : isCameraAvailable
                        ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300'
                        : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isDetecting ? (
                    <>
                      <VideoOff className="h-5 w-5" />
                      <span>Stop Detection</span>
                    </>
                  ) : (
                    <>
                      <Video className="h-5 w-5" />
                      <span>Start Detection</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Detected Gesture Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Detected Gesture</h2>
              <button
                onClick={() => speakText(detectedGesture)}
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!detectedGesture}
              >
                <Volume2 className="h-5 w-5 text-blue-600" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 min-h-20">
              {detectedGesture ? (
                <p className="text-2xl font-bold text-green-600">{detectedGesture}</p>
              ) : (
                <p className="text-gray-500 text-center">No gesture detected yet</p>
              )}
            </div>
          </section>

          {/* Response Box */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">System Response</h2>
            <div className="bg-gray-50 rounded-lg p-4 min-h-20">
              <p className="text-gray-700">How can I help you?</p>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="grid grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>Gesture Library</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Settings className="h-5 w-5 text-blue-600" />
              <span>Settings</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <TestTube2 className="h-5 w-5 text-blue-600" />
              <span>Test Your Signs</span>
            </button>
          </section>

          {/* Feedback Area */}
          {feedback && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-700">{feedback}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SignLanguageMode;