export function PlanetCounting({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="55" fill="url(#countingGrad)" />
      <defs>
        <radialGradient id="countingGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#0B1026" />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="65" rx="40" ry="4" fill="rgba(255,255,255,0.1)" />
      <ellipse cx="80" cy="90" rx="35" ry="3" fill="rgba(255,255,255,0.08)" />
      <polygon points="95,30 82,70 95,70 78,110 92,70 80,70" fill="#FFD700" opacity="0.9" />
      <text x="130" y="50" fill="#00D4FF" fontSize="16" fontWeight="bold" opacity="0.7">7</text>
      <text x="25" y="110" fill="#FFD700" fontSize="14" fontWeight="bold" opacity="0.6">3</text>
      <text x="120" y="120" fill="#E8EDF5" fontSize="12" fontWeight="bold" opacity="0.5">+</text>
    </svg>
  );
}
