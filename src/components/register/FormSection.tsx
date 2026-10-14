import React from 'react';

interface FormSectionProps {
    title: string;
    children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
    return (
        <div className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl p-4 shadow-sm dark:shadow-xl dark:shadow-black/40">
            <h3 className="text-sm font-bold text-text dark:text-white pb-2.5 mb-3 border-b border-border dark:border-white/10">
                {title}
            </h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
};