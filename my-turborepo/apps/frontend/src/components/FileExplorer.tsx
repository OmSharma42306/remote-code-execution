import React, { useState } from 'react';
import { ChevronRight, ChevronDown,Folder, Plus, MoreHorizontal } from 'lucide-react';

interface FileExplorerProps {
  activeFile: string;
  onFileSelect: (filename: string) => void;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

const FileExplorer: React.FC<FileExplorerProps> = ({ activeFile, onFileSelect }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  const fileStructure: FileNode[] = [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'main.py', type: 'file' },
        { name: 'utils.py', type: 'file' },
        { name: 'config.json', type: 'file' },
      ]
    },
    {
      name: 'tests',
      type: 'folder',
      children: [
        { name: 'test_main.py', type: 'file' },
      ]
    },
    { name: 'README.md', type: 'file' },
    { name: 'requirements.txt', type: 'file' },
  ];

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'py':
        return '🐍';
      case 'js':
        return '📜';
      case 'json':
        return '⚙️';
      case 'md':
        return '📝';
      case 'txt':
        return '📄';
      default:
        return '📄';
    }
  };

  const renderFileNode = (node: FileNode, level = 0) => {
    const isExpanded = expandedFolders.has(node.name);
    const isActive = node.type === 'file' && activeFile === node.name;

    return (
      <div key={node.name}>
        <div
          className={`flex items-center px-2 py-1 hover:bg-gray-700 cursor-pointer text-sm rounded ${
            isActive ? 'bg-orange-500/20 text-orange-400' : 'text-gray-300'
          }`}
          style={{ paddingLeft: `${(level * 16) + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.name);
            } else {
              onFileSelect(node.name);
            }
          }}
        >
          {node.type === 'folder' && (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              <Folder className="w-4 h-4 mr-2 text-blue-400" />
            </>
          )}
          {node.type === 'file' && (
            <>
              <span className="mr-2 text-base">{getFileIcon(node.name)}</span>
            </>
          )}
          <span>{node.name}</span>
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm font-medium">Files</span>
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-gray-700 rounded">
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="space-y-1">
          {fileStructure.map(node => renderFileNode(node))}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;