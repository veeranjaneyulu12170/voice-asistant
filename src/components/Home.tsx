import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings } from 'lucide-react';

interface Widget {
  id: string;
  type: 'light' | 'music' | 'weather' | 'scene';
  title: string;
  data: any;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Load widgets from localStorage on component mount
  useEffect(() => {
    const savedWidgets = localStorage.getItem('userWidgets');
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
  }, []);

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userWidgets', JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (type: Widget['type']) => {
    const newWidget: Widget = {
      id: Date.now().toString(),
      type,
      title: `New ${type} widget`,
      data: {}
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'light':
        return (
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{widget.title}</p>
                <p className="text-sm text-gray-400">Light control</p>
              </div>
              {isEditing && (
                <button 
                  onClick={() => removeWidget(widget.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      case 'music':
        return (
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{widget.title}</p>
                <p className="text-sm text-gray-400">Music player</p>
              </div>
              {isEditing && (
                <button 
                  onClick={() => removeWidget(widget.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      case 'weather':
        return (
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{widget.title}</p>
                <p className="text-sm text-gray-400">Weather information</p>
              </div>
              {isEditing && (
                <button 
                  onClick={() => removeWidget(widget.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      case 'scene':
        return (
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{widget.title}</p>
                <p className="text-sm text-gray-400">Scene control</p>
              </div>
              {isEditing && (
                <button 
                  onClick={() => removeWidget(widget.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <div>
              <p className="text-gray-400">Welcome</p>
              <h1 className="text-xl font-semibold">Home</h1>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-full hover:bg-gray-800"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>

        {/* Widgets */}
        <div className="space-y-4">
          {widgets.map(widget => (
            <div key={widget.id}>
              {renderWidget(widget)}
            </div>
          ))}

          {isEditing && (
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => addWidget('light')}
                className="bg-gray-800 rounded-xl p-4 text-left hover:bg-gray-700 transition-colors"
              >
                <Plus className="h-6 w-6 mb-2" />
                <p className="font-medium">Add Light</p>
              </button>
              <button 
                onClick={() => addWidget('music')}
                className="bg-gray-800 rounded-xl p-4 text-left hover:bg-gray-700 transition-colors"
              >
                <Plus className="h-6 w-6 mb-2" />
                <p className="font-medium">Add Music</p>
              </button>
              <button 
                onClick={() => addWidget('weather')}
                className="bg-gray-800 rounded-xl p-4 text-left hover:bg-gray-700 transition-colors"
              >
                <Plus className="h-6 w-6 mb-2" />
                <p className="font-medium">Add Weather</p>
              </button>
              <button 
                onClick={() => addWidget('scene')}
                className="bg-gray-800 rounded-xl p-4 text-left hover:bg-gray-700 transition-colors"
              >
                <Plus className="h-6 w-6 mb-2" />
                <p className="font-medium">Add Scene</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;