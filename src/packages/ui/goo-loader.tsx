import { cn } from "./cn";

export const GooLoader = ({ className }: { className?: string }) => {
  return (
    <>
      <div
        role="status"
        aria-label="Loading"
        className={cn("goo-loader", className)}
      >
        <div className="goo-dot goo-dot-1" />
        <div className="goo-dot goo-dot-2" />
        <div className="goo-dot goo-dot-3" />
      </div>

      <svg
        width="0"
        height="0"
        aria-hidden="true"
        className="absolute pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="goo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};