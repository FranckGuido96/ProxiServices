import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const AUTOPLAY_DELAY = 4000;

export const PromoCarousel: React.FC = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, AUTOPLAY_DELAY);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return (
        <div className="mt-5 mb-1 px-4">
            <div className="relative overflow-hidden rounded-2xl">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {slides.map((slide) => {
                        const t = themeStyles[slide.theme];
                        return (
                            <div
                                key={slide.id}
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
                                        <p className="text-xs text-text-secondary dark:text-white/70 leading-snug mb-2">
                                            {slide.text}
                                        </p>
                                        <button
                                            onClick={() => navigate(slide.to)}
                                            className={`text-xs font-bold py-2 px-3.5 rounded-full active:scale-95 transition-all inline-flex items-center gap-1 uppercase tracking-wider ${t.button}`}
                                        >
                                            {slide.cta}
                                        </button>
                                    </div>
                                    <img src={slide.image} alt="" className="w-24 h-24 object-contain shrink-0" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Indicateurs cliquables */}
            <div className="flex justify-center gap-1.5 mt-2">
                {slides.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Voir la carte ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-5 bg-primary-700 dark:bg-emerald-400' : 'w-1.5 bg-text-muted/40 dark:bg-white/25'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};