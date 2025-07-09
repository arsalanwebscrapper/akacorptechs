import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden mt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-black leading-tight text-white mb-6 fade-in">
            Complete Software & IT Solutions
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 fade-in fade-in-delay-1 max-w-4xl mx-auto">
            <p className="mb-4 font-raleway font-medium">
              Powering Digital Evolution with Custom Software, AI/ML, Cloud Solutions & More.
            </p>
            <p className="font-raleway">
              From Clunky to Custom - We Transform Ideas into Scalable Solutions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in fade-in-delay-2">
            <Button className="btn-accent text-lg px-8 py-4">
              Talk to Our CTO
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              Get a Free Audit
            </Button>
          </div>
          
          <div className="mt-12 fade-in fade-in-delay-3">
            <p className="text-white/80 font-raleway text-lg">
              "Empowering businesses globally with custom software"
            </p>
            <p className="text-white/60 mt-2">
              - Leading 50+ Enterprise Projects to Success
            </p>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 flex space-x-4 z-20">
        <button
          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300"
        >
          {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={() => setIsVideoMuted(!isVideoMuted)}
          className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300"
        >
          {isVideoMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;