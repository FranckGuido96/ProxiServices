import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plus, Search, User } from 'lucide-react';

const navItems = [
    { to: '/', label: 'Accueil', icon: Home },
    { to: '/devenir-prestataire', label: 'Rejoindre', icon: Plus },
    { to: '/recherche', label: 'Recherche', icon: Search },
    { to: '/profil', label: 'Profil', icon: User },
];

export const BottomNav: React.FC = () => {
    return (
        <div className="sticky bottom-0 left-0 right-0 z-40 bg-surface/95 dark:bg-[#0B0B0E]/95 border-t border-border dark:border-white/10 shadow-2xl px-2 py-2 flex items-center justify-around">
            {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} end={to === '/'}
                    className={({ isActive }) => `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${isActive ? 'text-primary-700 dark:text-emerald-400 font-bold' : 'text-text-secondary dark:text-white/45 font-medium'
                        }`}>
                    <Icon className="w-5 h-5 mb-0.5 stroke-[2]" />
                    <span className="text-[10px] tracking-wider uppercase font-semibold">{label}</span>
                </NavLink>
            ))}
        </div>
    );
};