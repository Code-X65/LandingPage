import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Mail, Clock, Zap, DollarSign, Send, CheckCircle, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import * as THREE from 'three';

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
// 4. MAIN APP COMPONENT
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
            {/* Fixed WhatsApp Button */}
            <a 
                href="https://wa.me/2348012345678"
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
                <header className="py-3 flex justify-center items-center mb-6">
                    <h1 className="text-2xl font-extrabold text-purple-500 tracking-wider">
                        DELACRUZ
                    </h1>
                </header>

                {/* Hero Section - Reduced Height */}
                <section className="relative h-[70vh] flex flex-col justify-center items-center text-center overflow-hidden mb-12">
                    <ThreeJsHero />

                    <div className="relative z-10 max-w-4xl p-4 md:p-6 bg-black/40 rounded-xl mx-2">
                        <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-purple-400 mb-2">
                            Website Revamp + Integrated Systems
                        </p>
                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
                            Upgrade Your Website This Detty December. <br className="hidden md:block" />
                            <span className="text-xl md:text-3xl lg:text-4xl">Launch in 7 Days!!</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto mb-4 md:mb-6">
                            Professional website + payment + WhatsApp CRM for businesses.
                        </p>
                        
                        <div className="flex justify-center" id="cta">
                            <a 
                                href="#cta-form" 
                                className="px-4 py-2 md:px-6 md:py-3 bg-white text-black font-bold text-sm md:text-base rounded-full shadow-2xl shadow-purple-500/50 
                                           hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-300 group whitespace-nowrap"
                            >
                                <Zap className="w-4 h-4 inline mr-1 group-hover:rotate-6 transition duration-200"/>
                                Reserve Your Slot!
                            </a>
                        </div>
                    </div>
                </section>

                {/* Benefits Carousel */}
                <section className="mb-12 px-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                        How we benefit your <span className='text-purple-500'>business?</span>
                    </h2>
                    <Carousel items={benefits} />
                </section>
                
                {/* Pricing Section with Stickers */}
                <section className="mb-12 px-2 relative">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">Pricing</h2>
                    
                    {/* Urgency Sticker */}
                    {/* <div className="absolute top-0 left-2 sm:left-4 lg:left-8 z-40">
                        <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] shadow-2xl shadow-red-900/60 transform rotate-12 hover:rotate-0 hover:scale-150 transition-all duration-500 cursor-pointer">
                            <div className="absolute inset-0 rounded-full border-4 border-yellow-300 border-dashed animate-spin-slow"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 mb-0.5 animate-pulse" />
                                <h3 className="text-[9px] sm:text-xs font-black text-white uppercase text-center leading-tight">
                                    Only
                                </h3>
                                <div className="bg-yellow-300 rounded-full px-2 py-0.5 my-0.5">
                                    <p className="text-[10px] sm:text-xs text-red-700 font-black">30</p>
                                </div>
                                <p className="text-[8px] sm:text-[9px] text-yellow-100 font-semibold text-center leading-tight">
                                    Slots Left!
                                </p>
                            </div>
                            <Star className="absolute top-1 right-1 w-2.5 h-2.5 text-yellow-300 animate-pulse" />
                            <Star className="absolute bottom-1 left-1 w-2.5 h-2.5 text-yellow-300 animate-pulse delay-75" />
                        </div>
                    </div> */}

                    {/* Limited Offer Sticker */}
                    <div className="absolute top-0 right-2 sm:right-4 lg:right-8 z-40">
                        <div className="relative bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] shadow-2xl shadow-purple-900/60 transform -rotate-12 hover:rotate-0 hover:scale-150 transition-all duration-500 cursor-pointer">
                            <div className="absolute inset-0 rounded-full border-4 border-white border-dashed animate-spin-slow"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white mb-0.5 animate-pulse" />
                                <h3 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider">
                                    Limited
                                </h3>
                                <h3 className="text-xs sm:text-sm font-black text-white uppercase -mt-0.5">
                                    Offer!
                                </h3>
                                <div className="mt-0.5 bg-white rounded-full px-2 py-0.5">
                                    <p className="text-[10px] sm:text-xs text-purple-700 font-black">
                                        30 SLOTS
                                    </p>
                                </div>
                            </div>
                            <Star className="absolute top-1 right-1 w-2.5 h-2.5 text-white animate-pulse" />
                            <Star className="absolute bottom-1 left-1 w-2.5 h-2.5 text-white animate-pulse delay-75" />
                        </div>
                    </div>
                    
                    <div className="max-w-3xl mx-auto mt-16">
                        <div className="p-6 md:p-8 rounded-2xl text-center shadow-xl bg-gradient-to-r from-purple-900/70 to-gray-900/70 border-2 border-purple-500">
                            <h3 className="text-xl md:text-2xl font-extrabold mb-3 text-white">Complete Revamp Package</h3>
                            <p className="text-3xl md:text-5xl font-extrabold text-purple-400 mb-4">
                                ₦180,000 – ₦850,000
                            </p>
                            <p className="text-gray-300 mb-4 text-sm md:text-base">Custom solutions for your business</p>
                            <a 
                                href="#cta" 
                                className="inline-block px-6 py-2 md:px-8 md:py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 transition-colors text-sm md:text-base whitespace-nowrap"
                            >
                                Get Custom Quote
                            </a>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="mb-12 px-2">
                    <div className="bg-purple-900/30 p-4 md:p-6 rounded-xl border border-purple-700/50 shadow-2xl shadow-purple-900/50 text-center">
                        <p className="text-xl md:text-2xl font-bold text-white mb-4">
                            Reserve Your Slot Now!
                        </p>
                        
                        <a 
                            href="#cta" 
                            className="inline-block px-6 py-2 md:px-8 md:py-3 bg-purple-500 text-white font-bold text-sm md:text-lg rounded-full shadow-lg 
                                       hover:bg-purple-400 transform hover:translate-y-[-2px] transition duration-300 whitespace-nowrap"
                        >
                            <Mail className="w-4 h-4 md:w-5 md:h-5 inline mr-2"/>
                            Secure Slot (30 Left)
                        </a>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-4 border-t border-gray-800 text-center text-gray-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} DELACRUZ. All Rights Reserved.</p>
                </footer>
            </main>
        </div>
    );
};

export default LandingPage2;