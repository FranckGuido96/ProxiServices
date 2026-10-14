import React from 'react';
import { User, MapPin, CheckCircle2 } from 'lucide-react';

interface PresentationTabProps {
    description: string;
    interventionZones: string[];
    services: string[];
}

export const PresentationTab: React.FC<PresentationTabProps> = ({ description, interventionZones, services }) => {
    return (
        <div className="px-4 space-y-3">
            <div className="bg-surface dark:bg-[#121215] rounded-2xl p-4 border border-border dark:border-white/10 shadow-sm dark:shadow-xl">
                <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2.5 mb-3 border-b border-border dark:border-white/10">
                    <User className="w-4 h-4 text-primary-700 dark:text-emerald-400" /> À propos du service
                </h3>
                <p className="text-sm text-primary-700 dark:text-emerald-300 leading-relaxed">{description}</p>
            </div>

            <div className="bg-surface dark:bg-[#121215] rounded-2xl p-4 border border-border dark:border-white/10 shadow-sm dark:shadow-xl">
                <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2.5 mb-3 border-b border-border dark:border-white/10">
                    <MapPin className="w-4 h-4 text-primary-700 dark:text-emerald-400" /> Zone d'intervention
                </h3>
                <div className="flex flex-wrap gap-2">
                    {interventionZones.map((zone) => (
                        <span key={zone} className="text-xs font-semibold bg-primary-50 dark:bg-emerald-950/60 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-300 px-3 py-1 rounded-full">
                            {zone}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-surface dark:bg-[#121215] rounded-2xl p-4 border border-border dark:border-white/10 shadow-sm dark:shadow-xl">
                <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider pb-2.5 mb-3 border-b border-border dark:border-white/10">
                    Services & compétences
                </h3>
                <div className="space-y-2">
                    {services.map((service) => (
                        <div key={service} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary-700 dark:text-emerald-400 shrink-0" />
                            <span className="text-sm text-text dark:text-white">{service}</span>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-center text-[11px] text-text-secondary dark:text-white/40 flex items-center justify-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-600 dark:text-emerald-500" />
                Profil vérifié • Interventions sécurisées ProxiServices
            </p>
        </div>
    );
};