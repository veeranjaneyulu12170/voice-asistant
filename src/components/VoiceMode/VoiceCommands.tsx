import React from 'react';
import { HelpCircle, Clock, CloudSun, Newspaper, Home, ArrowLeft, Globe, MessageSquare } from 'lucide-react';

const commands = [
  { 
    id: 'websites', 
    name: 'Open Websites', 
    description: 'Open any website by voice', 
    example: '"Open google.com" or "Open github.com"',
    icon: <Globe className="h-6 w-6 text-blue-500" />
  },
  { 
    id: 'questions', 
    name: 'Ask Questions', 
    description: 'Get answers to your questions', 
    example: '"What is the weather?" or "How are you?"',
    icon: <MessageSquare className="h-6 w-6 text-blue-500" />
  },
  { 
    id: 'help', 
    name: 'Help', 
    description: 'List available commands', 
    example: '"Help me" or "What can I do?"',
    icon: <HelpCircle className="h-6 w-6 text-blue-500" />
  },
  { 
    id: 'time', 
    name: 'Time', 
    description: 'Get the current time', 
    example: '"What time is it?" or "Tell me the time"',
    icon: <Clock className="h-6 w-6 text-blue-500" />
  },
  { 
    id: 'weather', 
    name: 'Weather', 
    description: 'Get current weather', 
    example: '"What\'s the weather?" or "Weather update"',
    icon: <CloudSun className="h-6 w-6 text-blue-500" />
  },
  { 
    id: 'news', 
    name: 'News', 
    description: 'Get latest news headlines', 
    example: '"Tell me the news" or "News update"',
    icon: <Newspaper className="h-6 w-6 text-blue-500" />
  },
  { 
    id: 'home', 
    name: 'Go Home', 
    description: 'Return to home screen', 
    example: '"Go home" or "Main screen"',
    icon: <Home className="h-6 w-6 text-blue-500" />
  },
  { 
    id: 'back', 
    name: 'Go Back', 
    description: 'Go back to previous screen', 
    example: '"Go back" or "Previous page"',
    icon: <ArrowLeft className="h-6 w-6 text-blue-500" />
  }
];

const VoiceCommands: React.FC = () => {
  return (
    <section className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Available Voice Commands</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commands.map((command) => (
          <div key={command.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-1">{command.icon}</div>
              <div>
                <h3 className="font-semibold text-slate-800">{command.name}</h3>
                <p className="text-slate-600 text-sm mb-2">{command.description}</p>
                <p className="text-slate-500 text-xs">{command.example}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoiceCommands;