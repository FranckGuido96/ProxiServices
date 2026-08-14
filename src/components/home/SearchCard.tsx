import React, { useState } from 'react';
import { Search, MapPin, X, ChevronDown } from 'lucide-react';
import { categories } from '../../data/categories';

const COMMUNES = ["Cocody", "Yopougon", "Marcory", "Abobo", "Plateau", "Treichville", "Koumassi"];

interface SearchCardProps {
    onSearch: (service: string, location: string) => void;
}

export const SearchCard: React.FC<SearchCardProps> = ({ onSearch }) => {
    const [serviceQuery, setServiceQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

    const filteredServices = categories.filter((c) =>
        c.title.toLowerCase().includes(serviceQuery.toLowerCase())
    );
    const filteredCommunes = COMMUNES.filter((c) =>
        c.toLowerCase().includes(locationQuery.toLowerCase())
    );

    return (
        <div className="relative z-20 -mt-16 px-4">
            <div className="bg-surface dark:bg-[#121215] rounded-2xl p-4 shadow-2xl shadow-black/10 dark:shadow-black/80 border border-border dark:border-white/10">
                <form onSubmit={(e) => { e.preventDefault(); onSearch(serviceQuery, locationQuery); }} className="flex flex-col gap-3">

                    {/* Champ Service avec suggestions */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowServiceSuggestions((v) => !v)}
                            className="w-full flex items-center bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:border-primary-500 dark:focus-within:border-emerald-500/80 transition"
                        >
                            <Search className="w-4 h-4 text-text-secondary dark:text-white/40 mr-2.5 shrink-0" />
                            <input
                                type="text"
                                value={serviceQuery}
                                onChange={(e) => { setServiceQuery(e.target.value); setShowServiceSuggestions(true); }}
                                onFocus={() => setShowServiceSuggestions(true)}
                                placeholder="Quel service cherchez-vous ?"
                                className="w-full text-sm text-text dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-white/35 bg-transparent focus:outline-none"
                            />
                            {serviceQuery && (
                                <span onClick={(e) => { e.stopPropagation(); setServiceQuery(''); }} className="p-1">
                                    <X className="w-3.5 h-3.5 text-text-secondary dark:text-white/40" />
                                </span>
                            )}
                            <ChevronDown className={`w-4 h-4 text-text-secondary dark:text-white/40 ml-1.5 shrink-0 transition-transform ${showServiceSuggestions ? 'rotate-180' : ''}`} />
                        </button>

                        {showServiceSuggestions && (
                            <>
                                <div className="fixed inset-0 z-20" onClick={() => setShowServiceSuggestions(false)} />
                                <div className="absolute top-full left-0 right-0 mt-1 bg-surface dark:bg-[#18181B] border border-border dark:border-white/10 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto">
                                    {filteredServices.length > 0 ? filteredServices.map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => { setServiceQuery(cat.title); setShowServiceSuggestions(false); }}
                                            className="w-full text-left px-3 py-2.5 text-xs text-text dark:text-white/80 hover:bg-background dark:hover:bg-white/5 flex items-center justify-between"
                                        >
                                            <span>{cat.title}</span>
                                            <span className="text-text-muted dark:text-white/40">{cat.count} prestataires</span>
                                        </button>
                                    )) : (
                                        <p className="px-3 py-2.5 text-xs text-text-secondary dark:text-white/40">Aucun résultat</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Champ Localisation avec suggestions */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowLocationSuggestions((v) => !v)}
                            className="w-full flex items-center bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:border-primary-500 dark:focus-within:border-emerald-500/80 transition"
                        >
                            <MapPin className="w-4 h-4 text-primary-700 dark:text-emerald-400 mr-2.5 shrink-0" />
                            <input
                                type="text"
                                value={locationQuery}
                                onChange={(e) => { setLocationQuery(e.target.value); setShowLocationSuggestions(true); }}
                                onFocus={() => setShowLocationSuggestions(true)}
                                placeholder="Votre commune ou quartier"
                                className="w-full text-sm text-text dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-white/35 bg-transparent focus:outline-none"
                            />
                            {locationQuery && (
                                <span onClick={(e) => { e.stopPropagation(); setLocationQuery(''); }} className="p-1">
                                    <X className="w-3.5 h-3.5 text-text-secondary dark:text-white/40" />
                                </span>
                            )}
                            <ChevronDown className={`w-4 h-4 text-text-secondary dark:text-white/40 ml-1.5 shrink-0 transition-transform ${showLocationSuggestions ? 'rotate-180' : ''}`} />
                        </button>

                        {showLocationSuggestions && (
                            <>
                                <div className="fixed inset-0 z-20" onClick={() => setShowLocationSuggestions(false)} />
                                <div className="absolute top-full left-0 right-0 mt-1 bg-surface dark:bg-[#18181B] border border-border dark:border-white/10 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto">
                                    {filteredCommunes.length > 0 ? filteredCommunes.map((commune) => (
                                        <button
                                            key={commune}
                                            type="button"
                                            onClick={() => { setLocationQuery(commune); setShowLocationSuggestions(false); }}
                                            className="w-full text-left px-3 py-2.5 text-xs text-text dark:text-white/80 hover:bg-background dark:hover:bg-white/5 flex items-center gap-2"
                                        >
                                            <MapPin className="w-3.5 h-3.5 text-primary-700 dark:text-emerald-400" />
                                            {commune}
                                        </button>
                                    )) : (
                                        <p className="px-3 py-2.5 text-xs text-text-secondary dark:text-white/40">Aucun résultat</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-700 hover:bg-primary-800 dark:bg-[#137547] dark:hover:bg-[#10633c] active:scale-[0.99] text-white font-semibold text-xs tracking-wider uppercase py-3.5 rounded-xl transition shadow-lg"
                    >
                        Trouver un artisan
                    </button>
                </form>
            </div>
        </div>
    );
};