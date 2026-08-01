import { Star } from 'lucide-react';

export default function StarRating({ value, size = 14 }) {
  return (
    <div className="flex items-center">
      <Star size={size} fill="#F59E0B" color="#F59E0B" strokeWidth={0} />
    </div>
  );
}