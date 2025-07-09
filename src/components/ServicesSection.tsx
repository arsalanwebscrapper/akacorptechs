
import { ArrowRight, Code, Smartphone, Cloud, Shield, Brain, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import customSoftwareImg from '@/assets/custom-software.jpg';
import aiMlImg from '@/assets/ai-ml.jpg';
import cloudSecurityImg from '@/assets/cloud-security.jpg';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Custom Software Development',
      description: 'Build enterprise-grade systems tailored to your business needs. From ERP solutions to complex workflow automation.',
      icon: Code,
      image: customSoftwareImg,
      tags: ['Enterprise', 'Scalable', 'Custom'],
    },
    {
      id: 2,
      title: 'AI & Machine Learning',
      description: 'Leverage cutting-edge AI/ML technologies for predictive analytics, automation, and intelligent decision-making.',
      icon: Brain,
      image: aiMlImg,
      tags: ['AI', 'ML', 'Automation'],
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      icon: Smartphone,
      tags: ['iOS', 'Android', 'React Native'],
    },
    {
      id: 4,
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure, CI/CD pipelines, and modern DevOps practices for rapid deployment.',
      icon: Cloud,
      image: cloudSecurityImg,
      tags: ['AWS', 'Azure', 'DevOps'],
    },
    {
      id: 5,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
      icon: Shield,
      tags: ['Security', 'Compliance', 'Protection'],
    },
    {
      id: 6,
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive and engaging digital experiences.',
      icon: Palette,
      tags: ['Design', 'UX', 'UI'],
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive IT solutions designed to transform your business and accelerate growth through cutting-edge technology.
          </p>
        </div>

        {/* Responsive grid that ensures equal heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon;

            return (
              <div 
                key={service.id} 
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                {service.image && (
                  <div className="relative mb-6 overflow-hidden rounded-xl">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 sm:px-3 sm:py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10 font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all mt-auto">
                  Learn More 
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 sm:px-8">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
