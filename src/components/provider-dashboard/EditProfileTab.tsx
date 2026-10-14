import React, { useState } from 'react';
import { UserCircle, X } from 'lucide-react';

interface EditProfileTabProps {
    initialData: {
        bio: string;
        name: string;
        trade: string;
        location: string;
        phone: string;
        services: string[];
    };
}

export const EditProfileTab: React.FC<EditProfileTabProps> = ({ initialData }) => {
    const [bio, setBio] = useState(initialData.bio);
    const [name, setName] = useState(initialData.name);
    const [trade, setTrade] = useState(initialData.trade);
    const [location, setLocation] = useState(initialData.location);
    const [phone, setPhone] = useState(initialData.phone);
    const [services, setServices] = useState<string[]>(initialData.services);
    const [newService, setNewService] = useState('');

    const addService = () => {
        if (newService.trim()) {
            setServices((prev) => [...prev, newService.trim()]);
            setNewService('');
        }
    };

    const removeService = (service: string) => {
        setServices((prev) => prev.filter((s) => s !== service));
    };

    const handleSave = () => {
        // TODO: sauvegarder les modifications dans Supabase
    };

    return (
        <div className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border dark:border-white/10">
                <UserCircle className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-text dark:text-white">Modifier mes informations</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/45 mb-1.5 block">
                        Présentation / Bio <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        className="w-full bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-text dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition resize-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/45 mb-1.5 block">Nom & Prénom</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-text dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/45 mb-1.5 block">Métier principal</label>
                        <input
                            value={trade}
                            onChange={(e) => setTrade(e.target.value)}
                            className="w-full bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-text dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/45 mb-1.5 block">Commune / Ville</label>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-text dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/45 mb-1.5 block">Téléphone</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-text dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/45 mb-2 block">Services proposés</label>
                    <div className="flex flex-wrap gap-2 mb-2.5">
                        {services.map((service) => (
                            <span
                                key={service}
                                className="inline-flex items-center gap-1.5 bg-primary-50 dark:bg-emerald-950/60 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-full"
                            >
                                {service}
                                <button onClick={() => removeService(service)} aria-label={`Retirer ${service}`}>
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                            placeholder="Ex: Remplacement chauffe-eau"
                            className="flex-1 bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2 text-xs text-text dark:text-white focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition"
                        />
                        <button
                            onClick={addService}
                            className="px-3.5 py-2 rounded-xl bg-text/10 dark:bg-white/10 text-text dark:text-white text-xs font-bold whitespace-nowrap"
                        >
                            + Ajouter
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                    ✓ Sauvegarder les modifications
                </button>
            </div>
        </div>
    );
};