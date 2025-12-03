import React, { useState, useEffect } from 'react';
import { Clock, Zap, Target, DollarSign, ArrowRight, Star, AlertTriangle, MessageSquare, Briefcase, Users, CheckCircle, Send, MessageCircle } from 'lucide-react';
import Santa_cap from '../assets/santa_logo.png'
import amala from '../assets/amala.png'
import benfash from '../assets/benfash.png'
import cqc from '../assets/cqc.png'
import easyjet from '../assets/easyjet.png'
import echohive from '../assets/echohive.png'

// UTM Tracking Functions
const getUTMParameters = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || 'direct',
    utm_medium: params.get('utm_medium') || 'none',
    utm_campaign: params.get('utm_campaign') || 'none',
    utm_content: params.get('utm_content') || 'none',
    utm_term: params.get('utm_term') || 'none'
  };
};

const trackUTMEvent = (eventName, utmData) => {
  // Log to console for debugging
  console.log('UTM Event:', eventName, utmData);
  
  // Send to Google Analytics (GA4)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      campaign_source: utmData.utm_source,
      campaign_medium: utmData.utm_medium,
      campaign_name: utmData.utm_campaign,
      campaign_content: utmData.utm_content,
      campaign_term: utmData.utm_term,
      cta_name: utmData.cta_name || null,
      cta_location: utmData.cta_location || null,
      page_location: window.location.href,
      page_title: document.title
    });
  }
  
  // Store in memory for session tracking
  if (typeof window !== 'undefined') {
    window.utmTracking = window.utmTracking || [];
    window.utmTracking.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...utmData
    });
  }
};

const buildTrackingURL = (baseURL, utmParams) => {
  const url = new URL(baseURL);
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value && value !== 'none') {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
};

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

const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="p-4 sm:p-5 bg-gray-900/50 backdrop-blur-sm border border-purple-900 hover:border-purple-600 transition-all duration-300 rounded-xl shadow-xl hover:shadow-purple-900/60 h-full">
    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${primaryColor} mb-2 sm:mb-3`} />
    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">{title}</h3>
    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{description}</p>
  </div>
);

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      company: "AmalaOnTheGo",
      logo: amala,
      text: "Delacruz Innovations transformed our brand and operations beyond our expectations. Their strategic approach helped us streamline our online ordering system, increase customer engagement, and scale our visibility rapidly. We've seen a significant boost in daily orders and customer retention since they came on board.",
      author: "AmalaOnTheGo Team",
      role: ""
    },
    {
      company: "Benfash",
      logo: benfash,
      text: "Working with Delacruz Innovations completely reshaped our fashion brand's digital presence. From brand positioning to e-commerce optimisation, their team delivered with precision, creativity, and excellence. Our online sales increased and our brand identity became clearer, stronger, and more professional.",
      author: "Benfash Creative Director",
      role: ""
    },
    {
      company: "EchoHive Creatives",
      logo: echohive,
      text: "Delacruz Innovations brought structure, clarity, and strategic direction to our creative agency. Their consulting support helped us define our service lines, organise our workflow, and develop a scalable business model. Their expertise elevated our brand and positioned us for long-term success.",
      author: "EchoHive Creatives Management",
      role: ""
    },
    {
      company: "Care Quality Commission",
      logo: cqc,
      text: "Delacruz Innovations demonstrated exceptional professionalism supporting our service improvement initiatives. Their analytical approach, documentation quality, and stakeholder coordination were of the highest standard. They helped enhance our operational processes, ensuring compliance, efficiency, and better communication within teams.",
      author: "Senior Compliance Officer",
      role: "Care Quality Commission – Sheffield"
    },
    {
      company: "easyJet",
      logo: easyjet,
      text: "Delacruz Innovations added tremendous value to our digital and operational transformation efforts. Their clarity, business analysis expertise, and ability to simplify complex workflows were instrumental in improving efficiency across our teams. Their consultants deliver work that is consistently accurate, timely, and impactful.",
      author: "Project Lead",
      role: "easyJet Luton"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-2 sm:px-4">
      <div className="bg-gray-900/50 rounded-xl border border-purple-700 shadow-lg shadow-purple-900/50 p-4 sm:p-6 md:p-8 min-h-[300px] sm:min-h-[350px]">
        {/* Company Logo */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <img 
            src={testimonials[currentIndex].logo} 
            alt={testimonials[currentIndex].company}
            className="h-20 sm:h-20 object-contain opacity-90"
          />
        </div>

        {/* Star Rating */}
        <div className="flex justify-center gap-1 mb-3 sm:mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 fill-purple-400" />
          ))}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-sm sm:text-base italic text-gray-200 leading-relaxed mb-4 sm:mb-6 text-center px-2">
          "{testimonials[currentIndex].text}"
        </blockquote>

        {/* Author Info */}
        <div className="text-center">
          <p className="font-semibold text-white text-sm sm:text-base">
            — {testimonials[currentIndex].author}
          </p>
          {testimonials[currentIndex].role && (
            <p className="text-purple-400/80 text-xs sm:text-sm mt-1">
              {testimonials[currentIndex].role}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 p-2 sm:p-3 rounded-full transition-all -ml-2 sm:-ml-4"
        aria-label="Previous testimonial"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 p-2 sm:p-3 rounded-full transition-all -mr-2 sm:-mr-4"
        aria-label="Next testimonial"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-4 sm:mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-purple-400 w-6 sm:w-8' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const LandingPage6 = () => {
  // Simple state for a countdown timer (simulating urgency)
  const [timeLeft, setTimeLeft] = useState(72 * 3600); 
  const [utmParams, setUtmParams] = useState({});

  useEffect(() => {
    // Capture UTM parameters on page load
    const params = getUTMParameters();
    setUtmParams(params);
    trackUTMEvent('page_view', params);
  }, []);

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

  const handleCTAClick = (ctaName) => {
    trackUTMEvent('cta_click', {
      ...utmParams,
      cta_name: ctaName,
      cta_location: 'main'
    });
  };

  const handleWhatsAppClick = () => {
    trackUTMEvent('whatsapp_click', utmParams);
  };

  const benefits = [
    {
      icon: Clock,
      title: 'Time Savings',
      description: 'Save up to 40% of your time on daily repetitive manual tasks by handing them over to smart automation!',
    },
    {
      icon: CheckCircle,
      title: 'Precision & Accuracy',
      description: 'Dramatically reduce human errors and improve the efficiency including quality of your business outputs.',
    },
    {
      icon: Users,
      title: 'Simplified Training',
      description: 'We train your team in the new, simple automated workflows in less than a day, ensuring fast adoption.',
    },
  ];

  const whatsappNumber = "2348012345678";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your Detty December Automation Special. Can you tell me more?");

  return (
    <div className="min-h-screen text-white font-inter animated-grid-background relative">
      {/* Embedded Styles */}
      <style>{customStyles}</style>

      {/* Google Analytics GA4 Script */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-67B91K1K5Q"></script>
      <script dangerouslySetInnerHTML={{__html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-67B91K1K5Q', {
          send_page_view: false
        });
      `}} />

           {/* Fixed WhatsApp Button */}
            <a 
                href={`https://api.whatsapp.com/send/?phone=2349052765358&text&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-2xl transition-all hover:scale-110 group"
            >
                <Whatsapp className="w-7 h-7 text-white" />
                <span className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Chat with us!
                </span>
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
          <p className="text-2xl sm:text-sm font-semibold uppercase tracking-widest mb-3 text-purple-400/80">
            <AlertTriangle className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 mb-1 text-xl" />
            Detty December Special!!!
          </p>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 leading-tight">
            <span className={`digital-glow-text `}>
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
            <span className="text-white"> Before Year End!</span>
          </h2>
          
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-7 px-2 leading-relaxed">
            Stop wasting money and time on manual tasks. Let Delacruz automate your key business workflows in just{' '}
            <span className="font-bold text-purple-300">7 days!</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto">
            <a
              href="https://api.whatsapp.com/send/?phone=2349052765358&text&type=phone_number&app_absent=0"
              onClick={() => handleCTAClick('free_automation_audit')}
              className={`
                flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold
                rounded-full transition duration-500 transform
                bg-white text-black pulse-glow-button
                w-full sm:w-auto shadow-xl shadow-purple-500/40
                hover:scale-[1.02] active:scale-95
              `}
            >
              Book Your FREE Automation Audit!
              <Whatsapp className="w-9 h-9 text-green-500 font-bold" />
            </a>
          </div>
        </section>

        {/* 2. Benefits Section */}
        <section id="benefits" className="pt-4 sm:pt-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 px-4">
            How we benefit your business?
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


  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
    Our Prices Ranges From -
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
        {/* <section id="testimonial" className="pt-4 sm:pt-6 pb-4 sm:pb-6">
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
        </section> */}
        <TestimonialSlider />
        
     

      </main>

      {/* Footer */}
 {/* Footer */}
{/* Footer */}
<footer className="py-4 bg-gray-900/80 text-center border-t border-purple-900/60 mt-4">
  <div className="flex justify-center gap-3 sm:gap-4 mb-2">
    {[
      { 
        href: "https://web.facebook.com/profile.php?id=61582853766401", 
        path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" 
      },
      { 
        href: "https://x.com/Delacruz_Inno", 
        path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" 
      },
      { 
        href: "https://www.instagram.com/delacruzinnovations/", // Replace with your Instagram URL
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      },
      { 
        href: "https://www.tiktok.com/@delacruzinnovation", // Replace with your TikTok URL
        path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
      },
     { 
  href: "#", // Replace with your website URL
  path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 19v-6h-3l4-7 4 7h-3v6h-2zm10-2.5c0 2.485-2.017 4.5-4.5 4.5S11 18.985 11 16.5s2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5z"
}
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