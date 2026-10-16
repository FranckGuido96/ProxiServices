import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

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

export const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  options,
  value,
  onChange,
  required = false,
  error = false,
}) => {
  const id = useId();
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;
  const borderClass = error
    ? 'border-red-500 dark:border-red-500/70'
    : 'border-border dark:border-white/10 focus:border-primary-500 dark:focus:border-emerald-500/80';

  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold text-text-secondary dark:text-white/60 mb-1.5 block">
        {label}{' '}
        {required && (
          <span className="text-secondary-600 dark:text-amber-400" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {type === 'select' ? (
        <div className="relative">
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-required={required}
            aria-invalid={error}
            aria-describedby={describedBy}
            className={`w-full appearance-none bg-background dark:bg-[#09090B] border rounded-xl px-3 py-2.5 text-sm text-text dark:text-white focus:outline-none transition ${borderClass}`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-text-secondary dark:text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={error}
          aria-describedby={describedBy}
          className={`w-full bg-background dark:bg-[#09090B] border rounded-xl px-3 py-2.5 text-sm text-text dark:text-white placeholder:text-text-secondary/60 dark:placeholder:text-white/30 focus:outline-none transition ${borderClass}`}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="text-[11px] text-red-500 mt-1">
          Ce champ est obligatoire
        </p>
      )}
    </div>
  );
};