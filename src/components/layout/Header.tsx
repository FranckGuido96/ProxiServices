import React from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';

interface HeaderProps {
    onOpenMenu: () => void;
    theme: 'dark' | 'light';
    onToggleTheme: () => void;
    unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, theme, onToggleTheme, unreadNotificationsCount = 2 }) => {
    return (
        <div className="relative pt-5 pb-20 px-5 rounded-b-[2rem] overflow-hidden select-none border-b shadow-2xl
      bg-gradient-to-b from-primary-500 to-primary-700 border-primary-600/30
      dark:from-[#0B1E16] dark:via-[#0F281E] dark:to-[#0A1A14] dark:border-emerald-500/20 text-white">

            <div className="relative z-10 flex items-center justify-between mb-6">
                <button onClick={onOpenMenu} className="p-2 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 hover:bg-white/25 transition active:scale-95" aria-label="Menu">
                    <Menu className="w-5 h-5 stroke-[2.5]" />
                </button>

                <div className="flex items-center gap-2.5">
                    <button onClick={onToggleTheme} className="p-2 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 hover:bg-white/25 transition active:scale-95" aria-label="Changer de thème">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button className="relative p-2 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 hover:bg-white/25 transition active:scale-95" aria-label="Notifications">
                        <Bell className="w-5 h-5" />
                        {unreadNotificationsCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary dark:bg-emerald-400 rounded-full ring-2 ring-primary-700 dark:ring-[#0B1E16]" />
                        )}
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/15 dark:bg-white/10 border border-white/30 dark:border-white/20 overflow-hidden flex items-center justify-center active:scale-95" aria-label="Profil">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Profil" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                </div>
            </div>

            <div className="relative z-10 max-w-[300px] mb-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/80 dark:text-emerald-400/80 mb-1 block">
                    PROXISERVICES • CÔTE D'IVOIRE
                </span>
                <p className="text-xs font-medium text-white/90 dark:text-emerald-100/90 flex items-center gap-1.5">
                    <span>Bonjour</span><span className="inline-block animate-pulse">👋</span>
                </p>
                <h1 className="text-xl sm:text-2xl font-serif font-normal italic leading-snug mt-1 text-white tracking-tight">
                    Trouvez le professionnel <span className="not-italic font-bold">qu'il vous faut</span>
                </h1>
            </div>
        </div>
    );
};