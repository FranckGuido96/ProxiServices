import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types';
import { CategoryCard } from './CategoryCard';

interface CategoriesSectionProps {
  categories: Category[];
}

const HOME_CATEGORIES_COUNT = 6;

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  return (
    <div className="px-4 my-6">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-base sm:text-lg font-serif italic text-text dark:text-white tracking-tight">
          Catégories <span className="not-italic font-sans font-bold">populaires</span>
        </h2>
        <Link
          to="/categories"
          className="text-xs font-semibold text-primary-700 dark:text-emerald-400 flex items-center gap-1 uppercase tracking-wider rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
        >
          <span>Tout voir</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {categories.slice(0, HOME_CATEGORIES_COUNT).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};