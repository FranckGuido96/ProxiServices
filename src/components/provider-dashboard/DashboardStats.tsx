import React from 'react';
import { Eye, Phone, Star, Image as ImageIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardStatsProps {
  viewsCount: number;
  viewsTrend: number | null;
  callsCount: number;
  rating: number;
  reviewsCount: number;
  portfolioCount: number;
  onViewsClick: () => void;
  onCallsClick: () => void;
  onRatingClick: () => void;
  onPortfolioClick: () => void;
}

const cardClass =
  'text-left bg-surface dark:bg-[#121215] p-3.5 rounded-2xl border border-border dark:border-white/10 shadow-sm dark:shadow-xl hover:border-primary-300 dark:hover:border-emerald-500/40 active:scale-[0.98] transition outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400';
const labelClass = 'text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/40';
const greenIconClass =
  'p-1.5 rounded-lg bg-primary-50 dark:bg-emerald-950/60 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-400';
const valueClass = 'text-2xl font-bold text-text dark:text-white tracking-tight';

const Trend: React.FC<{ value: number | null }> = ({ value }) => {
  if (value === null || value === 0) return null;
  const isUp = value > 0;
  const Icon = isUp ? TrendingUp : TrendingDown;
  return (
    <span
      className={`text-[10px] font-bold flex items-center ${
        isUp ? 'text-primary-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
      }`}
    >
      <Icon className="w-3 h-3 mr-0.5" aria-hidden="true" />
      {isUp ? '+' : '-'}
      {Math.abs(value)}%
    </span>
  );
};

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  viewsCount,
  viewsTrend,
  callsCount,
  rating,
  reviewsCount,
  portfolioCount,
  onViewsClick,
  onCallsClick,
  onRatingClick,
  onPortfolioClick,
}) => {
  return (
    <div className="p-4 grid grid-cols-2 gap-3">
      <button type="button" onClick={onViewsClick} className={cardClass}>
        <div className="flex items-center justify-between mb-1">
          <span className={labelClass}>Vues profil (30j)</span>
          <div className={greenIconClass}>
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={valueClass}>{viewsCount}</span>
          <Trend value={viewsTrend} />
        </div>
      </button>

      <button type="button" onClick={onCallsClick} className={cardClass}>
        <div className="flex items-center justify-between mb-1">
          <span className={labelClass}>Appels reçus</span>
          <div className={greenIconClass}>
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>
        <span className={valueClass}>{callsCount}</span>
      </button>

      <button type="button" onClick={onRatingClick} className={cardClass}>
        <div className="flex items-center justify-between mb-1">
          <span className={labelClass}>Note moyenne</span>
          <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" aria-hidden="true" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={valueClass}>{rating.toFixed(1)}</span>
          <span className="text-xs text-text-secondary dark:text-white/40">/ 5 ({reviewsCount} avis)</span>
        </div>
      </button>

      <button type="button" onClick={onPortfolioClick} className={cardClass}>
        <div className="flex items-center justify-between mb-1">
          <span className={labelClass}>Réalisations</span>
          <div className={greenIconClass}>
            <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>
        <span className={valueClass}>{portfolioCount}</span>
      </button>
    </div>
  );
};