import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, User } from 'lucide-react';
import { BottomNav } from '../components/navigation/BottomNav';

const benefits = [
  'Enregistrer vos prestataires favoris',
  'Laisser un avis après une intervention',
  'Signaler un profil',
];

// TODO Supabase : afficher le compte et la déconnexion quand une session existe
export default function Profile() {
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
          Mon <span className="not-italic font-bold text-primary-700 dark:text-emerald-400">profil</span>
        </h1>
      </div>

      <main className="px-4 space-y-4">
        <div className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl p-5 shadow-sm dark:shadow-xl text-center">
          <div
            aria-hidden="true"
            className="w-14 h-14 mx-auto rounded-full bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3"
          >
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-text dark:text-white">Bienvenue sur ProxiServices</h2>
          <p className="text-xs text-text-secondary dark:text-white/50 mt-1 leading-relaxed">
            Un compte gratuit vous permet de :
          </p>
          <ul className="text-left mt-3 space-y-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                <span className="text-xs text-text dark:text-white">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <Link
              to="/connexion"
              className="bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase py-3.5 rounded-xl transition outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
            >
              Se connecter
            </Link>
            <Link
              to="/inscription"
              className="border border-border dark:border-white/10 bg-background dark:bg-[#09090B] text-text dark:text-white font-semibold text-xs tracking-wider uppercase py-3.5 rounded-xl hover:border-primary-300 dark:hover:border-white/25 transition outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
            >
              Créer un compte
            </Link>
          </div>
          <p className="text-[11px] text-text-secondary dark:text-white/40 mt-4 leading-relaxed">
            Pas besoin de compte pour chercher et contacter un prestataire.
          </p>
        </div>

        <div className="rounded-2xl p-4 border border-amber-300 dark:border-amber-500/25 bg-gradient-to-r from-amber-100 via-amber-50 to-surface dark:from-[#2B1804] dark:via-[#241300] dark:to-[#1A0B00]">
          <p className="text-[9px] uppercase tracking-[0.25em] font-semibold text-amber-700 dark:text-amber-400">
            ESPACE PROFESSIONNEL
          </p>
          <p className="text-base font-serif italic text-text dark:text-white mt-1">
            Vous êtes <span className="not-italic font-bold text-amber-700 dark:text-amber-300">artisan ?</span>
          </p>
          <Link
            to="/devenir-prestataire"
            className="mt-3 inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold py-2 px-3.5 rounded-full uppercase tracking-wider transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
          >
            Devenir prestataire
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}