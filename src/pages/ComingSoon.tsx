import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNav } from '../components/navigation/BottomNav';

interface ComingSoonProps {
  title: string;
  highlight: string;
  description: string;
  icon: React.ReactNode;
}

// Page provisoire : à remplacer par le vrai écran quand il sera construit
export default function ComingSoon({ title, highlight, description, icon }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
        <div
          aria-hidden="true"
          className="w-14 h-14 rounded-full bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4"
        >
          {icon}
        </div>
        <h1 className="text-xl font-serif italic text-text dark:text-white leading-tight">
          {title}{' '}
          <span className="not-italic font-bold text-amber-600 dark:text-amber-400">{highlight}</span>
        </h1>
        <p className="text-xs text-text-secondary dark:text-white/60 mt-2 max-w-xs leading-relaxed">{description}</p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary dark:text-white/40 mt-4">
          Bientôt disponible
        </p>
        <Link
          to="/"
          className="mt-6 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition"
        >
          Retour à l'accueil
        </Link>
      </main>
      <BottomNav />
    </div>
  );
}