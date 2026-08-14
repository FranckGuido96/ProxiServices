import React from 'react';
import { Eye, Phone, Star, Image as ImageIcon, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
    viewsCount: number;
    callsCount: number;
    rating: number;
    reviewsCount: number;
    portfolioCount: number;
    onViewsClick: () => void;
    onCallsClick: () => void;
    onRatingClick: () => void;
    onPortfolioClick: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
    viewsCount, callsCount, rating, reviewsCount, portfolioCount,
    onViewsClick, onCallsClick, onRatingClick, onPortfolioClick,
}) => {
    return (
        <div className="p-4 grid grid-cols-2 gap-3">
            <button onClick={onViewsClick} className="text-left bg-surface dark:bg-[#121215] p-3.5 rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-xl hover:border-primary-300 dark:hover:border-emerald-500/40 active:scale-[0.98] transition">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/40">Vues profil (30j)</span>
                    <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-emerald-950/60 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-400">
                        <Eye className="w-3.5 h-3.5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-text dark:text-white tracking-tight">{viewsCount}</span>
                    <span className="text-[10px] font-bold text-primary-600 dark:text-emerald-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" />+30%
                    </span>
                </div>
            </button>

            <button onClick={onCallsClick} className="text-left bg-surface dark:bg-[#121215] p-3.5 rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-xl hover:border-primary-300 dark:hover:border-emerald-500/40 active:scale-[0.98] transition">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/40">Appels reçus</span>
                    <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-emerald-950/60 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-400">
                        <Phone className="w-3.5 h-3.5" />
                    </div>
                </div>
                <span className="text-2xl font-bold text-text dark:text-white tracking-tight">{callsCount}</span>
            </button>

            <button onClick={onRatingClick} className="text-left bg-surface dark:bg-[#121215] p-3.5 rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-xl hover:border-primary-300 dark:hover:border-emerald-500/40 active:scale-[0.98] transition">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/40">Note moyenne</span>
                    <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-text dark:text-white tracking-tight">{rating}</span>
                    <span className="text-xs text-text-secondary dark:text-white/40">/ 5 ({reviewsCount} avis)</span>
                </div>
            </button>

            <button onClick={onPortfolioClick} className="text-left bg-surface dark:bg-[#121215] p-3.5 rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-xl hover:border-primary-300 dark:hover:border-emerald-500/40 active:scale-[0.98] transition">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/40">Réalisations</span>
                    <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-emerald-950/60 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-400">
                        <ImageIcon className="w-3.5 h-3.5" />
                    </div>
                </div>
                <span className="text-2xl font-bold text-text dark:text-white tracking-tight">{portfolioCount}</span>
            </button>
        </div>
    );
};