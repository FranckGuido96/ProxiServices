import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { ResultCard } from '../components/search/ResultCard';
import { BottomNav } from '../components/navigation/BottomNav';
import { providers } from '../data/providers';
import { useFavorites } from '../hooks/useFavorites';
import { Provider } from '../types';

export default function Favorites() {
  const { favorites } = useFavorites();

  // Du dernier ajouté au plus ancien ; les identifiants qui n'existent plus sont ignorés
  const favoriteProviders = useMemo(
    () =>
      favorites
        .map((id) => providers.find((p) => p.id === id))
        .filter((p): p is Provider => p !== undefined),
    [favorites]
  );

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
          Mes <span className="not-italic font-bold text-primary-700 dark:text-emerald-400">favoris</span>
        </h1>
        {favoriteProviders.length > 0 && (
          <p aria-live="polite" className="text-xs text-text-secondary dark:text-white/50 mt-1">
            {favoriteProviders.length} prestataire{favoriteProviders.length > 1 ? 's' : ''} enregistré
            {favoriteProviders.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="px-4">
        {favoriteProviders.length === 0 ? (
          <div className="flex flex-col items-center text-center py-12">
            <div
              aria-hidden="true"
              className="w-14 h-14 rounded-full bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4"
            >
              <Heart className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-text dark:text-white">Aucun favori pour l'instant</p>
            <p className="text-xs text-text-secondary dark:text-white/50 mt-1 max-w-xs leading-relaxed">
              Touchez le cœur d'un prestataire pour le retrouver ici.
            </p>
            <Link
              to="/recherche"
              className="mt-6 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
            >
              Trouver un artisan
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {favoriteProviders.map((provider) => (
              <ResultCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}