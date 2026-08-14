import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ProfileWork } from '../../data/providerProfileDetails';
import { ImageLightbox } from './ImageLightbox';

interface WorksTabProps {
    works: ProfileWork[];
}

export const WorksTab: React.FC<WorksTabProps> = ({ works }) => {
    const [lightboxWork, setLightboxWork] = useState<ProfileWork | null>(null);

    return (
        <div className="px-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary-700 dark:text-emerald-400" /> Travaux &amp; chantiers récents
                </h3>
                <span className="text-[10px] text-text-secondary dark:text-white/40">Cliquez pour agrandir</span>
            </div>
            <div className="space-y-3">
                {works.map((work) => (
                    <div
                        key={work.id}
                        className="relative rounded-2xl overflow-hidden border border-border dark:border-white/10 shadow-sm dark:shadow-xl h-40 cursor-pointer active:scale-[0.98] transition-transform"
                        onClick={() => setLightboxWork(work)}
                        role="button"
                        aria-label={`Agrandir : ${work.title}`}
                    >
                        <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                        <span className="absolute bottom-3 left-3 text-sm font-bold text-white">{work.title}</span>
                    </div>
                ))}
            </div>
            <p className="text-center text-[11px] text-text-secondary dark:text-white/40 flex items-center justify-center gap-1.5 pt-4">
                Profil vérifié • Interventions sécurisées ProxiServices
            </p>

            <ImageLightbox work={lightboxWork} onClose={() => setLightboxWork(null)} />
        </div>
    );
};