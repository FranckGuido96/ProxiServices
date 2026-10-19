import React, { useId, useRef } from 'react';
import { X } from 'lucide-react';
import { ProfileWork } from '../../data/providerProfileDetails';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface ImageLightboxProps {
  work: ProfileWork | null;
  onClose: () => void;
}

// Monté seulement quand une photo est ouverte
const LightboxDialog: React.FC<{ work: ProfileWork; onClose: () => void }> = ({ work, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useDialogFocus(dialogRef, onClose);

  return (
    // onMouseDown (et non onClick) : glisser la souris depuis l'image vers l'extérieur ne ferme pas la fenêtre
    <div
      role="presentation"
      className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="max-w-full outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer l'image"
          className="fixed top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="w-5 h-5" />
        </button>
        <img src={work.imageUrl} alt={work.title} className="max-w-full max-h-[80vh] object-contain rounded-xl" />
        <p id={titleId} className="text-center text-white text-sm font-bold mt-3">
          {work.title}
        </p>
      </div>
    </div>
  );
};

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ work, onClose }) => {
  if (!work) return null;
  return <LightboxDialog work={work} onClose={onClose} />;
};