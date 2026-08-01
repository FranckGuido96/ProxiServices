import { Search, MapPin } from "lucide-react";

export default function SearchCard() {
  return (
    <div className="relative -mt-32 rounded-3xl bg-surface p-5 shadow-card">
      <div className="flex items-center gap-3 rounded-xl border border-border/80 px-4 py-3">
        <Search size={20} className="text-text-secondary" />
        <input
          type="text"
          placeholder="Quel service recherchez-vous ?"
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-secondary/70"
        />
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-border/80 px-4 py-3">
        <MapPin size={20} className="text-text-secondary" />
        <input
          type="text"
          placeholder="Ville ou commune"
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-secondary/70"
        />
      </div>
      <button className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-hover">
        Trouver
      </button>
    </div>
  );
}