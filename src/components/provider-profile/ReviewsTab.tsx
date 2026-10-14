import React from 'react';
import { Star, PlusCircle } from 'lucide-react';
import { ProfileReview } from '../../data/providerProfileDetails';

interface ReviewsTabProps {
    rating: number;
    reviews: ProfileReview[];
    onWriteReview: () => void;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({ rating, reviews, onWriteReview }) => {
    return (
        <div className="px-4 space-y-3">
            <div className="bg-surface dark:bg-[#121215] rounded-2xl p-4 border border-border dark:border-white/10 shadow-sm dark:shadow-xl flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-text dark:text-white">{rating}</span>
                        <span className="text-xs text-text-secondary dark:text-white/40">/ 5</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400' : 'text-border dark:text-white/15'}`} />
                        ))}
                    </div>
                    <p className="text-[11px] text-text-secondary dark:text-white/40 mt-1">{reviews.length} avis clients vérifiés</p>
                </div>
                <button
                    onClick={onWriteReview}
                    className="flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition"
                >
                    <PlusCircle className="w-3.5 h-3.5" /> Donner mon avis
                </button>
            </div>

            <div className="space-y-2.5">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-surface dark:bg-[#121215] rounded-2xl p-3.5 border border-border dark:border-white/10 shadow-sm dark:shadow-xl">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-7 h-7 rounded-full bg-primary-50 dark:bg-emerald-950 flex items-center justify-center text-[11px] font-bold text-primary-700 dark:text-emerald-300 shrink-0">
                                {review.author.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-text dark:text-white truncate">{review.author}</p>
                                <p className="text-[10px] text-text-secondary dark:text-white/40">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-0.5 shrink-0">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400' : 'text-border dark:text-white/15'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-text-secondary dark:text-white/70 leading-snug mb-2">"{review.comment}"</p>
                        {review.reply && (
                            <div className="bg-background dark:bg-[#09090B] rounded-xl p-2.5 border-l-2 border-primary-500 dark:border-emerald-500">
                                <p className="text-[10px] font-bold text-primary-700 dark:text-emerald-400 mb-0.5">Réponse de {review.author.split(' ')[0] === review.author ? 'ce prestataire' : ''}</p>
                                <p className="text-[11px] text-text-secondary dark:text-white/60 italic">{review.reply}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};