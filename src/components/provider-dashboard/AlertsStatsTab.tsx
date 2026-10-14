import React from 'react';
import { Pencil, Plus, Star, TrendingUp } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isNew: boolean;
  icon: 'star' | 'trend';
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Nouvel avis 5 étoiles',
    message: 'Awa D. a laissé un avis : « Intervention très rapide à Cocody et travail de plomberie impeccable. »',
    time: 'Il y a 2h',
    isNew: true,
    icon: 'star',
  },
  {
    id: '2',
    title: 'Vos vues sont en hausse !',
    message: 'Votre profil a été vu 30% de plus cette semaine grâce à votre badge vérifié.',
    time: 'Hier',
    isNew: true,
    icon: 'trend',
  },
];

interface AlertsStatsTabProps {
  onEditProfile: () => void;
  onAddPhoto: () => void;
}

export const AlertsStatsTab: React.FC<AlertsStatsTabProps> = ({ onEditProfile, onAddPhoto }) => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onEditProfile}
          className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface dark:bg-[#121215] border border-border dark:border-white/10 hover:border-primary-300 dark:hover:border-white/20 transition text-left"
        >
          <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-[#092B1C] border border-primary-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
            <Pencil className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-text dark:text-white leading-snug">Modifier mon profil</p>
            <p className="text-[10px] text-text-secondary dark:text-white/45 mt-0.5">Bio, tarifs, services</p>
          </div>
        </button>

        <button
          onClick={onAddPhoto}
          className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface dark:bg-[#121215] border border-border dark:border-white/10 hover:border-primary-300 dark:hover:border-white/20 transition text-left"
        >
          <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-[#092B1C] border border-primary-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-text dark:text-white leading-snug">Ajouter photo</p>
            <p className="text-[10px] text-text-secondary dark:text-white/45 mt-0.5">Poster un chantier</p>
          </div>
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text dark:text-white">Mes notifications & alertes</h3>
          <span className="text-[10px] font-bold bg-primary-50 dark:bg-[#062618] text-primary-700 dark:text-emerald-300 border border-primary-200 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            {notifications.filter((n) => n.isNew).length} nouvelles
          </span>
        </div>

        <div className="space-y-2.5">
          {notifications.map((n) => (
            <div key={n.id} className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl p-3.5 flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                n.icon === 'star'
                  ? 'bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30'
                  : 'bg-primary-50 dark:bg-[#092B1C] border border-primary-200 dark:border-emerald-500/20'
              }`}>
                {n.icon === 'star' ? (
                  <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-text dark:text-white">{n.title}</p>
                  <span className="text-[10px] text-text-secondary dark:text-white/40 shrink-0">{n.time}</span>
                </div>
                <p className="text-[11px] text-text-secondary dark:text-white/60 mt-0.5 leading-snug">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};