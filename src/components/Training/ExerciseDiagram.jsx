const COLORS = {
  player: '#3b82f6',
  opponent: '#ef4444',
  cone: '#f97316',
  ball: '#facc15',
  arrow: '#22c55e',
  passArrow: '#60a5fa',
  area: '#e5e7eb',
  grass: '#dcfce7',
};

export default function ExerciseDiagram({ setup }) {
  if (!setup) return null;

  const w = setup.width || 30;
  const h = setup.height || 20;
  const pad = 2;
  const vw = w + pad * 2;
  const vh = h + pad * 2;

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className="w-full max-w-sm rounded-lg border border-gray-200 bg-green-50"
      style={{ aspectRatio: `${vw}/${vh}` }}
    >
      {/* Area/pitch outline */}
      <rect x={pad} y={pad} width={w} height={h} rx="0.5" fill={COLORS.grass} stroke="#86efac" strokeWidth="0.3" />

      {/* Goals */}
      {setup.goals?.map((g, i) => (
        <rect key={`g${i}`} x={g.x + pad - (g.w || 4) / 2} y={g.y + pad - 0.4} width={g.w || 4} height={0.8} rx="0.2" fill="white" stroke="#9ca3af" strokeWidth="0.2" />
      ))}

      {/* Zones */}
      {setup.zones?.map((z, i) => (
        <rect key={`z${i}`} x={z.x + pad} y={z.y + pad} width={z.w} height={z.h} rx="0.3" fill={z.color || COLORS.area} fillOpacity="0.3" stroke={z.color || '#9ca3af'} strokeWidth="0.15" strokeDasharray="0.5" />
      ))}

      {/* Movement arrows */}
      {setup.arrows?.map((a, i) => (
        <g key={`a${i}`}>
          <defs>
            <marker id={`ah${i}`} markerWidth="2" markerHeight="2" refX="1.5" refY="1" orient="auto">
              <polygon points="0,0 2,1 0,2" fill={a.dashed ? COLORS.passArrow : COLORS.arrow} />
            </marker>
          </defs>
          <line
            x1={a.x1 + pad} y1={a.y1 + pad} x2={a.x2 + pad} y2={a.y2 + pad}
            stroke={a.dashed ? COLORS.passArrow : COLORS.arrow}
            strokeWidth="0.25"
            strokeDasharray={a.dashed ? '0.5' : 'none'}
            markerEnd={`url(#ah${i})`}
          />
        </g>
      ))}

      {/* Cones */}
      {setup.cones?.map((c, i) => (
        <polygon key={`c${i}`} points={`${c.x + pad},${c.y + pad - 0.5} ${c.x + pad - 0.4},${c.y + pad + 0.3} ${c.x + pad + 0.4},${c.y + pad + 0.3}`} fill={COLORS.cone} />
      ))}

      {/* Players */}
      {setup.players?.map((p, i) => (
        <g key={`p${i}`}>
          <circle cx={p.x + pad} cy={p.y + pad} r="0.8" fill={p.team === 'away' ? COLORS.opponent : COLORS.player} stroke="white" strokeWidth="0.15" />
          {p.label && (
            <text x={p.x + pad} y={p.y + pad + 0.3} textAnchor="middle" fill="white" fontSize="0.7" fontWeight="bold">{p.label}</text>
          )}
        </g>
      ))}

      {/* Balls */}
      {setup.balls?.map((b, i) => (
        <circle key={`b${i}`} cx={b.x + pad} cy={b.y + pad} r="0.45" fill={COLORS.ball} stroke="#a16207" strokeWidth="0.12" />
      ))}

      {/* Labels */}
      {setup.labels?.map((l, i) => (
        <text key={`l${i}`} x={l.x + pad} y={l.y + pad} textAnchor="middle" fill="#6b7280" fontSize="0.65">{l.text}</text>
      ))}
    </svg>
  );
}
