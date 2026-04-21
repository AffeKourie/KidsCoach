export default function Pitch() {
  return (
    <svg
      viewBox="0 0 680 950"
      className="w-full h-full rounded-xl"
      style={{ background: '#2d8a4e' }}
    >
      {/* Pitch outline */}
      <rect x="30" y="20" width="620" height="910" fill="none" stroke="white" strokeWidth="2.5" rx="4" />

      {/* Center line */}
      <line x1="30" y1="475" x2="650" y2="475" stroke="white" strokeWidth="2" />

      {/* Center circle */}
      <circle cx="340" cy="475" r="80" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="340" cy="475" r="3" fill="white" />

      {/* Top penalty area */}
      <rect x="170" y="20" width="340" height="150" fill="none" stroke="white" strokeWidth="2" />
      <rect x="230" y="20" width="220" height="55" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="340" cy="125" r="3" fill="white" />
      <path d="M 250 170 A 80 80 0 0 0 430 170" fill="none" stroke="white" strokeWidth="2" />

      {/* Bottom penalty area */}
      <rect x="170" y="780" width="340" height="150" fill="none" stroke="white" strokeWidth="2" />
      <rect x="230" y="875" width="220" height="55" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="340" cy="825" r="3" fill="white" />
      <path d="M 250 780 A 80 80 0 0 1 430 780" fill="none" stroke="white" strokeWidth="2" />

      {/* Corner arcs */}
      <path d="M 30 35 A 15 15 0 0 0 45 20" fill="none" stroke="white" strokeWidth="2" />
      <path d="M 635 20 A 15 15 0 0 0 650 35" fill="none" stroke="white" strokeWidth="2" />
      <path d="M 45 930 A 15 15 0 0 0 30 915" fill="none" stroke="white" strokeWidth="2" />
      <path d="M 650 915 A 15 15 0 0 0 635 930" fill="none" stroke="white" strokeWidth="2" />

      {/* Goals */}
      <rect x="280" y="5" width="120" height="15" fill="none" stroke="white" strokeWidth="2" rx="2" />
      <rect x="280" y="930" width="120" height="15" fill="none" stroke="white" strokeWidth="2" rx="2" />

      {/* Grass stripes */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <rect
          key={i}
          x="30"
          y={20 + i * 91}
          width="620"
          height="91"
          fill={i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}
        />
      ))}
    </svg>
  );
}
