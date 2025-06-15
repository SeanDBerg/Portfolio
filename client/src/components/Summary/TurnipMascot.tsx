import { useState, useEffect } from "react";

interface TurnipMascotProps {
  size?: number;
}

export default function TurnipMascot({ size = 120 }: TurnipMascotProps) {
  const [hovered, setHovered] = useState(false);
  const [extraHappy, setExtraHappy] = useState(false);
  const [eyeRadius, setEyeRadius] = useState(5);

  // Click => extra happy for 1s
  const handleClick = () => {
    setExtraHappy(true);
    setTimeout(() => setExtraHappy(false), 1000);
  };

  const expression = extraHappy ? "extra" : hovered ? "very" : "mild";

  // Blinking using randomized intervals
  useEffect(() => {
    let isCancelled = false;

    function scheduleBlink() {
      const nextBlink = Math.random() * 5000 + 3000; // 3s to 8s

      setTimeout(() => {
        if (isCancelled) return;

        // Blink: shrink, wait, restore
        setEyeRadius(1);
        setTimeout(() => {
          if (!isCancelled) setEyeRadius(5);
          scheduleBlink(); // schedule next blink
        }, 150);
      }, nextBlink);
    }

    scheduleBlink();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div
      className="cursor-pointer transition-transform duration-300 hover:scale-110"
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg animate-bounce-slow"
      >
        <style>
          {`
            .animate-bounce-slow {
              animation: bounce 3s ease-in-out infinite;
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            .leaf-bob {
              animation: leafBob 4s ease-in-out infinite;
              transform-origin: center;
            }
            @keyframes leafBob {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(3deg); }
            }
          `}
        </style>

        <g transform="rotate(-3 60 75)">
          {/* Turnip Body */}
          <ellipse
            cx="60"
            cy="75"
            rx="35"
            ry="40"
            fill="#fef2ff"
            stroke="#e9d5ff"
            strokeWidth="2"
          />          

          {/* Grey Stripes */}
          <path d="M35 85 Q60 90 85 85" stroke="#d1d5db" strokeWidth="1.5" fill="none" />
          <path d="M37 93 Q60 97 83 93" stroke="#d1d5db" strokeWidth="1.2" fill="none" />


          {/* Eyes with dynamic blinking */}
          <circle cx="48" cy="65" r={eyeRadius} fill="#1f2937" />
          <circle cx="72" cy="65" r={eyeRadius} fill="#1f2937" />
          <circle cx="46.5" cy="63.5" r="1.8" fill="#ffffff" />
          <circle cx="70.5" cy="63.5" r="1.8" fill="#ffffff" />

          {/* Mouth based on expression */}
          {expression === "mild" && (
            <path
              d="M55 75 Q60 78 65 75"
              stroke="#1f2937"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          )}
          {expression === "very" && (
            <path
              d="M52 77 Q60 85 68 77 Q60 90 52 77"
              fill="#ef4444"
              stroke="#1f2937"
              strokeWidth="1.5"
            />
          )}
          {expression === "extra" && (
            <g>
              <path
                d="M52 77 Q60 85 68 77 Q60 90 52 77"
                fill="#f87171"
                stroke="#1f2937"
                strokeWidth="2"
              />
              <path
                d="M50 60 Q48 57 46 60"
                stroke="#1f2937"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M74 60 Q72 57 70 60"
                stroke="#1f2937"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Rosy Cheeks */}
          <circle cx="38" cy="73" r="3.5" fill="#fca5a5" opacity="0.7" />
          <circle cx="82" cy="73" r="3.5" fill="#fca5a5" opacity="0.7" />

          {/* Root Tail */}
          <path
            d="M60 115 Q58 118 60 120 Q62 118 60 115"
            fill="#8b5cf6"
            stroke="#7c3aed"
            strokeWidth="1"
          />
        </g>

        {/* Leaves */}
        <path
          className="leaf-bob"
          d="M45 35 Q35 20 25 25 Q30 35 45 35"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        <path
          className="leaf-bob"
          d="M60 30 Q50 15 40 20 Q45 30 60 30"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        <path
          className="leaf-bob"
          d="M75 35 Q85 20 95 25 Q90 35 75 35"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
