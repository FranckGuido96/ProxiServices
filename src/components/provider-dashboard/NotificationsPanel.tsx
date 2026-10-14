import React, { useEffect, useRef } from 'react';
import { Bell, Star, TrendingUp, X } from 'lucide-react';

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
    const panelRef = useRef<HTMLDivElement>(null);

    // Fermeture sur Échap
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Calque d'arrière-plan */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panneau */}
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Notifications"
                className="fixed top-16 right-4 z-50 w-80 bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl shadow-2xl dark:shadow-black/60 overflow-hidden animate-fadeSlideDown"
            >
                {/* En-tête */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-white/5">
                    <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <Bell className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                        <span>Mes Notifications</span>
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-primary-50 dark:bg-emerald-950 text-primary-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-primary-200 dark:border-emerald-500/30">
                            2 nouvelles
                        </span>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-lg text-text-secondary dark:text-white/40 hover:text-text dark:hover:text-white hover:bg-background dark:hover:bg-white/5 transition"
                            aria-label="Fermer"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Liste notifications */}
                <div className="p-3 space-y-2.5">
                    {/* Notification 1 : Avis 5 étoiles */}
                    <div className="bg-background dark:bg-[#18181C] p-3 rounded-xl border border-border dark:border-white/5 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 shrink-0">
                            <Star className="w-4 h-4 fill-amber-500 dark:fill-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <h4 className="text-xs font-bold text-text dark:text-white truncate">Nouvel avis 5 étoiles</h4>
                                <span className="text-[10px] text-text-secondary dark:text-white/40 shrink-0">Il y a 2h</span>
                            </div>
                            <p className="text-xs text-text-secondary dark:text-white/70 mt-1 leading-relaxed">
                                <strong className="text-text dark:text-white">Awa D.</strong> a laissé un avis :{' '}
                                <em>« Intervention très rapide à Cocody et travail de plomberie impeccable ! »</em>
                            </p>
                        </div>
                    </div>

                    {/* Notification 2 : Vues en hausse */}
                    <div className="bg-background dark:bg-[#18181C] p-3 rounded-xl border border-border dark:border-white/5 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-primary-50 dark:bg-emerald-950 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-400 shrink-0">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <h4 className="text-xs font-bold text-text dark:text-white truncate">Vos vues sont en hausse !</h4>
                                <span className="text-[10px] text-text-secondary dark:text-white/40 shrink-0">Hier</span>
                            </div>
                            <p className="text-xs text-text-secondary dark:text-white/70 mt-1 leading-relaxed">
                                Votre profil a été vu{' '}
                                <strong className="text-primary-700 dark:text-emerald-400">30% de plus</strong>{' '}
                                cette semaine grâce à votre badge vérifié.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
