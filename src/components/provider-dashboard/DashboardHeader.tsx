import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CheckCircle2, MapPin, Edit3, Camera, Bell, ExternalLink } from 'lucide-react';
import { NotificationsPanel } from './NotificationsPanel';

interface DashboardHeaderProps {
    name: string;
    trade: string;
    commune: string;
    services?: string[];
    onBack: () => void;
    onEditProfile: () => void;
    hasUnreadNotifications?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    name,
    trade,
    commune,
    services = [],
    onBack,
    onEditProfile,
    hasUnreadNotifications = true,
}) => {
    const [avatarSrc, setAvatarSrc] = useState(
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80'
    );
    const [notifOpen, setNotifOpen] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarSrc(URL.createObjectURL(file));
    };

    const visibleServices = services.slice(0, 3);
    const extraCount = services.length - visibleServices.length;

    const navigate = useNavigate();

    return (
        <>
            {/* Bandeau — plus de pb-20 ni de positionnement absolute pour la carte */}
            <div className="bg-gradient-to-b from-primary-500 to-primary-700 dark:from-[#0B1E16] dark:via-[#0F281E] dark:to-[#0A1A14] px-4 pt-5 pb-14 border-b border-primary-600/30 dark:border-emerald-500/20 shadow-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onBack}
                            className="p-1.5 rounded-xl bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 text-white/90 hover:text-white transition"
                            aria-label="Retour"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-white/80 dark:text-emerald-400">
                                PROXISERVICES • BUSINESS
                            </span>
                            <h1 className="text-lg font-serif italic font-bold text-white leading-tight">
                                Espace Prestataire
                            </h1>
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setNotifOpen((v) => !v)}
                            className="relative p-2 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-white/90 hover:text-white hover:bg-white/20 dark:hover:bg-white/10 transition"
                            aria-label="Notifications"
                            aria-expanded={notifOpen}
                        >
                            <Bell className="w-4 h-4" />
                            {hasUnreadNotifications && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 border border-white/60 dark:border-[#0A1A14]" />
                            )}
                        </button>

                        <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
                    </div>
                </div>
            </div>

            {/* Carte identité — dans le flux normal, chevauche via marge négative (comme SearchCard sur l'Accueil) */}
            <div className="relative z-10 px-4 -mt-10">
                <div className="bg-surface/95 dark:bg-[#121215]/90 backdrop-blur-md rounded-2xl p-4 border border-border dark:border-white/10 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <div className="relative shrink-0">
                                <input
                                    ref={avatarInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                    aria-label="Changer la photo de profil"
                                />
                                <img
                                    src={avatarSrc}
                                    alt={name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-500 dark:border-emerald-500/80 shadow-md"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-primary-700 dark:bg-emerald-500 text-white dark:text-slate-950 p-0.5 rounded-full border border-surface dark:border-slate-900">
                                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => avatarInputRef.current?.click()}
                                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-[#1A1A1E] border border-border dark:border-white/20 flex items-center justify-center shadow-sm hover:bg-primary-50 dark:hover:bg-white/10 transition"
                                    title="Changer la photo de profil"
                                    aria-label="Changer la photo de profil"
                                >
                                    <Camera className="w-2.5 h-2.5 text-primary-700 dark:text-emerald-400" />
                                </button>
                            </div>

                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h2 className="text-base font-bold text-text dark:text-white">{name}</h2>
                                    <span className="bg-primary-50 dark:bg-emerald-950 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3 text-primary-600 dark:text-emerald-400" />
                                        Vérifié
                                    </span>
                                </div>
                                <p className="text-xs text-primary-700 dark:text-emerald-400 font-medium">{trade}</p>
                                <p className="text-[11px] text-text-secondary dark:text-white/50 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-text-muted dark:text-white/40" />
                                    {commune}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onEditProfile}
                            className="p-2 rounded-xl bg-background dark:bg-white/5 border border-border dark:border-white/10 hover:bg-primary-50 dark:hover:bg-white/10 text-primary-700 dark:text-emerald-400 transition"
                            title="Éditer le profil"
                            aria-label="Éditer le profil"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                    </div>

                    {services.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border dark:border-white/10">
                            {visibleServices.map((service) => (
                                <span
                                    key={service}
                                    className="text-[10px] font-semibold bg-primary-50 dark:bg-emerald-950/60 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-300 px-2 py-0.5 rounded-full"
                                >
                                    {service}
                                </span>
                            ))}
                            {extraCount > 0 && (
                                <span className="text-[10px] font-semibold text-text-secondary dark:text-white/40 px-2 py-0.5">
                                    +{extraCount}
                                </span>
                            )}
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/prestataire/7')}
                        className="w-full mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-primary-700 dark:text-emerald-400 py-2 border-t border-border dark:border-white/10"
                    >
                        <ExternalLink className="w-3.5 h-3.5" /> Voir mon profil public
                    </button>
                </div>
            </div>
        </>
    );
};