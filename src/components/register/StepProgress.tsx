import React from 'react';
import { Check } from 'lucide-react';

interface StepProgressProps {
  currentStep: 1 | 2 | 3;
}

// Intitulés alignés sur le contenu des pages : identité, activité + adresse, documents
const steps = [
  { number: 1, label: 'Profil' },
  { number: 2, label: 'Activité' },
  { number: 3, label: 'Documents' },
];

export const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progression de l'inscription" className="flex items-center justify-center gap-6 px-6 py-5">
      {steps.map((step, i) => {
        const isDone = step.number < currentStep;
        const isActive = step.number === currentStep;
        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center gap-1.5" aria-current={isActive ? 'step' : undefined}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  isDone
                    ? 'bg-primary-700 dark:bg-emerald-500 border-primary-700 dark:border-emerald-500 text-white'
                    : isActive
                    ? 'border-primary-700 dark:border-emerald-400 text-primary-700 dark:text-emerald-400'
                    : 'border-border dark:border-white/15 text-text-muted dark:text-white/30'
                }`}
              >
                {isDone ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="sr-only">Étape {step.number} terminée</span>
                  </>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wide ${
                  isActive ? 'text-primary-700 dark:text-emerald-400' : 'text-text-muted dark:text-white/30'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                aria-hidden="true"
                className={`h-px w-8 mt-[-14px] ${isDone ? 'bg-primary-700 dark:bg-emerald-500' : 'bg-border dark:bg-white/15'}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};