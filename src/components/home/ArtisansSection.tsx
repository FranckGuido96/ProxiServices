import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from '../../types';
import { Heart, MapPin, ArrowRight } from 'lucide-react';

interface ArtisansSectionProps {
    providers: Provider[];
    favorites: string[];
    onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const ArtisansSection: React.FC<ArtisansSectionProps> = ({ providers, favorites, onToggleFavorite }) => {
    const navigate = useNavigate();

    return (
        <div className="px-4 my-6">
            <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-base sm:text-lg font-serif italic text-text dark:text-white tracking-tight">
                    Récemment <span className="not-italic font-sans font-bold">inscrits</span>
                </h2>
                <button onClick={() => navigate('/recherche')} className="text-xs font-semibold text-primary-700 dark:text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                    <span>Tout voir</span><ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {providers.map((p) => (
                    <div key={p.id} onClick={() => navigate(`/prestataire/${p.id}`)}
                        className="bg-surface dark:bg-[#121215] rounded-2xl p-3 border border-border dark:border-white/10 shadow-sm dark:shadow-xl dark:shadow-black/50 hover:border-primary-300 dark:hover:border-white/25 transition-all flex flex-col cursor-pointer">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-full bg-background dark:bg-white/5 overflow-hidden border border-border dark:border-white/15 shrink-0">
                                <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <button onClick={(e) => onToggleFavorite(p.id, e)} className="p-1.5 rounded-full hover:bg-background dark:hover:bg-white/10 transition active:scale-90" aria-label="Ajouter aux favoris">
                                <Heart className={`w-4 h-4 ${favorites.includes(p.id) ? 'fill-secondary text-secondary dark:fill-emerald-400 dark:text-emerald-400' : 'text-text-secondary dark:text-white/40'}`} />
                            </button>
                        </div>

                        <h3 className="font-bold text-xs sm:text-sm text-text dark:text-white mt-2.5 leading-tight truncate">{p.name}</h3>
                        <p className="text-[11px] text-primary-700 dark:text-emerald-400 font-semibold truncate mt-0.5">{p.trade}</p>

                        {p.isNew && (
                            <div className="mt-1.5 mb-1">
                                <span className="inline-block bg-primary-50 text-primary-700 border border-primary-200 dark:bg-emerald-950/90 dark:text-emerald-300 dark:border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                    Nouveau
                                </span>
                            </div>
                        )}

                        <div className="flex items-center gap-1 text-[10px] text-text-secondary dark:text-white/50 mt-1 truncate">
                            <MapPin className="w-3 h-3 shrink-0" /><span className="truncate">{p.location}</span>
                        </div>

                        <div className="mt-3 pt-2 border-t border-border dark:border-white/5 text-center">
                            <span className="text-[11px] font-semibold text-primary-700 dark:text-emerald-400 tracking-wider uppercase">Voir le profil</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};