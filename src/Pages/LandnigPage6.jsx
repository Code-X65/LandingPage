import React, { useState, useEffect } from 'react';
import { Clock, Zap, Target, DollarSign, ArrowRight, Star, AlertTriangle, MessageSquare, Briefcase, Users, CheckCircle, Send, MessageCircle } from 'lucide-react';
import Santa_cap from '../assets/santa_logo.png'
// Define the primary color palette and custom animation for the digital/tech aesthetic
const primaryColor = 'text-purple-400';
const primaryBg = 'bg-purple-600';
const primaryHoverBg = 'hover:bg-purple-700';

// Custom CSS for animations and background effects (embedded in JSX for single-file mandate)
const customStyles = `
  /* Keyframe for a subtle pulse/glow on the CTA */
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4);
    }
    50% {
      box-shadow: 0 0 25px 8px rgba(168, 85, 247, 0.8);
    }
  }

  /* Keyframe for a slow, digital light effect on the headline */
  @keyframes digital-glow {
    0%, 100% {
      text-shadow: 0 0 5px #a855f7, 0 0 10px #a855f7;
    }
    50% {
      text-shadow: 0 0 15px #8B5CF6, 0 0 30px #8B5CF6;
    }
  }

  .pulse-glow-button {
    animation: pulse-glow 2.5s infinite ease-in-out;
  }

  .digital-glow-text {
    animation: digital-glow 4s infinite ease-in-out;
  }
  
  /* NEW: Animated Grid Background Keyframes */
  @keyframes background-pan {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -5000px -5000px; /* Slow, constant movement */
    }
  }

  .animated-grid-background {
    background-color: #000000;
    /* Darker purple grid lines */
    background-image: 
        linear-gradient(0deg, #1A0D2A 1px, transparent 1px), 
        linear-gradient(90deg, #1A0D2A 1px, transparent 1px);
    background-size: 50px 50px; 
    animation: background-pan 60s infinite linear;
    transition: background-image 0.5s;
  }

  /* Mobile-specific optimizations */
  @media (max-width: 640px) {
    .animated-grid-background {
      background-size: 30px 30px; /* Smaller grid for mobile */
    }
  }

  /* WhatsApp button animation */
  @keyframes whatsapp-pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
    }
    50% {
      box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
    }
  }

  .whatsapp-pulse {
    animation: whatsapp-pulse 2s infinite;
  }
`;

const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="p-4 sm:p-5 bg-gray-900/50 backdrop-blur-sm border border-purple-900 hover:border-purple-600 transition-all duration-300 rounded-xl shadow-xl hover:shadow-purple-900/60 h-full">
    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${primaryColor} mb-2 sm:mb-3`} />
    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">{title}</h3>
    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{description}</p>
  </div>
);

const LandingPage6 = () => {
  // Simple state for a countdown timer (simulating urgency)
  const [timeLeft, setTimeLeft] = useState(72 * 3600); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const benefits = [
    {
      icon: Clock,
      title: 'Time Savings',
      description: 'Save up to 40% of your time on daily repetitive tasks by handing them over to smart automation!',
    },
    {
      icon: CheckCircle,
      title: 'Precision & Accuracy',
      description: 'Dramatically reduce human errors and improve the efficiency and quality of your business outputs.',
    },
    {
      icon: Users,
      title: 'Simple Training',
      description: 'We train your team in the new, simple automated workflows in less than a day, ensuring fast adoption.',
    },
  ];

  const whatsappNumber = "2348123456789"; // Replace with actual WhatsApp number
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your Detty December Automation Special. Can you tell me more?");

  return (
    <div className="min-h-screen text-white font-inter animated-grid-background relative">
      {/* Embedded Styles */}
      <style>{customStyles}</style>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-50 "
      >
        <div className="bg-[#25D366] hover:bg-[#128C7E] p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110">
          <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
     
      </a>

    

      {/* Header/Navigation */}
      <header className="py-3 px-4 sm:px-6 sticky top-0 bg-black/80 backdrop-blur-md z-30 border-b border-purple-900/60">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <img 
            src="https://delacruzinnovations.com/assets/logo-BRFRQ7Mn.jpg" 
            alt="Delacruzinnovation" 
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 md:space-y-10">

        {/* 1. Hero Section */}
        <section id="hero" className="text-center pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 text-purple-400/80">
            <AlertTriangle className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 mb-1" />
            Detty December Special
          </p>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 leading-tight">
            <span className={`digital-glow-text ${primaryColor}`}>
              <span className="relative inline-block">
                <img 
                  src={Santa_cap}
                  alt="Santa Hat" 
                  className="absolute -top-1 -left-0.2 sm:-top-2 sm:left-1 w-5 h-5 sm:w-4 sm:h-4 md:w-8 md:h-8 transform -rotate-12" 
                />
                A
              </span>
              utomate Your Business
            </span>
            <br className="hidden sm:block" />
            <span className="text-white">Before Year End!</span>
          </h2>
          
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-7 px-2 leading-relaxed">
            Stop wasting money and time on manual tasks. Let Delacruz automate your key business workflows in just{' '}
            <span className="font-bold text-purple-300">7 days!</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto">
            <a
              href="#"
              className={`
                flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold
                rounded-full transition duration-500 transform
                bg-white text-black pulse-glow-button
                w-full sm:w-auto shadow-xl shadow-purple-500/40
                hover:scale-[1.02] active:scale-95
              `}
            >
              Book Your FREE Automation Audit!
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </section>

        {/* 2. Benefits Section */}
        <section id="benefits" className="pt-4 sm:pt-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 px-4">
            How we benefit your <span className={primaryColor}>business?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-2">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </section>

    {/* 3. Pricing Section */}
<section id="pricing" className="relative text-center pt-4 sm:pt-6 px-4">
  {/* Limited Offer Sticker - Positioned relative to pricing section */}
  <div className="absolute top-0 right-1 sm:right-4 lg:right-8 z-40">
    <div className="relative bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] shadow-2xl shadow-purple-900/60 transform -rotate-12 hover:rotate-0 hover:scale-150 transition-all duration-500 cursor-pointer">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-4 border-white border-dashed animate-spin-slow"></div>
      
      {/* Inner content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white mb-0.5 animate-pulse" />
        <h3 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider">
          Limited
        </h3>
        <h3 className="text-xs sm:text-sm font-black text-white uppercase -mt-0.5">
          Offer!
        </h3>
        <div className="mt-0.5 bg-white rounded-full px-2 py-0.5">
          <p className="text-[10px] sm:text-xs text-purple-700 font-black">
            50 SLOTS
          </p>
        </div>
        <p className="text-[8px] sm:text-[9px] text-white mt-0.5 font-semibold">
          {formatTime(timeLeft)}
        </p>
      </div>
      
      {/* Corner sparkles */}
      <Star className="absolute top-1 right-1 w-2.5 h-2.5 text-white animate-pulse" />
      <Star className="absolute bottom-1 left-1 w-2.5 h-2.5 text-white animate-pulse delay-75" />
    </div>
  </div>

  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
    Our Prices <span className={primaryColor}>From:</span>
  </h2>
  <div className="inline-block p-4 sm:p-5 bg-gray-900/70 rounded-xl border border-purple-700 shadow-lg shadow-purple-900/20">
    <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2">
      ₦250,000 – ₦1,200,000
    </p>
    <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
      (Price based on your business size and workflow complexity)
    </p>
  </div>
  <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-gray-300">
    Contact us for a tailored quote for your business needs.
  </p>
</section>

        {/* 4. Testimonial / Social Proof */}
        <section id="testimonial" className="pt-4 sm:pt-6 pb-4 sm:pb-6">
          <div className="max-w-7xl mx-auto p-4 sm:p-5 bg-gray-900/50 rounded-xl border-l-2 sm:border-l-3 border-purple-500 shadow-lg shadow-purple-900/50 mx-2">
            <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${primaryColor} mb-2 sm:mb-3`} />
            <blockquote className="text-sm sm:text-base italic text-gray-200 leading-relaxed">
              "Delacruz innovations automated our invoicing and client follow-up in just 5 days — we saved{' '}
              <span className="font-bold text-purple-400">10 hours per week!</span> The process was seamless."
            </blockquote>
            <p className="mt-3 sm:mt-4 text-right font-semibold text-white text-xs sm:text-sm">
              — Michael O., <span className="text-purple-400/80">Logistics Startup Founder</span>
            </p>
          </div>
        </section>
        
     

      </main>

      {/* Footer */}
      <footer className="py-4 bg-gray-900/80 text-center border-t border-purple-900/60 mt-4">
        <div className="flex justify-center gap-3 sm:gap-4 mb-2">
          {[
            { href: "#", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
            { href: "#", path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
            { href: "#", path: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" },
            { href: "#", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }
          ].map((social, index) => (
            <a key={index} href={social.href} className="text-gray-400 hover:text-purple-400 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Delacruz Innovations. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
};

export default LandingPage6;