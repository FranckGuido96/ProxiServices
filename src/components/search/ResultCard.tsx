import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';
import { Provider } from '../../types';

interface ResultCardProps {
    provider: Provider;
    isFavorite: boolean;
    onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ provider, isFavorite, onToggleFavorite }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/prestataire/${provider.id}`)}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface dark:bg-[#121215] border border-border dark:border-white/10 shadow-sm dark:shadow-lg hover:border-primary-300 dark:hover:border-white/25 transition cursor-pointer"
        >
            <img
                src={provider.avatarUrl}
                alt={provider.name}
                className="w-14 h-14 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-text dark:text-white truncate">{provider.name}</h3>
                <p className="text-xs font-semibold text-primary-700 dark:text-emerald-400">{provider.trade}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-text-secondary dark:text-white/50 mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{provider.location}, {provider.commune}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 font-semibold text-text dark:text-white shrink-0">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
                        {provider.rating}
                    </span>
                </div>
            </div>
            <button
                onClick={(e) => onToggleFavorite(provider.id, e)}
                className="p-1.5 shrink-0"
                aria-label="Ajouter aux favoris"
            >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-secondary text-secondary dark:fill-emerald-400 dark:text-emerald-400' : 'text-text-secondary dark:text-white/40'}`} />
            </button>
        </div>
    );
};