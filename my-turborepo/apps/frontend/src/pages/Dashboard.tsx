import { useState } from 'react';
import { Play, Square, RotateCcw, Settings, Download, Share2, Plus } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import FileExplorer from '../components/FileExplorer';
import CodeEditor from '../components/CodeEditor';
import Terminal from '../components/Terminal';
import ProjectCreation from '../components/ProjectCreation';

const Dashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeFile, setActiveFile] = useState('main.py');
  const [isProjectCreationOpen, setIsProjectCreationOpen] = useState(false);
  const [code, setCode] = useState(`# Welcome to your coding environment!

print("Hello, World!")

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate and print fibonacci sequence
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
`);

  const [output, setOutput] = useState('');

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Hello, World!
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34

Process finished with exit code 0`);
      setIsRunning(false);
    }, 2000);
  };

  const stopCode = () => {
    setIsRunning(false);
    setOutput(prev => prev + '\n\nProcess terminated by user');
  };
 const handleCreateProject = (template: any, projectName: string) => {
    console.log('Creating project:', { template, projectName });
    // Here you would typically create the project
    // For now, we'll just close the modal
  };
  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <DashboardHeader />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Project Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold">My First Project</h2>
              <button className="p-1 hover:bg-gray-700 rounded" onClick={()=>setIsProjectCreationOpen(true)}>
                <Plus className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-1">Python</p>
          </div>

          {/* File Explorer */}
          <FileExplorer activeFile={activeFile} onFileSelect={setActiveFile} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={isRunning ? stopCode : runCode}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isRunning 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run
                  </>
                )}
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editor and Terminal Container */}
          <div className="flex-1 flex flex-col">
            {/* Code Editor */}
            <div className="flex-1">
              <CodeEditor 
                code={code} 
                onChange={setCode} 
                filename={activeFile}
              />
            </div>

            {/* Terminal */}
            <div className="h-64 border-t border-gray-700">
              <Terminal output={output} isRunning={isRunning} />
            </div>
            <ProjectCreation
        isOpen={isProjectCreationOpen}
        onClose={() => setIsProjectCreationOpen(false)}
        onCreateProject={handleCreateProject}
      />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;