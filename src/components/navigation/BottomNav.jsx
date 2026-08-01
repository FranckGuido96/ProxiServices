import { Home as HomeIcon, Search, UserPlus, User } from "lucide-react";

const tabs = [
  { label: "Accueil", icon: HomeIcon },
  { label: "Recherche", icon: Search },
  { label: "Rejoindre", icon: UserPlus },
  { label: "Profil", icon: User },
];

export default function BottomNav({ active = "Accueil" }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface/90 backdrop-blur-lg border-t border-border px-6 py-2.5 flex items-center justify-between z-50">
      {tabs.map(({ label, icon: Icon }) => {
        const isActive = label === active;
        return (
          <button key={label} className={`flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-text-secondary hover:text-text"}`}>
            <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
            <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}