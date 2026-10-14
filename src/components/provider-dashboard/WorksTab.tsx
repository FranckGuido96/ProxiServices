import React, { useState } from 'react';
import { Camera, Eye, Trash2, PlusCircle } from 'lucide-react';

interface Work {
    id: string;
    title: string;
    image: string;
    views: number;
    postedAgo: string;
}

const initialWorks: Work[] = [
    { id: '1', title: 'Installation sanitaire', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80', views: 42, postedAgo: 'Il y a 3 jours' },
    { id: '2', title: 'Rénovation salle de bain', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&auto=format&fit=crop&q=80', views: 68, postedAgo: 'Il y a 1 semaine' },
];

export const WorksTab: React.FC = () => {
    const [works, setWorks] = useState<Work[]>(initialWorks);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const removeWork = (id: string) => setWorks((prev) => prev.filter((w) => w.id !== id));

    const handlePublish = () => {
        if (!title.trim() || !imageUrl.trim()) return;
        setWorks((prev) => [{ id: Date.now().toString(), title, image: imageUrl, views: 0, postedAgo: "À l'instant" }, ...prev]);
        setTitle('');
        setImageUrl('');
    };

    return (
        <div className="space-y-5">
            <div className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border dark:border-white/10">
                    <Camera className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                    <h3 className="text-sm font-bold text-text dark:text-white">Ajouter une photo de vos travaux</h3>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/45 mb-1.5 block">
                            Titre du projet <span className="text-amber-500">*</span>
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Installation dressing / Rénovation sanitaires"
                            className="w-full bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/45 mb-1.5 block">Lien de la photo</label>
                        <input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition"
                        />
                    </div>

                    <button
                        onClick={handlePublish}
                        className="w-full bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm py-3 rounded-xl transition flex items-center justify-center gap-2"
                    >
                        <PlusCircle className="w-4 h-4" /> Publier la réalisation
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-text dark:text-white mb-3">
                    Mes réalisations publiées ({works.length})
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {works.map((work) => (
                        <div key={work.id} className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl overflow-hidden">
                            <div className="relative">
                                <img src={work.image} alt={work.title} className="w-full h-28 object-cover" />
                                <span className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                    <Eye className="w-3 h-3" /> {work.views} vues
                                </span>
                            </div>
                            <div className="p-2.5 flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-text dark:text-white truncate">{work.title}</p>
                                    <p className="text-[10px] text-text-secondary dark:text-white/45">{work.postedAgo}</p>
                                </div>
                                <button onClick={() => removeWork(work.id)} className="text-text-secondary dark:text-white/40 hover:text-red-500 shrink-0" aria-label="Supprimer">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};