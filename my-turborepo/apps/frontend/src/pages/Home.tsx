import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Code, Clock, Globe, Users, Star, Search, MoreHorizontal, Play, Settings, Trash2 } from 'lucide-react';
import ProjectCreation from '../components/ProjectCreation';
import DashboardHeader from '../components/DashboardHeader';

interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  template: string;
  lastModified: string;
  isPublic: boolean;
  stars: number;
  forks: number;
  status: 'active' | 'sleeping' | 'stopped';
  thumbnail?: string;
}

const Home = () => {
  const [isProjectCreationOpen, setIsProjectCreationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Mock recent projects data
  const recentProjects: Project[] = [
    {
      id: '1',
      name: 'my-react-app',
      description: 'A modern React application with TypeScript and Tailwind CSS',
      language: 'TypeScript',
      template: 'React + TypeScript',
      lastModified: '2 hours ago',
      isPublic: true,
      stars: 12,
      forks: 3,
      status: 'active',
    },
    {
      id: '2',
      name: 'python-data-analysis',
      description: 'Data analysis project using pandas and matplotlib',
      language: 'Python',
      template: 'Python Data Science',
      lastModified: '1 day ago',
      isPublic: false,
      stars: 0,
      forks: 0,
      status: 'sleeping',
    },
    {
      id: '3',
      name: 'express-api-server',
      description: 'RESTful API server built with Node.js and Express',
      language: 'JavaScript',
      template: 'Node.js Express',
      lastModified: '3 days ago',
      isPublic: true,
      stars: 8,
      forks: 2,
      status: 'stopped',
    },
    {
      id: '4',
      name: 'portfolio-website',
      description: 'Personal portfolio website with modern design',
      language: 'HTML',
      template: 'HTML/CSS/JS',
      lastModified: '1 week ago',
      isPublic: true,
      stars: 25,
      forks: 7,
      status: 'active',
    },
    {
      id: '5',
      name: 'flask-blog-app',
      description: 'Blog application with user authentication',
      language: 'Python',
      template: 'Python Flask API',
      lastModified: '2 weeks ago',
      isPublic: false,
      stars: 0,
      forks: 0,
      status: 'sleeping',
    },
    {
      id: '6',
      name: 'vue-dashboard',
      description: 'Admin dashboard built with Vue.js 3',
      language: 'JavaScript',
      template: 'Vue.js 3',
      lastModified: '3 weeks ago',
      isPublic: true,
      stars: 15,
      forks: 4,
      status: 'stopped',
    },
  ];

  const handleCreateProject = (template: any, projectName: string) => {
    console.log('Creating project:', { template, projectName });
    // Here you would typically create the project
    setIsProjectCreationOpen(false);
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'bg-blue-100 text-blue-700',
      'JavaScript': 'bg-yellow-100 text-yellow-700',
      'Python': 'bg-green-100 text-green-700',
      'HTML': 'bg-orange-100 text-orange-700',
      'CSS': 'bg-purple-100 text-purple-700',
    };
    return colors[language] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'sleeping': return 'bg-yellow-100 text-yellow-700';
      case 'stopped': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredProjects = recentProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'public' && project.isPublic) ||
                         (filterBy === 'private' && !project.isPublic) ||
                         (filterBy === 'active' && project.status === 'active');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Ready to build something amazing today?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Create New Project */}
          <button
            onClick={() => setIsProjectCreationOpen(true)}
            className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Plus className="w-6 h-6" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create New Project</h3>
            <p className="text-orange-100">Start from a template or build from scratch</p>
          </button>

          {/* Import Project */}
          <button className="bg-white border-2 border-dashed border-gray-300 p-6 rounded-2xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 text-left group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 group-hover:bg-orange-100 p-3 rounded-lg transition-colors">
                <Code className="w-6 h-6 text-gray-600 group-hover:text-orange-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Import from Git</h3>
            <p className="text-gray-600">Import an existing repository</p>
          </button>

          {/* Browse Templates */}
          <button className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg hover:border-orange-300 transition-all duration-200 text-left group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 group-hover:bg-orange-100 p-3 rounded-lg transition-colors">
                <Globe className="w-6 h-6 text-gray-600 group-hover:text-orange-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Templates</h3>
            <p className="text-gray-600">Explore community templates</p>
          </button>
        </div>

        {/* Recent Projects Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
                <p className="text-gray-600 text-sm mt-1">{recentProjects.length} projects</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                  />
                </div>
                
                {/* Filter */}
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Projects</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="p-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery ? 'Try adjusting your search terms' : 'Create your first project to get started'}
                </p>
                <button
                  onClick={() => setIsProjectCreationOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Create New Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-50 rounded-xl p-5 hover:shadow-lg hover:bg-white transition-all duration-200 transform hover:-translate-y-1 border border-transparent hover:border-orange-200 group cursor-pointer"
                  >
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Project Meta */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLanguageColor(project.language)}`}>
                        {project.language}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      {!project.isPublic && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                          Private
                        </span>
                      )}
                    </div>

                    {/* Project Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{project.lastModified}</span>
                        </div>
                        {project.isPublic && (
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              <span>{project.stars}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{project.forks}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to="/dashboard"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Open
                      </Link>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Settings className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Creation Modal */}
      <ProjectCreation
        isOpen={isProjectCreationOpen}
        onClose={() => setIsProjectCreationOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default Home;