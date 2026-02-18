"use client";

export type MascotMood = "thinking" | "happy" | "cheering" | "sad";

interface Props {
  mood: MascotMood;
  className?: string;
}

export function AstronautMascot({ mood, className = "" }: Props) {
  return (
    <div
      className={`transition-all duration-500 ${
        mood === "thinking"
          ? "animate-float animate-breathe"
          : mood === "sad"
          ? "animate-shake"
          : mood === "cheering"
          ? "animate-bounce-in"
          : ""
      } ${className}`}
    >
      <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Helmet */}
        <circle cx="100" cy="75" r="45" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="3" />
        <circle cx="100" cy="75" r="38" fill="#1A2744" />
        {/* Visor reflection - dynamic color per mood */}
        <ellipse cx="88" cy="68" rx="12" ry="8" fill={
          mood === "happy" || mood === "cheering" ? "rgba(255,215,0,0.25)" : mood === "sad" ? "rgba(139,158,199,0.15)" : "rgba(0,212,255,0.3)"
        } transform="rotate(-15 88 68)" />
        {/* Visor fog for sad mood */}
        {mood === "sad" && (
          <ellipse cx="100" cy="85" rx="30" ry="10" fill="rgba(139,158,199,0.2)" />
        )}

        {/* Eyes - change per mood */}
        {mood === "happy" || mood === "cheering" ? (
          <>
            {/* Happy squint eyes */}
            <path d="M 87 70 Q 92 66 97 70" stroke="#FFD700" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 103 70 Q 108 66 113 70" stroke="#FFD700" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : mood === "sad" ? (
          <>
            {/* Sad droopy eyes */}
            <circle cx="92" cy="72" r="3" fill="#8B9EC7" />
            <circle cx="108" cy="72" r="3" fill="#8B9EC7" />
          </>
        ) : (
          <>
            {/* Thinking: normal + one raised */}
            <circle cx="92" cy="72" r="3" fill="#FFD700" />
            <circle cx="108" cy="70" r="3" fill="#FFD700" />
          </>
        )}

        {/* Mouth - change per mood */}
        {mood === "happy" || mood === "cheering" ? (
          <path d="M 90 82 Q 100 92 110 82" stroke="#FFD700" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : mood === "sad" ? (
          <path d="M 93 86 Q 100 80 107 86" stroke="#8B9EC7" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <circle cx="102" cy="84" r="2" fill="#FFD700" />
        )}

        {/* Body */}
        <rect x="75" y="115" width="50" height="45" rx="12" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
        {/* Chest panel */}
        <rect x="88" y="122" width="24" height="14" rx="3" fill="#1A2744" />
        <circle cx="96" cy="129" r="2" fill={mood === "sad" ? "#FF5A5A" : "#22D17B"} />
        <circle cx="104" cy="129" r="2" fill={mood === "cheering" ? "#22D17B" : "#FF5A5A"} />

        {/* Arms - change per mood */}
        {mood === "cheering" ? (
          <>
            {/* Arms raised */}
            <rect x="55" y="95" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" transform="rotate(-45 66 101)" />
            <rect x="123" y="95" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" transform="rotate(45 134 101)" />
            <circle cx="46" cy="100" r="7" fill="#FFD700" />
            <circle cx="154" cy="100" r="7" fill="#FFD700" />
          </>
        ) : mood === "thinking" ? (
          <>
            {/* One arm on helmet, one normal */}
            <rect x="55" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
            <circle cx="52" cy="126" r="7" fill="#FFD700" />
            {/* Right arm up to helmet */}
            <rect x="125" y="98" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" transform="rotate(-60 136 104)" />
            <circle cx="120" cy="82" r="7" fill="#FFD700" />
          </>
        ) : mood === "happy" ? (
          <>
            {/* Thumb up on right */}
            <rect x="55" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
            <circle cx="52" cy="126" r="7" fill="#FFD700" />
            <rect x="123" y="110" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" transform="rotate(-20 134 116)" />
            <circle cx="148" cy="108" r="7" fill="#FFD700" />
            {/* Thumb */}
            <line x1="148" y1="108" x2="152" y2="98" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Normal arms */}
            <rect x="55" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
            <rect x="123" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
            <circle cx="52" cy="126" r="7" fill="#FFD700" />
            <circle cx="148" cy="126" r="7" fill="#FFD700" />
          </>
        )}

        {/* Legs */}
        <rect x="80" y="155" width="15" height="25" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
        <rect x="105" y="155" width="15" height="25" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
        {/* Boots */}
        <rect x="76" y="175" width="22" height="10" rx="5" fill="#FF8C42" />
        <rect x="102" y="175" width="22" height="10" rx="5" fill="#FF8C42" />
        {/* Antenna */}
        <line x1="100" y1="30" x2="100" y2="15" stroke="#8B9EC7" strokeWidth="2" />
        <circle cx="100" cy="12" r="4" fill={mood === "cheering" || mood === "happy" ? "#FFD700" : "#8B9EC7"} />
        {/* Backpack */}
        <rect x="68" y="118" width="10" height="30" rx="4" fill="#8B9EC7" />

        {/* Decorative elements per mood */}
        {mood === "thinking" && (
          <>
            <text x="140" y="60" fontSize="16" fill="#FFD700" opacity="0.8">?</text>
            <text x="155" y="48" fontSize="12" fill="#00D4FF" opacity="0.6">?</text>
          </>
        )}
        {(mood === "happy" || mood === "cheering") && (
          <>
            <text x="40" y="55" fontSize="14" fill="#FFD700">&#9733;</text>
            <text x="150" y="50" fontSize="10" fill="#00D4FF">&#9733;</text>
            <text x="55" y="100" fontSize="8" fill="#FFD700">&#9733;</text>
          </>
        )}
        {mood === "cheering" && (
          <>
            <text x="35" y="85" fontSize="12" fill="#FF8C42" opacity="0.9">
              <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="1.5s" repeatCount="indefinite" begin="0s" />
              &#9733;
            </text>
            <text x="160" y="75" fontSize="11" fill="#22D17B" opacity="0.8">
              <animateTransform attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="1.8s" repeatCount="indefinite" begin="0.3s" />
              &#9733;
            </text>
            <text x="30" y="65" fontSize="9" fill="#E8EDF5" opacity="0.7">
              <animateTransform attributeName="transform" type="translate" values="0,0;0,-10;0,0" dur="2s" repeatCount="indefinite" begin="0.6s" />
              &#9733;
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
