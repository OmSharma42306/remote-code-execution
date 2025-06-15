import React, { useState } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square, RotateCcw } from 'lucide-react';

interface TerminalProps {
  output: string;
  isRunning: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ output, isRunning }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      if (command) {
        setCommandHistory(prev => [...prev, `$ ${command}`]);
        // Here you would typically process the command
        setCommandHistory(prev => [...prev, `Command not found: ${command}`]);
      }
      setInput('');
    }
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-300">Terminal</span>
          {isRunning && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">Running</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Minus className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Square className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Output Area */}
        <div className="flex-1 overflow-auto p-4 font-mono text-sm">
          {/* Welcome Message */}
          <div className="text-green-400 mb-2">
            Welcome to CodeSpace Terminal v1.0
          </div>
          
          {/* Command History */}
          {commandHistory.map((line, index) => (
            <div key={index} className="text-gray-300 mb-1">
              {line}
            </div>
          ))}
          
          {/* Output */}
          {output && (
            <div className="text-gray-300 whitespace-pre-wrap mb-2">
              {output}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex items-center space-x-2 text-sm font-mono">
            <span className="text-green-400">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent text-white outline-none"
              placeholder="Type a command..."
              disabled={isRunning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;