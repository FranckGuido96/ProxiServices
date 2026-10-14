import React, { useState, useEffect } from 'react';
import { User, Check } from 'lucide-react';

interface ProfileTabProps {
    onServicesChange?: (services: string[]) => void;
    onAddressChange?: (address: { ville: string; commune: string; quartier: string }) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onServicesChange, onAddressChange }) => {
    const [bio, setBio] = useState('Intervention rapide pour toutes vos urgences en plomberie à Cocody et environs. 10 ans d\'expérience et matériel professionnel.');
    const [name, setName] = useState('Koffi Yao');
    const [trade, setTrade] = useState('Plombier');
    const [ville, setVille] = useState('Abidjan');
    const [commune, setCommune] = useState('Cocody');
    const [quartier, setQuartier] = useState('Angré');
    const [phone, setPhone] = useState('07 08 09 10 11');
    const [services, setServices] = useState<string[]>([
        'Dépannage fuite d\'eau', 'Installation sanitaire', 'Débouchage rapide', 'Rénovation salle de bain',
    ]);
    const [newServiceInput, setNewServiceInput] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        onServicesChange?.(services);
    }, [services, onServicesChange]);

    useEffect(() => {
        onAddressChange?.({ ville, commune, quartier });
    }, [ville, commune, quartier, onAddressChange]);

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const handleAddService = () => {
        if (newServiceInput.trim() && !services.includes(newServiceInput.trim())) {
            setServices([...services, newServiceInput.trim()]);
            setNewServiceInput('');
        }
    };

    const handleRemoveService = (s: string) => setServices(services.filter((srv) => srv !== s));

    return (
        <div className="px-4">
            <form onSubmit={handleSaveProfile} className="bg-surface dark:bg-[#121215] rounded-2xl p-4 border border-border dark:border-white/10 shadow-sm dark:shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border dark:border-white/5">
                    <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <User className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                        <span>Modifier mes informations</span>
                    </h3>
                    {saveSuccess && (
                        <span className="text-[11px] text-primary-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Enregistré !
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1.5">
                        Présentation / Bio *
                    </label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        maxLength={300}
                        className="w-full text-xs p-3 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30"
                    />
                    <p className={`text-[10px] text-right mt-1 font-medium ${bio.length > 280 ? 'text-amber-500 dark:text-amber-400' : 'text-text-secondary dark:text-white/40'}`}>
                        {bio.length}/300
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1">Nom & Prénom</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full text-xs p-2.5 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1">Métier principal</label>
                        <input type="text" value={trade} onChange={(e) => setTrade(e.target.value)}
                            className="w-full text-xs p-2.5 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30" />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1">Téléphone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs p-2.5 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30" />
                </div>

                <div className="space-y-3 pt-1">
                    <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest">Adresse</label>
                    <div>
                        <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1">Ville</label>
                        <input type="text" value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ex: Abidjan"
                            className="w-full text-xs p-2.5 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1">Commune</label>
                        <input type="text" value={commune} onChange={(e) => setCommune(e.target.value)} placeholder="Ex: Cocody"
                            className="w-full text-xs p-2.5 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1">Quartier</label>
                        <input type="text" value={quartier} onChange={(e) => setQuartier(e.target.value)} placeholder="Ex: Angré"
                            className="w-full text-xs p-2.5 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30" />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1.5">Services proposés</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {services.map((srv) => (
                            <span key={srv} className="inline-flex items-center gap-1 bg-primary-50 dark:bg-emerald-950/80 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-lg">
                                <span>{srv}</span>
                                <button type="button" onClick={() => handleRemoveService(srv)} className="text-primary-500 dark:text-emerald-400 hover:text-text dark:hover:text-white">×</button>
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="text" value={newServiceInput} onChange={(e) => setNewServiceInput(e.target.value)}
                            placeholder="Ex: Remplacement chauffe-eau"
                            className="flex-1 text-xs p-2 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30" />
                        <button type="button" onClick={handleAddService}
                            className="py-2 px-3 bg-text/10 dark:bg-white/10 hover:bg-text/15 dark:hover:bg-white/15 text-text dark:text-white text-xs font-bold rounded-xl transition">
                            + Ajouter
                        </button>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        className="w-full py-3 bg-primary-700 hover:bg-primary-800 dark:bg-[#137547] dark:hover:bg-[#10633c] text-white font-bold text-xs tracking-wider uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-2 mt-2">
                        <Check className="w-4 h-4" /><span>Sauvegarder les modifications</span>
                    </button>
                    {saveSuccess && (
                        <p className="text-center text-xs text-primary-700 dark:text-emerald-400 font-bold mt-2 flex items-center justify-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Modifications enregistrées !
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};