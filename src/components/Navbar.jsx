import React, { useEffect, useState } from 'react';

const Navbar = () => {
  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State for scroll visibility
  const [isVisible, setIsVisible] = useState(true);
  
  // State for initial entry animation
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll detection logic
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Don't trigger if scroll change is tiny (prevents jitter)
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // SCROLL DOWN -> Hide Navbar
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu on scroll down
      } else if (currentScrollY < lastScrollY) {
        // SCROLL UP -> Show Navbar
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger entry animation
    setTimeout(() => setIsLoaded(true), 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items list
const navLinks = ['Landing Page 1', 'Landing Page 2', 'Landing Page 3', ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b border-purple-500/10
          ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          ${isLoaded ? 'bg-black/90 backdrop-blur-lg' : 'bg-transparent'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              className={`flex-shrink-0 transition-all duration-700 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
               Delacruz
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((text, index) => (
                  <a
                    key={text}
                    href={`#${text.toLowerCase()}`}
                    className={`text-white hover:text-purple-500 px-3 py-2 text-sm font-medium transition-all duration-300 relative group transform
                      ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                    `}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    {text}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-300 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className={`hidden md:block transition-all duration-700 delay-500 transform ${isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <button
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold text-sm shadow-lg shadow-purple-500/25 hover:bg-purple-500 hover:scale-105 hover:shadow-purple-500/40 transition-all duration-300"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="bg-purple-900/20 inline-flex items-center justify-center p-2 rounded-md text-purple-400 hover:text-white hover:bg-purple-800/30 focus:outline-none transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
            className={`md:hidden bg-black/95 backdrop-blur-xl border-t border-purple-500/20 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`} 
            id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((text) => (
              <a
                key={text}
                href={`#${text.toLowerCase()}`}
                className="text-white hover:text-purple-400 hover:bg-purple-900/20 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {text}
              </a>
            ))}
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold text-sm shadow-lg shadow-purple-500/25 mt-4 mb-2 hover:shadow-purple-500/40 transition-shadow">
              Get Started
            </button>
          </div>
        </div>
      </nav>


    </>
  );
};

export default Navbar;