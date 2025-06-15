import { useState, useEffect } from "react";

// A personified turnip mascot with blinking and emotional state animations
interface TurnipMascotProps {
  size?: number;
}

export default function TurnipMascot({ size = 120 }: TurnipMascotProps) {
  const [hovered, setHovered] = useState(false);
  const [extraHappy, setExtraHappy] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const handleClick = () => {
    setExtraHappy(true);
    setTimeout(() => setExtraHappy(false), 1000);
  };

  const expression = extraHappy ? "extra" : hovered ? "very" : "mild";

  return (
    <div
      className="cursor-pointer transition-transform duration-300 hover:scale-110"
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

        {/* Turnip body with slight tilt */}
        <g transform="rotate(-3 60 75)">
          <ellipse
            cx="60"
            cy="75"
            rx="35"
            ry="40"
            fill="#fef2ff"
            stroke="#e9d5ff"
            strokeWidth="2"
          />

          {/* Purple stripes */}
          <path d="M30 65 Q60 70 90 65" stroke="#9333ea" strokeWidth="3" fill="none" />
          <path d="M28 80 Q60 85 92 80" stroke="#9333ea" strokeWidth="3" fill="none" />
          <path d="M32 95 Q60 100 88 95" stroke="#9333ea" strokeWidth="3" fill="none" />

          {/* Eyes with synchronized random blinking */}
          <g>
          <circle id="leftEye" cx="48" cy="65" r="5" fill="#1f2937">
            <animate
              attributeName="r"
              values="5;1;5"
              dur="0.15s"
              begin="4s"
              repeatCount="1"
            />
            <animate
              attributeName="r"
              values="5;1;5"
              dur="0.15s"
              begin="9s"
              repeatCount="1"
            />
            <animate
              attributeName="r"
              values="5;1;5"
              dur="0.15s"
              begin="13s"
              repeatCount="1"
            />
          </circle>

          <circle id="rightEye" cx="72" cy="65" r="5" fill="#1f2937">
            <animate
              attributeName="r"
              values="5;1;5"
              dur="0.15s"
              begin="4s"
              repeatCount="1"
            />
            <animate
              attributeName="r"
              values="5;1;5"
              dur="0.15s"
              begin="9s"
              repeatCount="1"
            />
            <animate
              attributeName="r"
              values="5;1;5"
              dur="0.15s"
              begin="13s"
              repeatCount="1"
            />
          </circle>
          </g>

          {/* Eye highlights */}
          <circle cx="46.5" cy="63.5" r="1.8" fill="#ffffff" />
          <circle cx="70.5" cy="63.5" r="1.8" fill="#ffffff" />

          {/* Mouths based on expression */}
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
              {/* Raised brows for extra joy */}
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

          {/* Rosy cheeks */}
          <circle cx="38" cy="73" r="3.5" fill="#fca5a5" opacity="0.7" />
          <circle cx="82" cy="73" r="3.5" fill="#fca5a5" opacity="0.7" />

          {/* Root tail */}
          <path
            d="M60 115 Q58 118 60 120 Q62 118 60 115"
            fill="#8b5cf6"
            stroke="#7c3aed"
            strokeWidth="1"
          />
        </g>

        {/* Leaves with bobbing animation */}
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
