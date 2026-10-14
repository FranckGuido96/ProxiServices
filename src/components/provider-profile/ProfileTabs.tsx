import React from 'react';

export type ProfileTab = 'presentation' | 'works' | 'reviews';

interface ProfileTabsProps {
    active: ProfileTab;
    onChange: (tab: ProfileTab) => void;
    worksCount: number;
    reviewsCount: number;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ active, onChange, worksCount, reviewsCount }) => {
    const tabs: { id: ProfileTab; label: string }[] = [
        { id: 'presentation', label: 'Présentation' },
        { id: 'works', label: `Réalisations (${worksCount})` },
        { id: 'reviews', label: `Avis Clients (${reviewsCount})` },
    ];

    return (
        <div className="px-4 mt-4 mb-4">
            <div className="bg-surface dark:bg-[#121215] p-1 rounded-2xl border border-border dark:border-white/10 flex items-center gap-1 shadow-sm dark:shadow-lg overflow-x-auto">
                {tabs.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => onChange(id)}
                        className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${active === id
                                ? 'bg-primary-700 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md'
                                : 'text-text-secondary dark:text-white/60 hover:text-text dark:hover:text-white'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};