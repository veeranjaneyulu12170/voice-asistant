import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface FeedbackBoxProps {
  feedback: string;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({ feedback }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (feedback) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000); // Hide after 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [feedback]);
  
  if (!feedback) return null;
  
  return (
    <div 
      className={`bg-blue-50 border border-blue-200 rounded-lg p-4 transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-start gap-3">
        <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-blue-800">System Response</h3>
          <p className="text-blue-700">{feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackBox;