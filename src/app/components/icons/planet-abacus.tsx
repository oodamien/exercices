export function PlanetAbacus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="abacusGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#FF8C42" />
          <stop offset="100%" stopColor="#4A1A00" />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="80" rx="75" ry="18" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.4" transform="rotate(-20 80 80)" />
      <circle cx="80" cy="80" r="45" fill="url(#abacusGrad)" />
      <ellipse cx="80" cy="70" rx="38" ry="4" fill="rgba(255,255,255,0.1)" />
      <ellipse cx="80" cy="85" rx="35" ry="3" fill="rgba(255,255,255,0.08)" />
      <path d="M 20 72 Q 80 100 140 72" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.6" />
      <circle cx="45" cy="82" r="5" fill="#FFD700" opacity="0.8" />
      <circle cx="65" cy="87" r="5" fill="#FF8C42" opacity="0.8" />
      <circle cx="95" cy="87" r="5" fill="#FFD700" opacity="0.8" />
      <circle cx="115" cy="82" r="5" fill="#FF8C42" opacity="0.8" />
    </svg>
  );
}
