import React, { useEffect, useRef, useState, useCallback } from 'react';

import * as THREE from 'three'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 1. Component for Icons (using Lucide SVGs inline for single-file compliance)
const Icon = ({ name, className = 'w-5 h-5' }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'smartphone': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>;
      case 'credit-card': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
      case 'message-circle': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20.9c-.8.8-2.2.1-2.2-1.1V15c0-1.7 1.3-3 3-3h8c1.7 0 3 1.3 3 3v4.8c0 1.2-1.4 1.9-2.2 1.1L12 18.2 7.9 20.9z"/></svg>;
      case 'arrow-right': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
      case 'check-circle': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>;
      case 'chevrons-down': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7 5 5 5 5-5"/><path d="m7 15 5 5 5-5"/></svg>;
      case 'instagram': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 3h.01"/><rect width="10" height="10" x="7" y="7" rx="3" ry="3"/></svg>;
      case 'twitter': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2 1.7-1.4 3-3.4 3.7-5.5 0-.1 0-.3-.1-.4-.6-2.1-2.4-3.7-4.6-4.1-3.3-.6-6.4 1.4-7 4.7-.1.4-.2.8-.2 1.3 0 1.5.3 3 .8 4.4 1.5 4.3 5.4 7.6 10 7.6 4.3 0 8-2.6 10-6.6.6-1.1.9-2.3.9-3.6 0-.3 0-.6-.1-.9 1.1-.9 2.1-2.1 2.8-3.4z"/></svg>;
      case 'linkedin': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
      default: return null;
    }
  };
  return getIcon(name);
};

// 2. Main LandingPage1 Component
const LandingPage1 = () => {
    // --- State & Refs ---
    const [slots, setSlots] = useState(30);
    const canvasRef = useRef(null);
    const gsapRef = useRef(null); // Ref to ensure GSAP is loaded/initialized once

    // --- Tailwind Config (Inline for Single File) ---
    // Note: In a real project, this would be in tailwind.config.js
    const config = {
        colors: {
            brand: {
                dark: '#05050A',
                card: '#0F0F16',
                // Changed from Gold to Purple
                primary: '#7000FF', // Primary Purple
                cyan: '#00F0FF',    // Secondary Tech Cyan
                text: '#FFD700',    // Secondary Gold for highlights (subtle use)
            }
        }
    };

    // --- Three.js Setup (3D Hero) ---
    const initThreeJS = useCallback(() => {
        if (!canvasRef.current || typeof THREE === 'undefined') return;

        const container = canvasRef.current;
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(config.colors.brand.dark, 0.05);

        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Geometries
        const geometry = new THREE.IcosahedronGeometry(2, 2); 
        const coreGeo = new THREE.IcosahedronGeometry(1, 0);

        // Materials (Purple & Cyan Accents)
        const outerMat = new THREE.MeshBasicMaterial({ 
            color: config.colors.brand.cyan, 
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const innerMat = new THREE.MeshBasicMaterial({ 
            color: config.colors.brand.primary, // Purple Core
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });

        const sphere = new THREE.Mesh(geometry, outerMat);
        const core = new THREE.Mesh(coreGeo, innerMat);
        scene.add(sphere);
        scene.add(core);

        // Particles (Small dots of the secondary Gold color)
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 300;
        const posArray = new Float32Array(particlesCount * 3);
        for(let i = 0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 15; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
       const particlesMaterial = new THREE.PointsMaterial({ size: 0.02, color: config.colors.brand.primary });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 5;

        const updateCameraPos = () => {
            camera.position.x = container.clientWidth > 768 ? -2 : 0;
        };
        updateCameraPos();

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        };
        document.addEventListener('mousemove', handleMouseMove);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            sphere.rotation.y = elapsedTime * 0.1;
            sphere.rotation.x = elapsedTime * 0.05;
            core.rotation.y = -elapsedTime * 0.2;
            core.rotation.x = -elapsedTime * 0.1;
            particlesMesh.rotation.y = elapsedTime * 0.05;

            // Mouse Paralax
            sphere.rotation.y += 0.05 * (mouseX - sphere.rotation.y);
            sphere.rotation.x += 0.05 * (mouseY - sphere.rotation.x);

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            updateCameraPos();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
            geometry.dispose();
            coreGeo.dispose();
            particlesGeometry.dispose();
            outerMat.dispose();
            innerMat.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    // --- GSAP ScrollTrigger Setup ---
    const initGSAP = useCallback(() => {
        if (!gsapRef.current && typeof gsap !== 'undefined') {
            gsapRef.current = true;
            gsap.registerPlugin(ScrollTrigger);

            // 1. Hero Content Stagger
            const heroTl = gsap.timeline();
            heroTl.from(".gsap-hero", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // 2. Scroll Animations with Reverse on Scroll Up (GASP effect)
            const animateOnScroll = (selector) => {
                gsap.utils.toArray(selector).forEach(element => {
                    gsap.fromTo(element, 
                        { y: 50, opacity: 0, scale: 0.95 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 85%", 
                                // toggleActions: "onEnter onLeave onEnterBack onLeaveBack"
                                // The crucial "GASP" effect: plays on entry, reverses on leave,
                                // plays on re-entering from bottom, reverses on re-entering from top.
                                toggleActions: "play reverse play reverse", 
                            }
                        }
                    );
                });
            };

            // Apply to specific elements
            animateOnScroll(".gsap-fade-up");
            animateOnScroll(".gsap-card");
            animateOnScroll(".gsap-scale");
        }
    }, []);


    // --- Slot Counter Logic (using LocalStorage for persistence) ---
    useEffect(() => {
        // Initial load check
        let initialCount = 30;
        const savedCount = localStorage.getItem('dettyDecemberSlots');
        const savedTime = localStorage.getItem('dettyDecemberTime');
        
        if (savedCount && savedTime) {
            const now = new Date().getTime();
            const diff = (now - parseInt(savedTime)) / 1000 / 60; // minutes
            if (diff < 60) { // Reset every hour
                initialCount = parseInt(savedCount);
            }
        }
        setSlots(initialCount);

        // Interval to simulate slot depletion
        const intervalId = setInterval(() => {
            setSlots(prevSlots => {
                if(prevSlots > 5 && Math.random() > 0.7) {
                    const newSlots = prevSlots - 1;
                    localStorage.setItem('dettyDecemberSlots', newSlots);
                    localStorage.setItem('dettyDecemberTime', new Date().getTime());
                    return newSlots;
                }
                return prevSlots;
            });
        }, 15000); // Check every 15 seconds

        return () => clearInterval(intervalId);
    }, []);

    // --- Combined Initialization Effect ---
    useEffect(() => {
        initThreeJS();
        initGSAP();
        // The cleanup function for Three.js is inside initThreeJS's return
        // GSAP cleanup is implicit since ScrollTrigger handles the lifecycle
    }, [initThreeJS, initGSAP]);


    // --- JSX Render ---
    return (
        <div style={{
            backgroundColor: config.colors.brand.dark,
            color: 'white',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Scarcity Top Bar */}
            <div className="fixed top-0 w-full z-50 bg-brand-primary text-brand-dark font-bold text-xs md:text-sm py-2 text-center uppercase tracking-wider shadow-lg">
                🔥 Detty December Special: Only <span className="animate-pulse">{slots}</span> Slots Left!
            </div>

            {/* Navigation (Sticky) */}
            <nav className="fixed top-8 w-full z-40 px-6 py-4 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center bg-brand-card/70 backdrop-blur-md border border-white/10 rounded-full px-6 py-3">
                    <div className="font-display font-bold text-xl tracking-tighter text-white">DELACRUZ</div>
                    <a href="#pricing" className="hidden md:block bg-brand-primary hover:bg-white text-brand-dark font-bold py-2 px-6 rounded-full transition-colors text-sm">
                        Reserve Slot
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* 3D Canvas Background */}
                <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-60 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left pt-10 md:pt-0">
                        <div className="gsap-hero inline-block border border-brand-cyan/30 bg-brand-cyan/10 rounded-full px-4 py-1 mb-6">
                            <span className="text-brand-cyan text-xs font-bold tracking-widest uppercase">Launch in 7 Days</span>
                        </div>
                        
                        <h1 className="gsap-hero font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
                            Upgrade Your Website This <span className="bg-gradient-to-r from-brand-primary to-brand-cyan bg-clip-text text-transparent">Detty December</span>
                        </h1>
                        
                        <p className="gsap-hero text-gray-400 text-lg mb-8 max-w-lg mx-auto md:mx-0">
                            Professional website + payment integration + WhatsApp CRM. Perfect for SMEs ready to boost sales before year-end.
                        </p>
                        
                        <div className="gsap-hero flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a href="https://wa.me/234XXXXXXXXXX" className="bg-brand-primary text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-purple-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/50">
                                <span>Get Started Now</span>
                                <Icon name="arrow-right" className="w-5 h-5"/>
                            </a>
                            <a href="#pricing" className="border border-white/20 hover:border-brand-primary text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors bg-white/5 backdrop-blur-sm">
                                View Pricing
                            </a>
                        </div>
                    </div>
                    
                    {/* Placeholder for visual balance on desktop */}
                    <div className="h-[300px] md:h-auto hidden md:block"></div>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
                    <Icon name="chevrons-down" className="text-brand-primary w-8 h-8"/>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-10 border-y border-white/5 bg-brand-card overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="gsap-fade-up text-xl md:text-2xl font-display italic text-gray-300">
                        "Our website revamp with Delacruz increased online leads by <span className="text-brand-cyan font-bold">50% in one week!</span>"
                    </p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 px-6 relative" id="benefits">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="gsap-fade-up font-display text-4xl font-bold mb-4">Why Revamp Now?</h2>
                        <p className="gsap-fade-up text-gray-400">Don't enter the new year with an outdated platform.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="gsap-card bg-brand-card/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-brand-primary/50 transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-6 group-hover:bg-brand-cyan/20 transition-colors">
                                <Icon name="smartphone" className="text-brand-cyan w-8 h-8"/>
                            </div>
                            <h3 className="font-display text-xl font-bold mb-3">Modern & Mobile-First</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Most Nigerian users are on mobile. We ensure load times under 3s and a seamless experience on all devices.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="gsap-card bg-brand-card/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-brand-primary/50 transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                                <Icon name="credit-card" className="text-brand-primary w-8 h-8"/>
                            </div>
                            <h3 className="font-display text-xl font-bold mb-3">Integrated Payments</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Accept payments seamlessly (Paystack, Flutterwave) and start generating revenue immediately.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="gsap-card bg-brand-card/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-brand-primary/50 transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-brand-text/10 flex items-center justify-center mb-6 group-hover:bg-brand-text/20 transition-colors">
                                <Icon name="message-circle" className="text-brand-text w-8 h-8"/>
                            </div>
                            <h3 className="font-display text-xl font-bold mb-3">WhatsApp CRM</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Connect directly with customers. Automated greetings and lead tracking sent straight to your WhatsApp.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 px-6 bg-brand-card relative overflow-hidden" id="pricing">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"></div>
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="gsap-scale font-display text-4xl font-bold mb-4">Investment</h2>
                    <p className="gsap-scale text-gray-400 mb-12">7-Day Turnaround. Premium Quality.</p>

                    <div className="gsap-scale bg-brand-card/70 backdrop-blur-md border border-brand-primary/30 rounded-3xl p-8 md:p-12 relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white font-bold px-6 py-2 rounded-full text-sm uppercase tracking-wider">
                            Most Popular
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-4">Starting From</h3>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-xl md:text-3xl text-gray-500 line-through">₦250,000</span>
                                <span className="text-5xl md:text-7xl font-display font-bold text-white">₦180,000</span>
                            </div>
                            
                            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                                Includes custom design, mobile responsiveness, payment gateway setup, and WhatsApp integration. Max price: ₦850,000 for complex e-commerce.
                            </p>

                            <ul className="text-left space-y-4 mb-10 text-gray-400 text-sm md:text-base inline-block">
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="text-brand-primary w-5 h-5"/> 7-Day Fast Delivery
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="text-brand-primary w-5 h-5"/> SEO Basic Setup
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="text-brand-primary w-5 h-5"/> 1 Month Free Support
                                </li>
                            </ul>

                            <a href="https://wa.me/234XXXXXXXXXX?text=I'm%20interested%20in%20the%20Detty%20December%20Website%20Package" className="w-full md:w-auto bg-brand-primary hover:bg-white text-white hover:text-brand-dark font-bold text-lg py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(112,0,255,0.4)]">
                                Reserve Your Slot
                            </a>
                            
                            <p className="mt-4 text-xs text-red-400 font-bold animate-pulse">
                                ⚠️ Only {slots} slots available for December delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/10 text-center">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-left">
                        <div className="font-display font-bold text-xl tracking-tighter mb-2">DELACRUZ</div>
                        <p className="text-gray-500 text-sm">© 2025 Delacruz Systems. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors"><Icon name="instagram"/></a>
                        <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors"><Icon name="twitter"/></a>
                        <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors"><Icon name="linkedin"/></a>
                    </div>
                </div>
            </footer>

            {/* Fixed WhatsApp Button Mobile */}
            <a href="https://wa.me/234XXXXXXXXXX" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0px_4px_15px_rgba(37,211,102,0.4)] z-50 md:hidden flex items-center justify-center hover:scale-110 transition-transform">
                <Icon name="message-circle" className="w-8 h-8 fill-current"/>
            </a>
        </div>
    );
};

export default LandingPage1;