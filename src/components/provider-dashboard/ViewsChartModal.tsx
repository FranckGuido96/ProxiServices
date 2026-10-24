import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { MonthlyViews } from '../../data/dashboardDemo';

interface ViewsChartModalProps {
  data: MonthlyViews[];
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<{ value?: unknown }>;
  label?: unknown;
}

// Infobulle en classes Tailwind : elle suit le thème clair ou sombre
const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-border dark:border-white/10 bg-surface dark:bg-[#121215] px-3 py-2 text-xs shadow-lg">
      <p className="font-bold text-text dark:text-white">{String(label)}</p>
      <p className="text-text-secondary dark:text-white/60">{String(payload[0].value)} vues</p>
    </div>
  );
};

export const ViewsChartModal: React.FC<ViewsChartModalProps> = ({ data }) => {
  const total = data.reduce((sum, month) => sum + month.vues, 0);

  return (
    <div>
      <p className="text-xs text-text-secondary dark:text-white/50 mb-4">
        Évolution du nombre de vues de votre profil, mois par mois.
      </p>
      {/* currentColor des axes = couleur de ce conteneur, différente selon le thème */}
      <div className="h-56 -ml-2 text-text-secondary dark:text-white/40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'currentColor' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'currentColor' }} axisLine={false} tickLine={false} width={28} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(52, 211, 153, 0.08)' }} />
            <Bar dataKey="vues" fill="#2FA866" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 pt-3 border-t border-border dark:border-white/10 flex items-center justify-between text-xs">
        <span className="text-text-secondary dark:text-white/50">Total sur l'année</span>
        <span className="font-bold text-text dark:text-white">{total} vues</span>
      </div>
    </div>
  );
};