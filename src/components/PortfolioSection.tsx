import { ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PortfolioSection = () => {
  const projects = [
    {
      id: 1,
      title: 'AI-Powered CRM Platform',
      description: 'Enterprise CRM solution with AI-driven analytics, automated workflows, and predictive insights for sales optimization.',
      image: '/api/placeholder/600/400',
      tags: ['AI/ML', 'CRM', 'Analytics'],
      metrics: '50% increase in sales efficiency',
      category: 'Enterprise Software'
    },
    {
      id: 2,
      title: 'E-Commerce Mobile App',
      description: 'React Native mobile application with real-time inventory, payment integration, and personalized shopping experience.',
      image: '/api/placeholder/600/400',
      tags: ['React Native', 'E-Commerce', 'Mobile'],
      metrics: '200% boost in mobile conversions',
      category: 'Mobile Development'
    },
    {
      id: 3,
      title: 'Cloud Infrastructure Migration',
      description: 'Complete cloud migration from on-premise to AWS with microservices architecture and CI/CD automation.',
      image: '/api/placeholder/600/400',
      tags: ['AWS', 'DevOps', 'Microservices'],
      metrics: '60% reduction in infrastructure costs',
      category: 'Cloud Solutions'
    },
    {
      id: 4,
      title: 'Blockchain Supply Chain',
      description: 'Decentralized supply chain management system ensuring transparency and traceability across the entire logistics network.',
      image: '/api/placeholder/600/400',
      tags: ['Blockchain', 'Supply Chain', 'Smart Contracts'],
      metrics: '100% supply chain transparency',
      category: 'Blockchain'
    },
    {
      id: 5,
      title: 'Healthcare Management System',
      description: 'HIPAA-compliant healthcare platform with patient management, telemedicine, and AI-powered diagnostics.',
      image: '/api/placeholder/600/400',
      tags: ['Healthcare', 'HIPAA', 'AI'],
      metrics: '40% improvement in patient care',
      category: 'Healthcare Tech'
    },
    {
      id: 6,
      title: 'FinTech Payment Gateway',
      description: 'Secure payment processing platform with multi-currency support, fraud detection, and real-time analytics.',
      image: '/api/placeholder/600/400',
      tags: ['FinTech', 'Security', 'Payments'],
      metrics: '99.9% transaction success rate',
      category: 'Financial Technology'
    }
  ];

  return (
    <section className="section-padding bg-secondary/20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-6">
            Our Latest Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we've helped businesses transform their operations with innovative technology solutions and custom software development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="portfolio-card group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-montserrat font-bold text-foreground mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-accent font-semibold">
                    {project.metrics}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-accent">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="btn-primary">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;