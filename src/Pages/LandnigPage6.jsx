import React, { useState, useEffect } from 'react';
import { Clock, Zap, Target, DollarSign, ArrowRight, Star, AlertTriangle, MessageSquare, Briefcase, Users, CheckCircle, Send } from 'lucide-react';

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
`;

const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 md:p-8 bg-gray-900/50 backdrop-blur-sm border border-purple-900 hover:border-purple-600 transition-all duration-300 rounded-xl shadow-2xl hover:shadow-purple-900/80">
    <Icon className={`w-8 h-8 md:w-10 md:h-10 ${primaryColor} mb-4`} />
    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm md:text-base">{description}</p>
  </div>
);

const AuditForm = ({ primaryBg, primaryHoverBg }) => {
    const [formState, setFormState] = useState({ name: '', email: '', businessSize: '' });
    const [status, setStatus] = useState(null); // 'idle', 'loading', 'success', 'error'

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call for audit booking
        setTimeout(() => {
            if (formState.name && formState.email && formState.businessSize) {
                setStatus('success');
                setFormState({ name: '', email: '', businessSize: '' });
            } else {
                setStatus('error');
            }
        }, 2000);
    };

    const InputField = ({ name, type = 'text', placeholder }) => (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={formState[name]}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border-b-2 border-purple-500 text-white placeholder-gray-500 focus:outline-none focus:border-purple-300 rounded-t-md transition duration-300"
            required
        />
    );

    return (
        <div className="mt-12 p-8 md:p-10 bg-gray-900/80 rounded-2xl shadow-inner shadow-purple-900 max-w-lg mx-auto border border-purple-800">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Request Your FREE Audit
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField name="name" placeholder="Your Full Name" />
                <InputField name="email" type="email" placeholder="Business Email Address" />
                
                <select
                    name="businessSize"
                    value={formState.businessSize}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 border-b-2 border-purple-500 text-white focus:outline-none focus:border-purple-300 rounded-t-md transition duration-300 appearance-none"
                    required
                >
                    <option value="" disabled>Select Business Size (Employees)</option>
                    <option value="1-5">1 - 5 (Solo/Small Team)</option>
                    <option value="6-20">6 - 20 (SME)</option>
                    <option value="21-50">21 - 50 (Mid-Size)</option>
                    <option value="50+">50+ (Large Enterprise)</option>
                </select>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`
                        w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-bold
                        rounded-full transition duration-300 transform
                        ${primaryBg} ${primaryHoverBg} text-white hover:scale-[1.02]
                        ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}
                    `}
                >
                    {status === 'loading' ? (
                        <>
                            <Zap className="w-5 h-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Submit Audit Request <Send className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            {status === 'success' && (
                <div className="mt-4 p-4 bg-green-900/50 border-l-4 border-green-500 text-green-300 rounded">
                    Audit successfully booked! We'll be in touch shortly.
                </div>
            )}
            {status === 'error' && (
                <div className="mt-4 p-4 bg-red-900/50 border-l-4 border-red-500 text-red-300 rounded">
                    Please fill out all fields.
                </div>
            )}
        </div>
    );
};


const LandingPage6 = () => {
  // Simple state for a countdown timer (simulating urgency)
  // Re-initializing to 72 hours for demonstration purposes
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
      description: 'Save up to 40% of your time on daily, repetitive tasks by handing them over to smart automation.',
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

  return (
    <div className="min-h-screen text-white font-inter animated-grid-background">
      {/* Embedded Styles */}
      <style>{customStyles}</style>

      {/* Header/Navigation Placeholder */}
      <header className="py-4 px-6 md:px-12 sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-purple-900/60">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-extrabold text-white">Delacruz <span className={primaryColor}>Automation</span></h1>
          <a href="#audit" className={`px-4 py-2 text-sm font-semibold rounded-full ${primaryBg} transition duration-300 hover:scale-105 hidden sm:block`}>
            Book Audit
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-20">

        {/* 1. Hero Section (Headline, Subheadline, CTA) */}
        <section id="hero" className="text-center pt-8 md:pt-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-purple-400/80">
            {/* Offer Timer */}
            <AlertTriangle className="inline w-4 h-4 mr-1 mb-1" />
            Limited Offer Ends In: <span className="text-lg font-mono text-yellow-300 ml-2">{formatTime(timeLeft)}</span>
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
            <span className={`digital-glow-text ${primaryColor}`}>Detty December Special:</span>
            <br />
            Automate Your Business Before Year-End!
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Stop wasting money and time on manual tasks. Let Delacruz automate your key business workflows in just <span className="font-bold text-purple-300">7 days.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Primary CTA Button */}
            <a
              href="#audit"
              className={`
                flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold
                rounded-full transition duration-500 transform
                ${primaryBg} ${primaryHoverBg} text-white pulse-glow-button
                w-full sm:w-auto shadow-2xl shadow-purple-500/50
              `}
            >
              Book Your FREE Automation Audit Now!
              <ArrowRight className="w-5 h-5 ml-1" />
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/2348012345678" // Placeholder WhatsApp link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full transition duration-300 transform border-2 border-purple-500 text-purple-400 hover:bg-purple-900/40 w-full sm:w-auto shadow-md"
            >
              <MessageSquare className="w-5 h-5" />
              Chat with Tosin Instantly!
            </a>
          </div>
        </section>

        {/* 2. Benefits Section */}
        <section id="benefits" className="pt-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Automate With <span className={primaryColor}>Delacruz?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </section>

        {/* 3. Limited Offer / Urgency */}
        <section id="limited-offer" className="bg-gradient-to-r from-purple-900/50 to-purple-900/30 border-t-4 border-b-4 border-purple-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-purple-800/50">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-yellow-400 mr-3 animate-bounce" />
            <h3 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">
              Limited Offer Alert
            </h3>
            <Star className="w-6 h-6 text-yellow-400 ml-3 animate-bounce" />
          </div>
          <p className="text-xl md:text-2xl text-white font-semibold mb-6">
            Only <span className="text-4xl text-yellow-300 font-black">50 slots</span> available this Detty December!
          </p>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Act fast before your competitors automate first and gain an unfair advantage in efficiency and client service.
          </p>
        </section>

        {/* 4. Pricing Section */}
        <section id="pricing" className="text-center pt-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Investment <span className={primaryColor}>Details</span>
          </h2>
          <div className="inline-block p-6 md:p-8 bg-gray-900/70 rounded-2xl border border-purple-700 shadow-xl shadow-purple-900/20">
            <p className="text-4xl font-extrabold text-white mb-2">
              ₦250,000 – ₦1,200,000
            </p>
            <p className="text-gray-400 text-lg">
              (Final price determined based on your unique business size and complexity of workflows)
            </p>
          </div>
          <p className="mt-8 text-lg text-gray-300">
            Start with the FREE Audit to get a tailored quote for your business needs.
          </p>
        </section>

        {/* 5. Testimonial / Social Proof */}
        <section id="testimonial" className="pt-10">
          <div className="max-w-4xl mx-auto p-8 md:p-10 bg-gray-900/50 rounded-3xl border-l-4 border-purple-500 shadow-2xl shadow-purple-900/50">
            <Star className={`w-8 h-8 ${primaryColor} mb-4`} />
            <blockquote className="text-xl italic text-gray-200 leading-relaxed">
              “Delacruz innovations automated our invoicing and client follow-up in just 5 days — we saved <span className="font-bold text-purple-400">10 hours per week!</span> The process was seamless.”
            </blockquote>
            <p className="mt-6 text-right font-semibold text-white">
              — Michael O., <span className="text-purple-400/80">Logistics Startup Founder</span>
            </p>
          </div>
        </section>
        
        {/* 6. Final CTA / Audit Form */}
        <section id="audit" className="pb-16 pt-10 text-center">
            <h2 className="text-4xl font-extrabold mb-4">
                Ready to <span className={primaryColor}>Automate?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
                Fill out the form below to initiate your FREE, no-obligation automation audit.
            </p>
            <AuditForm primaryBg={primaryBg} primaryHoverBg={primaryHoverBg} />
        </section>

      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-900/80 text-center border-t border-purple-900/60">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Delacruz Innovations. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage6;