import React, { useState, useRef, useEffect } from 'react';
import { Position } from '../types';
import { Heart, Frown, PartyPopper } from 'lucide-react';

interface ValentineCardProps {
  onYes: () => void;
}

const ValentineCard: React.FC<ValentineCardProps> = ({ onYes }) => {
  const [noBtnPosition, setNoBtnPosition] = useState<Position | null>(null);
  const [yesBtnScale, setYesBtnScale] = useState(1);
  const [noBtnText, setNoBtnText] = useState("No");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const noPhrases = [
    "No", "Are you sure?", "Really?", "Think again!", 
    "Last chance!", "Surely not?", "You might regret this!", 
    "Give it another thought!", "Are you absolutely certain?", 
    "This could be a mistake!", "Have a heart!", "Don't be so cold!",
    "Change of heart?", "Wouldn't you reconsider?", "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  const handleNoInteraction = () => {
    // Move the button
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonWidth = 100; // approx width
      const buttonHeight = 50; // approx height
      
      const maxLeft = containerRect.width - buttonWidth;
      const maxTop = containerRect.height - buttonHeight;
      
      const newLeft = Math.random() * maxLeft;
      const newTop = Math.random() * maxTop;
      
      setNoBtnPosition({ left: newLeft, top: newTop });
    }
    
    // Increment Yes button scale to make it more enticing
    setYesBtnScale(prev => Math.min(prev + 0.15, 3)); // Cap at 3x size
    
    // Change text randomly
    const randomIndex = Math.floor(Math.random() * noPhrases.length);
    setNoBtnText(noPhrases[randomIndex]);
  };

  return (
    <div 
      ref={containerRef}
      className="relative z-10 w-full max-w-lg min-h-[500px] bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-pink-200"
    >
      <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border-2 border-pink-100">
        <img 
          src="https://picsum.photos/id/1062/400/300" 
          alt="Cute puppy" 
          className="w-full h-auto object-cover"
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-8 text-center handwritten drop-shadow-sm">
        Will you be my Valentine?
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center mt-4">
        <button
          onClick={onYes}
          style={{ transform: `scale(${yesBtnScale})`, transition: 'transform 0.2s ease' }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors flex items-center gap-2 text-xl z-20"
        >
          Yes <Heart className="w-5 h-5 fill-current" />
        </button>

        <button
          onMouseEnter={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          onClick={handleNoInteraction} // Just in case they manage to click it
          style={
            noBtnPosition 
              ? { position: 'absolute', top: noBtnPosition.top, left: noBtnPosition.left, transition: 'all 0.2s ease-out' } 
              : { transition: 'all 0.2s ease-out' }
          }
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg z-30 whitespace-nowrap min-w-[100px]"
        >
          {noBtnText}
        </button>
      </div>
      
      <p className="mt-8 text-pink-400 text-sm font-medium opacity-80">
        (Psst... saying "No" is not an option!)
      </p>
    </div>
  );
};

export default ValentineCard;
