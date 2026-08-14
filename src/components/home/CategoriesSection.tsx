import React from 'react';
import { Category } from '../../types';
import { CategoryIcon } from '../CategoryIcon';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
    categories: Category[];
    selectedCategoryId: string | null;
    onSelectCategory: (id: string) => void;
    onSeeAll: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories, selectedCategoryId, onSelectCategory, onSeeAll }) => {
    const displayed = categories.slice(0, 6);

    return (
        <div className="px-4 my-6">
            <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-base sm:text-lg font-serif italic text-text dark:text-white tracking-tight">
                    Catégories <span className="not-italic font-sans font-bold">populaires</span>
                </h2>
                <button onClick={onSeeAll} className="text-xs font-semibold text-primary-700 dark:text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                    <span>Tout voir</span><ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {displayed.map((cat) => {
                    const isSelected = selectedCategoryId === cat.id;
                    return (
                        <button key={cat.id} onClick={() => onSelectCategory(isSelected ? '' : cat.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all border text-center ${isSelected
                                    ? 'bg-primary-50 border-primary-500/60 ring-2 ring-primary-500/20 dark:bg-emerald-950/80 dark:border-emerald-500/60 dark:ring-emerald-500/20'
                                    : 'bg-surface border-border hover:border-primary-300 dark:bg-[#121215] dark:border-white/10 dark:hover:border-white/20'
                                }`}>
                            <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-300 dark:bg-[#2A1D08] dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
                                <CategoryIcon iconName={cat.iconName} className="w-5 h-5 stroke-[2.2]" />
                            </div>
                            <span className="text-xs font-bold text-text dark:text-white/90 leading-tight truncate w-full">{cat.title}</span>
                            <span className="text-[10px] text-text-secondary dark:text-white/45 mt-0.5 truncate w-full">{cat.count} Prestataires</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};