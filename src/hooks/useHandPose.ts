import { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

interface UseHandPoseProps {
  videoElement: HTMLVideoElement | null;
  enabled: boolean;
}

interface GestureState {
  type: 'none' | 'swipe-left' | 'swipe-right' | 'open-palm' | 'pinch' | 'fist' | 'victory' | 'thumbs-up';
  lastDetected: number;
}

export const useHandPose = ({ videoElement, enabled }: UseHandPoseProps) => {
  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [predictions, setPredictions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gesture, setGesture] = useState<GestureState>({ 
    type: 'none', 
    lastDetected: 0 
  });

  // Load the handpose model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Ensure TensorFlow.js is ready
        await tf.ready();
        
        // Load the HandPose model
        const handposeModel = await handpose.load();
        setModel(handposeModel);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load handpose model:', err);
        setError('Failed to load handpose model');
        setLoading(false);
      }
    };

    loadModel();

    return () => {
      // Cleanup
    };
  }, []);

  // Calculate distance between two points
  const getDistance = (p1: number[], p2: number[]): number => {
    return Math.sqrt(
      Math.pow(p2[0] - p1[0], 2) + 
      Math.pow(p2[1] - p1[1], 2) + 
      Math.pow(p2[2] - p1[2], 2)
    );
  };

  // Detect gestures from hand landmarks
  const detectGesture = useCallback((hand: any): GestureState['type'] => {
    if (!hand) return 'none';

    const thumb = hand.annotations.thumb;
    const indexFinger = hand.annotations.indexFinger;
    const middleFinger = hand.annotations.middleFinger;
    const ringFinger = hand.annotations.ringFinger;
    const pinky = hand.annotations.pinky;
    const palm = hand.annotations.palmBase[0];

    // Thumb tip and index finger tip positions
    const thumbTip = thumb[3];
    const indexTip = indexFinger[3];
    const middleTip = middleFinger[3];
    const ringTip = ringFinger[3];
    const pinkyTip = pinky[3];

    // Detect Swipe Right
    if (thumbTip[0] - palm[0] > 50) {
      return 'swipe-right';
    }
    // Detect Swipe Left
    else if (palm[0] - thumbTip[0] > 50) {
      return 'swipe-left';
    }
    // Detect Open Palm (for scrolling down)
    else if (indexTip[1] < palm[1] && middleTip[1] < palm[1]) {
      return 'open-palm';
    }
    // Detect Pinch (thumb and index finger close together)
    else if (getDistance(thumbTip, indexTip) < 30 && 
             getDistance(thumbTip, middleTip) > 40) {
      return 'pinch';
    }
    // Detect Fist (all fingertips close to palm)
    else if (getDistance(indexTip, palm) < 60 && 
             getDistance(middleTip, palm) < 60 && 
             getDistance(ringTip, palm) < 60 && 
             getDistance(pinkyTip, palm) < 60) {
      return 'fist';
    }
    // Detect Victory sign (index and middle fingers up, others down)
    else if (indexTip[1] < palm[1] && 
             middleTip[1] < palm[1] && 
             ringTip[1] > palm[1] && 
             pinkyTip[1] > palm[1]) {
      return 'victory';
    }
    // Detect Thumbs Up (thumb pointing up, other fingers closed)
    else if (thumbTip[1] < palm[1] - 50 && 
             indexTip[1] > palm[1] && 
             middleTip[1] > palm[1]) {
      return 'thumbs-up';
    }

    return 'none';
  }, []);

  // Execute actions based on detected gestures
  useEffect(() => {
    const executeGestureAction = () => {
      const now = Date.now();
      // Only execute if it's been at least 1000ms since the last gesture
      if (now - gesture.lastDetected < 1000) return;

      switch (gesture.type) {
        case 'swipe-left':
          window.history.back();
          setGesture({ type: 'none', lastDetected: now });
          break;
        case 'swipe-right':
          window.history.forward();
          setGesture({ type: 'none', lastDetected: now });
          break;
        case 'open-palm':
          window.scrollBy(0, 50);
          setGesture({ type: 'none', lastDetected: now });
          break;
        case 'pinch':
          // Zoom in functionality
          document.body.style.zoom = (parseFloat(document.body.style.zoom || "1") * 1.1).toString();
          setGesture({ type: 'none', lastDetected: now });
          break;
        case 'fist':
          // Stop scrolling/reset zoom
          document.body.style.zoom = "1";
          setGesture({ type: 'none', lastDetected: now });
          break;
        case 'victory':
          // Scroll up
          window.scrollBy(0, -50);
          setGesture({ type: 'none', lastDetected: now });
          break;
        case 'thumbs-up':
          // Refresh page
          window.location.reload();
          setGesture({ type: 'none', lastDetected: now });
          break;
        default:
          break;
      }
    };

    if (gesture.type !== 'none') {
      executeGestureAction();
    }
  }, [gesture]);

  // Run hand detection loop
  useEffect(() => {
    if (!model || !videoElement || !enabled) return;

    let animationFrameId: number;

    const detectHands = async () => {
      try {
        const hands = await model.estimateHands(videoElement);
        setPredictions(hands);

        if (hands.length > 0) {
          const detectedGesture = detectGesture(hands[0]);
          if (detectedGesture !== 'none') {
            setGesture({
              type: detectedGesture,
              lastDetected: Date.now()
            });
          }
        }
      } catch (err) {
        console.error('Error during hand detection:', err);
      }

      animationFrameId = requestAnimationFrame(detectHands);
    };

    detectHands();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [model, videoElement, enabled, detectGesture]);

  return {
    predictions,
    loading,
    error,
    gesture: gesture.type
  };
};