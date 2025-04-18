import React from 'react';
import { HandMetal } from 'lucide-react';

// Mock supported signs
const supportedSigns = [
  { id: 'hello', sign: 'Hello', description: 'A greeting gesture', difficulty: 'Easy' },
  { id: 'thankyou', sign: 'Thank You', description: 'Express gratitude', difficulty: 'Easy' },
  { id: 'yes', sign: 'Yes', description: 'Agreement or confirmation', difficulty: 'Easy' },
  { id: 'no', sign: 'No', description: 'Disagreement or refusal', difficulty: 'Easy' },
  { id: 'please', sign: 'Please', description: 'Make a polite request', difficulty: 'Medium' },
  { id: 'help', sign: 'Help', description: 'Request assistance', difficulty: 'Medium' },
  { id: 'sorry', sign: 'Sorry', description: 'Express apology', difficulty: 'Medium' },
  { id: 'good', sign: 'Good', description: 'Express positive sentiment', difficulty: 'Easy' },
];

const SignDetection: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-700 mb-3">Supported Signs</h3>
      <p className="text-slate-600 mb-4">
        The system can currently detect the following signs in American Sign Language (ASL):
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {supportedSigns.map((sign) => (
          <div key={sign.id} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <HandMetal className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-slate-800">{sign.sign}</h4>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    sign.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {sign.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{sign.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          More signs will be added in future updates. Practice these signs to improve recognition accuracy.
        </p>
      </div>
    </div>
  );
};

export default SignDetection;