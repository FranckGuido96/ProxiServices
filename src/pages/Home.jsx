import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, MapPin, Heart, ChevronRight, Zap, Wrench, Car, Snowflake, HardHat, Hammer, Paintbrush2, Shirt } from 'lucide-react';
import { providers } from '../data/providers';
import { categories } from '../data/categories';
import VerifiedBadge from '../components/ui/VerifiedBadge';
import StarRating from '../components/ui/StarRating';

const ICONS = { Zap, Wrench, Car, Snowflake, HardHat, Hammer, Paintbrush2, Shirt };

export default function Home() {
  const navigate = useNavigate();
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  return (
    <div className="flex flex-col min-h-full max-w-md mx-auto shadow-2xl" style={{ background: '#F5F1EB' }}>
      {/* Hero */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(145deg, #166534 0%, #1F7A4D 100%)',
          borderRadius: '0 0 36px 36px',
          paddingBottom: '3.5rem',
        }}
      >
        <div className="absolute" style={{ top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', filter: 'blur(50px)' }} />
        <div className="absolute" style={{ bottom: '20px', left: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', filter: 'blur(35px)' }} />

        <div className="flex items-center justify-between px-5 pt-12 pb-5 relative z-10">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Menu size={20} color="white" strokeWidth={2} />
          </button>
          <div className="flex items-center gap-2.5">
            <button className="relative w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Bell size={20} color="white" strokeWidth={2} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full border border-white" style={{ background: '#FF6B4A' }} />
            </button>
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&auto=format"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
              style={{ background: '#00CC35' }}
            />
          </div>
        </div>

        <div className="px-5 pb-2 relative z-10">
          <p className="text-white/80 text-base mb-2 font-medium">Bonjour Amina 👋</p>
          <h1 className="text-[#ffffff] text-2xl font-extrabold leading-snug">
            Trouvez le professionnel<br />qu'il vous faut
          </h1>
        </div>
      </div>

      {/* Floating Search Card */}
      <div className="px-4 relative z-20" style={{ marginTop: '-2.5rem' }}>
        <div className="bg-white rounded-3xl p-4" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-2xl" style={{ background: '#F5F1EB', border: '1.5px solid #EAE5DE' }}>
            <Search size={17} color="#78716C" />
            <input value={service} onChange={(e) => setService(e.target.value)} placeholder="Quel service recherchez-vous ?" className="flex-1 bg-transparent outline-none text-sm font-medium" style={{ color: '#111827' }} />
          </div>
          <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-2xl" style={{ background: '#F5F1EB', border: '1.5px solid #EAE5DE' }}>
            <MapPin size={17} color="#78716C" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ville ou commune" className="flex-1 bg-transparent outline-none text-sm font-medium" style={{ color: '#111827' }} />
          </div>
          <button onClick={() => navigate(`/recherche?q=${service}`)} className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]" style={{ background: '#166534', color: 'white' }}>
            Trouver
          </button>
        </div>
      </div>

      {/* Catégories */}
      <div className="px-5 mt-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg" style={{ color: '#111827' }}>Catégories populaires</h2>
          <button onClick={() => navigate('/recherche')} className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#FF6B4A' }}>
            Voir tout <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map(({ id, name, icon, color, bg }) => {
            const Icon = ICONS[icon];
            return (
              <button key={id} onClick={() => navigate(`/recherche?categorie=${name}`)} className="flex flex-col items-center gap-2 flex-shrink-0 active:scale-95 transition-transform">
                <div className="w-[58px] h-[58px] rounded-2xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={26} color={color} strokeWidth={1.8} />
                </div>
                <span className="text-[11px] font-semibold text-center w-16 leading-tight" style={{ color: '#111827' }}>{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prestataires récemment inscrits */}
      <div className="px-5 mt-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg" style={{ color: '#111827' }}>Récemment inscrits</h2>
          <button onClick={() => navigate('/recherche')} className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#FF6B4A' }}>
            Voir tout <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {providers.map((p) => (
            <div key={p.id} onClick={() => navigate(`/prestataire/${p.id}`)} className="flex-shrink-0 w-44 bg-white rounded-3xl overflow-hidden text-left active:scale-[0.98] transition-transform cursor-pointer" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div className="relative">
                <img src={p.avatar} alt={p.name} className="w-full h-28 object-cover" style={{ background: '#EAE5DE' }} />
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.92)' }}>
                  <Heart size={15} fill={favorites.includes(p.id) ? '#EF4444' : 'none'} color={favorites.includes(p.id) ? '#EF4444' : '#78716C'} strokeWidth={2} />
                </button>
              </div>
              <div className="p-3">
                <p className="font-bold text-sm leading-tight mb-0.5" style={{ color: '#111827' }}>{p.name}</p>
                <p className="text-xs mb-2" style={{ color: '#78716C' }}>{p.profession}</p>
                {p.verified && <div className="mb-2"><VerifiedBadge size="xs" /></div>}
                <div className="flex items-center gap-1.5">
                  <StarRating value={p.rating} size={11} />
                  <span className="text-xs font-semibold" style={{ color: '#111827' }}>{p.rating}</span>
                </div>
                <p className="text-[11px] mt-1.5 truncate" style={{ color: '#78716C' }}>{p.district}, {p.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bannière artisan */}
      <div className="px-5 mt-2 mb-6">
        <div className="rounded-3xl p-5" style={{ background: 'linear-gradient(135deg, #1F7A4D 0%, #166534 100%)' }}>
          <p className="text-white font-extrabold text-base mb-1">Vous êtes artisan ?</p>
          <p className="text-white/80 text-sm mb-4 leading-relaxed">Rejoignez plus de 300 professionnels vérifiés sur ProxiServices</p>
          <button onClick={() => navigate('/devenir-prestataire')} className="px-5 py-2.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95" style={{ background: '#FF6B4A' }}>
            Devenir prestataire
          </button>
        </div>
      </div>
    </div>
  );
}