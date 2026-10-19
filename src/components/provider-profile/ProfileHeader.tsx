import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, CheckCircle2, Star, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Provider } from '../../types';

interface ProfileHeaderProps {
  provider: Provider;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

type ShareStatus = 'copied' | 'error' | null;

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ provider, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();
  const [shareStatus, setShareStatus] = useState<ShareStatus>(null);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    };
  }, []);

  const showStatus = (status: Exclude<ShareStatus, null>) => {
    setShareStatus(status);
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    statusTimeoutRef.current = setTimeout(() => setShareStatus(null), 2500);
  };

  // Feuille de partage native quand elle existe (téléphone), sinon copie du lien
  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({
          title: `${provider.name} — ${provider.trade}`,
          text: `Découvrez le profil de ${provider.name} (${provider.trade}) sur ProxiServices`,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      showStatus('copied');
    } catch (error) {
      // Fermer la feuille de partage sans partager n'est pas une erreur
      if (error instanceof DOMException && error.name === 'AbortError') return;
      showStatus('error');
    }
  };

  const shareMessage = shareStatus === 'copied' ? 'Lien copié' : shareStatus === 'error' ? 'Copie impossible' : '';

  return (
    <div className="bg-gradient-to-b from-primary-500 to-primary-700 dark:from-[#0B1E16] dark:via-[#0F281E] dark:to-[#0A1A14] px-4 pt-5 pb-6 rounded-b-3xl">
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Retour"
          className="p-2 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <span
            role="status"
            className={shareStatus ? 'text-[11px] font-semibold text-white/90 mr-1' : 'sr-only'}
          >
            {shareMessage}
          </span>
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 text-white"
            aria-label="Partager ce profil"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            className="p-2 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 text-white"
          >
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
            {provider.isVerified && (
              <CheckCircle2
                role="img"
                aria-label="Profil vérifié"
                className="w-4 h-4 text-white/90 fill-primary-500 dark:fill-emerald-500"
              />
            )}
          </div>
          <p className="text-sm text-white/85 font-medium">{provider.trade}</p>
          <div className="flex items-center gap-1.5 text-xs text-white/80 mt-1">
            <span className="flex items-center gap-1 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {provider.rating} ({provider.reviewsCount} avis)
            </span>
            <span>-</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {provider.location}, {provider.commune}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a
          href={`tel:${provider.phone}`}
          className="flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-primary-700 dark:text-emerald-700 font-bold text-sm py-3 rounded-xl transition"
        >
          <Phone className="w-4 h-4" /> Appeler
        </a>
        <a
          href={`https://wa.me/${provider.whatsapp.replace('+', '')}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm py-3 rounded-xl transition"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
};