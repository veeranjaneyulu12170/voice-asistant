import React, { useRef, useEffect } from 'react';

interface GestureCanvasProps {
  videoElement: HTMLVideoElement | null;
  predictions: any[] | null;
}

const GestureCanvas: React.FC<GestureCanvasProps> = ({ videoElement, predictions }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !videoElement || !predictions || predictions.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match video
    canvasRef.current.width = videoElement.videoWidth;
    canvasRef.current.height = videoElement.videoHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw hand landmarks
    predictions.forEach(hand => {
      // Draw palm base
      const palmBase = hand.annotations.palmBase[0];
      ctx.beginPath();
      ctx.arc(palmBase[0], palmBase[1], 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
      ctx.fill();

      // Draw fingers
      const fingers = [
        hand.annotations.thumb,
        hand.annotations.indexFinger,
        hand.annotations.middleFinger,
        hand.annotations.ringFinger,
        hand.annotations.pinky
      ];

      fingers.forEach(finger => {
        // Draw finger joints
        ctx.beginPath();
        ctx.moveTo(finger[0][0], finger[0][1]);
        
        for (let i = 1; i < finger.length; i++) {
          ctx.lineTo(finger[i][0], finger[i][1]);
        }
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)';
        ctx.stroke();
        
        // Draw finger tip
        const tip = finger[finger.length - 1];
        ctx.beginPath();
        ctx.arc(tip[0], tip[1], 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 0, 255, 0.7)';
        ctx.fill();
      });

      // Connect fingers to palm to create a hand skeleton
      fingers.forEach(finger => {
        ctx.beginPath();
        ctx.moveTo(palmBase[0], palmBase[1]);
        ctx.lineTo(finger[0][0], finger[0][1]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 165, 0, 0.7)';
        ctx.stroke();
      });
    });
  }, [videoElement, predictions]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full opacity-70 pointer-events-none"
    />
  );
};

export default GestureCanvas;