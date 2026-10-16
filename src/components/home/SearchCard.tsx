import React, { useEffect, useId, useRef, useState } from 'react';
import { Search, MapPin, X, ChevronDown } from 'lucide-react';
import { categories } from '../../data/categories';

const COMMUNES = ['Cocody', 'Yopougon', 'Marcory', 'Abobo', 'Plateau', 'Treichville', 'Koumassi', 'Angré'];

// Comparaison sans accents ni majuscules ("elec" trouve "Électricien")
const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

type OpenField = 'service' | 'location' | null;

interface SearchCardProps {
  onSearch: (service: string, location: string) => void;
}

export const SearchCard: React.FC<SearchCardProps> = ({ onSearch }) => {
  const [serviceQuery, setServiceQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [openField, setOpenField] = useState<OpenField>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const serviceInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const serviceListId = useId();
  const locationListId = useId();

  // Ferme la liste ouverte quand on clique ou touche en dehors de la carte
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpenField(null);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const filteredServices = categories.filter((c) => normalize(c.title).includes(normalize(serviceQuery)));
  const filteredCommunes = COMMUNES.filter((c) => normalize(c).includes(normalize(locationQuery)));

  const toggleField = (field: Exclude<OpenField, null>) =>
    setOpenField((current) => (current === field ? null : field));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setOpenField(null);
  };

  return (
    <div ref={cardRef} className="relative z-20 -mt-16 px-4">
      <div className="bg-surface dark:bg-[#121215] rounded-2xl p-4 shadow-2xl shadow-black/10 dark:shadow-black/80 border border-border dark:border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(serviceQuery, locationQuery);
          }}
          className="flex flex-col gap-3"
        >
          {/* Champ Service avec suggestions */}
          <div className="relative">
            <div className="flex items-center bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:border-primary-500 dark:focus-within:border-emerald-500/80 transition">
              <Search className="w-4 h-4 text-text-secondary dark:text-white/40 mr-2.5 shrink-0" aria-hidden="true" />
              <input
                ref={serviceInputRef}
                type="text"
                value={serviceQuery}
                onChange={(e) => {
                  setServiceQuery(e.target.value);
                  setOpenField('service');
                }}
                onFocus={() => setOpenField('service')}
                onKeyDown={handleKeyDown}
                placeholder="Quel service cherchez-vous ?"
                aria-label="Service recherché"
                autoComplete="off"
                className="w-full text-sm text-text dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-white/35 bg-transparent focus:outline-none"
              />
              {serviceQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setServiceQuery('');
                    serviceInputRef.current?.focus();
                  }}
                  aria-label="Effacer le service"
                  className="p-1 shrink-0"
                >
                  <X className="w-3.5 h-3.5 text-text-secondary dark:text-white/40" />
                </button>
              )}
              <button
                type="button"
                onClick={() => toggleField('service')}
                aria-label="Afficher les services"
                aria-expanded={openField === 'service'}
                aria-controls={serviceListId}
                className="p-1 ml-0.5 shrink-0"
              >
                <ChevronDown
                  className={`w-4 h-4 text-text-secondary dark:text-white/40 transition-transform ${
                    openField === 'service' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {openField === 'service' && (
              <div
                id={serviceListId}
                className="absolute top-full left-0 right-0 mt-1 bg-surface dark:bg-[#18181B] border border-border dark:border-white/10 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto"
              >
                {filteredServices.length > 0 ? (
                  filteredServices.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setServiceQuery(cat.title);
                        setOpenField(null);
                      }}
                      className="w-full text-left px-3 py-2.5 text-xs text-text dark:text-white/80 hover:bg-background dark:hover:bg-white/5 flex items-center justify-between"
                    >
                      <span>{cat.title}</span>
                      <span className="text-text-muted dark:text-white/40">{cat.count} prestataires</span>
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2.5 text-xs text-text-secondary dark:text-white/40">Aucun résultat</p>
                )}
              </div>
            )}
          </div>

          {/* Champ Localisation avec suggestions */}
          <div className="relative">
            <div className="flex items-center bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:border-primary-500 dark:focus-within:border-emerald-500/80 transition">
              <MapPin className="w-4 h-4 text-primary-700 dark:text-emerald-400 mr-2.5 shrink-0" aria-hidden="true" />
              <input
                ref={locationInputRef}
                type="text"
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value);
                  setOpenField('location');
                }}
                onFocus={() => setOpenField('location')}
                onKeyDown={handleKeyDown}
                placeholder="Votre commune ou quartier"
                aria-label="Commune ou quartier"
                autoComplete="off"
                className="w-full text-sm text-text dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-white/35 bg-transparent focus:outline-none"
              />
              {locationQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setLocationQuery('');
                    locationInputRef.current?.focus();
                  }}
                  aria-label="Effacer la commune"
                  className="p-1 shrink-0"
                >
                  <X className="w-3.5 h-3.5 text-text-secondary dark:text-white/40" />
                </button>
              )}
              <button
                type="button"
                onClick={() => toggleField('location')}
                aria-label="Afficher les communes"
                aria-expanded={openField === 'location'}
                aria-controls={locationListId}
                className="p-1 ml-0.5 shrink-0"
              >
                <ChevronDown
                  className={`w-4 h-4 text-text-secondary dark:text-white/40 transition-transform ${
                    openField === 'location' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {openField === 'location' && (
              <div
                id={locationListId}
                className="absolute top-full left-0 right-0 mt-1 bg-surface dark:bg-[#18181B] border border-border dark:border-white/10 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto"
              >
                {filteredCommunes.length > 0 ? (
                  filteredCommunes.map((commune) => (
                    <button
                      key={commune}
                      type="button"
                      onClick={() => {
                        setLocationQuery(commune);
                        setOpenField(null);
                      }}
                      className="w-full text-left px-3 py-2.5 text-xs text-text dark:text-white/80 hover:bg-background dark:hover:bg-white/5 flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-primary-700 dark:text-emerald-400" aria-hidden="true" />
                      {commune}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2.5 text-xs text-text-secondary dark:text-white/40">Aucun résultat</p>
                )}
              </div>
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