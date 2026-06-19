// src/components/shared/AnimatedBackground.jsx
// Lightweight GPU-friendly animated background: glowing blobs + drifting SVG wave lines.
// Pure CSS/SVG animation (no canvas/JS loop) so it stays performant everywhere it's used.

export default function AnimatedBackground({ variant = 'light', className = '' }) {
  const isDark = variant === 'dark';

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Glow blobs */}
      <div
        className={`absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full blur-3xl animate-float-slow
        ${isDark ? 'bg-primary-500/25' : 'bg-primary-500/10'}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full blur-3xl animate-float-slower
        ${isDark ? 'bg-amber-400/15' : 'bg-dark-800/5'}`}
      />
      <div
        className={`absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-3xl animate-float-slow
        ${isDark ? 'bg-purple-500/10' : 'bg-amber-400/10'}`}
      />

      {/* Drifting wave lines (SVG, doubled width for seamless loop) */}
      <svg
        className="absolute bottom-0 left-0 w-[200%] h-1/2 wave-layer opacity-40"
        viewBox="0 0 2000 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f04d22" />
            <stop offset="50%" stopColor="#ff9977" />
            <stop offset="100%" stopColor="#f04d22" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M0 ${260 + i * 18} C 250 ${180 + i * 14}, 500 ${320 - i * 10}, 750 ${230 + i * 16} S 1250 ${180 + i * 12}, 1500 ${260 + i * 14} S 2000 ${230 + i * 10}, 2000 ${260 + i * 16}`}
            stroke="url(#waveGrad)"
            strokeWidth="1"
            opacity={0.5 - i * 0.06}
          />
        ))}
      </svg>
    </div>
  );
}
