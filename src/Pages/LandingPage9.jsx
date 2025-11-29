import React, { useEffect, useRef, useState } from 'react';
import { Shield, TrendingUp, Users, Map, CheckCircle, MessageCircle, ArrowRight, Menu, X, Cpu, Terminal, Lock } from 'lucide-react';
import LandingPage8 from './LandingPage8';

const CircuitCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Circuit "Walkers"
    class Walker {
      constructor() {
        this.x = Math.floor(Math.random() * canvas.width / 20) * 20;
        this.y = Math.floor(Math.random() * canvas.height / 20) * 20;
        this.vx = Math.random() < 0.5 ? (Math.random() < 0.5 ? 2 : -2) : 0;
        this.vy = this.vx === 0 ? (Math.random() < 0.5 ? 2 : -2) : 0;
        this.history = [];
        this.maxLength = Math.random() * 50 + 20;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
        this.color = Math.random() < 0.1 ? '#d8b4fe' : '#7e22ce'; // Light purple or dark purple
      }

      update() {
        this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }

        // Change direction randomly
        if (Math.random() < 0.05) {
          if (this.vx !== 0) {
            this.vx = 0;
            this.vy = Math.random() < 0.5 ? 2 : -2;
          } else {
            this.vy = 0;
            this.vx = Math.random() < 0.5 ? 2 : -2;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxLength) {
          this.history.shift();
        }
      }

      reset() {
        this.x = Math.floor(Math.random() * canvas.width / 20) * 20;
        this.y = Math.floor(Math.random() * canvas.height / 20) * 20;
        this.history = [];
        this.life = 0;
        this.vx = Math.random() < 0.5 ? (Math.random() < 0.5 ? 2 : -2) : 0;
        this.vy = this.vx === 0 ? (Math.random() < 0.5 ? 2 : -2) : 0;
      }

      draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        
        // Draw path
        if (this.history.length > 0) {
          ctx.moveTo(this.history[0].x, this.history[0].y);
          for (let i = 1; i < this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
          }
        }
        ctx.stroke();

        // Draw head
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    const walkers = [];
    for (let i = 0; i < 40; i++) {
      walkers.push(new Walker());
    }

    const animate = () => {
      // Fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.shadowBlur = 0; // Reset shadow for background

      walkers.forEach(walker => {
        walker.update();
        walker.draw();
      });

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

const BentoCard = ({ className, children, title, subtitle, icon: Icon }) => (
  <div className={`bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-3xl hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/10 group overflow-hidden relative ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <div className="p-3 bg-zinc-800 rounded-2xl group-hover:bg-purple-600 transition-colors duration-300">
            <Icon className="w-6 h-6 text-purple-400 group-hover:text-white" />
          </div>
        )}
      </div>
      <div className="mt-auto">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{subtitle}</p>
      </div>
      {children}
    </div>
  </div>
);

const LandingPage9 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/?text=Hello%20Tosin%2C%20I%27m%20interested%20in%20the%20IT%20Advisory%20Retainer', '_blank');
  };

  const handleBookClick = () => {
     window.location.href = "#contact";
  };

  return (
    <div className="min-h-screen font-sans text-gray-100 relative  selection:text-white">
      <CircuitCanvas />

      {/* Navbar - Floating Pill Style */}
      <nav className="fixed w-full z-50 top-6 px-4">
        <div className="max-w-5xl mx-auto bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-full px-6 h-16 flex items-center justify-between shadow-2xl shadow-purple-900/20">
          <div className="flex items-center gap-2 font-mono font-bold tracking-tighter text-xl">
            <Cpu className="text-purple-500 w-6 h-6" />
            <span>DELACRUZ</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#benefits" className="hover:text-white transition-colors">Advisory</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <button 
              onClick={handleBookClick}
              className="bg-white text-black hover:bg-purple-50 px-5 py-2 rounded-full font-bold transition-transform hover:scale-105"
            >
              Book Now
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-300">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <div className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/20 text-purple-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              DETTY DECEMBER OFFER
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
              Grow <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Smarter</span> <br />
              in 2026.
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-md leading-relaxed border-l-2 border-purple-500/50 pl-6">
              Secure an IT Advisor this Detty December. Avoid costly tech mistakes and build your efficiency roadmap before the new year starts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleBookClick}
                className="group px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.5)]"
              >
                Start Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleWhatsAppClick}
                className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                Chat Now
              </button>
            </div>
            
            <p className="text-xs text-zinc-500 font-mono">
              * Only 20 slots available. Offer ends Dec 31st.
            </p>
          </div>

          {/* Abstract Visual / Stats */}
          <div className="relative hidden lg:block h-[500px]">
             {/* Floating cards visual */}
             <div className="absolute top-10 right-10 w-72 h-80 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl border border-zinc-700 shadow-2xl rotate-6 z-10 flex flex-col p-6 animate-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <TrendingUp className="text-purple-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Efficiency</div>
                    <div className="text-white font-bold">+145%</div>
                  </div>
                </div>
                <div className="space-y-3 mt-auto">
                   <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500 w-3/4"></div>
                   </div>
                   <div className="h-2 w-2/3 bg-zinc-700 rounded-full"></div>
                </div>
             </div>

             <div className="absolute top-32 right-48 w-72 h-80 bg-zinc-900/90 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl -rotate-3 z-20 flex flex-col p-6 animate-float-delayed">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-white">Vendor Roadmap</h3>
                  <Map className="text-purple-500 w-5 h-5" />
                </div>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">{i}</div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-zinc-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Status</span>
                    <span className="text-green-400 font-mono">OPTIMIZED</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Features */}
      <div id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <span className="w-8 h-1 bg-purple-500 block"></span>
          Your Advisory Toolkit
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
          {/* Main Large Card */}
          <BentoCard 
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-zinc-900 to-purple-900/20"
            title="Strategic Tech Roadmap"
            subtitle="We don't just fix computers. We align your technology with your 2026 business goals. Get a month-by-month execution plan."
            icon={Map}
          >
            <div className="mt-8 relative h-48 w-full bg-zinc-900/50 rounded-xl border border-zinc-700/50 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 grid grid-cols-6 gap-px bg-zinc-800/20">
                {[...Array(24)].map((_, i) => <div key={i} className="bg-transparent" />)}
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-3/4 absolute top-1/2"></div>
              <div className="h-32 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent absolute left-1/2"></div>
            </div>
          </BentoCard>

          {/* Side Cards */}
          <BentoCard 
            className="md:col-span-1 md:row-span-1"
            title="Vendor Selection"
            subtitle="Stop overpaying. We negotiate and select the best tools."
            icon={Users}
          />

          <BentoCard 
            className="md:col-span-1 md:row-span-1"
            title="Cybersecurity Baseline"
            subtitle="Protect your assets before the new year rush."
            icon={Shield}
          />
        </div>
      </div>

      {/* Pricing Section - Center Focus */}
      <div id="pricing" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-xl border border-zinc-800 rounded-[3rem] p-12 text-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>
          
          <Lock className="w-12 h-12 text-purple-500 mx-auto mb-6" />
          
          <h2 className="text-4xl font-bold text-white mb-4">Monthly Retainer</h2>
          <p className="text-zinc-400 mb-8">Full access to senior IT advisory without the full-time salary.</p>
          
          <div className="flex items-center justify-center gap-2 mb-10">
            <span className="text-5xl font-mono font-bold text-white tracking-tighter">₦250k</span>
            <span className="text-zinc-500 text-xl font-light mx-2">—</span>
            <span className="text-5xl font-mono font-bold text-white tracking-tighter">₦600k</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10 text-left">
            {["Dedicated Advisor", "Strategy Sessions", "Vendor Management", "Emergency Support"].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={handleBookClick}
            className="w-full sm:w-auto px-12 py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-lg transition-colors shadow-xl"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Testimonial Bar */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="border-t border-zinc-800 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white">
              CE
            </div>
            <div>
              <div className="text-white font-medium">Chinedu E.</div>
              <div className="text-zinc-500 text-sm">CEO, Logistics Co.</div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-zinc-300 font-light italic max-w-2xl text-center md:text-right">
            "We stopped bleeding cash on useless software. The best investment we made for December."
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900">
        <div id="contact" className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 font-mono font-bold text-2xl mb-8">
            <Terminal className="text-purple-500" />
            <span>DELACRUZ</span>
          </div>
          <p className="text-zinc-500 text-sm mb-8">&copy; 2025 Delacruz Innovations. All rights reserved.</p>
          <div className="flex justify-center gap-6">
             <button onClick={handleWhatsAppClick} className="text-zinc-400 hover:text-white transition-colors">WhatsApp</button>
             <button onClick={handleBookClick} className="text-zinc-400 hover:text-white transition-colors">Book Now</button>
          </div>
        </div>
      </footer>
      
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-20px) rotate(6deg); }
          100% { transform: translateY(0px) rotate(6deg); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
          100% { transform: translateY(0px) rotate(-3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage9;