import { ChevronRight } from "lucide-react";
import ArtisanCard from "../cards/ArtisanCard";

const artisans = [
  { id: 1, name: "Kouassi Liam", trade: "Menuisier Ébéniste", location: "Cocody, Abidjan", rating: 4.9, isVerified: true, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" },
  { id: 2, name: "Yao Emmanuel", trade: "Plombier Sanitaire", location: "Yopougon, Abidjan", rating: 4.8, isVerified: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
  { id: 3, name: "Koffi Awa", trade: "Électricienne Bâtiment", location: "Marcory, Abidjan", rating: 4.7, isVerified: false, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
];

export default function RecentArtisans() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-text">Prestataires récemment inscrits</h3>
        <button className="flex items-center text-xs font-semibold text-primary">
          Voir tout <ChevronRight size={14} />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-1">
        {artisans.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </section>
  );
}