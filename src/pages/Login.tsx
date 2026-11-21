import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, LogIn, Mail, Phone, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { FormField } from '../components/register/FormField';
import { isValidPhone } from '../utils/validation';

type Role = 'client' | 'prestataire' | 'admin';
type FieldName = 'phone' | 'identifier' | 'password';
type FieldErrors = Partial<Record<FieldName, string>>;

const ROLES: { id: Role; label: string }[] = [
  { id: 'client', label: 'Client' },
  { id: 'prestataire', label: 'Prestataire' },
  { id: 'admin', label: 'Admin' },
];

const SUBMIT_NOTICES: Record<Role, string> = {
  client: "Les comptes ne sont pas encore activés : vos informations n'ont pas été envoyées.",
  prestataire: "Les comptes ne sont pas encore activés : vos informations n'ont pas été envoyées.",
  admin: "L'accès au backoffice n'est pas encore activé.",
};

const GOOGLE_NOTICE = "La connexion avec Google n'est pas encore activée.";

export default function Login() {
  const [role, setRole] = useState<Role>('client');
  const [phone, setPhone] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<string | null>(null);

  const isAdmin = role === 'admin';

  const clearError = (field: FieldName) => setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleRoleChange = (next: Role) => {
    setRole(next);
    // Le mot de passe saisi ne doit pas suivre d'un onglet à l'autre
    setPassword('');
    setErrors({});
    setNotice(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: FieldErrors = {};
    if (isAdmin) {
      if (!identifier.trim()) nextErrors.identifier = 'Entrez votre identifiant';
    } else if (!phone.trim()) {
      nextErrors.phone = 'Entrez votre numéro de téléphone';
    } else if (!isValidPhone(phone)) {
      nextErrors.phone = 'Numéro invalide : 10 chiffres, par exemple 07 01 23 45 67';
    }
    if (!password) nextErrors.password = 'Entrez votre mot de passe';

    setErrors(nextErrors);
    setNotice(null);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO Supabase :
    // - client et prestataire : connexion par téléphone et mot de passe
    // - admin : connexion par identifiant et mot de passe, puis double authentification obligatoire
    setNotice(SUBMIT_NOTICES[role]);
  };

  const handleGoogle = () => {
    // TODO Supabase : connexion avec Google (réservée aux clients et aux prestataires, jamais à l'admin).
    // Un prestataire connecté avec Google doit quand même renseigner et faire vérifier son numéro.
    setErrors({});
    setNotice(GOOGLE_NOTICE);
  };

  return (
    <AuthLayout
      title="Bon retour"
      highlight="parmi nous !"
      subtitle="Connectez-vous pour accéder à votre espace personnel."
      icon={<LogIn className="w-5 h-5" />}
    >
      {/* Choix du type de compte : vrais boutons radio, les flèches du clavier fonctionnent sans code en plus */}
      <fieldset className="mb-4">
        <legend className="sr-only">Type de compte</legend>
        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-surface dark:bg-[#121215] border border-border dark:border-white/10 shadow-sm dark:shadow-lg">
          {ROLES.map(({ id, label }) => (
            <label key={id} className="relative block">
              <input
                type="radio"
                name="login-role"
                value={id}
                checked={role === id}
                onChange={() => handleRoleChange(id)}
                className="peer sr-only"
              />
              <span className="block text-center py-2.5 rounded-xl text-xs font-bold cursor-pointer transition text-text-secondary dark:text-white/60 hover:text-text dark:hover:text-white peer-checked:bg-primary-700 peer-checked:text-white peer-checked:shadow-md dark:peer-checked:bg-emerald-500 dark:peer-checked:text-slate-950 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-emerald-400">
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl p-4 shadow-sm dark:shadow-xl space-y-4">
          {isAdmin ? (
            <FormField
              label="Identifiant admin / téléphone"
              placeholder="Identifiant ou numéro de téléphone"
              autoComplete="username"
              leadingIcon={<ShieldCheck className="w-4 h-4" />}
              value={identifier}
              onChange={(value) => {
                setIdentifier(value);
                clearError('identifier');
              }}
              required
              error={errors.identifier}
            />
          ) : (
            <FormField
              label="Numéro de téléphone"
              placeholder="07 01 23 45 67"
              type="tel"
              autoComplete="tel"
              leadingIcon={<Phone className="w-4 h-4" />}
              value={phone}
              onChange={(value) => {
                setPhone(value);
                clearError('phone');
              }}
              required
              error={errors.phone}
            />
          )}

          <FormField
            label="Mot de passe"
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
            leadingIcon={<Lock className="w-4 h-4" />}
            value={password}
            onChange={(value) => {
              setPassword(value);
              clearError('password');
            }}
            required
            error={errors.password}
          />

          <button
            type="submit"
            className="w-full bg-primary-700 hover:bg-primary-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
          >
            {isAdmin ? 'Accéder au backoffice' : 'Se connecter'}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Google : réservé aux clients et aux prestataires */}
          {!isAdmin && (
            <>
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-border dark:bg-white/10" />
                <span className="text-[11px] text-text-secondary dark:text-white/40">ou</span>
                <span className="h-px flex-1 bg-border dark:bg-white/10" />
              </div>
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full border border-border dark:border-white/10 bg-background dark:bg-[#09090B] text-text dark:text-white font-semibold text-sm py-3 rounded-xl hover:border-primary-300 dark:hover:border-white/25 transition flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-emerald-400"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Continuer avec Google
              </button>
            </>
          )}

          {/* Zone annoncée aux lecteurs d'écran : toujours présente, le message s'y ajoute */}
          <div role="status">
            {notice && (
              <p className="bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs rounded-xl p-3 leading-relaxed">
                {notice}
              </p>
            )}
          </div>

          {isAdmin ? (
            <p className="text-center text-xs text-text-secondary dark:text-white/50">
              Accès réservé à l'équipe ProxiServices.
            </p>
          ) : (
            <p className="text-center text-xs text-text-secondary dark:text-white/50">
              Vous n'avez pas de compte ?{' '}
              <Link
                to={role === 'client' ? '/inscription' : '/devenir-prestataire'}
                className="font-semibold text-primary-700 dark:text-emerald-400 underline-offset-2 hover:underline"
              >
                Inscrivez-vous
              </Link>
            </p>
          )}
        </div>
      </form>

      {!isAdmin && (
        <p className="text-center text-[11px] text-text-secondary dark:text-white/40 mt-4 leading-relaxed">
          Pas besoin de compte pour chercher et contacter un prestataire.{' '}
          <Link to="/" className="font-semibold text-primary-700 dark:text-emerald-400 underline-offset-2 hover:underline">
            Continuer sans compte
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}