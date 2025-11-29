import React, { useEffect, useRef, useState } from 'react';
import { Shield, TrendingUp, Users, Map, CheckCircle, MessageCircle, ArrowRight, Menu, X } from 'lucide-react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.6)'; // Purple-500 with opacity
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 10, 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Draw connections
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-black"
    />
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-zinc-900/80 backdrop-blur-sm border border-purple-900/50 p-6 rounded-xl hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-purple-900/20 group">
    <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors duration-300">
      <Icon className="w-6 h-6 text-purple-400 group-hover:text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const LandingPage7 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 0, minutes: 0 });

  // Mock countdown for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppClick = () => {
    // Replace with actual number
    window.open('https://wa.me/?text=Hello%20Tosin%2C%20I%27m%20interested%20in%20the%20IT%20Advisory%20Retainer', '_blank');
  };

  const handleBookClick = () => {
     window.location.href = "#contact";
  };

  return (
    <div className="min-h-screen font-sans text-gray-100 relative overflow-hidden">
      <ParticleNetwork />

      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-2xl tracking-tighter">
              <span className="text-white">DELACRUZ</span>
              <span className="text-purple-500">.</span>
            </div>
            
            <div className="hidden md:block">
              <button 
                onClick={handleBookClick}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)]"
              >
                Book Consultation
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Scarcity Banner */}
        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-purple-200 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            Only 20 Slots Available for Detty December
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500 mb-6 leading-tight">
            Secure an IT Advisor This Detty December <br className="hidden md:block" />
            <span className="text-white">Grow Smarter in 2026!</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Avoid costly IT mistakes and scale efficiently. Get monthly IT advisory, vendor selection, and tech strategy for your organisation today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleBookClick}
              className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2"
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with Tosin
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-24">
          <FeatureCard 
            icon={Users} 
            title="Tailored Advisory" 
            description="Monthly IT advisory specifically tailored to your business needs and growth stage."
          />
          <FeatureCard 
            icon={Map} 
            title="Efficiency Roadmap" 
            description="Strategic vendor selection and a clear roadmap to optimize your operations."
          />
          <FeatureCard 
            icon={Shield} 
            title="Cybersecurity" 
            description="Baseline setup to protect your data and assets from digital threats."
          />
          <FeatureCard 
            icon={TrendingUp} 
            title="Competitive Edge" 
            description="Start the new year ahead of competitors with a solidified tech strategy."
          />
        </div>

        {/* Pricing & Offer Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 bg-gradient-to-br from-zinc-900 to-black border border-purple-900/30 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Invest in Clarity & Speed
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                "Direct Access to Senior IT Experts",
                "Vendor Negotiation Support",
                "Quarterly Tech Reviews",
                "Priority Support Channel"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-2">Retainer Pricing</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-5xl font-bold text-white">₦250k</span>
                <span className="text-xl text-gray-400">-</span>
                <span className="text-3xl sm:text-5xl font-bold text-white">₦600k</span>
                <span className="text-gray-400 ml-2">/ month</span>
              </div>
            </div>
          </div>

          <div className="relative">
             {/* Testimonial Card */}
             <div className="relative bg-zinc-800/50 backdrop-blur-md p-8 rounded-2xl border border-zinc-700">
                <div className="absolute -top-4 -left-4 bg-purple-600 rounded-full p-3 shadow-lg">
                  <span className="text-3xl">❝</span>
                </div>
                <p className="text-lg text-gray-200 italic mb-6 relative z-10">
                  "Thanks to Delacruz Innovations, our tech strategy is now aligned with growth goals. Best investment for December! We stopped bleeding cash on useless software."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    CE
                  </div>
                  <div>
                    <p className="text-white font-bold">Chinedu E.</p>
                    <p className="text-purple-400 text-sm">CEO, Logistics Co.</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Final CTA */}
        <div id="contact" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Don't enter 2026 guessing.</h2>
          <p className="text-gray-400 mb-8">
            Slots are filling up fast. Secure your roadmap today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button onClick={handleBookClick} className="px-8 py-4 bg-white text-purple-900 hover:bg-gray-200 rounded-xl font-bold text-lg shadow-lg transition-colors">
               Book Free Consultation
             </button>
             <button onClick={handleWhatsAppClick} className="px-8 py-4 border border-purple-500 text-purple-400 hover:bg-purple-900/30 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
               <MessageCircle className="w-5 h-5" />
               WhatsApp Tosin
             </button>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="w-full border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; 2025 Delacruz Innovations. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default LandingPage7;