import React, { useState, useCallback } from 'react';
import { Hand, ArrowLeft, ArrowRight, Loader2, Aperture as Gesture } from 'lucide-react';
import WebcamComponent from '../components/Webcam';
import GestureCanvas from '../components/GestureCanvas';
import { useHandPose } from '../hooks/useHandPose';
import Navbar from '../components/Navbar';

function GestureNavigation() {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [gestureEnabled, setGestureEnabled] = useState<boolean>(true);

  const handleVideoRef = useCallback((videoElement: HTMLVideoElement) => {
    setVideoElement(videoElement);
  }, []);

  const { predictions, loading, error, gesture } = useHandPose({
    videoElement,
    enabled: gestureEnabled
  });

  const getStatusMessage = () => {
    if (loading) return 'Loading handpose model...';
    if (error) return `Error: ${error}`;
    if (!gestureEnabled) return 'Gesture detection paused';
    
    switch (gesture) {
      case 'swipe-left':
        return 'Swipe Left Detected - Going Back';
      case 'swipe-right':
        return 'Swipe Right Detected - Going Forward';
      case 'open-palm':
        return 'Open Palm Detected - Scrolling Down';
      case 'pinch':
        return 'Pinch Detected - Zooming In';
      case 'fist':
        return 'Fist Detected - Resetting Zoom';
      case 'victory':
        return 'Victory Sign Detected - Scrolling Up';
      case 'thumbs-up':
        return 'Thumbs Up Detected - Refreshing Page';
      default:
        return 'Waiting for gesture...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <Gesture className="mr-2" size={28} />
              Gesture-Based Navigation
            </h1>
            <button 
              onClick={() => setGestureEnabled(!gestureEnabled)}
              className={`px-4 py-2 rounded-lg font-medium ${
                gestureEnabled 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {gestureEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="relative mb-4">
            <WebcamComponent onVideoRef={handleVideoRef} />
            {videoElement && predictions && (
              <GestureCanvas videoElement={videoElement} predictions={predictions} />
            )}
            
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <Loader2 className="animate-spin text-white" size={48} />
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <Hand className="mr-2 text-blue-500" />
              <p className="text-lg font-medium">{getStatusMessage()}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Supported Gestures:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Swipe Left: Go back</li>
                <li>• Swipe Right: Go forward</li>
                <li>• Open Palm: Scroll down</li>
                <li>• Victory Sign: Scroll up</li>
                <li>• Pinch: Zoom in</li>
                <li>• Fist: Reset zoom</li>
                <li>• Thumbs Up: Refresh page</li>
              </ul>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <ArrowLeft className="mr-1" size={16} />
                Back
              </button>
              <button 
                onClick={() => window.history.forward()}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Forward
                <ArrowRight className="ml-1" size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-gray-500">
          Note: For best results, ensure good lighting and position your hand clearly in the frame.
        </p>
      </div>
    </div>
  );
}

export default GestureNavigation;