import React from 'react';
import { Star, PlusCircle, Clock } from 'lucide-react';
import { ProfileReview } from '../../data/providerProfileDetails';
import { PendingReview } from '../../types/review';

interface ReviewsTabProps {
  rating: number;
  reviews: ProfileReview[];
  providerName: string;
  pendingReviews?: PendingReview[];
  onWriteReview: () => void;
}

const Stars: React.FC<{ value: number; sizeClass: string }> = ({ value, sizeClass }) => (
  <div role="img" aria-label={`Note : ${value} sur 5`} className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={`${sizeClass} ${
          i < Math.round(value)
            ? 'fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400'
            : 'text-border dark:text-white/15'
        }`}
      />
    ))}
  </div>
);

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
  rating,
  reviews,
  providerName,
  pendingReviews = [],
  onWriteReview,
}) => {
  return (
    <div className="px-4 space-y-3">
      <div className="bg-surface dark:bg-[#121215] rounded-2xl p-4 border border-border dark:border-white/10 shadow-sm dark:shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-text dark:text-white">{rating}</span>
            <span className="text-xs text-text-secondary dark:text-white/40">/ 5</span>
          </div>
          <div className="mt-1">
            <Stars value={rating} sizeClass="w-3.5 h-3.5" />
          </div>
          <p className="text-[11px] text-text-secondary dark:text-white/40 mt-1">{reviews.length} avis clients</p>
        </div>
        <button
          type="button"
          onClick={onWriteReview}
          className="flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition"
        >
          <PlusCircle className="w-3.5 h-3.5" /> Donner mon avis
        </button>
      </div>

      <div className="space-y-2.5">
        {/* Avis envoyés par le visiteur, en attente de modération (jamais comptés dans les avis publiés) */}
        {pendingReviews.map((review) => (
          <div
            key={review.id}
            className="bg-surface dark:bg-[#121215] rounded-2xl p-3.5 border border-dashed border-amber-300 dark:border-amber-500/40 shadow-sm dark:shadow-xl"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-full bg-amber-50 dark:bg-[#2A1D08] flex items-center justify-center text-[11px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
                V
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-text dark:text-white truncate">Vous</p>
                <p className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" aria-hidden="true" /> En attente de modération
                </p>
              </div>
              <Stars value={review.rating} sizeClass="w-3 h-3" />
            </div>
            <p className="text-xs text-text-secondary dark:text-white/70 leading-snug">"{review.comment}"</p>
          </div>
        ))}

        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-surface dark:bg-[#121215] rounded-2xl p-3.5 border border-border dark:border-white/10 shadow-sm dark:shadow-xl"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-full bg-primary-50 dark:bg-emerald-950 flex items-center justify-center text-[11px] font-bold text-primary-700 dark:text-emerald-300 shrink-0">
                {review.author.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-text dark:text-white truncate">{review.author}</p>
                <p className="text-[10px] text-text-secondary dark:text-white/40">{review.date}</p>
              </div>
              <Stars value={review.rating} sizeClass="w-3 h-3" />
            </div>
            <p className="text-xs text-text-secondary dark:text-white/70 leading-snug mb-2">"{review.comment}"</p>
            {review.reply && (
              <div className="bg-background dark:bg-[#09090B] rounded-xl p-2.5 border-l-2 border-primary-500 dark:border-emerald-500">
                <p className="text-[10px] font-bold text-primary-700 dark:text-emerald-400 mb-0.5">
                  Réponse de {providerName}
                </p>
                <p className="text-[11px] text-text-secondary dark:text-white/60 italic">{review.reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};