import React, { useState, useEffect, useRef, useCallback } from 'react';

// Define the primary purple color for Tailwind utility classes and Hex values
const PRIMARY_PURPLE_CLASS = 'purple-500'; 
const ACCENT_PURPLE_CLASS = 'purple-400';
const PRIMARY_PURPLE_HEX = 0x8b5cf6; // Tailwind purple-500 equivalent

// Utility function to convert Tailwind color class name to CSS variable or specific hex for Three.js
const hexToNum = (hex) => parseInt(hex.replace('#', '0x'), 16);

// Three.js 3D Component for the Hero Section
const Hero3DAnimation = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Access the globally loaded THREE object
        const THREE = window.THREE;
        
        // Ensure the mount reference and THREE are available before proceeding
        if (!mountRef.current || !THREE) {
            // console.error("Three.js not loaded or mount point missing.");
            return;
        }

        let frameId;
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = null; // Transparent background
        
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Geometry: Abstract, welcoming shape (Dodecahedron, more solid than the knot)
        const geometry = new THREE.DodecahedronGeometry(2, 0);
        const material = new THREE.MeshPhysicalMaterial({
            color: PRIMARY_PURPLE_HEX,
            metalness: 0.8,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            // Custom shader for subtle movement
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Lighting 
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Primary Spotlight (Purple)
        const spotLight1 = new THREE.SpotLight(0xa78bfa, 30, 20, Math.PI * 0.5, 0.5, 1);
        spotLight1.position.set(5, 5, 5);
        scene.add(spotLight1);

        // Secondary Accent Light (Pink/Cyan for dynamic color shift)
        const pointLight2 = new THREE.PointLight(0x00ffff, 3); 
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);
        
        // Animation Loop
        const animate = (time) => {
            frameId = requestAnimationFrame(animate);
            
            // Subtle rotation
            mesh.rotation.x += 0.0005;
            mesh.rotation.y += 0.001;

            // Subtle vertical float
            mesh.position.y = Math.sin(time * 0.0005) * 0.15;

            // Dynamic light color shift (between pink and cyan)
            const hue = (Math.sin(time * 0.0003) + 1) / 2; // 0 to 1
            pointLight2.color.setHSL(hue * 0.2 + 0.7, 1, 0.7); // Shift towards pink (0.7) and cyan (0.9)
            
            renderer.render(scene, camera);
        };

        // Handle Resize
        const handleResize = () => {
            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);
        animate(0);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            renderer.dispose();
            if(mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={mountRef} className="absolute inset-0 z-0 opacity-80" />
    );
};

// Main App Component
const LandingPage3 = () => {
    const [gasping, setGasping] = useState(false);

    // 1. SCROLL "GASP" EFFECT LOGIC
    const handleScroll = useCallback(() => {
        // Prevent continuous firing, allow only one trigger per scroll action block
        if (gasping) return;

        setGasping(true);
        // Short timeout for the visual effect duration (150ms)
        const timeoutId = setTimeout(() => {
            setGasping(false);
        }, 150);

        return () => clearTimeout(timeoutId);
    }, [gasping]);

    useEffect(() => {
        // Throttle the scroll handler for performance (limit to once every 50ms)
        let scrollTimeout;
        const throttledScroll = () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    handleScroll();
                    scrollTimeout = null;
                }, 50); 
            }
        };

        window.addEventListener('scroll', throttledScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', throttledScroll);
            clearTimeout(scrollTimeout);
        };
    }, [handleScroll]);

    // Apply classes for the "Gasp" animation: subtle scale down and a glowing border effect
    const gaspClass = gasping 
        ? 'transform scale-[0.995] transition-all duration-150 ease-out shadow-2xl border-4 border-purple-600/50' 
        : 'transform scale-100 transition-all duration-150 ease-in border-4 border-transparent';
        
    // 2. MAIN RENDER
    return (
        // Load three.js, Inter font, and Tailwind
        <>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #000;
                    color: white;
                }
                /* Custom background gradient for depth */
                .app-bg {
                    background-color: #000;
                    background-image: radial-gradient(at 0% 0%, #1e003a 0%, transparent 50%),
                                        radial-gradient(at 100% 100%, #1a0033 0%, transparent 70%);
                }
            `}</style>

            <div 
                className={`app-bg min-h-screen ${gaspClass} p-2 md:p-6 lg:p-8`} 
                id="main-wrapper"
            >
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-50 p-4 md:px-8 backdrop-blur-md bg-black/80 flex justify-between items-center shadow-2xl shadow-purple-900/50 rounded-b-2xl border-b border-purple-800">
                    <div className="text-3xl font-extrabold text-white tracking-widest">
                        DELACRUZ
                    </div>
                    <a 
                        href="#cta-section" 
                        className={`px-4 py-2 text-sm font-semibold text-white bg-${PRIMARY_PURPLE_CLASS} hover:bg-purple-600 rounded-full transition duration-200 shadow-lg shadow-purple-700/50 active:scale-95`}
                    >
                        Reserve Slot
                    </a>
                </header>

                {/* Hero Section */}
                <section className="relative h-screen flex items-center pt-24 pb-8 overflow-hidden">
                    <Hero3DAnimation />
                    <div className="z-10 max-w-5xl mx-auto text-center p-4">
                        {/* Subheadline as a top tag */}
                        <p className={`text-sm font-bold tracking-widest uppercase text-${ACCENT_PURPLE_CLASS} mb-3`}>
                            Website Revamp + Integrated Systems
                        </p>
                        
                        <h1 className={`text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-white drop-shadow-lg [text-shadow:0_0_15px_rgba(139,92,246,0.7)]`}>
                            Upgrade Your Website This <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Detty December</span>  Launch in <span className="text-yellow-400">7 Days!</span>
                        </h1>
                        <p className="mt-8 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
                            Professional website + payment integration + WhatsApp CRM. Perfect for SMEs ready to <span className="font-extrabold text-white">boost sales before year-end.</span>
                        </p>
                        <a 
                            href="#cta-section" 
                            className={`mt-12 inline-block px-12 py-4 text-xl font-extrabold text-black bg-${ACCENT_PURPLE_CLASS} rounded-full shadow-[0_0_25px_rgba(167,139,250,0.7)] hover:bg-white transition transform duration-300 ease-out active:scale-95`}
                        >
                            Reserve Your Slot Now!
                        </a>
                    </div>
                </section>

                {/* Benefits Section - Grid with glowing borders */}
                <section className="py-20 md:py-32 max-w-7xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-16">
                        Key Features: Launch <span className={`text-${ACCENT_PURPLE_CLASS}`}>Revenue-Ready</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {/* Benefit 1: Mobile */}
                        <div className="bg-gray-900/40 p-6 rounded-xl shadow-2xl shadow-purple-900/30 border border-purple-900 transition hover:border-purple-600 hover:bg-gray-800/60 transform hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 text-${ACCENT_PURPLE_CLASS} mb-4`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/><path d="M7 6h10"/></svg>
                            <h3 className="text-2xl font-bold text-white mb-2">Mobile-First Design</h3>
                            <p className="text-gray-400">Modern, responsive, and ultra-fast load times (&lt;3s) essential for the Nigerian user base.</p>
                        </div>
                        {/* Benefit 2: Integration */}
                        <div className="bg-gray-900/40 p-6 rounded-xl shadow-2xl shadow-purple-900/30 border border-purple-900 transition hover:border-purple-600 hover:bg-gray-800/60 transform hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 text-${ACCENT_PURPLE_CLASS} mb-4`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7"/><path d="M4 19h16"/><path d="M12 17v2"/><path d="M8 17v2"/><path d="M16 17v2"/></svg>
                            <h3 className="text-2xl font-bold text-white mb-2">Payments & WhatsApp CRM</h3>
                            <p className="text-gray-400">Full payment gateway integration and direct WhatsApp CRM for seamless lead conversion.</p>
                        </div>
                        {/* Benefit 3: Speed */}
                        <div className="bg-gray-900/40 p-6 rounded-xl shadow-2xl shadow-purple-900/30 border border-purple-900 transition hover:border-purple-600 hover:bg-gray-800/60 transform hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 text-${ACCENT_PURPLE_CLASS} mb-4`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m18 16-6 6-6-6"/><path d="m6 8 6-6 6 6"/></svg>
                            <h3 className="text-2xl font-bold text-white mb-2">7-Day Deployment</h3>
                            <p className="text-gray-400">Guaranteed quick launch so you don't miss the peak Detty December sales window.</p>
                        </div>
                        {/* Benefit 4: Tracking */}
                        <div className="bg-gray-900/40 p-6 rounded-xl shadow-2xl shadow-purple-900/30 border border-purple-900 transition hover:border-purple-600 hover:bg-gray-800/60 transform hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 text-${ACCENT_PURPLE_CLASS} mb-4`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            <h3 className="text-2xl font-bold text-white mb-2">Conversion Tracking (UTM)</h3>
                            <p className="text-gray-400">Built-in support and guidance for using UTM codes to optimize ad spend immediately.</p>
                        </div>
                    </div>
                </section>

                {/* Pricing and Urgency Section - Increased focus on scarcity */}
                <section id="cta-section" className="py-16 md:py-24 max-w-4xl mx-auto text-center bg-gray-900/70 rounded-3xl p-8 shadow-3xl shadow-purple-900/90 border-2 border-purple-700/50">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        Secure Your Launch Slot
                    </h2>
                    
                    {/* Urgency Badge */}
                    <div className={`inline-block bg-pink-600 text-white font-black px-6 py-3 rounded-full mb-8 transform rotate-[-3deg] shadow-lg shadow-pink-500/80 animate-pulse border-2 border-white`}>
                        <span className="text-2xl tracking-wider">🔥 ONLY 30 SLOTS LEFT 🔥</span>
                    </div>

                    <p className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-8`}>
                        ₦180,000 – ₦850,000
                    </p>
                    <p className="text-gray-300 text-xl mb-10">
                        Stop delaying. Detty December waits for no one. Let's start the conversation and define the perfect package for your business growth.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a 
                            href="https://wa.me/2348000000000?text=I%20want%20to%20reserve%20a%20Detty%20December%20website%20revamp%20slot." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`flex items-center justify-center px-8 py-4 text-xl font-bold text-black bg-green-500 rounded-full shadow-2xl shadow-green-700/60 hover:bg-green-400 transition transform duration-300 ease-out active:scale-95`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12.03 2.01c-5.52 0-9.98 4.47-9.98 9.98 0 1.63.43 3.2.98 4.7l-1.05 3.84 3.92-1.02c1.47.8 3.12 1.25 4.93 1.25h.01c5.52 0 9.98-4.47 9.98-9.98s-4.46-9.98-9.98-9.98zm3.2 13.98l-.2-0.32c-0.2-.32-0.5-0.61-0.78-0.91-0.28-0.3-0.56-0.62-0.74-0.95-0.18-0.33-0.27-0.7-0.27-1.1s0.09-0.77 0.27-1.1c0.18-0.33 0.46-0.65 0.74-0.95 0.28-0.3 0.58-0.59 0.78-0.91l0.2-0.32c0.32-0.49 0.48-1.07 0.48-1.68 0-0.61-0.16-1.19-0.48-1.68l-0.18-0.3c-0.32-0.48-0.76-0.95-1.28-1.46-0.52-0.51-1.1-0.95-1.74-1.28l-0.32-0.18c-0.49-0.32-1.07-0.48-1.68-0.48-0.61 0-1.19 0.16-1.68 0.48l-0.3 0.18c-0.48 0.32-0.95 0.76-1.46 1.28-0.51 0.52-0.95 1.1-1.28 1.74l-0.18 0.32c-0.32 0.49-0.48 1.07-0.48 1.68 0 0.61 0.16 1.19 0.48 1.68l0.18 0.32c0.32 0.49 0.76 0.95 1.28 1.46 0.52 0.51 1.1 0.95 1.74 1.28l0.32 0.18c0.49 0.32 1.07 0.48 1.68 0.48 0.61 0 1.19-0.16 1.68-0.48z"/></svg>
                            Chat with Tolu
                        </a>
                        <a 
                            href="#top" 
                            className={`flex items-center justify-center px-8 py-4 text-xl font-bold text-white border-2 border-${ACCENT_PURPLE_CLASS} rounded-full shadow-lg shadow-purple-700/50 hover:bg-purple-900 transition transform duration-300 ease-out active:scale-95`}
                        >
                            View Our Portfolio
                        </a>
                    </div>
                </section>

                {/* Social Proof Section */}
                <section className="py-16 md:py-24 max-w-6xl mx-auto">
                    <div className="bg-purple-900/40 p-8 rounded-2xl border border-purple-700 shadow-2xl shadow-purple-900/50">
                        <p className="text-2xl italic text-gray-200 text-center relative z-10">
                            &ldquo;Our website revamp with Delacruz increased online leads by <span className="text-green-300 font-extrabold text-3xl">50%</span> in one week! We highly recommend them for SMEs looking to scale fast.&rdquo;
                        </p>
                        <p className="mt-6 text-right text-purple-300 font-semibold text-lg">— Adewale, CEO of FastTrack Logistics</p>
                        <p className="mt-4 text-sm text-gray-500 text-center">
                            (Pro-Tip: Use UTM codes on your ads to see which campaigns drive the highest conversions!)
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800 mt-12 max-w-6xl mx-auto">
                    <p>&copy; {new Date().getFullYear()} DELACRUZ.DEV. Lagos, Nigeria. Optimized for speed and mobile experience.</p>
                </footer>
            </div>
        </>
    );
};

export default LandingPage3;