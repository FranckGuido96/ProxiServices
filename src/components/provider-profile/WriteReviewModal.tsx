import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';

interface WriteReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose }) => {
    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedStar, setSelectedStar] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setHoveredStar(0);
        setSelectedStar(0);
        setComment('');
        setSubmitted(false);
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedStar === 0 || comment.trim().length < 10) return;
        setSubmitted(true);
    };

    const isSubmitDisabled = selectedStar === 0 || comment.trim().length < 10;
    const activeStar = hoveredStar || selectedStar;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={handleClose}
        >
            <div
                className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border dark:border-white/10">
                    <h3 className="text-sm font-bold text-text dark:text-white">
                        {submitted ? 'Avis envoyé' : 'Donner mon avis'}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-1.5 rounded-lg text-text-secondary dark:text-white/50 hover:bg-background dark:hover:bg-white/10 transition"
                        aria-label="Fermer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                    {submitted ? (
                        /* Confirmation screen */
                        <div className="flex flex-col items-center text-center py-4 gap-4">
                            <div className="w-14 h-14 rounded-full bg-secondary-100 dark:bg-secondary-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-secondary-600 dark:text-secondary-500" />
                            </div>
                            <div>
                                <p className="text-base font-bold text-text dark:text-white mb-1">
                                    Merci pour votre avis !
                                </p>
                                <p className="text-xs text-text-secondary dark:text-white/50 leading-relaxed">
                                    Votre avis sera publié après modération.
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="w-full py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition"
                            >
                                Fermer
                            </button>
                        </div>
                    ) : (
                        /* Review form */
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Star rating */}
                            <div>
                                <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-2">
                                    Votre note *
                                </label>
                                <div className="flex items-center gap-1.5">
                                    {Array.from({ length: 5 }).map((_, i) => {
                                        const starValue = i + 1;
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                onMouseEnter={() => setHoveredStar(starValue)}
                                                onMouseLeave={() => setHoveredStar(0)}
                                                onClick={() => setSelectedStar(starValue)}
                                                aria-label={`${starValue} étoile${starValue > 1 ? 's' : ''}`}
                                                className="transition-transform hover:scale-110 active:scale-95"
                                            >
                                                <Star
                                                    className={`w-8 h-8 transition-colors ${
                                                        starValue <= activeStar
                                                            ? 'fill-amber-400 text-amber-400'
                                                            : 'text-border dark:text-white/15'
                                                    }`}
                                                />
                                            </button>
                                        );
                                    })}
                                    {selectedStar > 0 && (
                                        <span className="text-xs font-semibold text-amber-500 dark:text-amber-400 ml-1">
                                            {['', 'Mauvais', 'Passable', 'Bien', 'Très bien', 'Excellent'][selectedStar]}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Comment textarea */}
                            <div>
                                <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1.5">
                                    Votre commentaire *
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Décrivez votre expérience avec ce prestataire..."
                                    rows={4}
                                    maxLength={300}
                                    className="w-full text-xs p-3 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-500/30 resize-none transition"
                                />
                                <div className="flex items-center justify-between mt-1">
                                    {comment.trim().length > 0 && comment.trim().length < 10 && (
                                        <span className="text-[10px] text-amber-500 dark:text-amber-400 font-medium">
                                            Minimum 10 caractères
                                        </span>
                                    )}
                                    <span className={`text-[10px] font-medium ml-auto ${comment.length > 280 ? 'text-amber-500 dark:text-amber-400' : 'text-text-secondary dark:text-white/40'}`}>
                                        {comment.length}/300
                                    </span>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitDisabled}
                                className={`w-full py-3 font-bold text-xs tracking-wider uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-2 ${
                                    isSubmitDisabled
                                        ? 'bg-border dark:bg-white/10 text-text-secondary dark:text-white/30 cursor-not-allowed'
                                        : 'bg-secondary-500 hover:bg-secondary-600 text-white'
                                }`}
                            >
                                <Star className="w-4 h-4" /> Envoyer mon avis
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
