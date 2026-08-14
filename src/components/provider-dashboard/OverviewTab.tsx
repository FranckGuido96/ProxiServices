import React from 'react';
import { Edit3, PlusCircle, Bell, Star, TrendingUp } from 'lucide-react';

interface OverviewTabProps {
    onEditProfile: () => void;
    onAddPhoto: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onEditProfile, onAddPhoto }) => {
    return (
        <div className="px-4 space-y-4">
            <div className="grid grid-cols-2 gap-2.5">
                <button
                    onClick={onEditProfile}
                    className="p-3 bg-surface dark:bg-[#121215] border border-border dark:border-white/10 hover:border-primary-300 dark:hover:border-emerald-500/50 rounded-2xl text-left transition flex items-center gap-2.5"
                >
                    <div className="p-2 rounded-xl bg-primary-50 dark:bg-emerald-950 text-primary-700 dark:text-emerald-400">
                        <Edit3 className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-text dark:text-white">Modifier mon profil</span>
                        <span className="block text-[10px] text-text-secondary dark:text-white/40">Bio, tarifs, services</span>
                    </div>
                </button>

                <button
                    onClick={onAddPhoto}
                    className="p-3 bg-surface dark:bg-[#121215] border border-border dark:border-white/10 hover:border-primary-300 dark:hover:border-emerald-500/50 rounded-2xl text-left transition flex items-center gap-2.5"
                >
                    <div className="p-2 rounded-xl bg-primary-50 dark:bg-emerald-950 text-primary-700 dark:text-emerald-400">
                        <PlusCircle className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-text dark:text-white">Ajouter photo</span>
                        <span className="block text-[10px] text-text-secondary dark:text-white/40">Poster un chantier</span>
                    </div>
                </button>
            </div>

            <div className="bg-surface dark:bg-[#121215] rounded-2xl p-4 border border-border dark:border-white/10 shadow-sm dark:shadow-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border dark:border-white/5">
                    <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <Bell className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                        <span>Mes Notifications & Alertes</span>
                    </h3>
                    <span className="text-[10px] bg-primary-50 dark:bg-emerald-950 text-primary-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-primary-200 dark:border-emerald-500/30">
                        2 nouvelles
                    </span>
                </div>

                <div className="bg-background dark:bg-[#18181C] p-3 rounded-xl border border-border dark:border-white/5 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 shrink-0">
                        <Star className="w-4 h-4 fill-amber-500 dark:fill-amber-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-text dark:text-white">Nouvel avis 5 étoiles</h4>
                            <span className="text-[10px] text-text-secondary dark:text-white/40">Il y a 2h</span>
                        </div>
                        <p className="text-xs text-text-secondary dark:text-white/70 mt-1 leading-relaxed">
                            <strong className="text-text dark:text-white">Awa D.</strong> a laissé un avis : <em>« Intervention très rapide à Cocody et travail de plomberie impeccable ! »</em>
                        </p>
                    </div>
                </div>

                <div className="bg-background dark:bg-[#18181C] p-3 rounded-xl border border-border dark:border-white/5 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-primary-50 dark:bg-emerald-950 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-400 shrink-0">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-text dark:text-white">Vos vues sont en hausse !</h4>
                            <span className="text-[10px] text-text-secondary dark:text-white/40">Hier</span>
                        </div>
                        <p className="text-xs text-text-secondary dark:text-white/70 mt-1 leading-relaxed">
                            Votre profil a été vu <strong className="text-primary-700 dark:text-emerald-400">30% de plus</strong> cette semaine grâce à votre badge vérifié.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
