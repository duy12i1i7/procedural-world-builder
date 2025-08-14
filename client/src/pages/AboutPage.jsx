import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  Sparkles, 
  Video, 
  Volume2, 
  Github, 
  ExternalLink,
  Users,
  Target,
  Zap
} from 'lucide-react'

const AboutPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Content Generation',
      description: 'Advanced GPT-4 integration automatically creates educational content, scene descriptions, and learning objectives from simple topic descriptions.'
    },
    {
      icon: Sparkles,
      title: 'Procedural 3D World Building',
      description: 'Dynamically generates immersive 3D environments using Three.js with realistic lighting, materials, and physics.'
    },
    {
      icon: Video,
      title: 'Professional Camera Animation',
      description: 'Sophisticated camera movement system with keyframe interpolation, multiple animation styles, and cinematic transitions.'
    },
    {
      icon: Volume2,
      title: 'Multi-language TTS & Captions',
      description: 'Text-to-speech synthesis with natural voices and synchronized captions in multiple languages including English and Vietnamese.'
    }
  ]
  
  const techStack = [
    { category: 'Frontend', items: ['React 18', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'OpenAI GPT-4', 'Azure Speech Services'] },
    { category: '3D Graphics', items: ['WebGL', 'GLSL Shaders', 'Physically Based Rendering', 'Real-time Lighting'] },
    { category: 'AI/ML', items: ['Natural Language Processing', 'Content Generation', 'Scene Analysis', 'Educational Optimization'] }
  ]
  
  const useCases = [
    {
      icon: Target,
      title: 'K-12 Education',
      description: 'Create engaging visual content for science, mathematics, and history lessons that captivate young learners.'
    },
    {
      icon: Users,
      title: 'Higher Education',
      description: 'Develop complex visualizations for university courses in physics, chemistry, biology, and engineering.'
    },
    {
      icon: Zap,
      title: 'Corporate Training',
      description: 'Build interactive training materials for technical concepts, safety procedures, and product demonstrations.'
    }
  ]
  
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          About
          <span className="text-gradient"> Procedural World Builder</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          An innovative AI-powered platform that transforms educational content creation by automatically 
          generating immersive 3D learning experiences from simple topic descriptions.
        </p>
      </section>
      
      {/* Mission Statement */}
      <section className="card text-center bg-gradient-to-r from-blue-50 to-green-50 border-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          To democratize educational content creation by empowering educators with cutting-edge AI and 3D 
          visualization technologies, making complex concepts accessible and engaging for learners worldwide.
        </p>
      </section>
      
      {/* Key Features */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Key Features & Capabilities
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Technical Architecture */}
      <section className="card bg-gray-50 border-0">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Technical Architecture
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((stack, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                {stack.category}
              </h3>
              <ul className="space-y-2">
                {stack.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      
      {/* Use Cases */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Perfect For
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <useCase.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-600">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="card bg-gradient-to-r from-blue-50 to-green-50 border-0">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'Describe Your Topic',
              description: 'Simply enter your educational topic and learning objectives'
            },
            {
              step: '02',
              title: 'AI Analysis',
              description: 'GPT-4 analyzes complexity and generates appropriate content structure'
            },
            {
              step: '03',
              title: '3D Generation',
              description: 'Procedural algorithms create immersive 3D environments and objects'
            },
            {
              step: '04',
              title: 'Final Output',
              description: 'Professional video with narration, animations, and captions'
            }
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-blue-600">{step.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Performance Metrics */}
      <section className="card">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Performance & Capabilities
        </h2>
        
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">10-30s</div>
            <div className="text-gray-600">Content Generation Time</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">60fps</div>
            <div className="text-gray-600">Real-time 3D Rendering</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-gray-600">Languages Supported</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">∞</div>
            <div className="text-gray-600">Topics Possible</div>
          </div>
        </div>
      </section>
      
      {/* Open Source & Community */}
      <section className="card bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Open Source & Community</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            This project is open source and welcomes contributions from developers, educators, 
            and researchers worldwide. Join us in revolutionizing educational technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/your-username/procedural-world-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-gray-900 hover:bg-gray-100 flex items-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <Link
              to="/create"
              className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Try It Now</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Future Roadmap */}
      <section className="card">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Future Roadmap
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              phase: 'Phase 1',
              title: 'Enhanced AI Models',
              items: ['GPT-4 Turbo integration', 'Custom educational models', 'Multilingual content generation']
            },
            {
              phase: 'Phase 2',
              title: 'Advanced 3D Features',
              items: ['VR/AR support', 'Physics simulations', 'Interactive elements', 'Collaborative editing']
            },
            {
              phase: 'Phase 3',
              title: 'Platform Integration',
              items: ['LMS integrations', 'Assessment tools', 'Analytics dashboard', 'Mobile applications']
            }
          ].map((phase, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="text-sm font-medium text-blue-600 mb-1">{phase.phase}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage
