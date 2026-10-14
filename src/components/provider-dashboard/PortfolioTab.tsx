import React, { useState, useRef } from 'react';
import { Camera, Check, PlusCircle, Eye, Trash2, Upload } from 'lucide-react';

interface PortfolioItem {
    id: string;
    title: string;
    imageUrl: string;
    date: string;
    viewsCount: number;
}

interface DeleteConfirmState {
    visible: boolean;
    targetId: string | null;
}

export const PortfolioTab: React.FC = () => {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
        { id: '1', title: 'Installation sanitaire villa Riviera', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80', date: 'Il y a 3 jours', viewsCount: 42 },
        { id: '2', title: 'Rénovation tuyauterie cuisine Cocody', imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&auto=format&fit=crop&q=80', date: 'Il y a 1 semaine', viewsCount: 68 },
    ]);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [newProjectImagePreview, setNewProjectImagePreview] = useState<string | null>(null);
    const [newProjectImageFile, setNewProjectImageFile] = useState<File | null>(null);
    const [publishSuccess, setPublishSuccess] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState>({ visible: false, targetId: null });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setNewProjectImageFile(file);
        const objectUrl = URL.createObjectURL(file);
        setNewProjectImagePreview(objectUrl);
    };

    const handlePublishProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProjectTitle.trim() || !newProjectImagePreview) return;
        setPortfolio([{
            id: Date.now().toString(),
            title: newProjectTitle,
            imageUrl: newProjectImagePreview,
            date: 'À l\'instant',
            viewsCount: 1,
        }, ...portfolio]);
        setNewProjectTitle('');
        setNewProjectImagePreview(null);
        setNewProjectImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setPublishSuccess(true);
        setTimeout(() => setPublishSuccess(false), 3000);
    };

    const requestDelete = (id: string) => {
        setDeleteConfirm({ visible: true, targetId: id });
    };

    const confirmDelete = () => {
        if (deleteConfirm.targetId) {
            setPortfolio(portfolio.filter((p) => p.id !== deleteConfirm.targetId));
        }
        setDeleteConfirm({ visible: false, targetId: null });
    };

    const cancelDelete = () => {
        setDeleteConfirm({ visible: false, targetId: null });
    };

    return (
        <div className="px-4 space-y-4">
            <form onSubmit={handlePublishProject} className="bg-surface dark:bg-[#121215] rounded-2xl p-4 border border-border dark:border-white/10 shadow-sm dark:shadow-xl space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-border dark:border-white/5">
                    <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <Camera className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                        <span>Ajouter une photo de vos travaux</span>
                    </h3>
                    {publishSuccess && (
                        <span className="text-[11px] text-primary-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Publié !
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1">Titre du projet *</label>
                    <input type="text" required value={newProjectTitle} onChange={(e) => setNewProjectTitle(e.target.value)}
                        placeholder="ex: Installation dressing / Rénovation sanitaires"
                        className="w-full text-xs p-3 border border-border dark:border-white/10 rounded-xl bg-background dark:bg-[#09090B] text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-emerald-500/30" />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-text-secondary dark:text-white/50 uppercase tracking-widest mb-1.5">Photo du chantier *</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full rounded-xl border-2 border-dashed border-border dark:border-white/10 hover:border-primary-400 dark:hover:border-emerald-500/50 transition overflow-hidden bg-background dark:bg-[#09090B]"
                    >
                        {newProjectImagePreview ? (
                            <div className="relative w-full h-36">
                                <img src={newProjectImagePreview} alt="Aperçu" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                                    <span className="text-white text-xs font-bold flex items-center gap-1.5">
                                        <Upload className="w-4 h-4" /> Changer la photo
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-28 flex flex-col items-center justify-center gap-2 text-text-secondary dark:text-white/40">
                                <Upload className="w-6 h-6" />
                                <span className="text-xs font-semibold">Choisir une photo</span>
                                <span className="text-[10px]">JPG, PNG, HEIC…</span>
                            </div>
                        )}
                    </button>
                    {newProjectImageFile && (
                        <p className="text-[10px] text-text-secondary dark:text-white/40 mt-1 truncate">
                            {newProjectImageFile.name}
                        </p>
                    )}
                </div>

                <button type="submit"
                    className="w-full py-3 bg-primary-700 hover:bg-primary-800 dark:bg-[#137547] dark:hover:bg-[#10633c] text-white font-bold text-xs tracking-wider uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-2">
                    <PlusCircle className="w-4 h-4" /><span>Publier la réalisation</span>
                </button>
            </form>

            <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-text dark:text-white uppercase tracking-wider">
                    Mes Réalisations publiées ({portfolio.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {portfolio.map((item) => (
                        <div key={item.id} className="bg-surface dark:bg-[#121215] rounded-2xl border border-border dark:border-white/10 overflow-hidden shadow-sm dark:shadow-xl flex flex-col justify-between">
                            <div className="relative h-36 bg-black/5 dark:bg-black/40 overflow-hidden">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white/90 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
                                    <Eye className="w-3 h-3 text-emerald-400" /><span>{item.viewsCount} vues</span>
                                </div>
                            </div>
                            <div className="p-3 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs font-bold text-text dark:text-white line-clamp-1">{item.title}</h4>
                                    <span className="text-[10px] text-text-secondary dark:text-white/40">{item.date}</span>
                                </div>
                                <button type="button" onClick={() => requestDelete(item.id)} className="p-1.5 text-text-secondary dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 transition" title="Supprimer">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {deleteConfirm.visible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={cancelDelete} />
                    <div className="relative bg-surface dark:bg-[#1A1A1E] border border-border dark:border-white/10 rounded-2xl p-5 shadow-2xl w-full max-w-xs z-10">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 mx-auto mb-3">
                            <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400" />
                        </div>
                        <h4 className="text-sm font-bold text-text dark:text-white text-center mb-1">Supprimer la réalisation ?</h4>
                        <p className="text-xs text-text-secondary dark:text-white/50 text-center mb-5">
                            Cette action est irréversible. La photo sera définitivement retirée de votre portfolio.
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={cancelDelete}
                                className="flex-1 py-2.5 rounded-xl border border-border dark:border-white/10 bg-background dark:bg-white/5 text-xs font-bold text-text dark:text-white hover:bg-border dark:hover:bg-white/10 transition"
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-xs font-bold text-white transition"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};