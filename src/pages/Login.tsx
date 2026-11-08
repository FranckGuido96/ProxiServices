import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { FormSection } from '../components/register/FormSection';
import { FormField } from '../components/register/FormField';
import { isValidPhone } from '../utils/validation';

type FieldName = 'phone' | 'password';
type FieldErrors = Partial<Record<FieldName, string>>;

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showNotice, setShowNotice] = useState(false);

  const clearError = (field: FieldName) => setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: FieldErrors = {};
    if (!phone.trim()) nextErrors.phone = 'Entrez votre numéro de téléphone';
    else if (!isValidPhone(phone)) nextErrors.phone = 'Numéro invalide : 10 chiffres, par exemple 07 01 23 45 67';
    if (!password) nextErrors.password = 'Entrez votre mot de passe';

    setErrors(nextErrors);
    setShowNotice(false);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO Supabase : connexion par téléphone et mot de passe (signInWithPassword)
    setShowNotice(true);
  };

  return (
    <AuthLayout
      title="Bon"
      highlight="retour"
      subtitle="Connectez-vous pour retrouver vos favoris et laisser des avis."
      icon={<LogIn className="w-5 h-5" />}
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormSection title="Vos identifiants">
          <FormField
            label="Numéro de téléphone"
            placeholder="07 01 23 45 67"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(value) => {
              setPhone(value);
              clearError('phone');
            }}
            required
            error={errors.phone}
          />
          <FormField
            label="Mot de passe"
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              clearError('password');
            }}
            required
            error={errors.password}
          />
        </FormSection>

        <button
          type="submit"
          className="w-full mt-6 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm py-3.5 rounded-xl transition outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
        >
          Se connecter
        </button>

        {showNotice && (
          <p
            role="status"
            className="mt-3 bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs rounded-xl p-3 leading-relaxed"
          >
            Les comptes ne sont pas encore activés : vos informations n'ont pas été envoyées.
          </p>
        )}
      </form>

      <p className="text-center text-xs text-text-secondary dark:text-white/50 mt-5">
        Pas encore de compte ?{' '}
        <Link
          to="/inscription"
          className="font-semibold text-primary-700 dark:text-emerald-400 underline-offset-2 hover:underline"
        >
          Créer un compte
        </Link>
      </p>
      <p className="text-center text-[11px] text-text-secondary dark:text-white/40 mt-3 leading-relaxed">
        Pas besoin de compte pour chercher et contacter un prestataire.{' '}
        <Link to="/" className="font-semibold text-primary-700 dark:text-emerald-400 underline-offset-2 hover:underline">
          Continuer sans compte
        </Link>
      </p>
    </AuthLayout>
  );
}