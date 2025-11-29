import React, { useEffect, useRef, useState, useCallback } from 'react';
// Assuming 'three' module is available in the environment for React apps
import * as THREE from 'three';
import { Zap, Clock, ShieldCheck, DollarSign, Send, Star, Phone, ArrowRight } from 'lucide-react';

/**
 * ThreeJSCanvas Component
 * Creates a dynamically rotating Wireframe Torus Knot, symbolizing complex, continuous processes.
 */
const ThreeJSCanvas = () => {
    const mountRef = useRef(null);
    const knotRef = useRef(null); // Ref for the mesh

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Scene Setup ---
        const currentMount = mountRef.current;
        const scene = new THREE.Scene();
        // Camera setup: 60 degree field of view, adjusted for aspect ratio
        const camera = new THREE.PerspectiveCamera(60, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        // Renderer setup: transparent background enabled
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        camera.position.z = 7; // Position camera away from the knot

        // --- Lighting ---
        // Ambient light helps overall visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        // Point light for subtle reflection (though less impactful on wireframe)
        const pointLight = new THREE.PointLight(0xffffff, 200, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // --- Wireframe Torus Knot Mesh ---
        // TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q)
        const geometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16, 2, 3); 
        
        // Using MeshBasicMaterial with wireframe: true for a clean, structural look
        const material = new THREE.MeshBasicMaterial({
            color: 0x8B5CF6, // Primary Purple
            wireframe: true,
            transparent: true,
            opacity: 0.9,
            linewidth: 1.5 // Note: linewidth often ignored by WebGL renderer, but kept for context
        });

        const knot = new THREE.Mesh(geometry, material);
        scene.add(knot);
        knotRef.current = knot; 

        // --- Animation Loop ---
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Continuous rotation for dynamic visual
            knot.rotation.y += 0.005;
            knot.rotation.x += 0.003;

            renderer.render(scene, camera);
        };

        // --- Handle Resize ---
        const handleResize = () => {
            if (!currentMount) return;
            const width = currentMount.clientWidth;
            const height = currentMount.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        animate();

        // --- Cleanup ---
        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentMount.contains(renderer.domElement)) {
                currentMount.removeChild(renderer.domElement);
            }
            // Dispose of Three.js objects to prevent memory leaks
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    // The canvas fills its parent container (the absolute, full-screen wrapper)
    return <div ref={mountRef} className="absolute inset-0 z-0" />; 
};

// --- Main App Component ---
const LandingPage5 = () => {
    const offerSlots = 50;

    const handleWhatsappClick = useCallback(() => {
        // Replace with Tosin's actual number
        const whatsappNumber = "2348012345678";
        const message = "Hi Tosin, I'm ready to book my FREE Automation Audit and secure a Detty December slot!";
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }, []);

    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans">
            
            {/* Navigation (Simple Branding) */}
            <header className="py-4 px-6 md:px-12 fixed w-full z-30 backdrop-blur-sm bg-black/70 border-b border-purple-800/30">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <span className="text-2xl font-extrabold text-purple-500 tracking-wider">
                        DELACRUZ
                    </span>
                    <button 
                        onClick={handleWhatsappClick}
                        className="text-sm font-semibold text-purple-300 hover:text-purple-100 transition duration-300 hidden sm:block"
                    >
                        Contact Us
                    </button>
                </div>
            </header>

            {/* 1. Hero Section - Full Background 3D */}
            <section className="relative h-screen flex items-center pt-16 overflow-hidden">
                
                {/* Global Background Overlay (to make content readable) */}
                <div className="absolute inset-0 bg-black/90 z-10"></div>
                
                {/* Three.js Background - Full Width Container */}
                <div className="absolute inset-0 z-0 opacity-70">
                    <ThreeJSCanvas /> 
                </div>

                {/* Content centered on top */}
                <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
                    {/* Limited Offer Tag */}
                    <div className="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-widest uppercase text-white bg-purple-600 rounded-full shadow-lg shadow-purple-600/50 transform hover:scale-105 transition duration-300">
                        Limited Offer: Detty December Special
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
                        Automate Your Business Before Year-End!
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Stop wasting money and time on manual tasks. Let Delacruz automate your key business workflows in just <strong className="text-purple-400">7 days</strong>.
                    </p>

                    {/* Call-to-Action */}
                    <button
                        onClick={() => document.getElementById('cta-section').scrollIntoView({ behavior: 'smooth' })}
                        className="group relative flex items-center justify-center mx-auto text-xl font-bold px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white shadow-2xl shadow-purple-900/80 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] border-2 border-purple-400 w-fit"
                    >
                        Book Your FREE Automation Audit Now!
                        <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    
                    {/* Limited Slots Notice */}
                    <p className="mt-4 text-sm font-medium text-red-400">
                        <Zap className="inline h-4 w-4 mr-1 text-yellow-400 animate-pulse" />
                        Only {offerSlots} slots available this Detty December! Act fast.
                    </p>
                </div>
            </section>

            {/* 2. Benefits Section */}
            <section className="py-20 bg-gray-900/70 border-t border-b border-purple-900/50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12">
                        Immediate Returns on Your Investment
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Benefit 1 */}
                        <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-purple-700/50 hover:shadow-purple-700/50 transition duration-300 transform hover:translate-y-[-4px]">
                            <Clock className="h-10 w-10 text-purple-400 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2 text-white">Massive Time Savings</h3>
                            <p className="text-gray-400">Save up to <strong className="text-purple-300">40% of your time</strong> on daily, repetitive tasks. Focus on growth, not paperwork.</p>
                        </div>
                        
                        {/* Benefit 2 */}
                        <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-purple-700/50 hover:shadow-purple-700/50 transition duration-300 transform hover:translate-y-[-4px]">
                            <ShieldCheck className="h-10 w-10 text-purple-400 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2 text-white">Boosted Accuracy</h3>
                            <p className="text-gray-400">Reduce manual errors, eliminate costly mistakes, and dramatically <strong className="text-purple-300">improve operational efficiency</strong>.</p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-purple-700/50 hover:shadow-purple-700/50 transition duration-300 transform hover:translate-y-[-4px]">
                            <Zap className="h-10 w-10 text-purple-400 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2 text-white">Simple, Powerful Systems</h3>
                            <p className="text-gray-400">We train your team in simple, automated processes ensuring smooth adoption with <strong className="text-purple-300">zero downtime</strong>.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* 3. Social Proof / Testimonial */}
            <section className="py-20 bg-black">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Star className="h-10 w-10 text-yellow-400 mb-6 mx-auto fill-yellow-400" />
                    <blockquote className="text-xl md:text-3xl italic font-medium text-gray-200 leading-relaxed mb-6">
                        “Delacruz innovations automated our invoicing and client follow-up in just 5 days — we saved 10 hours per week!”
                    </blockquote>
                    <cite className="block text-lg font-semibold text-purple-400 not-italic">— Satisfied Client, Lagos</cite>
                    <p className="mt-4 text-sm text-gray-500">
                        (We can replace this with your actual voice note/message testimonial.)
                    </p>
                </div>
            </section>

            {/* 4. Pricing & Secondary CTA */}
            <section id="cta-section" className="py-20 bg-gray-900/70 border-t border-purple-900/50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-12">
                        Transparent Pricing for Scalable Automation
                    </h2>
                    
                    <div className="max-w-2xl mx-auto p-8 bg-gray-800 rounded-2xl shadow-2xl shadow-purple-900/50 border border-purple-700/50">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-600 pb-4">
                            <DollarSign className="h-8 w-8 text-purple-400" />
                            <span className="text-2xl font-bold text-white">
                                Automation Lite Packages
                            </span>
                        </div>
                        
                        <p className="text-5xl md:text-6xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
                            ₦250,000 – ₦1,200,000
                        </p>
                        
                        <p className="text-center text-lg text-gray-400 mb-8">
                            (Pricing depends on your business size, complexity of workflows, and number of automations needed.)
                        </p>
                        
                        <div className="text-center">
                            <button
                                onClick={handleWhatsappClick}
                                className="group flex items-center justify-center mx-auto w-full text-lg font-bold px-8 py-4 bg-green-500 hover:bg-green-600 rounded-lg text-black shadow-lg shadow-green-500/50 transition duration-300 transform hover:scale-[1.01] active:scale-[0.98]"
                            >
                                <Phone className="h-5 w-5 mr-3" />
                                Click to Chat with Tosin Instantly!
                            </button>
                            <p className="mt-3 text-sm text-gray-400">
                                Start with a free audit to get your exact quote.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="py-8 bg-black border-t border-purple-900/50">
                <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Delacruz Innovations. Automate to elevate.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage5;