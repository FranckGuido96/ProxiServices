import React from 'react';
import { Paintbrush, Hammer, Snowflake, Wrench, Zap, Laptop, Car, Building2 } from 'lucide-react';

interface CategoryIconProps {
    iconName: string;
    className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ iconName, className = 'w-5 h-5' }) => {
    switch (iconName) {
        case 'Paintbrush': return <Paintbrush className={className} />;
        case 'Pipette':
        case 'Plombier':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 6H8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4Z" />
                    <path d="M12 14v4" /><path d="M10 18h4" /><path d="M12 18v2a2 2 0 0 0 2 2h0" />
                </svg>
            );
        case 'Hammer': return <Hammer className={className} />;
        case 'Snowflake': return <Snowflake className={className} />;
        case 'BrickWall':
        case 'Macon':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" />
                    <path d="M9 3v6" /><path d="M15 3v6" /><path d="M12 9v6" /><path d="M6 15v6" /><path d="M18 15v6" />
                </svg>
            );
        case 'Wrench': return <Wrench className={className} />;
        case 'Car': return <Car className={className} />;
        case 'Zap': return <Zap className={className} />;
        case 'Laptop': return <Laptop className={className} />;
        default: return <Building2 className={className} />;
    }
};