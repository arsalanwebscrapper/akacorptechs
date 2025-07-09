import { CheckCircle, Users, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '50+' },
    { icon: Trophy, label: 'Projects Completed', value: '100+' },
    { icon: Clock, label: 'Years Experience', value: '8+' },
    { icon: CheckCircle, label: 'Success Rate', value: '100%' }
  ];

  const features = [
    'Full-stack development expertise',
    '24/7 technical support',
    'Agile development methodology',
    'Custom solution architecture',
    'Quality assurance & testing',
    'Post-deployment maintenance'
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-6">
              Transforming Businesses Through Innovation
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              AKACorpTech is a leading IT services company based in Noida, specializing in 
              custom software development, AI/ML solutions, and comprehensive digital transformation. 
              We combine technical excellence with innovative thinking to deliver solutions that drive real business value.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">
                Learn More About Us
              </Button>
              <Button variant="outline">
                Meet Our Team
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center p-6 bg-card rounded-2xl shadow-soft hover-lift"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-montserrat font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto p-8 bg-card rounded-2xl shadow-soft">
            <blockquote className="text-2xl md:text-3xl font-raleway italic text-foreground mb-6">
              "Code Hard, Coffee Harder - Powering Digital Evolution"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-montserrat font-bold text-xl">CEO</span>
              </div>
              <div className="text-left">
                <div className="font-montserrat font-bold text-primary">John Doe</div>
                <div className="text-muted-foreground">Chief Executive Officer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;