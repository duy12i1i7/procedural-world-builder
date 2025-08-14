import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Play, Sparkles, Brain, Video, Volume2 } from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Content',
      description: 'Automatically generate educational content and 3D scenes from topic descriptions'
    },
    {
      icon: Sparkles,
      title: 'Procedural 3D Worlds',
      description: 'Create immersive 3D environments tailored to your educational content'
    },
    {
      icon: Video,
      title: 'Camera Animation',
      description: 'Professional camera movements and transitions for engaging presentations'
    },
    {
      icon: Volume2,
      title: 'TTS & Captions',
      description: 'Text-to-speech narration with synchronized captions in multiple languages'
    }
  ]
  
  const templates = [
    {
      id: 'solar-system',
      title: 'Solar System',
      description: 'Explore planets and their orbits',
      image: '/templates/solar-system.jpg',
      category: 'Astronomy'
    },
    {
      id: 'cell-biology',
      title: 'Cell Biology',
      description: 'Journey inside a living cell',
      image: '/templates/cell-biology.jpg',
      category: 'Biology'
    },
    {
      id: 'molecular-structure',
      title: 'Molecular Structure',
      description: 'Visualize chemical compounds',
      image: '/templates/molecular.jpg',
      category: 'Chemistry'
    },
    {
      id: 'historical-events',
      title: 'Historical Events',
      description: 'Recreate historical moments',
      image: '/templates/history.jpg',
      category: 'History'
    }
  ]
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create
            <span className="text-gradient"> AI-Powered </span>
            Educational Videos
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform any topic into immersive 3D educational content. 
            Simply describe what you want to teach, and let AI generate 
            stunning visuals, narration, and animations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create"
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Start Creating</span>
            </Link>
            <button className="btn-outline text-lg px-8 py-3 flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Education
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create professional educational content with the power of AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Templates Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started quickly with pre-designed templates for common educational topics
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="card p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="h-40 bg-gradient-to-r from-blue-400 to-green-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>
                <Link
                  to={`/create?template=${template.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>Use Template</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Education?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join educators worldwide who are using AI to create engaging, 
            immersive learning experiences.
          </p>
          <Link
            to="/create"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Scene</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
