import React, { useState } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';

interface FormFieldProps {
    label: string;
    placeholder: string;
    type?: 'text' | 'tel' | 'password' | 'select';
    options?: string[];
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    error?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ label, placeholder, type = 'text', options, value, onChange, required = false, error = false }) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <div>
            <label className="text-xs font-semibold text-text-secondary dark:text-white/60 mb-1.5 block">
                {label} {required && <span className="text-secondary-600 dark:text-amber-400">*</span>}
            </label>
            {type === 'select' ? (
                <div className="relative">
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className={`w-full appearance-none bg-background dark:bg-[#09090B] border rounded-xl px-3 py-2.5 text-sm text-text dark:text-white focus:outline-none transition ${error ? 'border-red-500 dark:border-red-500/70' : 'border-border dark:border-white/10 focus:border-primary-500 dark:focus:border-emerald-500/80'
                            }`}
                    >
                        <option value="" disabled>{placeholder}</option>
                        {options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-text-secondary dark:text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            ) : (
                <div className="relative">
                    <input
                        type={inputType}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className={`w-full bg-background dark:bg-[#09090B] border rounded-xl px-3 py-2.5 text-sm text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none transition ${type === 'password' ? 'pr-10' : ''} ${error ? 'border-red-500 dark:border-red-500/70' : 'border-border dark:border-white/10 focus:border-primary-500 dark:focus:border-emerald-500/80'
                            }`}
                    />
                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-white/40 hover:text-text dark:hover:text-white focus:outline-none p-1 rounded-md transition"
                            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </div>
            )}
            {error && <p className="text-[11px] text-red-500 mt-1">Ce champ est obligatoire</p>}
        </div>
    );
};