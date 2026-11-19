const SRC = "https://github.com/ColbemLLC.png";
const LAYERS = 20;
const STEP = 2.5;

export function ColbeMark({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ perspective: "900px" }}
    >
      <svg width="0" height="0" className="absolute">
        <filter id="colbe-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.6"
            result="speckle"
          />
          <feComposite in="speckle" in2="SourceGraphic" operator="in" result="dots" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="dots" />
          </feMerge>
        </filter>
      </svg>
      <div
        className="relative size-full"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(10deg) rotateY(-24deg) rotateZ(-4deg)",
        }}
      >
        {Array.from({ length: LAYERS }, (_, i) => (
          <img
            key={i}
            src={SRC}
            alt=""
            draggable={false}
            className="absolute inset-0 size-full object-contain"
            style={{
              transform: `translateZ(${-i * STEP}px)`,
              filter: i === 0 ? "url(#colbe-grain)" : "brightness(0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
}