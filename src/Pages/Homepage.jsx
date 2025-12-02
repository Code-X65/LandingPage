import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const cards = [
    { 
      title: 'Business Process Automation Lite',
      previews: [
        // { id: 1, name: 'Preview 1', route: '/landing1/preview1' },
        // { id: 2, name: 'Preview 2', route: '/landing1/preview2' },
        { id: 3, name: 'Preview 3', route: '/landing1/preview3' }
      ]
    },
    { 
      title: 'Website Revamp + Integrated Systems',
      previews: [
        // { id: 1, name: 'Preview 1', route: '/landing2/preview1' },
        { id: 2, name: 'Preview 2', route: '/landing2/preview2' },
        // { id: 3, name: 'Preview 3', route: '/landing2/preview3' }
      ]
    },
    { 
      title: 'IT Advisory Retainer',
      previews: [
        // { id: 1, name: 'Preview 1', route: '/landing3/preview1' },
        // { id: 2, name: 'Preview 2', route: '/landing3/preview2' },
        { id: 3, name: 'Preview 3', route: '/landing3/preview3' }
      ]
    }
  ];

  const handleFlip = (index) => {
    // If clicking the same card that's already flipped, close it
    // Otherwise, flip the new card and close others
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <h1 className='text-white text-center text-2xl uppercase'>It a Really sunny afternoon sir</h1>
        <h1 className="text-5xl font-bold text-white text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
       Please kindly select a landing page to preview
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="perspective-1000">
              <div
                className={`relative w-full h-96 transition-all duration-700 transform-style-preserve-3d cursor-pointer ${
                  flippedIndex === index ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => handleFlip(index)}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-purple-900/80 to-purple-700/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 group">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎨</div>
                    <h2 className="text-3xl font-bold text-white mb-4 text-center">
                      {card.title}
                    </h2>
                    <p className="text-purple-200 text-center mb-6">
                      Click to see previews
                    </p>
                    <div className="mt-auto text-purple-300 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Tap to explore <span className="text-xl">→</span>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-purple-800 to-indigo-900 border border-purple-400/30 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-between text-white">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        {card.title}
                      </h3>
                      <p className="text-purple-200 text-sm">Choose a preview</p>
                    </div>
                    
                    <div className="w-full flex-1 flex flex-col gap-3 my-6">
                      {card.previews.map((preview) => (
                        <Link
                          key={preview.id}
                          to={preview.route}
                          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-between group hover:border-purple-300/50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="font-semibold text-white">{preview.name}</span>
                          <span className="text-xl group-hover:translate-x-2 transition-transform text-purple-200">→</span>
                        </Link>
                      ))}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlip(index);
                      }}
                      className="text-purple-200 hover:text-white text-sm mt-2 flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      <span className="text-xl">←</span> Back to overview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
          <p className="text-purple-300/70 text-sm">
            💡 Only one card can be open at a time
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;