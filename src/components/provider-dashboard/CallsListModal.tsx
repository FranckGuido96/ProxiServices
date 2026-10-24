import React from 'react';
import { Phone } from 'lucide-react';
import { DashboardCall } from '../../data/dashboardDemo';

interface CallsListModalProps {
  calls: DashboardCall[];
}

// TODO Supabase : ces numéros sont des données personnelles. Ne les afficher qu'au prestataire concerné
// (règle de sécurité côté base) et envisager d'en masquer une partie (ex. 07 ** ** 45 67).
export const CallsListModal: React.FC<CallsListModalProps> = ({ calls }) => {
  return (
    <div>
      <p className="text-xs text-text-secondary dark:text-white/50 mb-4">
        Numéros ayant cliqué sur "Appeler" depuis votre profil.
      </p>
      {calls.length === 0 ? (
        <p className="text-xs text-text-secondary dark:text-white/50 text-center py-4">Aucun appel pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {calls.map((call) => (
            <li
              key={call.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-background dark:bg-[#09090B] border border-border dark:border-white/5"
            >
              <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-primary-700 dark:text-emerald-400" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-text dark:text-white">{call.number}</p>
                <p className="text-[10px] text-text-secondary dark:text-white/40">
                  {call.date} à {call.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};