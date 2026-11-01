import { Star } from "lucide-react";

export default function Stars({ rating, size = "size-4" }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`${size} ${i < Math.round(rating) ? "fill-sun-400 text-sun-400" : "fill-slate-200 text-slate-200"}`}
        />
      ))}
    </span>
  );
}
