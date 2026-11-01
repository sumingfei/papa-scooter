import type { ArtVariant } from "@/lib/data";

const DARK = "#1e293b";

function Wheel({ cx, cy, r, accent }: { cx: number; cy: number; r: number; accent: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={DARK} />
      <circle cx={cx} cy={cy} r={r * 0.62} fill="#334155" />
      <circle cx={cx} cy={cy} r={r * 0.3} fill={accent} />
    </g>
  );
}

function Shape({ variant, accent }: { variant: ArtVariant; accent: string }) {
  switch (variant) {
    case "scooter-4":
    case "scooter-3":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M36 112 Q36 102 48 102 L138 102 Q150 102 156 114 L160 124 L36 124 Z" fill={accent} />
          <path d="M36 112 L36 124 L160 124" fill="none" stroke={DARK} strokeOpacity={0.15} strokeWidth={4} />
          <line x1={70} y1={102} x2={70} y2={84} stroke={DARK} strokeWidth={8} />
          <rect x={44} y={68} width={58} height={18} rx={9} fill={DARK} />
          <rect x={40} y={30} width={18} height={46} rx={8} fill={DARK} />
          <line x1={148} y1={108} x2={132} y2={50} stroke={accent} strokeWidth={9} />
          <line x1={120} y1={47} x2={146} y2={45} stroke={DARK} strokeWidth={6} />
          <rect x={138} y={58} width={30} height={22} rx={4} fill="none" stroke={DARK} strokeWidth={3} />
          <line x1={142} y1={64} x2={164} y2={64} stroke={DARK} strokeWidth={1.5} />
          <line x1={142} y1={71} x2={164} y2={71} stroke={DARK} strokeWidth={1.5} />
          <Wheel cx={56} cy={128} r={14} accent="#fbbf24" />
          <Wheel cx={146} cy={130} r={variant === "scooter-4" ? 12 : 13} accent="#fbbf24" />
        </g>
      );
  }
}

export default function ProductArt({
  variant,
  accent,
  className = "",
  title,
}: {
  variant: ArtVariant;
  accent: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg viewBox="0 0 200 160" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <circle cx={100} cy={82} r={70} fill={accent} opacity={0.12} />
      <circle cx={150} cy={36} r={10} fill="#fbbf24" opacity={0.35} />
      <ellipse cx={100} cy={150} rx={72} ry={6} fill="#0f172a" opacity={0.08} />
      <Shape variant={variant} accent={accent} />
    </svg>
  );
}
