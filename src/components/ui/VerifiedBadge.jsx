import { CheckCircle2 } from 'lucide-react';

export default function VerifiedBadge({ size = 'sm' }) {
  const isXs = size === 'xs';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${
        isXs ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'
      }`}
      style={{ background: '#DCFCE7', color: '#166534' }}
    >
      <CheckCircle2 size={isXs ? 10 : 12} />
      Vérifié
    </span>
  );
}