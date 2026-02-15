export function Astronaut({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Helmet */}
      <circle cx="100" cy="75" r="45" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="3" />
      <circle cx="100" cy="75" r="38" fill="#1A2744" />
      {/* Visor reflection */}
      <ellipse cx="88" cy="68" rx="12" ry="8" fill="rgba(0,212,255,0.3)" transform="rotate(-15 88 68)" />
      {/* Face behind visor */}
      <circle cx="92" cy="72" r="3" fill="#FFD700" />
      <circle cx="108" cy="72" r="3" fill="#FFD700" />
      <path d="M 94 82 Q 100 88 106 82" stroke="#FFD700" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Body */}
      <rect x="75" y="115" width="50" height="45" rx="12" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      {/* Chest panel */}
      <rect x="88" y="122" width="24" height="14" rx="3" fill="#1A2744" />
      <circle cx="96" cy="129" r="2" fill="#22D17B" />
      <circle cx="104" cy="129" r="2" fill="#FF5A5A" />
      {/* Arms */}
      <rect x="55" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      <rect x="123" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      {/* Gloves */}
      <circle cx="52" cy="126" r="7" fill="#FFD700" />
      <circle cx="148" cy="126" r="7" fill="#FFD700" />
      {/* Legs */}
      <rect x="80" y="155" width="15" height="25" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      <rect x="105" y="155" width="15" height="25" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      {/* Boots */}
      <rect x="76" y="175" width="22" height="10" rx="5" fill="#FF8C42" />
      <rect x="102" y="175" width="22" height="10" rx="5" fill="#FF8C42" />
      {/* Antenna */}
      <line x1="100" y1="30" x2="100" y2="15" stroke="#8B9EC7" strokeWidth="2" />
      <circle cx="100" cy="12" r="4" fill="#FFD700" />
      {/* Backpack */}
      <rect x="68" y="118" width="10" height="30" rx="4" fill="#8B9EC7" />
    </svg>
  );
}
