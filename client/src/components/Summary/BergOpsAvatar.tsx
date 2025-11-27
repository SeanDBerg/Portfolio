import {useState, useEffect} from "react";

interface BergOpsAvatarProps {
  size?: number;
}

// React component rendering an interactive avatar-style mascot SVG
export default function BergOpsAvatar({size = 120}: BergOpsAvatarProps) {
  const [hovered, setHovered] = useState(false);
  const [extraHappy, setExtraHappy] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(true);

  const handleClick = () => {
    setExtraHappy(true);
    setTimeout(() => setExtraHappy(false), 1000);
  };

  const expression = extraHappy ? "extra" : hovered ? "very" : "mild";

  useEffect(() => {
    let isCancelled = false;

    function scheduleBlink() {
      const nextBlink = Math.random() * 5000 + 3000;
      setTimeout(() => {
        if (isCancelled) return;
        setEyeOpen(false);
        setTimeout(() => {
          if (!isCancelled) setEyeOpen(true);
          scheduleBlink();
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
      className="cursor-pointer transition-transform duration-300"
      style={{width: size, height: size}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#0BA1FF" />
            <stop offset="100%" stopColor="#00DBC5" />
          </linearGradient>
          {/* Very light blue iris */}
          <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor="#D9F2FF" />
            <stop offset="100%" stopColor="#8ECFFF" />
          </radialGradient>
        </defs>

        <g id="avatar">
          {/* Background */}
          <circle id="bg" cx="512" cy="512" r="650" fill="url(#bgGradient)" />

          {/* Neck and Torso */}
          <g id="body">
            {/* Jacket (Shoulders) – Rounded and extended */}
            <path
              id="jacket-shoulders"
              d="M150 1024 L150 950 Q150 820 350 820 Q512 820 674 820 Q874 820 874 950 L874 1024 Z"
              fill="#191C22"
            />

            {/* Neck - Extended and Widened */}
            <path id="neck" d="M420 750 L420 880 Q512 890 604 880 L604 750 Z" fill="#FFD2B8" />
            <path
              id="neck-shadow"
              d="M490 750 L490 880 Q512 885 534 880 L534 750 Z"
              fill="#E8A98C"
              opacity="0.5"
            />

            {/* Shirt (Maroon) – downward V neck */}
            <path
              id="shirt"
              d="M400 820 L512 880 L624 820 L660 1024 L364 1024 Z"
              fill="#8C2836"
            />
            {/* Inner darker placket */}
            <path
              id="shirt-inner"
              d="M472 890 L512 930 L552 890 L552 1024 L472 1024 Z"
              fill="#751E2D"
            />
            {/* Shirt collars */}
            <path
              id="shirt-collar-left"
              d="M420 820 L370 820 L430 890 Z"
              fill="#8C2836"
            />
            <path
              id="shirt-collar-right"
              d="M604 820 L654 820 L594 890 Z"
              fill="#8C2836"
            />

            {/* Jacket (Lapels & Body) */}
            <path
              id="jacket-lapels"
              d="M350 1024 L430 820 L512 960 L594 820 L674 1024 Z"
              fill="#23262E"
            />
          </g>

          {/* Head and Face */}
          <g id="head">
            {/* Ears */}
            <g id="ears">
              <ellipse cx="280" cy="550" rx="30" ry="50" fill="#FFD2B8" stroke="#1A0F17" strokeWidth="4" />
              <ellipse cx="744" cy="550" rx="30" ry="50" fill="#FFD2B8" stroke="#1A0F17" strokeWidth="4" />
            </g>

            {/* Skull / Face Base - Slightly wider jaw */}
            <ellipse id="face-base" cx="512" cy="440" rx="260" ry="330" fill="#FFD2B8" />

            {/* Jaw Shadow – Reduced opacity and adjusted to blend better */}
            <path
              id="jaw-shadow"
              d="M320 600 Q512 740 704 600 Q684 660 512 710 Q340 660 320 600 Z"
              fill="#E8A98C"
              opacity="0.2"
            />

            {/* Beard – Fuller, well-groomed */}
            <g id="beard">
              {/* Main beard band */}
              <path
                id="beard-base"
                d="M300 560 Q360 740 512 780 Q664 740 724 560 L724 590 Q660 760 512 800 Q364 760 300 590 Z"
                fill="#9E544C"
              />
              {/* Inner darker band for depth - Simplified to avoid double beard look */}
              <path
                id="beard-shadow"
                d="M340 580 Q400 720 512 750 Q624 720 684 580 Q660 690 512 720 Q364 690 340 580 Z"
                fill="#7A3C30"
                opacity="0.5"
              />
              {/* Sideburns - Extended up to ears (y=550) */}
              <path
                id="sideburn-left"
                d="M312 550 L292 550 L292 600 L312 640 Z"
                fill="#9E544C"
              />
              <path
                id="sideburn-right"
                d="M712 550 L732 550 L732 600 L712 640 Z"
                fill="#9E544C"
              />
            </g>

            {/* Facial Features */}
            <g id="face-features">
              {/* Eyebrows */}
              <g id="brows">
                <path d="M350 380 Q400 350 450 380" stroke="#5B3329" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M574 380 Q624 350 674 380" stroke="#5B3329" strokeWidth="12" fill="none" strokeLinecap="round" />
              </g>

              {/* Eyes */}
              <g id="eyes">
                {eyeOpen ? (
                  <>
                    {/* Left Eye */}
                    <g id="eye-left" transform="translate(350, 450)">
                      <ellipse cx="50" cy="0" rx="70" ry="50" fill="#FDF7F8" />
                      <circle cx="50" cy="0" r="35" fill="url(#irisGradient)" />
                      <circle cx="50" cy="0" r="15" fill="#05040A" />
                      <circle cx="35" cy="-15" r="10" fill="white" opacity="0.8" />
                      <path d="M-20 -40 Q50 -60 120 -40" stroke="#1A0F17" strokeWidth="6" fill="none" strokeLinecap="round" />
                    </g>
                    {/* Right Eye */}
                    <g id="eye-right" transform="translate(574, 450)">
                      <ellipse cx="50" cy="0" rx="70" ry="50" fill="#FDF7F8" />
                      <circle cx="50" cy="0" r="35" fill="url(#irisGradient)" />
                      <circle cx="50" cy="0" r="15" fill="#05040A" />
                      <circle cx="35" cy="-15" r="10" fill="white" opacity="0.8" />
                      <path d="M-20 -40 Q50 -60 120 -40" stroke="#1A0F17" strokeWidth="6" fill="none" strokeLinecap="round" />
                    </g>
                  </>
                ) : (
                  <>
                    {/* Closed Eyes */}
                    <path d="M330 450 Q400 470 470 450" stroke="#1A0F17" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M554 450 Q624 470 694 450" stroke="#1A0F17" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </>
                )}
              </g>

              {/* Nose */}
              <g id="nose">
                <path d="M512 520 L500 560 L524 560" stroke="#E19D83" strokeWidth="4" fill="none" strokeLinecap="round" />
              </g>

              {/* Mouth */}
              <g id="mouth" transform="translate(512, 650)">
                {expression === "mild" && <path d="M-50 0 Q0 20 50 0" stroke="#1A0F17" strokeWidth="6" fill="none" strokeLinecap="round" />}
                {expression === "very" && (
                  <g>
                    <path d="M-60 -10 Q0 40 60 -10 Z" fill="#FFF8F8" stroke="#1A0F17" strokeWidth="4" />
                    <path d="M-60 -10 Q0 40 60 -10" stroke="#1A0F17" strokeWidth="4" fill="none" />
                  </g>
                )}
                {expression === "extra" && (
                  <g>
                    <path d="M-60 -20 Q0 60 60 -20 Z" fill="#7A2F26" stroke="#1A0F17" strokeWidth="4" />
                    <path d="M-40 30 Q0 40 40 30" stroke="#1A0F17" strokeWidth="4" fill="none" opacity="0.5" />
                  </g>
                )}
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
