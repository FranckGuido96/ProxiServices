import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Home, UserPlus, Heart, Settings } from 'lucide-react';
import logo from '../assets/images/logo 1.svg';
import { useDialogFocus } from '../hooks/useDialogFocus';
import { useFavorites } from '../hooks/useFavorites';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const itemClass =
  'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text dark:text-white hover:bg-background dark:hover:bg-white/5 transition outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400';

// Monté seulement quand le menu est ouvert
const DrawerDialog: React.FC<Omit<SideMenuDrawerProps, 'isOpen'>> = ({ onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { favorites } = useFavorites();
  useDialogFocus(drawerRef, onClose);

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex justify-start"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        tabIndex={-1}
        className="bg-surface dark:bg-[#121215] text-text dark:text-[#F5F5F5] border-r border-border dark:border-white/10 w-4/5 max-w-xs h-full shadow-2xl relative flex flex-col justify-between outline-none"
      >
        <div>
          <div className="bg-gradient-to-b from-primary-500 to-primary-700 dark:from-[#0B1E16] dark:via-[#0F281E] dark:to-[#0A1A14] text-white p-5 pt-8 relative border-b border-white/20 dark:border-emerald-500/20">
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5">
              <img src={logo} alt="" className="w-14 h-16 object-contain shrink-0 -ml-1" />
              <div>
                <span className="text-xl font-serif font-bold tracking-tight block leading-tight">ProxiServices</span>
                <p className="text-xs text-white/80 dark:text-emerald-400 font-medium">Vos services à proximité</p>
              </div>
            </div>
          </div>

          <nav aria-label="Liens du menu" className="p-3 space-y-1">
            <Link to="/" onClick={onClose} className={itemClass}>
              <Home className="w-4 h-4 text-primary-700 dark:text-emerald-400" aria-hidden="true" />
              <span>Accueil</span>
            </Link>

            <Link to="/prestataire/dashboard" onClick={onClose} className={`${itemClass} justify-between`}>
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-primary-700 dark:text-emerald-400" aria-hidden="true" />
                <span>Espace Prestataire</span>
              </div>
              <span className="bg-primary-50 dark:bg-emerald-950 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                Dashboard
              </span>
            </Link>

            <Link to="/devenir-prestataire" onClick={onClose} className={itemClass}>
              <UserPlus className="w-4 h-4 text-amber-500 dark:text-amber-400" aria-hidden="true" />
              <span>Devenir prestataire</span>
            </Link>

            <Link to="/favoris" onClick={onClose} className={`${itemClass} justify-between`}>
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-primary-700 dark:text-emerald-400" aria-hidden="true" />
                <span>Mes favoris</span>
              </div>
              <span className="bg-primary-50 border border-primary-200 text-primary-700 dark:bg-emerald-950 dark:border-emerald-500/30 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-border dark:border-white/10 bg-background dark:bg-[#09090B] text-[11px] text-text-secondary dark:text-white/40 text-center">
          <p className="font-semibold text-text dark:text-white/60">ProxiServices v1.0</p>
          <p className="mt-0.5">Côte d'Ivoire • Abidjan</p>
        </div>
      </div>
    </div>
  );
};

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <DrawerDialog onClose={onClose} />;
};