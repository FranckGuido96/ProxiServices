import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { FormSection } from '../components/register/FormSection';
import { FormField } from '../components/register/FormField';
import { MIN_PASSWORD_LENGTH, isValidEmail, isValidPhone } from '../utils/validation';

type FieldName = 'name' | 'phone' | 'email' | 'password' | 'confirmPassword';
type FieldErrors = Partial<Record<FieldName, string>>;

export default function RegisterClient() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showNotice, setShowNotice] = useState(false);

  const clearError = (field: FieldName) => setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: FieldErrors = {};
    if (name.trim().length < 2) nextErrors.name = 'Entrez votre nom';
    if (!phone.trim()) nextErrors.phone = 'Entrez votre numéro de téléphone';
    else if (!isValidPhone(phone)) nextErrors.phone = 'Numéro invalide : 10 chiffres, par exemple 07 01 23 45 67';
    if (email.trim() && !isValidEmail(email)) nextErrors.email = 'Adresse e-mail invalide';
    if (!password) nextErrors.password = 'Choisissez un mot de passe';
    else if (password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = `${MIN_PASSWORD_LENGTH} caractères minimum`;
    }
    if (!confirmPassword) nextErrors.confirmPassword = 'Confirmez votre mot de passe';
    else if (password && confirmPassword !== password) nextErrors.confirmPassword = 'Les mots de passe ne correspondent pas';

    setErrors(nextErrors);
    setShowNotice(false);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO Supabase : création du compte client (téléphone = identifiant), puis confirmation par code SMS
    setShowNotice(true);
  };

  return (
    <AuthLayout
      title="Créer un"
      highlight="compte"
      subtitle="Gratuit : enregistrez vos favoris, laissez des avis et signalez un profil."
      icon={<User className="w-5 h-5" />}
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormSection title="Vos informations">
          <FormField
            label="Nom"
            placeholder="Ex: Awa Diallo"
            autoComplete="name"
            value={name}
            onChange={(value) => {
              setName(value);
              clearError('name');
            }}
            required
            error={errors.name}
          />
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
            label="E-mail (facultatif)"
            placeholder="Ex: awa@exemple.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              clearError('email');
            }}
            error={errors.email}
          />
        </FormSection>

        <div className="mt-4">
          <FormSection title="Mot de passe">
            <FormField
              label="Mot de passe"
              placeholder={`${MIN_PASSWORD_LENGTH} caractères minimum`}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(value) => {
                setPassword(value);
                clearError('password');
              }}
              required
              error={errors.password}
            />
            <FormField
              label="Confirmation du mot de passe"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(value) => {
                setConfirmPassword(value);
                clearError('confirmPassword');
              }}
              required
              error={errors.confirmPassword}
            />
          </FormSection>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm py-3.5 rounded-xl transition outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
        >
          Créer mon compte
        </button>

        {showNotice && (
          <p
            role="status"
            className="mt-3 bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs rounded-xl p-3 leading-relaxed"
          >
            Les comptes ne sont pas encore activés : vos informations n'ont pas été envoyées.
          </p>
        )}

        <p className="text-center text-[11px] text-text-secondary dark:text-white/40 mt-3 leading-relaxed">
          Gratuit, aucune carte requise. En créant un compte, vous acceptez les conditions générales d'utilisation.
        </p>
      </form>

      <p className="text-center text-xs text-text-secondary dark:text-white/50 mt-5">
        Déjà un compte ?{' '}
        <Link
          to="/connexion"
          className="font-semibold text-primary-700 dark:text-emerald-400 underline-offset-2 hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </AuthLayout>
  );
}