import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

interface WebcamComponentProps {
  onVideoRef: (videoElement: HTMLVideoElement) => void;
}

const WebcamComponent: React.FC<WebcamComponentProps> = ({ onVideoRef }) => {
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      onVideoRef(webcamRef.current.video);
    }
  }, [webcamRef, onVideoRef]);

  return (
    <Webcam
      ref={webcamRef}
      audio={false}
      className="w-full max-w-lg rounded-lg shadow-lg"
      screenshotFormat="image/jpeg"
      videoConstraints={{
        width: 640,
        height: 480,
        facingMode: "user"
      }}
    />
  );
};

export default WebcamComponent;