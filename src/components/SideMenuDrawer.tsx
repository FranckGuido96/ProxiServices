import React from 'react';
import { X, Home, UserPlus, Phone, ShieldCheck, Info, Heart, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo 1.svg';

interface SideMenuDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    favoritesCount: number;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({ isOpen, onClose, favoritesCount }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex justify-start" onClick={onClose}>
            <div
                className="bg-surface dark:bg-[#121215] text-text dark:text-[#F5F5F5] border-r border-border dark:border-white/10 w-4/5 max-w-xs h-full shadow-2xl relative flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <div className="bg-gradient-to-b from-primary-500 to-primary-700 dark:from-[#0B1E16] dark:via-[#0F281E] dark:to-[#0A1A14] text-white p-5 pt-8 relative border-b border-white/20 dark:border-emerald-500/20">
                        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-1.5">
                            <img src={logo} alt="ProxiServices" className="w-14 h-16 object-contain shrink-0 -ml-1" />
                            <div>
                                <span className="text-xl font-serif font-bold tracking-tight block leading-tight">ProxiServices</span>
                                <p className="text-xs text-white/80 dark:text-emerald-400 font-medium">
                                    Vos services à proximité
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 space-y-1">
                        <button onClick={() => { onClose(); navigate('/'); }}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text dark:text-white hover:bg-background dark:hover:bg-white/5 transition">
                            <Home className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                            <span>Accueil</span>
                        </button>

                        <button onClick={() => { onClose(); navigate('/prestataire/dashboard'); }}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text dark:text-white hover:bg-background dark:hover:bg-white/5 transition">
                            <div className="flex items-center gap-3">
                                <Settings className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                                <span>Espace Prestataire</span>
                            </div>
                            <span className="bg-primary-50 dark:bg-emerald-950 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                Dashboard
                            </span>
                        </button>

                        <button onClick={() => { onClose(); navigate('/devenir-prestataire'); }}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text dark:text-white hover:bg-background dark:hover:bg-white/5 transition">
                            <UserPlus className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                            <span>Devenir prestataire</span>
                        </button>

                        <button onClick={() => { onClose(); navigate('/favoris'); }}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text dark:text-white hover:bg-background dark:hover:bg-white/5 transition">
                            <div className="flex items-center gap-3">
                                <Heart className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                                <span>Mes favoris</span>
                            </div>
                            <span className="bg-primary-50 border border-primary-200 text-primary-700 dark:bg-emerald-950 dark:border-emerald-500/30 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {favoritesCount}
                            </span>
                        </button>

                        <div className="my-2 border-t border-border dark:border-white/10" />

                        <button onClick={onClose}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text-secondary dark:text-white/70 hover:bg-background dark:hover:bg-white/5 transition">
                            <ShieldCheck className="w-4 h-4 text-text-muted dark:text-white/40" />
                            <span>Garantie & Sécurité</span>
                        </button>

                        <button onClick={onClose}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text-secondary dark:text-white/70 hover:bg-background dark:hover:bg-white/5 transition">
                            <Info className="w-4 h-4 text-text-muted dark:text-white/40" />
                            <span>Comment ça marche</span>
                        </button>

                        <button onClick={onClose}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text-secondary dark:text-white/70 hover:bg-background dark:hover:bg-white/5 transition">
                            <Phone className="w-4 h-4 text-text-muted dark:text-white/40" />
                            <span>Assistance client</span>
                        </button>
                    </div>
                </div>

                <div className="p-4 border-t border-border dark:border-white/10 bg-background dark:bg-[#09090B] text-[11px] text-text-secondary dark:text-white/40 text-center">
                    <p className="font-semibold text-text dark:text-white/60">ProxiServices v1.0</p>
                    <p className="mt-0.5">Côte d'Ivoire • Abidjan</p>
                </div>
            </div>
        </div>
    );
};