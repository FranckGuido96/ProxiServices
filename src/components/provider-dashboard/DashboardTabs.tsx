import React from 'react';
import { Bell, User, Image } from 'lucide-react';

export type DashboardTab = 'alerts' | 'profile' | 'works';

interface DashboardTabsProps {
    active: DashboardTab;
    onChange: (tab: DashboardTab) => void;
    worksCount: number;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({ active, onChange, worksCount }) => {
    const tabs: { id: DashboardTab; label: string; icon: typeof Bell }[] = [
        { id: 'alerts', label: 'Alertes & Stats', icon: Bell },
        { id: 'profile', label: 'Mon Profil', icon: User },
        { id: 'works', label: `Travaux${worksCount > 0 ? ` (${worksCount})` : ''}`, icon: Image },
    ];

    return (
        <div className="flex gap-2.5 px-4 my-4 overflow-x-auto no-scrollbar">
            {tabs.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                    <button
                        key={id}
                        onClick={() => onChange(id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition ${isActive
                                ? 'bg-primary-700 dark:bg-[#10B981] text-white dark:text-slate-950 shadow-sm'
                                : 'bg-surface dark:bg-[#121215] border border-border dark:border-white/10 text-text-secondary dark:text-white/80 hover:border-primary-300 dark:hover:border-white/20'
                            }`}
                    >
                        <Icon className={`w-4 h-4 ${isActive ? 'fill-current' : ''}`} />
                        {label}
                    </button>
                );
            })}
        </div>
    );
};