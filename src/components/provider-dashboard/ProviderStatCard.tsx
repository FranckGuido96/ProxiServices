import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProviderStatCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    trend?: string;
    suffix?: string;
}

export const ProviderStatCard: React.FC<ProviderStatCardProps> = ({ icon: Icon, label, value, trend, suffix }) => {
    return (
        <div className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-white/45 max-w-[100px] leading-tight">
                    {label}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-[#092B1C] border border-primary-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary-700 dark:text-emerald-400" />
                </div>
            </div>
            <div className="mt-2">
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-text dark:text-white tracking-tight">{value}</span>
                    {suffix && <span className="text-xs font-normal text-text-secondary dark:text-white/40">{suffix}</span>}
                </div>
                {trend && (
                    <span className="text-xs font-semibold text-primary-600 dark:text-emerald-400 mt-1 block">
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
};