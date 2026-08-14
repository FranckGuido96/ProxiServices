import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { ResultCard } from '../components/search/ResultCard';
import { categories } from '../data/categories';
import { providers } from '../data/providers';
import { BottomNav } from '../components/navigation/BottomNav';

const COMMUNES = ["Cocody", "Yopougon", "Marcory", "Abobo", "Plateau", "Treichville", "Koumassi", "Angré"];

export default function SearchResults() {
    useNavigate(); // réservé pour usages futurs (ex: retour, breadcrumb)
    const [query, setQuery] = useState('');
    const [selectedTrade, setSelectedTrade] = useState('');
    const [selectedCommune, setSelectedCommune] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
    };

    const filteredProviders = useMemo(() => {
        return providers.filter((p) => {
            const matchesQuery = query.trim() === '' || p.trade.toLowerCase().includes(query.toLowerCase()) || p.name.toLowerCase().includes(query.toLowerCase());
            const matchesTrade = !selectedTrade || p.trade === selectedTrade;
            const matchesCommune = !selectedCommune || p.commune === selectedCommune || p.location === selectedCommune;
            return matchesQuery && matchesTrade && matchesCommune;
        });
    }, [query, selectedTrade, selectedCommune]);

    return (
        <div className="min-h-screen bg-background dark:bg-[#050505] pb-24">
            <div className="px-4 pt-6 pb-4">
                <h1 className="text-xl font-serif italic text-text dark:text-white leading-tight mb-4">
                    Rechercher un <span className="not-italic font-bold text-primary-700 dark:text-emerald-400">artisan</span>
                </h1>

                {/* Barre de recherche */}
                <div className="flex items-center gap-3 bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-xl px-3.5 py-3 mb-3">
                    <Search className="w-4 h-4 text-text-secondary dark:text-white/40 shrink-0" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Menuisier, Plombier, Peintre..."
                        className="w-full bg-transparent text-sm text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/35 focus:outline-none"
                    />
                </div>

                {/* Filtres métier + commune */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                        <select
                            value={selectedTrade}
                            onChange={(e) => setSelectedTrade(e.target.value)}
                            className="w-full appearance-none bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-xs font-semibold text-text dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition"
                        >
                            <option value="">Tous les métiers</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.title}>{c.title}</option>
                            ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-text-secondary dark:text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            value={selectedCommune}
                            onChange={(e) => setSelectedCommune(e.target.value)}
                            className="w-full appearance-none bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-xs font-semibold text-text dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition"
                        >
                            <option value="">Toutes les communes</option>
                            {COMMUNES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-text-secondary dark:text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="px-4">
                <p className="text-xs font-semibold text-text-secondary dark:text-white/50 mb-3">
                    {filteredProviders.length} prestataire{filteredProviders.length > 1 ? 's' : ''} trouvé{filteredProviders.length > 1 ? 's' : ''}
                </p>

                {filteredProviders.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-sm font-bold text-text dark:text-white">Aucun résultat</p>
                        <p className="text-xs text-text-secondary dark:text-white/50 mt-1">Modifiez vos critères de recherche</p>
                    </div>
                ) : (
                    <div className="space-y-2.5">
                        {filteredProviders.map((provider) => (
                            <ResultCard
                                key={provider.id}
                                provider={provider}
                                isFavorite={favorites.includes(provider.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}