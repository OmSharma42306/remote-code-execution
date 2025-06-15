import React, { useState } from 'react';
import { Search, X, Code, Globe, Database, Smartphone, Gamepad2, Brain, Palette, Server, ChevronRight, Star, Users } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  language: string;
  category: string;
  icon: React.ReactNode;
  popularity: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  featured?: boolean;
}

interface ProjectCreationProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (template: Template, projectName: string) => void;
}

const ProjectCreation: React.FC<ProjectCreationProps> = ({ isOpen, onClose, onCreateProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [projectName, setProjectName] = useState('');
  const [step, setStep] = useState<'templates' | 'configure'>('templates');

  const categories = [
    { name: 'All', icon: <Code className="w-4 h-4" /> },
    { name: 'Web', icon: <Globe className="w-4 h-4" /> },
    { name: 'Python', icon: <Code className="w-4 h-4" /> },
    { name: 'JavaScript', icon: <Code className="w-4 h-4" /> },
    { name: 'Database', icon: <Database className="w-4 h-4" /> },
    { name: 'Mobile', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Game', icon: <Gamepad2 className="w-4 h-4" /> },
    { name: 'AI/ML', icon: <Brain className="w-4 h-4" /> },
    { name: 'Design', icon: <Palette className="w-4 h-4" /> },
    { name: 'Backend', icon: <Server className="w-4 h-4" /> },
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'React + TypeScript',
      description: 'Modern React app with TypeScript, Tailwind CSS, and Vite',
      language: 'TypeScript',
      category: 'Web',
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      popularity: 95,
      difficulty: 'Intermediate',
      tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
      featured: true,
    },
    {
      id: '2',
      name: 'Python Flask API',
      description: 'RESTful API with Flask, SQLAlchemy, and authentication',
      language: 'Python',
      category: 'Backend',
      icon: <Server className="w-6 h-6 text-green-500" />,
      popularity: 88,
      difficulty: 'Intermediate',
      tags: ['Flask', 'API', 'SQLAlchemy', 'Auth'],
    },
    {
      id: '3',
      name: 'Node.js Express',
      description: 'Full-stack Node.js application with Express and MongoDB',
      language: 'JavaScript',
      category: 'Backend',
      icon: <Server className="w-6 h-6 text-yellow-500" />,
      popularity: 92,
      difficulty: 'Beginner',
      tags: ['Node.js', 'Express', 'MongoDB', 'REST'],
      featured: true,
    },
    {
      id: '4',
      name: 'Python Data Science',
      description: 'Jupyter notebook environment with pandas, numpy, and matplotlib',
      language: 'Python',
      category: 'AI/ML',
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      popularity: 85,
      difficulty: 'Intermediate',
      tags: ['Jupyter', 'Pandas', 'NumPy', 'Matplotlib'],
    },
    {
      id: '5',
      name: 'Vue.js 3',
      description: 'Modern Vue.js 3 application with Composition API',
      language: 'JavaScript',
      category: 'Web',
      icon: <Globe className="w-6 h-6 text-green-400" />,
      popularity: 78,
      difficulty: 'Intermediate',
      tags: ['Vue.js', 'Composition API', 'Vite'],
    },
    {
      id: '6',
      name: 'React Native',
      description: 'Cross-platform mobile app with React Native and Expo',
      language: 'JavaScript',
      category: 'Mobile',
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      popularity: 82,
      difficulty: 'Advanced',
      tags: ['React Native', 'Expo', 'Mobile'],
    },
    {
      id: '7',
      name: 'Python Game',
      description: 'Simple game development with Pygame',
      language: 'Python',
      category: 'Game',
      icon: <Gamepad2 className="w-6 h-6 text-red-500" />,
      popularity: 65,
      difficulty: 'Beginner',
      tags: ['Pygame', 'Game Dev', '2D'],
    },
    {
      id: '8',
      name: 'HTML/CSS/JS',
      description: 'Simple web page with vanilla HTML, CSS, and JavaScript',
      language: 'HTML',
      category: 'Web',
      icon: <Globe className="w-6 h-6 text-orange-500" />,
      popularity: 90,
      difficulty: 'Beginner',
      tags: ['HTML', 'CSS', 'JavaScript', 'Vanilla'],
      featured: true,
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredTemplates = templates.filter(template => template.featured);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setProjectName(`my-${template.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
    setStep('configure');
  };

  const handleCreateProject = () => {
    if (selectedTemplate && projectName.trim()) {
      onCreateProject(selectedTemplate, projectName.trim());
      onClose();
      // Reset state
      setStep('templates');
      setSelectedTemplate(null);
      setProjectName('');
      setSearchQuery('');
      setSelectedCategory('All');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 'templates' ? 'Create a new project' : 'Configure your project'}
            </h2>
            <p className="text-gray-600 mt-1">
              {step === 'templates' 
                ? 'Choose a template to get started quickly' 
                : 'Set up your project details'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {step === 'templates' ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-orange-100 text-orange-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Featured Templates */}
              {selectedCategory === 'All' && searchQuery === '' && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Featured Templates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredTemplates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => handleTemplateSelect(template)}
                        className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between mb-3">
                          {template.icon}
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Users className="w-3 h-3" />
                            {template.popularity}%
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                            {template.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{template.language}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Templates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedCategory === 'All' ? 'All Templates' : `${selectedCategory} Templates`}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({filteredTemplates.length} templates)
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:border-orange-300 transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        {template.icon}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          {template.popularity}%
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                          {template.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{template.language}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Configure Step */
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              {/* Selected Template Info */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  {selectedTemplate?.icon}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedTemplate?.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{selectedTemplate?.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate?.tags.map((tag) => (
                        <span key={tag} className="text-sm bg-white text-gray-600 px-3 py-1 rounded-full border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Configuration */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter project name"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This will be the name of your project and repository
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Privacy
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="privacy"
                        value="public"
                        defaultChecked
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-3">
                        <span className="font-medium text-gray-900">Public</span>
                        <span className="block text-sm text-gray-500">
                          Anyone can view and fork this project
                        </span>
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="privacy"
                        value="private"
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-3">
                        <span className="font-medium text-gray-900">Private</span>
                        <span className="block text-sm text-gray-500">
                          Only you can access this project
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setStep('templates')}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Back to Templates
                </button>
                <button
                  onClick={handleCreateProject}
                  disabled={!projectName.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  Create Project
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCreation;