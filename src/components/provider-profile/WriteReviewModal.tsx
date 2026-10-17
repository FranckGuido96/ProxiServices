import React, { useEffect, useId, useRef, useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { NewReview } from '../../types/review';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: NewReview) => Promise<void>;
}

const MIN_COMMENT_LENGTH = 10;
const RATING_LABELS = ['', 'Mauvais', 'Passable', 'Bien', 'Très bien', 'Excellent'];
const FOCUSABLE_SELECTOR = 'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), a[href]';
const PRIMARY_BUTTON =
  'bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white';

type ReviewDialogProps = Omit<WriteReviewModalProps, 'isOpen'>;

// Monté seulement quand la fenêtre est ouverte : son état se remet à zéro tout seul à la fermeture
const ReviewDialog: React.FC<ReviewDialogProps> = ({ onClose, onSubmit }) => {
  const uid = useId();
  const titleId = `${uid}-title`;
  const ratingLabelId = `${uid}-rating`;
  const commentId = `${uid}-comment`;
  const hintId = `${uid}-hint`;

  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Ouverture : focus dans la fenêtre, Tab piégé, Échap pour fermer, focus rendu au déclencheur
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>('[role="radio"]')?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      trigger?.focus();
    };
  }, []);

  // Après l'envoi, le formulaire disparaît : on place le focus sur « Fermer »
  useEffect(() => {
    if (submitted) confirmButtonRef.current?.focus();
  }, [submitted]);

  const trimmedLength = comment.trim().length;
  const isCommentTooShort = trimmedLength < MIN_COMMENT_LENGTH;
  const isSubmitDisabled = selectedStar === 0 || isCommentTooShort || isSubmitting;
  const activeStar = hoveredStar || selectedStar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await onSubmit({ rating: selectedStar, comment: comment.trim() });
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-white/10">
          <h3 id={titleId} className="text-sm font-bold text-text dark:text-white">
            {submitted ? 'Avis envoyé' : 'Donner mon avis'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-secondary dark:text-white/50 hover:bg-background dark:hover:bg-white/10 transition"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corps */}
        <div className="p-4">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-4 gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-50 dark:bg-emerald-950 border border-primary-200 dark:border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary-700 dark:text-emerald-400" />
              </div>
              <div role="status">
                <p className="text-base font-bold text-text dark:text-white mb-1">Merci pour votre avis !</p>
                <p className="text-xs text-text-secondary dark:text-white/50 leading-relaxed">
                  Votre avis sera publié après modération.
                </p>
              </div>
              <button
                ref={confirmButtonRef}
                type="button"
                onClick={onClose}
                className={`w-full py-3 ${PRIMARY_BUTTON} font-bold text-xs tracking-wider uppercase rounded-xl transition`}
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Note */}
              <div>
                <p
                  id={ratingLabelId}
                  className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-2"
                >
                  Votre note *
                </p>
                <div role="radiogroup" aria-labelledby={ratingLabelId} className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        role="radio"
                        aria-checked={starValue === selectedStar}
                        aria-label={`${starValue} étoile${starValue > 1 ? 's' : ''}`}
                        onMouseEnter={() => setHoveredStar(starValue)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setSelectedStar(starValue)}
                        className="transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star
                          aria-hidden="true"
                          className={`w-8 h-8 transition-colors ${
                            starValue <= activeStar ? 'fill-amber-400 text-amber-400' : 'text-border dark:text-white/15'
                          }`}
                        />
                      </button>
                    );
                  })}
                  {selectedStar > 0 && (
                    <span className="text-xs font-semibold text-amber-500 dark:text-amber-400 ml-1">
                      {RATING_LABELS[selectedStar]}
                    </span>
                  )}
                </div>
              </div>

              {/* Commentaire */}
              <div>
                <label
                  htmlFor={commentId}
                  className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1.5"
                >
                  Votre commentaire *
                </label>
                <textarea
                  id={commentId}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Décrivez votre expérience avec ce prestataire..."
                  rows={4}
                  maxLength={300}
                  aria-required="true"
                  aria-describedby={trimmedLength > 0 && isCommentTooShort ? hintId : undefined}
                  className="w-full text-xs p-3 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30 resize-none transition"
                />
                <div className="flex items-center justify-between mt-1">
                  {trimmedLength > 0 && isCommentTooShort && (
                    <span id={hintId} className="text-[10px] text-amber-500 dark:text-amber-400 font-medium">
                      Minimum {MIN_COMMENT_LENGTH} caractères
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-medium ml-auto ${
                      comment.length > 280 ? 'text-amber-500 dark:text-amber-400' : 'text-text-secondary dark:text-white/40'
                    }`}
                  >
                    {comment.length}/300
                  </span>
                </div>
              </div>

              {submitError && (
                <p role="alert" className="text-[11px] text-red-500">
                  Impossible d'envoyer votre avis pour le moment. Réessayez dans un instant.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full py-3 font-bold text-xs tracking-wider uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-2 ${
                  isSubmitDisabled
                    ? 'bg-border dark:bg-white/10 text-text-secondary dark:text-white/30 cursor-not-allowed'
                    : PRIMARY_BUTTON
                }`}
              >
                <Star className="w-4 h-4" aria-hidden="true" />
                {isSubmitting ? 'Envoi…' : 'Envoyer mon avis'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  return <ReviewDialog onClose={onClose} onSubmit={onSubmit} />;
};