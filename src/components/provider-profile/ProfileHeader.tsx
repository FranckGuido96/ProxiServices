import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, CheckCircle2, Star, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Provider } from '../../types';

interface ProfileHeaderProps {
    provider: Provider;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ provider, isFavorite, onToggleFavorite }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-b from-primary-500 to-primary-700 dark:from-[#0B1E16] dark:via-[#0F281E] dark:to-[#0A1A14] px-4 pt-5 pb-6 rounded-b-3xl">
            <div className="flex items-center justify-between mb-5">
                <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 text-white">
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 text-white" aria-label="Partager">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button onClick={onToggleFavorite} className="p-2 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 text-white" aria-label="Ajouter aux favoris">
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="flex items-start gap-3.5 mb-4">
                <img
                    src={provider.avatarUrl}
                    alt={provider.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/60 shrink-0"
                    referrerPolicy="no-referrer"
                />
                <div className="pt-1">
                    <div className="flex items-center gap-1.5">
                        <h1 className="text-lg font-bold text-white">{provider.name}</h1>
                        <CheckCircle2 className="w-4 h-4 text-white/90 fill-primary-500 dark:fill-emerald-500" />
                    </div>
                    <p className="text-sm text-white/85 font-medium">{provider.trade}</p>
                    <div className="flex items-center gap-1.5 text-xs text-white/80 mt-1">
                        <span className="flex items-center gap-1 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {provider.rating} ({provider.reviewsCount} avis)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {provider.location}, {provider.commune}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">

                href={`tel:${provider.phone}`}
                className="flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-primary-700 dark:text-emerald-700 font-bold text-sm py-3 rounded-xl transition"
        >
                <Phone className="w-4 h-4" /> Appeler
            </a>


            href={`https://wa.me/${provider.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm py-3 rounded-xl transition"
        >
            <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div >
    </div >
  );
};