import React, { useEffect, useRef, useState } from 'react';
import { Shield, TrendingUp, Users, Map, CheckCircle, MessageCircle, ArrowRight, Menu, X, Hexagon } from 'lucide-react';

const HexagonGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let tick = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawHex = (x, y, r) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(Math.PI / 3 * i), y + r * Math.sin(Math.PI / 3 * i));
      }
      ctx.closePath();
    };

    const animate = () => {
      tick += 0.005; // Speed of the wave
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const r = 30; // Radius of hexagon
      const w = r * 2 * Math.sin(Math.PI / 3);
      const h = r * 1.5;
      
      const cols = Math.ceil(canvas.width / w) + 2;
      const rows = Math.ceil(canvas.height / h) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const xOffset = (j % 2 === 0) ? 0 : w / 2;
          const x = i * w + xOffset;
          const y = j * h;

          // Create a flowing wave effect using sine and cosine based on position and time
          const noise = Math.sin(i * 0.1 + tick) * Math.cos(j * 0.1 + tick) + Math.sin(tick * 0.5);
          
          // Normalize noise roughly between 0 and 1 for opacity
          const opacity = Math.max(0, Math.min(1, (noise + 1) / 4));
          
          const isHighlight = opacity > 0.4;

          ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 + opacity * 0.3})`;
          ctx.lineWidth = 1;
          
          drawHex(x, y, r);
          ctx.stroke();

          if (isHighlight) {
            ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 0.15})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

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
  <div className="bg-zinc-900/60 backdrop-blur-md border border-purple-900/30 p-6 rounded-xl hover:border-purple-500 hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-purple-900/20 group">
    <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors duration-300 border border-purple-500/20">
      <Icon className="w-6 h-6 text-purple-400 group-hover:text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const LandingPage8 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 0, minutes: 0 });

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
    window.open('https://wa.me/?text=Hello%20Tosin%2C%20I%27m%20interested%20in%20the%20IT%20Advisory%20Retainer', '_blank');
  };

  const handleBookClick = () => {
     window.location.href = "#contact";
  };

  return (
    <div className="min-h-screen font-sans text-gray-100 relative overflow-hidden">
      <HexagonGrid />

      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 bg-black/60 backdrop-blur-xl border-b border-purple-900/20 supports-[backdrop-filter]:bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-2xl tracking-tighter flex items-center gap-2">
              <Hexagon className="w-8 h-8 text-purple-600 fill-purple-900/50" strokeWidth={1.5} />
              <div>
                <span className="text-white">DELACRUZ</span>
                <span className="text-purple-500">.</span>
              </div>
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
        <div className="inline-flex items-center gap-2 bg-purple-900/20 border border-purple-500/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 animate-fade-in-up hover:bg-purple-900/30 transition-colors cursor-default">
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
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-100 to-purple-600 mb-6 leading-tight drop-shadow-sm">
            Secure an IT Advisor This Detty December <br className="hidden md:block" />
            <span className="text-white">Grow Smarter in 2026!</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Avoid costly IT mistakes and scale efficiently. Get monthly IT advisory, vendor selection, and tech strategy for your organisation today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleBookClick}
              className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2"
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-800/80 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-green-500/50 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
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
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 bg-zinc-900/40 backdrop-blur-sm border border-purple-900/30 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none"></div>

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
                  <div className="bg-purple-900/30 rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            
            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-6 backdrop-blur-md">
              <p className="text-purple-400 text-sm uppercase tracking-wider font-bold mb-2">Retainer Pricing</p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl sm:text-5xl font-bold text-white">₦250k</span>
                <span className="text-xl text-gray-500">-</span>
                <span className="text-3xl sm:text-5xl font-bold text-white">₦600k</span>
                <span className="text-gray-400 ml-2">/ month</span>
              </div>
            </div>
          </div>

          <div className="relative">
             {/* Testimonial Card */}
             <div className="relative bg-zinc-800/40 backdrop-blur-md p-8 rounded-2xl border border-zinc-700/50 hover:border-purple-500/30 transition-colors">
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-3 shadow-lg rotate-3">
                  <span className="text-3xl leading-none text-white font-serif">❝</span>
                </div>
                <p className="text-lg text-gray-200 italic mb-6 relative z-10 leading-relaxed">
                  "Thanks to Delacruz Innovations, our tech strategy is now aligned with growth goals. Best investment for December! We stopped bleeding cash on useless software."
                </p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
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
        <div id="contact" className="text-center max-w-3xl mx-auto mb-16 relative">
           <div className="absolute inset-0 bg-purple-600/20 blur-[100px] -z-10 rounded-full"></div>
          <h2 className="text-3xl font-bold text-white mb-6">Don't enter 2026 guessing.</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Slots are filling up fast. Secure your roadmap today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button onClick={handleBookClick} className="px-8 py-4 bg-white text-purple-900 hover:bg-gray-100 rounded-xl font-bold text-lg shadow-xl shadow-purple-900/20 transition-all hover:scale-105">
               Book Free Consultation
             </button>
             <button onClick={handleWhatsAppClick} className="px-8 py-4 border border-purple-500/50 bg-purple-900/20 text-purple-200 hover:bg-purple-900/40 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
               <MessageCircle className="w-5 h-5" />
               WhatsApp Tosin
             </button>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="w-full border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
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

export default LandingPage8;