import React from 'react';
import { Phone } from 'lucide-react';

interface CallEntry {
    id: string;
    number: string;
    date: string;
    time: string;
}

const calls: CallEntry[] = [
    { id: '1', number: '07 01 23 45 67', date: 'Aujourd\'hui', time: '14:32' },
    { id: '2', number: '05 44 56 78 90', date: 'Aujourd\'hui', time: '09:15' },
    { id: '3', number: '01 22 33 44 55', date: 'Hier', time: '18:47' },
    { id: '4', number: '07 88 99 00 11', date: 'Hier', time: '11:20' },
    { id: '5', number: '05 12 34 56 78', date: 'Il y a 2 jours', time: '16:05' },
];

export const CallsListModal: React.FC = () => {
    return (
        <div>
            <p className="text-xs text-text-secondary dark:text-white/50 mb-4">
                Numéros ayant cliqué sur "Appeler" depuis votre profil.
            </p>
            <div className="space-y-2">
                {calls.map((call) => (
                    <div key={call.id} className="flex items-center gap-3 p-3 rounded-xl bg-background dark:bg-[#09090B] border border-border dark:border-white/5">
                        <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0">
                            <Phone className="w-3.5 h-3.5 text-primary-700 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-text dark:text-white">{call.number}</p>
                            <p className="text-[10px] text-text-secondary dark:text-white/40">{call.date} à {call.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};