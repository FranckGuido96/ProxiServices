import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';
import { CategoryIcon } from '../CategoryIcon';
import { buildSearchPath } from '../../utils/search';

interface CategoryCardProps {
  category: Category;
}

// Carte de catégorie : un clic ouvre les résultats de recherche pour ce métier
export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={buildSearchPath({ q: category.title })}
      className="flex flex-col items-center justify-center p-3 rounded-2xl transition-all border text-center bg-surface border-border hover:border-primary-300 dark:bg-[#121215] dark:border-white/10 dark:hover:border-white/20 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
    >
      <div
        aria-hidden="true"
        className="w-11 h-11 rounded-full bg-amber-50 border border-amber-300 dark:bg-[#2A1D08] dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2"
      >
        <CategoryIcon iconName={category.iconName} className="w-5 h-5 stroke-[2.2]" />
      </div>
      <span className="text-xs font-bold text-text dark:text-white/90 leading-tight truncate w-full">{category.title}</span>
      <span className="text-[10px] text-text-secondary dark:text-white/45 mt-0.5 truncate w-full">
        {category.count} Prestataires
      </span>
    </Link>
  );
};