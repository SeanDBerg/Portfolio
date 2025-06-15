import { useState } from 'react';

interface TurnipMascotProps {
  size?: number;
}

const greetings = [
  "こんにちは! Welcome to my portfolio!",
  "Enjoying the site? Let me know if you have questions!",
  "Thanks for visiting! I hope you like my work!",
  "Need a developer? I'd love to help with your project!",
  "Don't forget to check out my latest projects!"
];

export default function TurnipMascot({ size = 80 }: TurnipMascotProps) {
  const [showSpeech, setShowSpeech] = useState(false);
  const [greeting, setGreeting] = useState(greetings[0]);

  const handleMascotClick = () => {
    // Pick a random greeting different from the current one
    let newGreetingIndex;
    do {
      newGreetingIndex = Math.floor(Math.random() * greetings.length);
    } while (greetings[newGreetingIndex] === greeting && greetings.length > 1);

    setGreeting(greetings[newGreetingIndex]);
    setShowSpeech(true);

    // Hide speech bubble after 5 seconds
    setTimeout(() => {
      setShowSpeech(false);
    }, 5000);
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div 
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-2 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-800 transition-all duration-300 ${
          showSpeech ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ width: size * 2.5 }}
      >
        <div className="text-center">{greeting}</div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
      </div>

      <div 
        className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg"
        style={{ width: size, height: size }}
        onClick={handleMascotClick}
      >
        <span className="text-white text-xl font-bold">🌱</span>
      </div>
    </div>
  );
}