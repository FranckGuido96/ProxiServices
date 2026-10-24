import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CategoryCard } from '../components/home/CategoryCard';
import { BottomNav } from '../components/navigation/BottomNav';
import { categories } from '../data/categories';

export default function AllCategories() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] pb-24">
      <div className="px-4 pt-6 pb-4">
        <Link
          to="/"
          aria-label="Retour à l'accueil"
          className="inline-flex p-2 -ml-2 mb-2 rounded-xl text-text dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-serif italic text-text dark:text-white leading-tight">
          Toutes les <span className="not-italic font-bold text-primary-700 dark:text-emerald-400">catégories</span>
        </h1>
        <p className="text-xs text-text-secondary dark:text-white/50 mt-1">
          {categories.length} métiers : touchez-en un pour voir ses prestataires
        </p>
      </div>

      <div className="px-4 grid grid-cols-3 gap-2.5 sm:gap-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}