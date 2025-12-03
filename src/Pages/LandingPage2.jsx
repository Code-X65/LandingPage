import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Mail, Clock, Zap, DollarSign, Send, CheckCircle, ChevronLeft, ChevronRight, Star, Quote, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import amala from '../assets/amala.png'
import benfash from '../assets/benfash.png'
import cqc from '../assets/cqc.png'
import easyjet from '../assets/easyjet.png'
import echohive from '../assets/echohive.png'
import * as THREE from 'three';
import LOGO from '../assets/logo.png'

// ====================================================================
// Custom WhatsApp Icon Component
// ====================================================================

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

// ====================================================================
// 1. UTILITY: SCROLL DIRECTION & PULSE HOOK
// ====================================================================

const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState("up");
  const [isPulsing, setIsPulsing] = useState(false);
  const lastScrollY = useRef(0);
  const pulseTimeout = useRef(null);

  const updateScrollDir = useCallback(() => {
    const scrollY = window.scrollY;

    if (Math.abs(scrollY - lastScrollY.current) > 20) {
      const newDir = scrollY > lastScrollY.current ? "down" : "up";
      if (newDir !== scrollDir) {
        setScrollDir(newDir);
        setIsPulsing(true);
        
        if (pulseTimeout.current) {
          clearTimeout(pulseTimeout.current);
        }
        pulseTimeout.current = setTimeout(() => {
          setIsPulsing(false);
        }, 150);
      }
      lastScrollY.current = scrollY > 0 ? scrollY : 0;
    }
  }, [scrollDir]);

  useEffect(() => {
    window.addEventListener("scroll", updateScrollDir);
    return () => {
      window.removeEventListener("scroll", updateScrollDir);
      if (pulseTimeout.current) {
        clearTimeout(pulseTimeout.current);
      }
    };
  }, [updateScrollDir]);

  return { isPulsing };
};

// ====================================================================
// 2. HERO COMPONENT: THREE.JS INTEGRATION
// ====================================================================

const ThreeJsHero = () => {
    const mountRef = useRef(null);
    
    useEffect(() => {
        let scene, camera, renderer, geometry, material, cube;
        let animationFrameId;

        const currentMount = mountRef.current;
        if (!currentMount) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setClearColor(0x000000, 0);
        currentMount.appendChild(renderer.domElement);

        geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
        material = new THREE.MeshPhysicalMaterial({
            color: 0x9333ea,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            emissive: 0x6d28d9,
            emissiveIntensity: 0.5
        });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const pointLight = new THREE.PointLight(0xa855f7, 20);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const ambientLight = new THREE.AmbientLight(0x4c1d95, 0.5);
        scene.add(ambientLight);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.008;
            renderer.render(scene, camera);
        };

        const handleResize = () => {
            if (!currentMount) return;
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} className="absolute inset-0 z-0 opacity-70" />
    );
};

// ====================================================================
// 3. CAROUSEL COMPONENT
// ====================================================================

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    useEffect(() => {
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, []);

    const Item = items[currentIndex];

    return (
        <div className="relative">
            <div className="p-6 bg-gray-900/70 backdrop-blur-md rounded-xl border border-purple-700/50 shadow-lg min-h-[200px] flex flex-col justify-center">
                <Item.icon className="w-10 h-10 text-purple-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2 text-center">{Item.title}</h3>
                <p className="text-gray-300 text-center text-sm">{Item.description}</p>
            </div>

            <div className="flex justify-center mt-4 gap-2">
                {items.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-purple-500 w-6' : 'bg-gray-600'}`}
                    />
                ))}
            </div>
        </div>
    );
};

// ====================================================================
// 5. DARK THEME SOCIAL PROOF COMPONENT (Matches your landing page style)
// ====================================================================

const SocialProofDark = ({ 
  quote = "Working with Delacruz transformed our digital presence. The new website not only looks incredible but actually converts - we've seen a consistent uptick in qualified leads month over month.",
  author = "Sarah Johnson",
  position = "Marketing Director at TechCorp",
  company = "TechCorp",
  image = null,
  platform = "LinkedIn",
  date = "2 weeks ago",
  optional = true
}) => {
  return (
    <div className="max-w-4xl mx-auto p-2 md:p-6">
      {/* Optional label */}
      {optional && (
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-300 border border-blue-700/50">
            <CheckCircle className="w-4 h-4 mr-2" />
            Client Testimonial
          </span>
        </div>
      )}

      {/* Testimonial Card */}
      <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 md:p-8 border border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Header with platform and date */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-400">{platform}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
        </div>

        {/* Author info at top */}
        <div className="flex items-center mb-4">
          {/* Avatar */}
          <div className="flex-shrink-0 mr-4">
            {image ? (
              <img src={image} alt={author} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          
          {/* Author details */}
          <div className="flex-1">
            <p className="font-semibold text-white text-base">{author}</p>
            <p className="text-gray-400 text-xs md:text-sm font-medium">{position}</p>
            <p className="text-gray-500 text-xs mt-0.5">{company}</p>
          </div>

          {/* Date */}
          <span className="text-xs text-gray-500">{date}</span>
        </div>

        {/* Quote text */}
        <blockquote className="mb-4">
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            "{quote}"
          </p>
        </blockquote>

        {/* Engagement metrics (like/comment counts) */}
        <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span>28 reactions</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>12 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// ====================================================================
// TESTIMONIALS SLIDER COMPONENT
// ====================================================================

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
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-purple-700/50 shadow-lg p-6 md:p-8 min-h-[350px] md:min-h-[400px]">
        {/* Company Logo */}
        <div className="flex justify-center mb-4 md:mb-6">
          <img 
            src={testimonials[currentIndex].logo} 
            alt={testimonials[currentIndex].company}
            className="h-20 md:h-20 object-contain opacity-90"
          />
        </div>

 

        {/* Quote Icon */}
        <div className="flex justify-center mb-3">
          <Quote className="w-8 h-8 md:w-10 md:h-10 text-purple-400/50" />
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-sm md:text-base text-gray-200 leading-relaxed mb-6 text-center px-2">
          "{testimonials[currentIndex].text}"
        </blockquote>

        {/* Author Info */}
        <div className="text-center border-t border-gray-800 pt-4">
          <p className="font-semibold text-white text-base md:text-lg">
            — {testimonials[currentIndex].author}
          </p>
          {testimonials[currentIndex].role && (
            <p className="text-purple-400/80 text-xs md:text-sm mt-1">
              {testimonials[currentIndex].role}
            </p>
          )}
        </div>

        {/* Engagement metrics */}
        <div className="flex items-center justify-center gap-6 pt-4 mt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span>28 reactions</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>12 comments</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 p-2 md:p-3 rounded-full transition-all -ml-2 md:-ml-4 shadow-lg"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 p-2 md:p-3 rounded-full transition-all -mr-2 md:-mr-4 shadow-lg"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-purple-400 w-6 md:w-8' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ====================================================================
// 6. TOP SPLASH COMPONENT
// ====================================================================

const TopSplash = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-black to-purple-900 py-3 px-4 border-b border-purple-700/50">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500 rounded-full mix-blend-screen opacity-10 animate-ping"></div>
      </div>
      
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span className="text-xl font-bold text-white">DETTY DECEMBER SPECIAL</span>
        </div>
        
      
      </div>
      
      {/* Animated border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
    </div>
  );
};

// ====================================================================
// 7. BIG LIMITED OFFER STICKER
// ====================================================================

const BigLimitedOffer = () => {
  return (
<div className="hidden absolute right-20 top-2 z-50 animate-bounce-slow scale-150 ">
  <div className="relative bg-gradient-to-br from-red-500 via-pink-600 to-purple-700 
      rounded-xl shadow-lg px-3 py-2 cursor-pointer transition-all duration-300 
      hover:scale-105 hover:shadow-red-800/40 rounded-full">

    {/* Speech bubble pointer */}
    <div className="absolute -bottom-1 right-3 w-3 h-3 bg-gradient-to-br from-red-500 to-purple-700 
        rotate-45"></div>

    {/* Glow */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 
        blur-md opacity-40"></div>

    {/* Content */}
    <div className="relative z-10 flex items-center gap-2">
      <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />

      <div className="text-white text-xs font-bold leading-tight">
        <p className="uppercase tracking-wider">Limited</p>
        <p className="uppercase text-[10px]">Offer!</p>
      </div>
    </div>
  </div>
</div>


  );
};

// ====================================================================
// 8. MAIN APP COMPONENT
// ====================================================================

const LandingPage2 = () => {
    const { isPulsing } = useScrollDirection();

    const benefits = [
        { icon: CheckCircle, title: "Modern Website", description: "Sleek, fast, gorgeous on all devices." },
        { icon: Zap, title: "Payment & CRM", description: "Take payments & manage leads instantly." },
        { icon: Clock, title: "7-Day Delivery", description: "Fully functional in one week." },
        { icon: DollarSign, title: "Revenue Ready", description: "Convert visitors to customers immediately." },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
            {/* Top Splash */}
            <TopSplash />
            
            {/* Fixed WhatsApp Button */}
            <a 
                href="https://api.whatsapp.com/send/?phone=2349052765358&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-2xl transition-all hover:scale-110 group"
            >
                <Whatsapp className="w-7 h-7 text-white" />
                <span className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Chat with us!
                </span>
            </a>

            <main
                className={`max-w-6xl mx-auto py-4 px-4 transition-all duration-150 ease-out 
                ${isPulsing ? 'scale-[0.99] blur-[0.5px] brightness-125' : 'scale-100 blur-0 brightness-100'}`}
            >
                {/* Header */}
                <header className="py-1 flex justify-center items-center ">
                 <img src={LOGO} alt="Delacruz Innovations" className='w-25 h-25 object-contain' />
                </header>
                
             
                
                {/* Hero Section - Reduced Height */}
                <section className="relative py-8 flex flex-col justify-center items-center text-center overflow-hidden mb-4">
                    <ThreeJsHero />

                    <div className="relative z-10 max-w-4xl p-4 md:p-6 bg-black/40 rounded-xl mx-2">
                       {/* Big Limited Offer Sticker */}
                <div className="flex justify-center mb-4">
                  <BigLimitedOffer />
                </div>
                        <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-purple-400 mb-2">
                            Website Revamp + Integrated Systems
                        </p>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
                            Upgrade Your Website This Detty December.
                            <br /> 
                            <span className="text-xl md:text-3xl lg:text-4xl">Launch in 7 Days!!</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto mb-4 md:mb-6">
                          Professional Website + Payment Integration + WhatsApp CRM. Perfect for Businesses ready to boost sales before year end.

                        </p>
                        
                        <div className="flex justify-center mx-4" id="cta">
                            <a 
                            target='_blank'
                                href="https://api.whatsapp.com/send/?phone=2349052765358&text&type=phone_number&app_absent=0" 
                                className="px-4 py-3 md:px-6 md:py-3 bg-white text-black font-bold text-md md:text-base rounded-full shadow-2xl shadow-purple-500/50 
                                           hover:bg-purple-500 hover:text-white transform  transition-all duration-300 group whitespace-nowrap flex items-center gap-1"
                            >
                               
                               Reserve Your December Website Revamp Slot! <Whatsapp className="w-7 h-7 text-green-500 " />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Benefits Carousel */}
                <section className="mb-2 px-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                        How we benefit your Business?
                    </h2>
                    <Carousel items={benefits} />
                </section>
                
                {/* Pricing Section with Stickers */}
                <section className="mb-4 px-2 relative">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">Our Prices Ranges From -</h2>
                    
                    {/* Limited Offer Sticker */}
                    {/* <div className="absolute top-0 right-2 sm:right-4 lg:right-8 z-40">
                        <div className="relative bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] shadow-2xl shadow-purple-900/60 transform -rotate-12 hover:rotate-0 hover:scale-150 transition-all duration-500 cursor-pointer">
                            <div className="absolute inset-0 rounded-full border-4 border-white border-dashed animate-spin-slow"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white mb-0.5 animate-pulse" />
                                <h3 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider">
                                    Limited
                                </h3>
                                <h3 className="text-xs sm:text-sm font-black text-white uppercase -mt-0.5">
                                    Offer!
                                </h3>
                                <div className="mt-0.5 bg-white rounded-full px-1 py-0.5">
                                    <p className="text-[10px] sm:text-xs text-purple-700 font-black">
                                        30 SLOTS
                                    </p>
                                </div>
                            </div>
                            <Star className="absolute top-1 right-1 w-2.5 h-2.5 text-white animate-pulse" />
                            <Star className="absolute bottom-1 left-1 w-2.5 h-2.5 text-white animate-pulse delay-75" />
                        </div>
                    </div> */}
                    
                    <div className="max-w-3xl mx-auto mt-4">
                        <div className="p-6 md:px-8 rounded-2xl text-center shadow-xl bg-gradient-to-r from-purple-900/70 to-gray-900/70 border-2 border-purple-500">
                            <h3 className="text-xl md:text-2xl font-extrabold mb-3 text-white">Complete Revamp Package</h3>
                            <p className="text-xl md:text-5xl font-extrabold text-purple-400 mb-4">
                                ₦180,000 – ₦850,000
                            </p>
                            <p className="text-gray-300 mb-4 text-sm md:text-base">Custom solutions for your business</p>
                        </div>
                    </div>
                </section>

                <div className='text-xl font-bold text-center mb-4 uppercase'>
                  Slots are filling fast for Detty December only 30 openings left
                </div>

                {/* Social Proof Section - Dark Theme */}
                <section className="mb-8 px-2">
                <TestimonialSlider />
                </section>

              {/* Footer */}
              <footer className="py-8 border-t border-gray-800 text-center">
                {/* Social Media Links */}
                <div className="flex justify-center items-center gap-6 mb-4">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://web.facebook.com/profile.php?id=61582853766401" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://x.com/Delacruz_Inno" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-sky-500 transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/delacruzinnovations/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-pink-500 transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="mailto:info@delacruzinnovations.com"
                    className="text-gray-500 hover:text-green-500 transition-colors duration-200"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

                {/* Copyright */}
                <p className="text-gray-500 text-xs">
                  &copy; {new Date().getFullYear()} DELACRUZ. All Rights Reserved.
                </p>
              </footer>
            </main>
            
            {/* Add custom animations to Tailwind */}
            <style jsx global>{`
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0) rotate(3deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(3deg);
                    }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default LandingPage2;