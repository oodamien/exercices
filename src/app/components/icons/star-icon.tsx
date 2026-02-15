export function StarIcon({ filled = true, className = "" }: { filled?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={filled ? "#FFD700" : "none"}
        stroke="#FFD700"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
