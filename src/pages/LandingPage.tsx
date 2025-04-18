import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Aperture as Gesture, Hand, ArrowRight, Zap, Accessibility, Fingerprint, Layers, PanelLeft, PanelRight, HandMetal, Pointer, RotateCcw, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                  Control Your Web <span className="text-blue-600">With Gestures</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Navigate the web naturally using hand gestures. No mouse, no keyboard—just your hands and a webcam.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/app" 
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                  <button 
                    onClick={() => scrollToSection('how-it-works')}
                    className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    Learn More
                    <ChevronDown className="ml-2" size={18} />
                  </button>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-1">
                  <div className="bg-white rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                      alt="Hand gesture recognition" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg">
                  <Hand className="text-blue-600" size={32} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our gesture-based navigation system offers intuitive controls for a hands-free browsing experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Detection</h3>
              <p className="text-gray-600">
                Advanced machine learning algorithms detect hand gestures in real-time with minimal latency.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Accessibility className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility First</h3>
              <p className="text-gray-600">
                Makes web browsing accessible for users with mobility limitations or injuries.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Fingerprint className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Gestures</h3>
              <p className="text-gray-600">
                Support for various hand gestures including swipes, pinches, and more for complete control.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Layers className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">TensorFlow Powered</h3>
              <p className="text-gray-600">
                Built on Google's TensorFlow.js and HandPose model for accurate hand tracking.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Gesture className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Feedback</h3>
              <p className="text-gray-600">
                Clear visual indicators show detected gestures and hand tracking in real-time.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Hand className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy Focused</h3>
              <p className="text-gray-600">
                All processing happens locally in your browser—no video data is sent to servers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our technology uses computer vision and machine learning to translate hand movements into web navigation commands.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Camera Capture</h3>
              <p className="text-gray-600">
                Your webcam captures video frames of your hand movements in real-time.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hand Detection</h3>
              <p className="text-gray-600">
                TensorFlow.js HandPose model identifies hand landmarks and finger positions.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gesture Recognition</h3>
              <p className="text-gray-600">
                Our algorithms analyze hand positions to recognize specific gesture patterns.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm text-center md:col-span-3 lg:col-span-1">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Command Mapping</h3>
              <p className="text-gray-600">
                Recognized gestures are mapped to specific browser commands like back, forward, and scroll.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm text-center md:col-span-3 lg:col-span-2">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">5</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Browser Navigation</h3>
              <p className="text-gray-600">
                The browser executes the mapped commands, allowing you to navigate the web using just your hand gestures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gestures Section */}
      <section id="gestures" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Supported Gestures</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn the hand gestures that let you control your browsing experience without touching your device.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <PanelLeft className="text-blue-600 mr-2" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Swipe Left</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Move your hand from right to left with thumb extended.
              </p>
              <p className="text-sm font-medium text-blue-600">
                Action: Go back to previous page
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <PanelRight className="text-blue-600 mr-2" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Swipe Right</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Move your hand from left to right with thumb extended.
              </p>
              <p className="text-sm font-medium text-blue-600">
                Action: Go forward to next page
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <Hand className="text-blue-600 mr-2" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Open Palm</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Hold your hand open with fingers pointing up.
              </p>
              <p className="text-sm font-medium text-blue-600">
                Action: Scroll down the page
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <HandMetal className="text-blue-600 mr-2" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Victory Sign</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Hold up your index and middle fingers in a V shape.
              </p>
              <p className="text-sm font-medium text-blue-600">
                Action: Scroll up the page
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <Pointer className="text-blue-600 mr-2" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Pinch</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Bring your thumb and index finger close together.
              </p>
              <p className="text-sm font-medium text-blue-600">
                Action: Zoom in on the page
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <Fingerprint className="text-blue-600 mr-2" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Fist</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Close your hand into a fist with all fingers curled.
              </p>
              <p className="text-sm font-medium text-blue-600">
                Action: Reset zoom level
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <RotateCcw className="text-blue-600 mr-2" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Thumbs Up</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Make a fist with thumb pointing upward.
              </p>
              <p className="text-sm font-medium text-blue-600">
                Action: Refresh the page
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-center">
              <Link 
                to="/app" 
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center"
              >
                Try All Gestures
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Navigate with Gestures?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the future of web browsing with our gesture-based navigation system.
          </p>
          <Link 
            to="/app" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-gray-400">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Gesture className="text-blue-500 mr-2" size={24} />
              <span className="font-bold text-white text-xl">GestureNav</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <button 
                onClick={() => scrollToSection('features')} 
                className="hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="hover:text-white transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('gestures')} 
                className="hover:text-white transition-colors"
              >
                Gestures
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>© 2025 GestureNav. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;