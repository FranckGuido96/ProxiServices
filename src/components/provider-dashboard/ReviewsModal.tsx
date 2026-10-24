import React from 'react';
import { Star } from 'lucide-react';
import { DashboardReview, averageRating } from '../../data/dashboardDemo';

interface ReviewsModalProps {
  reviews: DashboardReview[];
}

const Stars: React.FC<{ value: number; sizeClass: string }> = ({ value, sizeClass }) => (
  <div role="img" aria-label={`Note : ${value} sur 5`} className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={`${sizeClass} ${
          i < value ? 'fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400' : 'text-border dark:text-white/15'
        }`}
      />
    ))}
  </div>
);

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p className="text-xs text-text-secondary dark:text-white/50 text-center py-4">Aucun avis pour le moment.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border dark:border-white/10">
        <span className="text-xs text-text-secondary dark:text-white/50">Note moyenne</span>
        <span className="text-sm font-bold text-text dark:text-white flex items-center gap-1">
          {averageRating(reviews).toFixed(1)}{' '}
          <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" aria-hidden="true" /> (
          {reviews.length} avis)
        </span>
      </div>
      <ul className="space-y-3">
        {reviews.map((review) => (
          <li key={review.id} className="p-3 rounded-xl bg-background dark:bg-[#09090B] border border-border dark:border-white/5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-text dark:text-white">{review.author}</span>
              <span className="text-[10px] text-text-secondary dark:text-white/40">{review.date}</span>
            </div>
            <div className="mb-1.5">
              <Stars value={review.rating} sizeClass="w-3 h-3" />
            </div>
            <p className="text-xs text-text-secondary dark:text-white/70 leading-snug">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};