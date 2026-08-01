import { Wrench, Zap, Hammer, Paintbrush, Car, Scissors, ChevronRight } from "lucide-react";

const categories = [
  { id: "plomberie", name: "Plomberie", icon: Wrench, bg: "bg-blue-100", color: "text-blue-600" },
  { id: "electricite", name: "Électricité", icon: Zap, bg: "bg-amber-100", color: "text-amber-600" },
  { id: "menuiserie", name: "Menuiserie", icon: Hammer, bg: "bg-orange-100", color: "text-orange-600" },
  { id: "peinture", name: "Peinture", icon: Paintbrush, bg: "bg-purple-100", color: "text-purple-600" },
  { id: "mecanique", name: "Mécanique", icon: Car, bg: "bg-sky-100", color: "text-sky-600" },
  { id: "coiffure", name: "Couture / Beauté", icon: Scissors, bg: "bg-pink-100", color: "text-pink-600" },
];

export default function CategoryGrid() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-text">Catégories populaires</h3>
        <button className="flex items-center text-xs font-semibold text-primary">
          Voir tout <ChevronRight size={14} />
        </button>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-1">
        {categories.map(({ id, name, icon: Icon, bg, color }) => (
          <div key={id} className="flex flex-shrink-0 flex-col items-center gap-2">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${bg}`}>
              <Icon size={22} className={color} />
            </div>
            <span className="text-xs font-medium text-text">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}