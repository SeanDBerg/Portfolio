import React, { useState, useEffect } from 'react';
import sakuraPattern from '../../assets/sakura-pattern.svg';

const SakuraBackground = () => {
  const [sakuraElements, setSakuraElements] = useState([]);

  useEffect(() => {
    const createSakuraElements = () => {
      const numberOfPetals = Math.floor(window.innerWidth / 100);
      const newElements = [];

      for (let i = 0; i < numberOfPetals; i++) {
        newElements.push({
          id: i,
          left: `${Math.random() * 100}%`,
          size: `${10 + Math.random() * 15}px`,
          animationDuration: `${10 + Math.random() * 20}s`,
          animationDelay: `${Math.random() * 5}s`,
          swayDuration: `${3 + Math.random() * 4}s`,
        });
      }

      setSakuraElements(newElements);
    };

    createSakuraElements();

    // Re-create on window resize
    const handleResize = () => {
      createSakuraElements();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="sakura-background">
      {sakuraElements.map((sakura) => (
        <div
          key={sakura.id}
          className="sakura"
          style={{
            left: sakura.left,
            width: sakura.size,
            height: sakura.size,
            backgroundImage: `url(${sakuraPattern})`,
            animationDuration: `${sakura.animationDuration}, ${sakura.swayDuration}`,
            animationDelay: sakura.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default SakuraBackground;
