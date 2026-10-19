import React, { useRef } from 'react';

export type ProfileTab = 'presentation' | 'works' | 'reviews';

interface ProfileTabsProps {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
  worksCount: number;
  reviewsCount: number;
}

// Les identifiants "profile-tab-…" et "profile-tabpanel-…" sont repris dans ProviderProfile.tsx
export const ProfileTabs: React.FC<ProfileTabsProps> = ({ active, onChange, worksCount, reviewsCount }) => {
  const tabRefs = useRef<Record<ProfileTab, HTMLButtonElement | null>>({
    presentation: null,
    works: null,
    reviews: null,
  });

  const tabs: { id: ProfileTab; label: string }[] = [
    { id: 'presentation', label: 'Présentation' },
    { id: 'works', label: `Réalisations (${worksCount})` },
    { id: 'reviews', label: `Avis Clients (${reviewsCount})` },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === null) return;

    e.preventDefault();
    const nextTab = tabs[nextIndex].id;
    onChange(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  return (
    <div className="px-4 mt-4 mb-4">
      <div
        role="tablist"
        aria-label="Sections du profil"
        className="bg-surface dark:bg-[#121215] p-1 rounded-2xl border border-border dark:border-white/10 flex items-center gap-1 shadow-sm dark:shadow-lg overflow-x-auto"
      >
        {tabs.map(({ id, label }, index) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[id] = el;
              }}
              type="button"
              role="tab"
              id={`profile-tab-${id}`}
              aria-selected={isActive}
              aria-controls={`profile-tabpanel-${id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold whitespace-nowrap transition outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400 ${
                isActive
                  ? 'bg-primary-700 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md'
                  : 'text-text-secondary dark:text-white/60 hover:text-text dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};