import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const monthlyViews = [
    { month: 'Jan', vues: 62 }, { month: 'Fév', vues: 78 }, { month: 'Mar', vues: 55 },
    { month: 'Avr', vues: 90 }, { month: 'Mai', vues: 104 }, { month: 'Juin', vues: 88 },
    { month: 'Juil', vues: 120 }, { month: 'Août', vues: 98 }, { month: 'Sep', vues: 134 },
    { month: 'Oct', vues: 110 }, { month: 'Nov', vues: 126 }, { month: 'Déc', vues: 142 },
];

export const ViewsChartModal: React.FC = () => {
    return (
        <div>
            <p className="text-xs text-text-secondary dark:text-white/50 mb-4">
                Évolution du nombre de vues de votre profil, mois par mois.
            </p>
            <div className="h-56 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyViews}>
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="currentColor" className="text-text-secondary dark:text-white/40" axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10 }} stroke="currentColor" className="text-text-secondary dark:text-white/40" axisLine={false} tickLine={false} width={28} />
                        <Tooltip
                            contentStyle={{ background: '#121215', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                            labelStyle={{ color: '#fff' }}
                            cursor={{ fill: 'rgba(52, 211, 153, 0.08)' }}
                        />
                        <Bar dataKey="vues" fill="#2FA866" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-3 pt-3 border-t border-border dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-text-secondary dark:text-white/50">Total sur l'année</span>
                <span className="font-bold text-text dark:text-white">
                    {monthlyViews.reduce((sum, m) => sum + m.vues, 0)} vues
                </span>
            </div>
        </div>
    );
};