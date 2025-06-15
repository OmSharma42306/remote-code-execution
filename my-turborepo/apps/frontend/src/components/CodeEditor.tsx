import React from 'react';
import { Copy, Download, MoreHorizontal } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  filename: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, filename }) => {
  const getLanguageFromFilename = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'py':
        return 'python';
      case 'js':
        return 'javascript';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'text';
    }
  };

  const language = getLanguageFromFilename(filename);

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">{filename}</span>
          <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
            {language}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="bg-gray-800 px-3 py-4 text-right text-gray-500 text-sm font-mono select-none border-r border-gray-700">
          {code.split('\n').map((_, index) => (
            <div key={index} className="h-6 leading-6">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full p-4 bg-gray-900 text-white font-mono text-sm resize-none outline-none leading-6"
            style={{
              tabSize: 4,
              fontFamily: '"Fira Code", "Cascadia Code", "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
            }}
            spellCheck={false}
          />
          
          {/* Syntax Highlighting Overlay (Simulated) */}
          <div className="absolute inset-0 p-4 pointer-events-none font-mono text-sm leading-6">
            <pre className="whitespace-pre-wrap text-transparent">
              {code.split('\n').map((line, index) => (
                <div key={index} className="h-6">
                  {/* Basic syntax highlighting simulation */}
                  {line.includes('def ') && (
                    <span className="text-blue-400">def</span>
                  )}
                  {line.includes('print(') && (
                    <span className="text-green-400">print</span>
                  )}
                  {line.includes('#') && (
                    <span className="text-gray-500">{line.substring(line.indexOf('#'))}</span>
                  )}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;