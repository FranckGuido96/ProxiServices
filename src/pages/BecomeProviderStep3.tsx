import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, IdCard, FileText, Upload, UserPlus, CheckCircle2 } from 'lucide-react';
import { StepProgress } from '../components/register/StepProgress';
import { FormSection } from '../components/register/FormSection';

export default function BecomeProviderStep3() {
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [idDocument, setIdDocument] = useState<File | null>(null);
    const [addressProof, setAddressProof] = useState<File | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        // TODO: envoyer le dossier complet à Supabase (statut "En attente de validation")
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-background dark:bg-[#050505] flex flex-col items-center justify-center px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-emerald-950 border border-primary-200 dark:border-emerald-500/30 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary-700 dark:text-emerald-400" />
                </div>
                <h1 className="text-lg font-serif italic font-bold text-text dark:text-white mb-2">
                    Inscription envoyée !
                </h1>
                <p className="text-sm text-text-secondary dark:text-white/60 max-w-xs">
                    Votre dossier est en cours de vérification par notre équipe. Vous serez notifié dès que votre profil sera validé.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition"
                >
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background dark:bg-[#050505] pb-8">
            <div className="flex items-center gap-3 px-4 pt-5 pb-2 border-b border-border dark:border-white/10">
                <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 text-text dark:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-lg font-serif italic font-bold text-primary-700 dark:text-emerald-400">ProxiServices</span>
            </div>

            <StepProgress currentStep={3} />

            <div className="px-4">
                <div className="flex items-start gap-3 mb-5">
                    <div className="w-11 h-11 rounded-full bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 flex items-center justify-center shrink-0">
                        <UserPlus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-serif italic text-text dark:text-white leading-tight">
                            Dernière <span className="not-italic font-bold text-amber-600 dark:text-amber-400">étape</span>
                        </h1>
                        <p className="text-xs text-text-secondary dark:text-white/60 mt-0.5">
                            Ajoutez une photo et vos documents pour renforcer la confiance des clients.
                        </p>
                    </div>
                </div>

                <FormSection title="Documents">
                    {/* Photo de profil */}
                    <div className="flex flex-col items-center gap-2 py-2">
                        <label className="w-20 h-20 rounded-full border-2 border-dashed border-primary-300 dark:border-emerald-500/40 flex items-center justify-center cursor-pointer hover:border-primary-500 dark:hover:border-emerald-400 transition bg-background dark:bg-[#09090B]">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => setProfilePhoto(e.target.files?.[0] ?? null)} />
                            <Camera className="w-6 h-6 text-primary-600 dark:text-emerald-400" />
                        </label>
                        <span className="text-xs font-semibold text-primary-700 dark:text-emerald-400">
                            {profilePhoto ? profilePhoto.name : 'Photo de profil'}
                        </span>
                    </div>

                    {/* Pièce d'identité */}
                    <label className="flex items-center gap-3 p-3.5 rounded-xl border border-border dark:border-white/10 bg-background dark:bg-[#09090B] cursor-pointer hover:border-primary-300 dark:hover:border-white/25 transition">
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setIdDocument(e.target.files?.[0] ?? null)} />
                        <IdCard className="w-5 h-5 text-primary-700 dark:text-emerald-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-text dark:text-white">Pièce d'identité (CNI/Passeport)</p>
                            <p className="text-[11px] text-text-secondary dark:text-white/50 truncate">
                                {idDocument ? idDocument.name : 'Format PDF, JPG ou PNG'}
                            </p>
                        </div>
                        <Upload className="w-4 h-4 text-text-secondary dark:text-white/40 shrink-0" />
                    </label>

                    {/* Justificatif de domicile */}
                    <label className="flex items-center gap-3 p-3.5 rounded-xl border border-border dark:border-white/10 bg-background dark:bg-[#09090B] cursor-pointer hover:border-primary-300 dark:hover:border-white/25 transition">
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setAddressProof(e.target.files?.[0] ?? null)} />
                        <FileText className="w-5 h-5 text-primary-700 dark:text-emerald-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-text dark:text-white">Justificatif de domicile</p>
                            <p className="text-[11px] text-text-secondary dark:text-white/50 truncate">
                                {addressProof ? addressProof.name : 'Facture CIE/SODECI, moins de 3 mois'}
                            </p>
                        </div>
                        <Upload className="w-4 h-4 text-text-secondary dark:text-white/40 shrink-0" />
                    </label>
                </FormSection>

                {/* Conditions générales */}
                <label className="flex items-start gap-2.5 mt-4 px-1 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-border dark:border-white/20 text-primary-700 dark:text-emerald-500 focus:ring-primary-500 dark:focus:ring-emerald-500 shrink-0"
                    />
                    <span className="text-xs text-text-secondary dark:text-white/60 leading-snug">
                        J'accepte les conditions générales d'utilisation de ProxiServices et je certifie l'exactitude des documents fournis.
                    </span>
                </label>

                <button
                    onClick={handleSubmit}
                    disabled={!acceptedTerms}
                    className="w-full mt-6 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl transition"
                >
                    Valider mon inscription
                </button>
                {!acceptedTerms && (
                    <p className="text-center text-[11px] text-amber-600 dark:text-amber-400 mt-2">
                        Veuillez accepter les conditions générales pour continuer
                    </p>
                )}

                <p className="text-center text-xs text-text-secondary dark:text-white/40 mt-3">Étape 3 sur 3</p>
            </div>
        </div>
    );
}