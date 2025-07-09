import { Star, Quote } from 'lucide-react';

const ClientsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CTO',
      company: 'TechCorp Solutions',
      content: 'AKACorpTech delivered an exceptional AI-powered platform that transformed our business operations. Their expertise in machine learning and custom software development is unmatched.',
      rating: 5,
      avatar: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Founder',
      company: 'InnovateLab',
      content: 'The mobile app they built for us exceeded all expectations. Clean code, beautiful design, and seamless performance. Highly recommend their development team.',
      rating: 5,
      avatar: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'VP Technology',
      company: 'Global Finance Inc',
      content: 'Our cloud migration was smooth and efficient thanks to AKACorpTech. They reduced our infrastructure costs by 60% while improving performance significantly.',
      rating: 5,
      avatar: '/api/placeholder/80/80'
    }
  ];

  const clientLogos = [
    { name: 'TechCorp', logo: '/api/placeholder/150/60' },
    { name: 'InnovateLab', logo: '/api/placeholder/150/60' },
    { name: 'Global Finance', logo: '/api/placeholder/150/60' },
    { name: 'HealthTech', logo: '/api/placeholder/150/60' },
    { name: 'EduSoft', logo: '/api/placeholder/150/60' },
    { name: 'RetailPro', logo: '/api/placeholder/150/60' },
    { name: 'CloudSync', logo: '/api/placeholder/150/60' },
    { name: 'DataViz', logo: '/api/placeholder/150/60' }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Client Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. See what our satisfied clients have to say about our work and dedication to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-card p-8 rounded-2xl shadow-soft hover-lift relative"
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
              
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-montserrat font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-montserrat font-bold text-primary mb-8">
            Trusted by Leading Companies
          </h3>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-12">
            {/* First set */}
            {clientLogos.map((client, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {clientLogos.map((client, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;