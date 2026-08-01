import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Search,
  LayoutGrid,
  Calendar,
  MessageSquare,
  Heart,
  Wrench,
  Headphones,
  Info,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  // Close sidebar on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavClick = (path) => {
    if (onClose) onClose();
    if (path) navigate(path);
  };

  const handleLogout = () => {
    if (onClose) onClose();
    // Action de déconnexion (par exemple redirection vers /login ou réinitialisation d'état)
    navigate('/login');
  };

  return (
    <>
      {/* Background overlay (bg-black/50) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sliding Drawer Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[80vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out sm:rounded-r-3xl overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Menu de navigation"
      >
        {/* Header Vert avec coin arrondi en bas à droite (rounded-br-3xl) */}
        <div className="bg-primary-700 text-white pt-8 pb-7 px-6 rounded-br-3xl shadow-sm relative overflow-hidden flex-shrink-0">
          {/* Subtle background glow decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none" />

          <div className="flex items-center gap-3.5 relative z-10">
            {/* Custom Logo Teardrop Pin with House Inside */}
            <div className="relative w-10 h-11 flex-shrink-0">
              <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                <path
                  d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 20 44 20 44C20 44 40 31.0457 40 20C40 8.95431 31.0457 0 20 0Z"
                  fill="white"
                />
                {/* Roof */}
                <path d="M20 11L11 18H14V26H26V18H29L20 11Z" fill="#166534" />
              </svg>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white leading-snug">
                ProxiServices
              </h2>
              <p className="text-xs text-white/80 font-medium">
                Vos services à proximité
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items Scrollable Container */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 scrollbar-none">
          {/* Section Principale */}
          <div className="space-y-0.5">
            <NavLink
              to="/"
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Home size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>Accueil</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/recherche"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Search size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>Rechercher</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/categories"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <LayoutGrid size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>Catégories</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/reservations"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Calendar size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>Mes réservations</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/messages"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <MessageSquare size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>Messages</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/favoris"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Heart size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>Favoris</span>
                </>
              )}
            </NavLink>
          </div>

          {/* Séparateur */}
          <div className="my-2 border-t border-stone-100" />

          {/* Section Secondaire */}
          <div className="space-y-0.5">
            <NavLink
              to="/rejoindre"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Wrench size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>Devenir prestataire</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/contact"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Headphones size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>Nous contacter</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/apropos"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Info size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>À propos</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/parametres"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-primary-700 bg-emerald-50/80 font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Settings size={20} className={isActive ? 'text-primary-700' : 'text-stone-500'} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>Paramètres</span>
                </>
              )}
            </NavLink>
          </div>

          {/* Séparateur avant Pied de page */}
          <div className="my-2 border-t border-stone-100" />

          {/* Pied de page (Déconnexion) */}
          <div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left"
            >
              <LogOut size={20} className="text-red-500" strokeWidth={2} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
