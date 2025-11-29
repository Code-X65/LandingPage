import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
// Using lucide-react for icons, assumed available in the environment.
import { Zap, Clock, ShieldCheck, DollarSign, Send, Calendar } from 'lucide-react';

// --- THREE.JS Background Component ---
const ThreeBackground = () => {
    const mountRef = useRef(null);

    const setupScene = useCallback(() => {
        if (!mountRef.current) return;

        const container = mountRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // 1. Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        // 2. Renderer Setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        // Set the background to transparent so the black Tailwind background shows
        renderer.setClearColor(0x000000, 0); 
        
        // Clear previous canvas if any
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        // 3. Create the Wireframe Object (A dodecahedron is complex and cool)
        const geometry = new THREE.DodecahedronGeometry(2);
        const edges = new THREE.EdgesGeometry(geometry);

        const material = new THREE.LineBasicMaterial({
            color: 0xa855f7, // Tailwind purple-500 equivalent
            linewidth: 2,
            transparent: true,
            opacity: 0.8
        });

        const wireframe = new THREE.LineSegments(edges, material);
        scene.add(wireframe);

        // 4. Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Simple rotation
            wireframe.rotation.x += 0.001;
            wireframe.rotation.y += 0.003;
            wireframe.rotation.z += 0.002;

            renderer.render(scene, camera);
        };
        
        // 5. Handle Resize
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        animate();

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            if (container && renderer.domElement) {
                 container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    useEffect(() => {
        // Ensure the script runs after the component is mounted
        setupScene();
    }, [setupScene]);

    return (
        <div
            ref={mountRef}
            className="fixed inset-0 z-0 opacity-20"
        ></div>
    );
};

// --- Main Application Component ---
const LandingPage4 = () => {
    const WHATSAPP_LINK = "https://wa.me/2348000000000?text=Hello%20Tosin!%20I%27d%20like%20to%20book%20my%20FREE%20Automation%20Audit%20for%20the%20Detty%20December%20Special.";
    const [auditRequested, setAuditRequested] = useState(false);

    const handleAuditRequest = (e) => {
        e.preventDefault();
        // In a real app, this would submit a form data
        setAuditRequested(true);
        console.log("Audit requested!");
        // Scroll to the offer section or open a modal
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans relative overflow-hidden">
            {/* Three.js Background Layer */}
            <ThreeBackground />

            {/* Main Content Layer */}
            <main className="relative z-10 p-4 md:p-8 lg:p-16 max-w-6xl mx-auto">
                
                {/* Header/Branding */}
                <header className="flex justify-between items-center py-4 border-b border-purple-900/50 mb-12">
                    <div className="text-2xl font-extrabold tracking-widest text-purple-400">
                        DELACRUZ
                    </div>
                    <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm md:text-base font-semibold text-white bg-purple-700 hover:bg-purple-600 transition duration-300 px-4 py-2 rounded-full shadow-lg shadow-purple-900/50"
                    >
                        <Send size={16} />
                        <span>Chat Now</span>
                    </a>
                </header>

                {/* Hero Section */}
                <section className="text-center mb-20 space-y-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-pink-400">
                        Limited Time Offer
                    </p>
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
                        Detty December Special: <br className="hidden md:inline"/> Automate Your Business Before Year-End!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Stop wasting money and time on manual tasks. Let Delacruz automate your key business workflows in just <span className="text-purple-400 font-bold">7 days</span>.
                    </p>
                    <button
                        onClick={handleAuditRequest}
                        className="mt-8 inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-xl text-black bg-purple-400 hover:bg-purple-300 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.7)]"
                    >
                        <Calendar size={24} className="mr-3" />
                        Book Your FREE Automation Audit Now!
                    </button>
                    {auditRequested && (
                         <p className="mt-4 text-sm text-green-400">
                            Thank you! We will be in touch shortly.
                         </p>
                    )}
                </section>

                {/* Benefits Section */}
                <section className="grid md:grid-cols-3 gap-8 mb-20 p-6 bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-purple-800/50 shadow-2xl">
                    <div className="flex flex-col items-center text-center p-4">
                        <Clock size={40} className="text-purple-400 mb-3" />
                        <h3 className="text-xl font-bold text-white mb-2">Time Savings</h3>
                        <p className="text-gray-400">Save up to <span className="text-purple-300 font-semibold">40% of your time</span> on daily tasks, freeing your team for strategic work.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                        <ShieldCheck size={40} className="text-purple-400 mb-3" />
                        <h3 className="text-xl font-bold text-white mb-2">Process Excellence</h3>
                        <p className="text-gray-400">Reduce errors and human mistakes while dramatically improving overall business efficiency.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                        <Zap size={40} className="text-purple-400 mb-3" />
                        <h3 className="text-xl font-bold text-white mb-2">Simple Integration</h3>
                        <p className="text-gray-400">We train your existing team in simple, new automated processes for long-term success.</p>
                    </div>
                </section>

                {/* Pricing and Limited Offer Section */}
                <section className="mb-20 grid md:grid-cols-2 gap-10 items-center">
                    
                    {/* Pricing Card */}
                    <div className="p-8 bg-gray-900/70 rounded-3xl shadow-2xl border border-purple-700/50 hover:border-purple-500 transition duration-500">
                        <h2 className="text-3xl font-extrabold text-white mb-4 flex items-center">
                            <DollarSign size={32} className="text-purple-400 mr-2" />
                            Transparent Pricing
                        </h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Our 'Automation Lite' packages are designed for maximum ROI.
                        </p>
                        <p className="text-4xl font-black text-purple-400">
                            ₦250,000 – ₦1,200,000
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            *Final price depends on the complexity and size of your specific business workflows.
                        </p>
                    </div>

                    {/* Limited Offer */}
                    <div className="p-8 bg-purple-900/40 rounded-3xl border-l-4 border-pink-500 shadow-xl space-y-4 animate-pulse-once">
                        <h2 className="text-3xl font-extrabold text-pink-400">
                            ⚠️ Limited Offer Alert!
                        </h2>
                        <p className="text-xl text-white font-semibold">
                            Only <span className="text-4xl font-black text-pink-300">50 slots</span> available this Detty December!
                        </p>
                        <p className="text-gray-200">
                            Act fast before your competitors automate first and take your market advantage. Don't miss this opportunity to close the year strong.
                        </p>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 font-bold text-purple-900 bg-pink-400 px-6 py-3 rounded-xl hover:bg-pink-300 transition-colors shadow-lg shadow-pink-900/50"
                        >
                            <Send size={20} />
                            <span>Reserve Your Slot</span>
                        </a>
                    </div>
                </section>

                {/* Testimonial / Social Proof */}
                <section className="max-w-4xl mx-auto text-center py-8 px-6 bg-white/5 rounded-3xl border border-purple-900/50">
                    <p className="text-xl italic text-gray-300 mb-4">
                        “Delacruz innovations automated our invoicing and client follow-up in just 5 days — we saved 10 hours per week!”
                    </p>
                    <p className="text-sm font-semibold text-purple-400">— Satisfied Client, Lagos</p>
                </section>

                {/* Footer and WhatsApp Button */}
                <footer className="mt-20 pt-8 border-t border-purple-900/50 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Delacruz Innovations. All Rights Reserved.
                    <div className="mt-4">
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-white bg-green-600 hover:bg-green-500 transition duration-300 px-6 py-3 rounded-full font-bold text-base shadow-lg shadow-green-900/50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.0001 0C5.37275 0 0 5.37275 0 12.0001C0 14.1565 0.556276 16.2057 1.58431 18.0069L0.088654 23.5115L5.79811 22.036C7.54585 22.9972 9.61053 23.5002 11.9998 23.5002C18.6273 23.5002 24 18.1274 24 11.5001C24 8.51351 22.8465 5.86794 20.9142 3.82987C18.9818 1.7918 16.3533 0.627471 13.5904 0.160133C13.0645 0.0763945 12.5312 0.0336676 12.0001 0ZM12.0001 21.6504C9.97017 21.6504 8.01257 21.0504 6.36881 19.9575L6.03577 19.7428L2.73177 20.6128L3.65215 17.5878L3.84433 17.2604C2.79379 15.545 2.25016 13.6705 2.25016 11.7247C2.25016 6.30737 6.64966 1.875 12.0001 1.875C17.3506 1.875 21.7501 6.30737 21.7501 11.7247C21.7501 17.142 17.3506 21.5744 12.0001 21.5744V21.6504ZM17.1797 14.1979C16.9427 14.7739 15.6946 15.4267 15.2268 15.4975C14.7589 15.5684 14.3316 15.6038 13.8867 15.4267C13.4418 15.2505 12.0001 14.7925 10.2227 13.1497C8.4452 11.506 7.84496 9.87063 7.66874 9.42571C7.49252 8.9808 7.52796 8.55348 7.59877 8.0856C7.66958 7.61772 8.32238 6.36965 8.89842 6.13264C9.47446 5.89564 9.85199 5.88566 10.0302 5.92102C10.2084 5.95638 10.4358 6.27598 10.601 6.57793C10.7663 6.87988 11.0205 7.42068 11.056 7.58597C11.0913 7.75125 11.1441 8.05315 10.9788 8.41169C10.8135 8.77023 10.0302 9.44497 9.86498 9.51582C9.69976 9.58667 9.53454 9.75195 9.7348 10.1105C9.93506 10.469 10.5111 11.4587 11.332 12.2796C12.1529 13.1005 13.1425 13.6765 13.5011 13.8768C13.8596 14.077 14.0249 13.9118 14.0957 13.7465C14.1666 13.5812 14.4685 13.3148 14.827 13.1497C15.1856 12.9844 15.5052 13.0372 15.6705 13.0726C15.8357 13.1079 16.1553 13.3353 16.4573 13.5006C16.7592 13.6658 17.0788 14.0195 17.1797 14.1979Z" />
                            </svg>
                            <span>Chat with Tosin Instantly!</span>
                        </a>
                    </div>
                </footer>
            </main>
        </div>
    );
};



export default LandingPage4;