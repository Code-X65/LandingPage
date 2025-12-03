import React, { useEffect, useRef, useState } from 'react';
import { Shield, TrendingUp, Users, Map, CheckCircle, MessageCircle, ArrowRight, Menu, X, Cpu, Terminal, Lock } from 'lucide-react';

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
        this.color = Math.random() < 0.1 ? '#d8b4fe' : '#7e22ce';
      }

      update() {
        this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }

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
        
        if (this.history.length > 0) {
          ctx.moveTo(this.history[0].x, this.history[0].y);
          for (let i = 1; i < this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
          }
        }
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    const walkers = [];
    for (let i = 0; i < 40; i++) {
      walkers.push(new Walker());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.shadowBlur = 0;

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
  <div className={`bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/10 group overflow-hidden relative ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 h-full flex flex-col">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        {Icon && (
          <div className="p-2 sm:p-3 bg-zinc-800 rounded-xl sm:rounded-2xl group-hover:bg-purple-600 transition-colors duration-300">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white" />
          </div>
        )}
      </div>
      <div className="mt-auto">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">{title}</h3>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{subtitle}</p>
      </div>
      {children}
    </div>
  </div>
);

const Whatsapp = (props) => (
    <svg 
        {...props} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
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
    <div className="min-h-screen font-sans text-gray-100 relative selection:text-white overflow-x-hidden">
      <CircuitCanvas />

      {/* Compact Navbar */}
      <nav className="fixed w-full z-50 top-3 sm:top-4 px-3 sm:px-4">
        <div className="max-w-5xl mx-auto bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-full px-4 sm:px-6 h-12 sm:h-16 flex items-center justify-between shadow-2xl shadow-purple-900/20">
          <div className="flex items-center gap-2 font-mono font-bold tracking-tighter text-lg sm:text-xl">
            <Cpu className="text-purple-500 w-5 h-5 sm:w-6 sm:h-6" />
            <span>DELACRUZ</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#benefits" className="hover:text-white transition-colors">Advisory</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <button 
              onClick={handleBookClick}
              className="bg-white text-black hover:bg-purple-50 px-4 py-2 sm:px-5 sm:py-2 rounded-full font-bold transition-transform hover:scale-105 text-sm"
            >
              Book Now
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-300">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/90 backdrop-blur-lg z-40 md:hidden pt-16 px-6">
          <div className="flex flex-col items-center gap-8 text-lg">
            <a href="#benefits" className="text-white py-3" onClick={() => setIsMenuOpen(false)}>Advisory</a>
            <a href="#pricing" className="text-white py-3" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <button 
              onClick={() => {
                handleBookClick();
                setIsMenuOpen(false);
              }}
              className="bg-white text-black px-8 py-3 rounded-full font-bold w-full max-w-xs"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Compact Hero Section */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-4 sm:pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/20 text-purple-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              DETTY DECEMBER OFFER
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Grow <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Smarter</span> <br />
              in 2026.
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-400 max-w-md leading-relaxed border-l-2 border-purple-500/50 pl-4 sm:pl-6">
              Secure an IT Advisor this Detty December. Avoid costly tech mistakes and build your efficiency roadmap before the new year starts.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={handleBookClick}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-purple-700 text-black rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.5)]"
              >
                “Book Your Free IT Consultation Today!
               <Whatsapp className="w-7 h-7 text-green-500" />
              </button>
              <button 
                onClick={handleWhatsAppClick}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 sm:gap-3"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                Chat Now
              </button>
            </div>
            
            <p className="text-xs text-zinc-500 font-mono">
              * Only 20 slots available. Offer ends Dec 31st.
            </p>
          </div>

          {/* Responsive Visual */}
          <div className="relative hidden lg:block h-[400px] sm:h-[500px]">
             <div className="absolute top-4 right-4 w-60 h-72 sm:w-72 sm:h-80 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl sm:rounded-3xl border border-zinc-700 shadow-2xl rotate-6 z-10 flex flex-col p-4 sm:p-6 animate-float">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <TrendingUp className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Efficiency</div>
                    <div className="text-white font-bold text-sm sm:text-base">+145%</div>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3 mt-auto">
                   <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500 w-3/4"></div>
                   </div>
                   <div className="h-2 w-2/3 bg-zinc-700 rounded-full"></div>
                </div>
             </div>

             <div className="absolute top-20 right-32 w-60 h-72 sm:w-72 sm:h-80 bg-zinc-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-2xl -rotate-3 z-20 flex flex-col p-4 sm:p-6 animate-float-delayed">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="font-bold text-white text-sm sm:text-base">Vendor Roadmap</h3>
                  <Map className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">{i}</div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 sm:pt-6 border-t border-zinc-800">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-zinc-400">Status</span>
                    <span className="text-green-400 font-mono">OPTIMIZED</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Compact Bento Grid */}
      <div id="benefits" className="py-4 sm:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 flex items-center gap-3 z-50">
          <span className=" "></span>
          Your Advisory Toolkit
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 h-auto md:h-[400px]">
          <BentoCard 
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-zinc-900 to-purple-900/20"
            title="Strategic Tech Roadmap"
            subtitle="We don't just fix computers. We align your technology with your 2026 business goals. Get a month-by-month execution plan."
            icon={Map}
          >
            <div className="mt-4 sm:mt-6 relative h-32 sm:h-48 w-full bg-zinc-900/50 rounded-lg sm:rounded-xl border border-zinc-700/50 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 grid grid-cols-6 gap-px bg-zinc-800/20">
                {[...Array(24)].map((_, i) => <div key={i} className="bg-transparent" />)}
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-3/4 absolute top-1/2"></div>
              <div className="h-24 sm:h-32 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent absolute left-1/2"></div>
            </div>
          </BentoCard>

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

      {/* Compact Pricing Section */}
      <div id="pricing" className="py-12 sm:py-4 px-4 relative">
        <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-xl border border-zinc-800 rounded-2xl sm:rounded-[3rem] p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>
          
          <Lock className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500 mx-auto mb-4 sm:mb-6" />
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Monthly Retainer</h2>
          <p className="text-zinc-400 text-sm sm:text-base mb-6 sm:mb-8">Full access to senior IT advisory without the full-time salary.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6 sm:mb-8">
            <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-tighter">₦250k</span>
            <span className="text-zinc-500 text-lg sm:text-xl font-light mx-2 hidden sm:block">—</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-tighter">₦600k</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto mb-6 sm:mb-8 text-left text-sm sm:text-base">
            {["Dedicated Advisor", "Strategy Sessions", "Vendor Management", "Emergency Support"].map((feat, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 text-zinc-300">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={handleBookClick}
            className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-white text-black hover:bg-zinc-200 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-colors shadow-xl"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Compact Testimonial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2">
        <div className="border-t border-zinc-800 pt-8 sm:pt-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white text-sm sm:text-base">
              CE
            </div>
            <div>
              <div className="text-white font-medium text-sm sm:text-base">Chinedu E.</div>
              <div className="text-zinc-500 text-xs sm:text-sm">CEO, Logistics Co.</div>
            </div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light italic max-w-2xl text-center md:text-right">
            "We stopped bleeding cash on useless software. The best investment we made for December."
          </p>
        </div>
      </div>

      {/* Compact Footer */}
      <footer className="bg-zinc-950 py-8 sm:py-4 border-t border-zinc-900 z-10 relative  ">
        <div id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 font-mono font-bold text-xl sm:text-2xl mb-6 sm:mb-8">
            <Terminal className="text-purple-500 w-5 h-5 sm:w-6 sm:h-6" />
            <span>DELACRUZ</span>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm mb-6 sm:mb-8">&copy; 2025 Delacruz Innovations. All rights reserved.</p>
          <div className="flex justify-center gap-4 sm:gap-6 text-sm">
             <button onClick={handleWhatsAppClick} className="text-zinc-400 hover:text-white transition-colors">WhatsApp</button>
             <button onClick={handleBookClick} className="text-zinc-400 hover:text-white transition-colors">Book Now</button>
          </div>
        </div>
      </footer>
      
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-15px) rotate(6deg); }
          100% { transform: translateY(0px) rotate(6deg); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
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