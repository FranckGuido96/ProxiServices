import React from 'react';
import { Star } from 'lucide-react';

interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

const reviews: Review[] = [
    { id: '1', author: 'Awa D.', rating: 5, comment: 'Intervention très rapide à Cocody et travail de plomberie impeccable !', date: 'Il y a 2h' },
    { id: '2', author: 'Bakary S.', rating: 5, comment: 'Ponctuel et très professionnel, je recommande.', date: 'Il y a 3 jours' },
    { id: '3', author: 'Marie K.', rating: 4, comment: 'Bon travail, un peu de retard sur le rendez-vous.', date: 'Il y a 1 semaine' },
];

export const ReviewsModal: React.FC = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border dark:border-white/10">
                <span className="text-xs text-text-secondary dark:text-white/50">Note moyenne</span>
                <span className="text-sm font-bold text-text dark:text-white flex items-center gap-1">
                    4.9 <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" /> (48 avis)
                </span>
            </div>
            <div className="space-y-3">
                {reviews.map((review) => (
                    <div key={review.id} className="p-3 rounded-xl bg-background dark:bg-[#09090B] border border-border dark:border-white/5">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-text dark:text-white">{review.author}</span>
                            <span className="text-[10px] text-text-secondary dark:text-white/40">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400' : 'text-border dark:text-white/15'}`} />
                            ))}
                        </div>
                        <p className="text-xs text-text-secondary dark:text-white/70 leading-snug">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};