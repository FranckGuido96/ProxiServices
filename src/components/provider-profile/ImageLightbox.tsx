import React from 'react';
import { X } from 'lucide-react';
import { ProfileWork } from '../../data/providerProfileDetails';

interface ImageLightboxProps {
    work: ProfileWork | null;
    onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ work, onClose }) => {
    if (!work) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                aria-label="Fermer"
            >
                <X className="w-5 h-5" />
            </button>

            <div
                className="w-full max-w-lg flex flex-col items-center gap-3"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                />
                <p className="text-sm font-bold text-white text-center">{work.title}</p>
            </div>
        </div>
    );
};
