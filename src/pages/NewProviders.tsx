import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ResultCard } from '../components/search/ResultCard';
import { BottomNav } from '../components/navigation/BottomNav';
import { getRecentProviders } from '../data/providers';

// TODO Supabase : charger les prestataires triés par date d'inscription
const newProviders = getRecentProviders();

export default function NewProviders() {
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
          Nouveaux <span className="not-italic font-bold text-primary-700 dark:text-emerald-400">prestataires</span>
        </h1>
        <p className="text-xs text-text-secondary dark:text-white/50 mt-1">Du plus récent au plus ancien</p>
      </div>

      <div className="px-4">
        <p className="text-xs font-semibold text-text-secondary dark:text-white/50 mb-3">
          {newProviders.length} prestataire{newProviders.length > 1 ? 's' : ''}
        </p>
        <div className="space-y-2.5">
          {newProviders.map((provider) => (
            <ResultCard key={provider.id} provider={provider} showNewBadge />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}