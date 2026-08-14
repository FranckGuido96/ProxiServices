import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UserPlus } from 'lucide-react';
import { StepProgress } from '../components/register/StepProgress';
import { FormSection } from '../components/register/FormSection';
import { FormField } from '../components/register/FormField';

export default function BecomeProviderStep1() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleContinue = () => {
        const newErrors: Record<string, boolean> = {
            fullName: !fullName.trim(),
            phone: !phone.trim(),
            password: !password.trim(),
            confirmPassword: !confirmPassword.trim(),
        };
        const mismatch = !!password && !!confirmPassword && password !== confirmPassword;

        setErrors(newErrors);
        setPasswordMismatch(mismatch);

        const hasEmptyField = Object.values(newErrors).some(Boolean);
        if (hasEmptyField || mismatch) return;

        navigate('/devenir-prestataire/activite');
    };

    return (
        <div className="min-h-screen bg-background dark:bg-[#050505] pb-8">
            <div className="flex items-center gap-3 px-4 pt-5 pb-2 border-b border-border dark:border-white/10">
                <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 text-text dark:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-lg font-serif italic font-bold text-primary-700 dark:text-emerald-400">ProxiServices</span>
            </div>

            <StepProgress currentStep={1} />

            <div className="px-4">
                <div className="flex items-start gap-3 mb-5">
                    <div className="w-11 h-11 rounded-full bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 flex items-center justify-center shrink-0">
                        <UserPlus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-serif italic text-text dark:text-white leading-tight">
                            Devenir <span className="not-italic font-bold text-amber-600 dark:text-amber-400">prestataire</span>
                        </h1>
                        <p className="text-xs text-text-secondary dark:text-white/60 mt-0.5">
                            Remplissez vos informations pour commencer à proposer vos services.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <FormSection title="Informations Personnelles">
                        <FormField label="Nom complet" placeholder="Ex: Jean Dupont" value={fullName} onChange={setFullName} required error={errors.fullName} />
                        <FormField label="Numéro de téléphone" placeholder="+225 00 00 00 00" type="tel" value={phone} onChange={setPhone} required error={errors.phone} />
                        <FormField label="Mot de passe" placeholder="••••••••" type="password" value={password} onChange={setPassword} required error={errors.password} />
                        <div>
                            <FormField label="Confirmation du mot de passe" placeholder="••••••••" type="password" value={confirmPassword} onChange={setConfirmPassword} required error={errors.confirmPassword} />
                            {passwordMismatch && <p className="text-[11px] text-red-500 mt-1">Les mots de passe ne correspondent pas</p>}
                        </div>
                    </FormSection>
                </div>

                <button
                    onClick={handleContinue}
                    className="w-full mt-6 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                    Continuer <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-xs text-text-secondary dark:text-white/40 mt-3">Étape 1 sur 3</p>
            </div>
        </div>
    );
}