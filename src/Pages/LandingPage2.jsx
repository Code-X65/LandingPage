import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Mail, Clock, Zap, DollarSign, Send, CheckCircle } from 'lucide-react';
import * as THREE from 'three';
// ====================================================================
// Custom WhatsApp Icon Component (Fixes the import error)
// ====================================================================

const Whatsapp = (props) => (
    <svg 
        {...props} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 3.32 1.6 6.22 4.07 7.92L4 22l2.31-.69c.5.15 1.02.25 1.55.25C14.02 21.5 22 17.15 22 12 22 6.48 17.52 2 12 2zM17.43 14.82c-.1-.17-.4-.27-.85-.45s-2.61-1.29-3.02-1.42c-.41-.13-.7-.2-.99.2c-.29.41-.38 1-.19 1.41.19.41.87 1.03.94 1.11.07.08.14.18.04.37-.1.19-.3.26-.59.38-.29.12-1.35.53-2.57.98-.94.35-1.55.51-2.07.49-.52-.02-1.22-.19-1.57-.33-.35-.14-.7-.2-.96-.2C6.39 15 6 15.19 6 15.54c0 .35.35.79.45.91.1.12.23.28.37.45.14.17.4.4.87.6.47.2 1.05.47 1.7.72.65.25 1.35.43 2.05.58 1.06.22 2.08.19 2.87.12.8-.07 1.88-.77 2.14-1.56.26-.79.26-1.45.18-1.56-.08-.11-.27-.18-.57-.33z"/>
    </svg>
);


// ====================================================================
// 1. UTILITY: SCROLL DIRECTION & PULSE HOOK (The "Gasp" Animation)
// ====================================================================

const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState("up");
  const [isPulsing, setIsPulsing] = useState(false);
  const lastScrollY = useRef(0);
  const pulseTimeout = useRef(null);

  const updateScrollDir = useCallback(() => {
    const scrollY = window.scrollY;

    if (Math.abs(scrollY - lastScrollY.current) > 20) { // Threshold to prevent flickering
      const newDir = scrollY > lastScrollY.current ? "down" : "up";
      if (newDir !== scrollDir) {
        setScrollDir(newDir);
        setIsPulsing(true);
        
        // Clear previous timeout and set a new one for the 'gasp' duration
        if (pulseTimeout.current) {
          clearTimeout(pulseTimeout.current);
        }
        pulseTimeout.current = setTimeout(() => {
          setIsPulsing(false);
        }, 150); // Matches the CSS transition duration
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
// (Requires THREE library to be available in the environment)
// ====================================================================

/**
 * Renders a simple 3D abstract object using Three.js for a dynamic hero background.
 * Assumes THREE is available globally.
 */
const ThreeJsHero = () => {
    const mountRef = useRef(null);
    
    useEffect(() => {
        let scene, camera, renderer, geometry, material, cube;
        let animationFrameId;

        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Scene setup
        scene = new THREE.Scene();
        
        // Camera setup
        camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        currentMount.appendChild(renderer.domElement);

        // Geometry (Torus Knot for abstract look)
        geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
        material = new THREE.MeshPhysicalMaterial({
            color: 0x9333ea, // Purple
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            emissive: 0x6d28d9,
            emissiveIntensity: 0.5
        });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Lighting
        const pointLight = new THREE.PointLight(0xa855f7, 20); // Bright purple light
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const ambientLight = new THREE.AmbientLight(0x4c1d95, 0.5); // Dark ambient
        scene.add(ambientLight);

        // Animation Loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            cube.rotation.x += 0.005;
            cube.rotation.y += 0.008;

            renderer.render(scene, camera);
        };

        // Handle Resize
        const handleResize = () => {
            if (!currentMount) return;
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };

        window.addEventListener('resize', handleResize);
        animate();

        // Cleanup on unmount
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
        <div ref={mountRef} className="absolute inset-0 z-0 opacity-70">
            {/* Three.js canvas mounts here */}
        </div>
    );
};

// ====================================================================
// 3. MAIN APP COMPONENT
// ====================================================================

const Card = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-gray-900/70 backdrop-blur-md rounded-xl border border-purple-700/50 shadow-lg transition-all hover:shadow-purple-500/30 hover:scale-[1.02] duration-300">
        <Icon className="w-8 h-8 text-purple-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);

const LandingPage2 = () => {
    const { isPulsing } = useScrollDirection();
    const apiKey = ""; // API Key placeholder

    // Custom data structure for benefits and CTA
    const benefits = [
        { icon: CheckCircle, title: "Modern, Responsive Website", description: "Sleek, fast, and gorgeous on all devices (especially mobile for Nigerian users!)." },
        { icon: Zap, title: "Payment & WhatsApp CRM Integrated", description: "Start taking payments and managing leads instantly with zero friction." },
        { icon: Clock, title: "Quick 7-Day Turnaround", description: "Stop waiting. We deliver your fully functional system in one week, ready for Detty December sales." },
        { icon: DollarSign, title: "Revenue Generation Ready", description: "Designed to convert visitors into paying customers immediately upon launch." },
    ];

    const prices = [
        { name: "Starter", price: "₦180,000", description: "Perfect for brochure sites and basic lead capture." },
        { name: "Pro", price: "₦450,000", description: "Includes CRM integration, 5-page setup, and advanced payment gateway." },
        { name: "Enterprise", price: "₦850,000+", description: "Full custom e-commerce or booking system, advanced analytics, and priority support." },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            {/* The main content wrapper applies the "Gasp" effect */}
            <main
                className={`max-w-6xl mx-auto py-8 px-4 transition-all duration-150 ease-out 
                ${isPulsing ? 'scale-[0.99] blur-[0.5px] brightness-125' : 'scale-100 blur-0 brightness-100'}`}
            >
                {/* Header */}
                <header className="py-4 flex justify-between items-center mb-12">
                    <h1 className="text-2xl font-extrabold text-purple-500 tracking-wider">
                        DELACRUZ
                    </h1>
                    <nav>
                        <a href="#cta" className="text-sm font-medium text-white hover:text-purple-400 transition">
                            Book Slot
                        </a>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden mb-24">
                    {/* Three.js Background */}
                    <ThreeJsHero />

                    <div className="relative z-10 max-w-4xl p-4 md:p-8 bg-black/40 rounded-xl">
                        <p className="text-sm md:text-md font-semibold tracking-widest uppercase text-purple-400 mb-3">
                            Website Revamp + Integrated Systems
                        </p>
                        <h2 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
                            Upgrade Your Website This Detty December  Launch in 7 Days!
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                            Professional website + payment integration + WhatsApp CRM. Perfect for SMEs ready to boost sales before year-end.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center" id="cta">
                            <a 
                                href="#cta-form" 
                                className="px-8 py-3 bg-purple-600 text-white font-bold text-lg rounded-full shadow-2xl shadow-purple-500/50 
                                           hover:bg-purple-500 transform hover:scale-[1.05] transition-all duration-300 group"
                            >
                                <Zap className="w-5 h-5 inline mr-2 group-hover:rotate-6 transition duration-200"/>
                                Reserve Your December Website Revamp Slot!
                            </a>
                            <a 
                                href="https://wa.me/23480xxxxxxxx?text=I'm%20interested%20in%20the%20Detty%20December%20Revamp%20Offer" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-8 py-3 border border-green-500 text-green-300 font-bold text-lg rounded-full 
                                           hover:bg-green-900/50 transform hover:scale-[1.05] transition-all duration-300"
                            >
                                <Whatsapp className="w-5 h-5 inline mr-2"/>
                                Instant Chat with Tolu
                            </a>
                        </div>
                    </div>
                </section>

                {/* Urgency/Scarcity Banner */}
                <section className="bg-red-900/40 border-l-4 border-red-500 p-4 md:p-6 rounded-lg text-center shadow-2xl shadow-red-800/50 mb-24 animate-pulse">
                    <p className="text-xl md:text-2xl font-extrabold text-red-300 uppercase tracking-wider">
                        <Clock className="w-6 h-6 inline mr-3 animate-spin-slow"/>
                        Limited Offer: Slots are filling fast for Detty December — <span className="text-3xl text-yellow-300">ONLY 30 OPENINGS LEFT!</span>
                    </p>
                    <p className="text-sm text-red-400 mt-2">(Mobile-optimized for load times &lt;3s - Your customers won't wait!)</p>
                </section>

                {/* Benefits Section */}
                <section className="mb-24">
                    <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Revamp Before Year-End?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((b, index) => (
                            <Card key={index} icon={b.icon} title={b.title} description={b.description} />
                        ))}
                    </div>
                </section>
                
                {/* Pricing Section */}
                <section className="mb-24">
                    <h2 className="text-4xl font-bold text-center mb-12 text-white">Transparent Pricing for Immediate Impact</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {prices.map((p, index) => (
                            <div key={index} className={`p-8 rounded-2xl text-center shadow-xl transition-all duration-300 
                                ${index === 1 ? 'bg-purple-800 border-4 border-purple-500 transform scale-[1.05] shadow-purple-500/50' : 'bg-gray-900/70 border border-gray-700 hover:border-purple-600'}`}>
                                <h3 className="text-2xl font-extrabold mb-2 text-white">{p.name}</h3>
                                <p className="text-5xl font-extrabold text-purple-400 mb-4">{p.price}</p>
                                <p className="text-gray-300 mb-6">{p.description}</p>
                                <a 
                                    href="#cta" 
                                    className={`block py-2 rounded-full font-bold transition-colors 
                                    ${index === 1 ? 'bg-white text-black hover:bg-gray-300' : 'bg-purple-600 text-white hover:bg-purple-500'}`}
                                >
                                    Select Package
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Social Proof & Secondary CTA */}
                <section className="mb-24">
                    <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50 shadow-2xl shadow-purple-900/50 text-center">
                        <p className="text-2xl italic text-gray-200 mb-6">
                            "Our website revamp with Delacruz increased online leads by <span className="text-purple-400 font-bold">50% in one week!</span>"
                        </p>
                        <p className="text-sm text-purple-300 mb-8">
                            — SME Client, Lagos
                        </p>
                        <a 
                            href="#cta" 
                            className="px-8 py-3 bg-purple-500 text-white font-bold text-xl rounded-full shadow-lg 
                                       hover:bg-purple-400 transform hover:translate-y-[-2px] transition duration-300"
                        >
                            <Mail className="w-6 h-6 inline mr-2"/>
                            Secure Your Slot Now! (Only 30 Left)
                        </a>
                        <p className="text-xs text-gray-500 mt-4">
                            Note: We use UTM codes for all ad sources to ensure seamless tracking of your investment ROI.
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-6 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} DELACRUZ. All Rights Reserved. | Designed for Speed and Sales.</p>
                </footer>
            </main>
        </div>
    );
};

export default LandingPage2;