import React, { useState } from 'react';
import turnipMascot from '../../assets/turnip-mascot.svg';

const greetings = [
  "こんにちは! Welcome to my portfolio!",
  "Enjoying the site? Let me know if you have questions!",
  "Thanks for visiting! I hope you like my work!",
  "Need a developer? I'd love to help with your project!",
  "Don't forget to check out my latest projects!"
];

const TurnipMascot = ({ size = 80 }) => {
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
    <div className="turnip-container" style={{ width: size, height: size }}>
      <div 
        className={`turnip-speech-bubble ${showSpeech ? 'show' : ''}`}
        style={{ width: size * 2.5 }}
      >
        {greeting}
      </div>

      <img 
        src={turnipMascot} 
        alt="Turnip Mascot" 
        className="turnip-mascot"
        style={{ width: size, height: size }}
        onClick={handleMascotClick}
      />
    </div>
  );
};

export default TurnipMascot;
