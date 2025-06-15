interface TurnipMascotProps {
  size?: number;
}

export default function TurnipMascot({ size = 120 }: TurnipMascotProps) {
  return (
    <div 
      className="cursor-pointer hover:scale-110 transition-transform duration-300"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Turnip body */}
        <ellipse
          cx="60"
          cy="75"
          rx="35"
          ry="40"
          fill="#f8f4ff"
          stroke="#e5d3ff"
          strokeWidth="2"
        />
        
        {/* Purple stripes */}
        <path
          d="M30 65 Q60 70 90 65"
          stroke="#9333ea"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M28 80 Q60 85 92 80"
          stroke="#9333ea"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M32 95 Q60 100 88 95"
          stroke="#9333ea"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Leaves */}
        <path
          d="M45 35 Q35 20 25 25 Q30 35 45 35"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        <path
          d="M60 30 Q50 15 40 20 Q45 30 60 30"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        <path
          d="M75 35 Q85 20 95 25 Q90 35 75 35"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        
        {/* Eyes */}
        <circle cx="48" cy="65" r="4" fill="#1f2937" />
        <circle cx="72" cy="65" r="4" fill="#1f2937" />
        <circle cx="49" cy="63" r="1.5" fill="#ffffff" />
        <circle cx="73" cy="63" r="1.5" fill="#ffffff" />
        
        {/* Mouth */}
        <path
          d="M55 75 Q60 82 65 75"
          stroke="#1f2937"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Rosy cheeks */}
        <circle cx="40" cy="72" r="3" fill="#fca5a5" opacity="0.6" />
        <circle cx="80" cy="72" r="3" fill="#fca5a5" opacity="0.6" />
        
        {/* Root tail */}
        <path
          d="M60 115 Q58 118 60 120 Q62 118 60 115"
          fill="#8b5cf6"
          stroke="#7c3aed"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}