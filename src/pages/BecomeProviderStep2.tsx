import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UserPlus } from 'lucide-react';
import { StepProgress } from '../components/register/StepProgress';
import { FormSection } from '../components/register/FormSection';
import { FormField } from '../components/register/FormField';
import { categories } from '../data/categories';

export default function BecomeProviderStep2() {
    const navigate = useNavigate();
    const [trade, setTrade] = useState('');
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState('');
    const [ville, setVille] = useState('');
    const [commune, setCommune] = useState('');
    const [quartier, setQuartier] = useState('');

    const handleContinue = () => {
        // TODO: valider les champs, puis naviguer vers l'étape 3 (Portfolio)
        navigate('/devenir-prestataire/portfolio');
    };

    return (
        <div className="min-h-screen bg-background dark:bg-[#050505] pb-8">
            <div className="flex items-center gap-3 px-4 pt-5 pb-2 border-b border-border dark:border-white/10">
                <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 text-text dark:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-lg font-serif italic font-bold text-primary-700 dark:text-emerald-400">ProxiServices</span>
            </div>

            <StepProgress currentStep={2} />

            <div className="px-4">
                <div className="flex items-start gap-3 mb-5">
                    <div className="w-11 h-11 rounded-full bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 flex items-center justify-center shrink-0">
                        <UserPlus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-serif italic text-text dark:text-white leading-tight">
                            Votre <span className="not-italic font-bold text-amber-600 dark:text-amber-400">activité</span>
                        </h1>
                        <p className="text-xs text-text-secondary dark:text-white/60 mt-0.5">
                            Décrivez votre métier et votre zone d'intervention
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <FormSection title="Votre activité">
                        <FormField
                            label="Catégorie de service"
                            placeholder="Sélectionnez un métier"
                            type="select"
                            options={categories.map((c) => c.title)}
                            value={trade}
                            onChange={setTrade}
                        />
                        <div>
                            <label className="text-xs font-semibold text-text-secondary dark:text-white/60 mb-1.5 block">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Décrivez vos compétences et expériences..."
                                rows={4}
                                className="w-full bg-background dark:bg-[#09090B] border border-border dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none focus:border-primary-500 dark:focus:border-emerald-500/80 transition resize-none"
                            />
                        </div>
                        <FormField label="Années d'expérience" placeholder="Ex: 5" value={experience} onChange={setExperience} />
                    </FormSection>

                    <FormSection title="Adresse">
                        <FormField label="Ville" placeholder="Ex: Abidjan" value={ville} onChange={setVille} />
                        <FormField label="Commune" placeholder="Ex: Cocody" value={commune} onChange={setCommune} />
                        <FormField label="Quartier" placeholder="Ex: Angré" value={quartier} onChange={setQuartier} />
                    </FormSection>
                </div>

                <button
                    onClick={handleContinue}
                    className="w-full mt-6 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                    Continuer <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-xs text-text-secondary dark:text-white/40 mt-3">Étape 2 sur 3</p>
            </div>
        </div>
    );
}