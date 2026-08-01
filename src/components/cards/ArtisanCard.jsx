import { Heart, Star, CheckCircle2 } from "lucide-react";

export default function ArtisanCard({ artisan }) {
  const { name, trade, location, rating, isVerified, avatar } = artisan;

  return (
    <div className="relative flex w-40 flex-shrink-0 flex-col items-center rounded-2xl border border-border/80 bg-surface p-4 shadow-soft">
      <button className="absolute right-3 top-3 text-text-secondary/50 hover:text-secondary">
        <Heart size={18} />
      </button>
      <img src={avatar} alt={name} className="h-16 w-16 rounded-full object-cover" />
      <div className="mt-3 flex items-center gap-1">
        <p className="text-sm font-bold text-text">{name}</p>
        {isVerified && <CheckCircle2 size={14} className="text-primary" />}
      </div>
      <p className="text-xs text-text-secondary">{trade}</p>
      <div className="mt-2 flex items-center gap-1 text-xs text-text">
        <Star size={13} className="fill-secondary text-secondary" />
        <span className="font-semibold">{rating}</span>
      </div>
      <p className="mt-0.5 text-[11px] text-text-secondary">{location}</p>
    </div>
  );
}