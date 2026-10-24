import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import promoBuilder from '../../assets/images/promocard1.svg';
import promoSeamstress from '../../assets/images/promocard2.svg';

const slides = [
  {
    id: 'artisan',
    eyebrow: 'ESPACE PROFESSIONNEL',
    title: 'Vous êtes',
    highlight: 'artisan ?',
    text: 'Soyez parmi les premiers prestataires sur ProxiServices.',
    cta: 'Devenir prestataire',
    to: '/devenir-prestataire',
    image: promoBuilder,
    theme: 'amber' as const,
  },
  {
    id: 'grow',
    eyebrow: 'DÉVELOPPEZ VOTRE ACTIVITÉ',
    title: 'Faites',
    highlight: 'plus de clients',
    text: 'Rejoignez ProxiServices et développez votre activité localement.',
    cta: 'Devenir prestataire',
    to: '/devenir-prestataire',
    image: promoSeamstress,
    theme: 'emerald' as const,
  },
];

// Copie de la 1re carte ajoutée à la fin : le défilement avance toujours dans le même sens
const extendedSlides = [...slides, slides[0]];
const LAST_INDEX = extendedSlides.length - 1;
const AUTOPLAY_DELAY = 4000;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const themeStyles = {
  amber: {
    bg: 'from-amber-100 via-amber-50 to-surface dark:from-[#2B1804] dark:via-[#241300] dark:to-[#1A0B00]',
    border: 'border-amber-300 dark:border-amber-500/25',
    eyebrow: 'text-amber-700 dark:text-amber-400',
    highlight: 'text-amber-700 dark:text-amber-300',
    button: 'bg-amber-400 hover:bg-amber-300 text-slate-950',
  },
  emerald: {
    bg: 'from-primary-50 via-primary-50/60 to-surface dark:from-[#0B1E16] dark:via-[#0F281E] dark:to-[#0A1A14]',
    border: 'border-primary-300 dark:border-emerald-500/25',
    eyebrow: 'text-primary-700 dark:text-emerald-400',
    highlight: 'text-primary-700 dark:text-emerald-300',
    button: 'bg-primary-700 hover:bg-primary-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950',
  },
};

export const PromoCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
  );

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  // Pause au survol, au toucher et au focus ; pas de défilement si l'appareil demande moins d'animations
  const isPaused = isHovered || isFocused || reducedMotion;
  const activeDot = index % slides.length;

  // Retour à la 1re carte, sans animation : la copie finale est identique, le saut est invisible
  const jumpToStart = useCallback(() => {
    setWithTransition(false);
    setIndex(0);
    // Deux images : la position de départ est appliquée avant de réactiver l'animation
    requestAnimationFrame(() => requestAnimationFrame(() => setWithTransition(true)));
  }, []);

  // Le décompte repart à chaque changement de carte (y compris après un clic sur un point)
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      if (index >= LAST_INDEX) jumpToStart();
      else setIndex(index + 1);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [index, isPaused, jumpToStart]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Les animations des boutons à l'intérieur remontent aussi : on ne garde que celle du défilement
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (index >= LAST_INDEX) jumpToStart();
  };

  const goTo = (i: number) => {
    setWithTransition(true);
    setIndex(i);
  };

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Offres pour les artisans"
      className="mt-5 mb-1 px-4"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsFocused(false);
      }}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className={`flex ${withTransition && !reducedMotion ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
          aria-live={isPaused ? 'polite' : 'off'}
        >
          {extendedSlides.map((slide, i) => {
            const t = themeStyles[slide.theme];
            const isCurrent = i === index;
            return (
              <div
                key={`${slide.id}-${i}`}
                role="group"
                aria-roledescription="diapositive"
                aria-label={`${(i % slides.length) + 1} sur ${slides.length}`}
                aria-hidden={!isCurrent}
                inert={!isCurrent}
                className={`relative w-full shrink-0 rounded-2xl p-4 overflow-hidden border shadow-sm dark:shadow-xl bg-gradient-to-r ${t.bg} ${t.border}`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="max-w-[62%] flex flex-col items-start gap-1">
                    <span className={`text-[9px] uppercase tracking-[0.25em] font-semibold ${t.eyebrow}`}>
                      {slide.eyebrow}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif italic leading-tight text-text dark:text-white">
                      {slide.title} <span className={`not-italic font-bold ${t.highlight}`}>{slide.highlight}</span>
                    </h3>
                    <p className="text-xs text-text-secondary dark:text-white/70 leading-snug mb-2">{slide.text}</p>
                    <Link
                      to={slide.to}
                      className={`text-xs font-bold py-2 px-3.5 rounded-full active:scale-95 transition-all inline-flex items-center gap-1 uppercase tracking-wider outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400 ${t.button}`}
                    >
                      {slide.cta}
                    </Link>
                  </div>
                  <img src={slide.image} alt="" className="w-24 h-24 object-contain shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-1.5 mt-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Afficher la diapositive ${i + 1}`}
            aria-current={i === activeDot ? 'true' : undefined}
            className={`h-1.5 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400 ${
              i === activeDot ? 'w-5 bg-primary-700 dark:bg-emerald-400' : 'w-1.5 bg-text-muted/40 dark:bg-white/25'
            }`}
          />
        ))}
      </div>
    </section>
  );
};