import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  highlight: string;
  subtitle: string;
  icon: React.ReactNode;
  backTo?: string;
  children: React.ReactNode;
}

// Cadre commun des écrans de connexion et d'inscription : mêmes repères que l'inscription prestataire
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  highlight,
  subtitle,
  icon,
  backTo = '/profil',
  children,
}) => {
  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] pb-8">
      <div className="flex items-center gap-3 px-4 pt-5 pb-2 border-b border-border dark:border-white/10">
        <Link
          to={backTo}
          aria-label="Retour"
          className="p-1.5 -ml-1.5 rounded-xl text-text dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-lg font-serif italic font-bold text-primary-700 dark:text-emerald-400">ProxiServices</span>
      </div>

      <main className="px-4 pt-5">
        <div className="flex items-start gap-3 mb-5">
          <div
            aria-hidden="true"
            className="w-11 h-11 rounded-full bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400"
          >
            {icon}
          </div>
          <div>
            <h1 className="text-lg font-serif italic text-text dark:text-white leading-tight">
              {title} <span className="not-italic font-bold text-amber-600 dark:text-amber-400">{highlight}</span>
            </h1>
            <p className="text-xs text-text-secondary dark:text-white/60 mt-0.5">{subtitle}</p>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};