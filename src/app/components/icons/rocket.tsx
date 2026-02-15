export function Rocket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="28" rx="4" ry="4" fill="#FF8C42" opacity="0.8" />
      <ellipse cx="16" cy="27" rx="2.5" ry="3" fill="#FFD700" />
      <path d="M 12 24 L 12 12 Q 16 2 20 12 L 20 24 Z" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="1" />
      <circle cx="16" cy="14" r="3" fill="#00D4FF" />
      <circle cx="15" cy="13" r="1" fill="rgba(255,255,255,0.5)" />
      <path d="M 12 22 L 7 26 L 12 24 Z" fill="#FF5A5A" />
      <path d="M 20 22 L 25 26 L 20 24 Z" fill="#FF5A5A" />
      <circle cx="16" cy="8" r="1.5" fill="#FFD700" />
    </svg>
  );
}
