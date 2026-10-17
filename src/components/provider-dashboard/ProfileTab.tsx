import React, { useId, useState } from 'react';
import { User, Check } from 'lucide-react';
import { ProviderProfileData } from '../../types/dashboard';

interface ProfileTabProps {
  profile: ProviderProfileData;
  onChange: (profile: ProviderProfileData) => void;
}

const labelClass = 'block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest';
const fieldClass =
  'w-full text-xs border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30';

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'tel';
}

const TextField: React.FC<TextFieldProps> = ({ id, label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label htmlFor={id} className={`${labelClass} mb-1`}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${fieldClass} p-2.5`}
    />
  </div>
);

export const ProfileTab: React.FC<ProfileTabProps> = ({ profile, onChange }) => {
  const uid = useId();
  const [newServiceInput, setNewServiceInput] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const update = (patch: Partial<ProviderProfileData>) => onChange({ ...profile, ...patch });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO Supabase : enregistrer le profil, n'afficher le succès qu'après la réponse
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddService = () => {
    const service = newServiceInput.trim();
    if (!service || profile.services.includes(service)) return;
    update({ services: [...profile.services, service] });
    setNewServiceInput('');
  };

  const handleRemoveService = (service: string) =>
    update({ services: profile.services.filter((s) => s !== service) });

  return (
    <div className="px-4">
      <form
        onSubmit={handleSaveProfile}
        className="bg-surface dark:bg-[#121215] rounded-2xl p-4 border border-border dark:border-white/10 shadow-sm dark:shadow-xl space-y-4"
      >
        <div className="flex items-center justify-between pb-2 border-b border-border dark:border-white/5">
          <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
            <span>Modifier mes informations</span>
          </h3>
        </div>

        <div>
          <label htmlFor={`${uid}-bio`} className={`${labelClass} mb-1.5`}>
            Présentation / Bio *
          </label>
          <textarea
            id={`${uid}-bio`}
            value={profile.bio}
            onChange={(e) => update({ bio: e.target.value })}
            rows={3}
            maxLength={300}
            className={`${fieldClass} p-3`}
          />
          <p
            className={`text-[10px] text-right mt-1 font-medium ${
              profile.bio.length > 280 ? 'text-amber-500 dark:text-amber-400' : 'text-text-secondary dark:text-white/40'
            }`}
          >
            {profile.bio.length}/300
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <TextField id={`${uid}-name`} label="Nom & Prénom" value={profile.name} onChange={(name) => update({ name })} />
          <TextField id={`${uid}-trade`} label="Métier principal" value={profile.trade} onChange={(trade) => update({ trade })} />
        </div>

        <TextField id={`${uid}-phone`} type="tel" label="Téléphone" value={profile.phone} onChange={(phone) => update({ phone })} />

        <fieldset className="space-y-3 pt-1">
          <legend className={`${labelClass} mb-2`}>Adresse</legend>
          <TextField id={`${uid}-ville`} label="Ville" value={profile.ville} onChange={(ville) => update({ ville })} placeholder="Ex: Abidjan" />
          <TextField id={`${uid}-commune`} label="Commune" value={profile.commune} onChange={(commune) => update({ commune })} placeholder="Ex: Cocody" />
          <TextField id={`${uid}-quartier`} label="Quartier" value={profile.quartier} onChange={(quartier) => update({ quartier })} placeholder="Ex: Angré" />
        </fieldset>

        <div>
          <label htmlFor={`${uid}-service`} className={`${labelClass} mb-1.5`}>
            Services proposés
          </label>
          <ul className="flex flex-wrap gap-1.5 mb-2">
            {profile.services.map((service) => (
              <li
                key={service}
                className="inline-flex items-center gap-1 bg-primary-50 dark:bg-emerald-950/80 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-lg"
              >
                <span>{service}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveService(service)}
                  aria-label={`Retirer ${service}`}
                  className="text-primary-500 dark:text-emerald-400 hover:text-text dark:hover:text-white"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <input
              id={`${uid}-service`}
              type="text"
              value={newServiceInput}
              onChange={(e) => setNewServiceInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddService();
                }
              }}
              placeholder="Ex: Remplacement chauffe-eau"
              className={`flex-1 ${fieldClass} p-2`}
            />
            <button
              type="button"
              onClick={handleAddService}
              className="py-2 px-3 bg-text/10 dark:bg-white/10 hover:bg-text/15 dark:hover:bg-white/15 text-text dark:text-white text-xs font-bold rounded-xl transition"
            >
              + Ajouter
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-primary-700 hover:bg-primary-800 dark:bg-[#137547] dark:hover:bg-[#10633c] text-white font-bold text-xs tracking-wider uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            <Check className="w-4 h-4" />
            <span>Sauvegarder les modifications</span>
          </button>
          {saveSuccess && (
            <p
              role="status"
              className="text-center text-xs text-primary-700 dark:text-emerald-400 font-bold mt-2 flex items-center justify-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Modifications enregistrées !
            </p>
          )}
        </div>
      </form>
    </div>
  );
};