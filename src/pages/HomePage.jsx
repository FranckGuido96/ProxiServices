import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  Menu,
  Bell,
  Search,
  MapPin,
  Heart,
  ChevronRight,
  Paintbrush,
  Wrench,
  Hammer,
  Snowflake,
  HardHat,
  Car,
  Home as HomeIcon,
  UserPlus,
  User,
} from 'lucide-react';

import skylineImg from '../assets/images/skyline.svg';
import promocard1Img from '../assets/images/promocard1.svg';
import promocard2Img from '../assets/images/promocard2.svg';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchService, setSearchService] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [favorites, setFavorites] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchService) queryParams.set('q', searchService);
    if (searchLocation) queryParams.set('location', searchLocation);
    navigate(`/recherche?${queryParams.toString()}`);
  };

  // Popular categories list
  const categories = [
    { id: 'peintre', name: 'Peintre', count: '5 Prestataires', Icon: Paintbrush },
    { id: 'plombier', name: 'Plombier', count: '18 Prestataires', Icon: Wrench },
    { id: 'menuisier', name: 'Menuisier', count: '6 Prestataires', Icon: Hammer },
    { id: 'froid', name: 'Froid', count: '2 Prestataires', Icon: Snowflake },
    { id: 'macon', name: 'Maçon', count: '8 Prestataires', Icon: HardHat },
    { id: 'mecanicien', name: 'Mécanicien', count: '11 Prestataires', Icon: Car },
  ];

  // Recently registered providers list
  const recentProviders = [
    {
      id: 1,
      name: 'Olivier Konan',
      profession: 'Menuisier',
      isNew: true,
      location: 'Yopougon, Abidjan',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Bamba Ali',
      profession: 'Plombier',
      isNew: true,
      location: 'Anono, Abidjan',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Zao Bi',
      profession: 'Informaticien',
      isNew: true,
      location: 'Cocody, Abidjan',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Aïssa Bamba',
      profession: 'Électricien',
      isNew: true,
      location: 'Treichville, Abidjan',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 sm:py-6 flex justify-center items-center font-sans antialiased">
      {/* Sidebar Drawer */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile-First Container centered max-w-md */}
      <div className="w-full max-w-md bg-[#F5F1EB] min-h-screen sm:min-h-[844px] sm:rounded-[36px] shadow-2xl relative pb-24 overflow-hidden flex flex-col">
        
        {/* HEADER SECTION (Vert) */}
        <header className="bg-primary-700 text-white rounded-b-[32px] pt-6 pb-14 px-5 relative overflow-hidden shadow-md">
          {/* Skyline Background Image */}
          <img
            src={skylineImg}
            alt="Skyline Decor"
            className="absolute bottom-0 left-0 w-full object-cover pointer-events-none opacity-25 z-0"
          />

          {/* Decorative background vectors/shapes */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/30 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-800/40 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none" />
          
          {/* Top Bar: Menu sandwich, Bell + notification, Avatar */}
          <div className="flex items-center justify-between relative z-10 mb-6">
            <button
              aria-label="Menu"
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all backdrop-blur-md"
            >
              <Menu size={20} className="text-white" />
            </button>

            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all backdrop-blur-md"
              >
                <Bell size={20} className="text-white" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-secondary-500 rounded-full border-2 border-primary-700" />
              </button>

              <div className="w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden shadow-sm bg-emerald-800 flex items-center justify-center text-xs font-bold text-white">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span>BK</span>
              </div>
            </div>
          </div>

          {/* Welcome Message & Title */}
          <div className="relative z-10 flex items-end justify-between">
            <div className="max-w-[220px]">
              <p className="text-emerald-100 text-sm font-medium flex items-center gap-1.5 mb-1">
                Bonjour <span className="inline-block animate-bounce">👋</span>
              </p>
              <h1 className="text-white text-xl sm:text-2xl font-extrabold leading-tight tracking-tight">
                Trouvez le professionnel qu'il vous faut
              </h1>
            </div>

            {/* Header Illustration graphic matching screenshot */}
            <div className="w-24 h-24 relative flex-shrink-0 -mb-4 opacity-90">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Background buildings outline */}
                <path d="M10 80V40H20V80M25 80V30H40V80M45 80V50H55V80M80 80V35H95V80" stroke="#2FA866" strokeWidth="2" strokeDasharray="2 2" />
                {/* Location pin */}
                <path d="M60 25C60 20 64 16 69 16C74 16 78 20 78 25C78 32 69 40 69 40C69 40 60 32 60 25Z" fill="#FFFFFF" />
                <circle cx="69" cy="24" r="3" fill="#166534" />
                {/* Sitting client figure */}
                <circle cx="42" cy="52" r="5" fill="#F59E0B" />
                <path d="M35 75C35 65 42 60 48 60C50 60 52 65 52 75H35Z" fill="#F59E0B" />
                {/* Standing worker figure */}
                <circle cx="80" cy="46" r="5" fill="#10B981" />
                <path d="M73 80V56C73 53 77 52 80 52C83 52 87 53 87 56V80H73Z" fill="#1E7A4D" />
                <path d="M78 41H82L84 46H76L78 41Z" fill="#F59E0B" /> {/* Hardhat */}
              </svg>
            </div>
          </div>
        </header>

        {/* FLOATING SEARCH CARD ("Carte de recherche Flottante") */}
        <div className="-mt-8 px-4 relative z-20">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-3xl p-4 shadow-floating border border-stone-200/60"
          >
            {/* Input 1: Quel service cherchez-vous ? */}
            <div className="flex items-center gap-3 bg-stone-50 border border-stone-200/80 rounded-2xl px-3.5 py-3 mb-3 focus-within:border-primary-700 focus-within:bg-white transition-all">
              <Search size={18} className="text-stone-400 flex-shrink-0" />
              <input
                type="text"
                value={searchService}
                onChange={(e) => setSearchService(e.target.value)}
                placeholder="Quel service cherchez-vous ?"
                className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium text-stone-800 placeholder-stone-400"
              />
            </div>

            {/* Input 2: Votre commune ou quartier */}
            <div className="flex items-center gap-3 bg-stone-50 border border-stone-200/80 rounded-2xl px-3.5 py-3 mb-4 focus-within:border-primary-700 focus-within:bg-white transition-all">
              <MapPin size={18} className="text-stone-400 flex-shrink-0" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Votre commune ou quartier"
                className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium text-stone-800 placeholder-stone-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-700 hover:bg-primary-800 active:scale-[0.99] text-white font-bold py-3.5 rounded-2xl shadow-sm transition-all text-sm tracking-wide"
            >
              Trouver
            </button>
          </form>
        </div>

        {/* DÉFILEMENT HORIZONTAL DES CARTES PROMO (Promocards) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none px-4 mt-6 py-1">
          {/* Promo Card 1 */}
          <div
            onClick={() => navigate('/rejoindre')}
            className="snap-center flex-shrink-0 w-[88%] max-w-[340px] rounded-3xl overflow-hidden shadow-card border border-stone-200/50 hover:shadow-md transition-all relative group cursor-pointer"
          >
            <img
              src={promocard1Img}
              alt="Promotion Artisan 1"
              className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-300"
            />
          </div>

          {/* Promo Card 2 */}
          <div
            onClick={() => navigate('/devenir-prestataire')}
            className="snap-center flex-shrink-0 w-[88%] max-w-[340px] rounded-3xl overflow-hidden shadow-card border border-stone-200/50 hover:shadow-md transition-all relative group cursor-pointer"
          >
            <img
              src={promocard2Img}
              alt="Promotion Services 2"
              className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-300"
            />
          </div>
        </div>

        {/* CATÉGORIES POPULAIRES */}
        <section className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-stone-900 text-base">
              Catégories populaires
            </h2>
            <Link
              to="/categories"
              className="text-primary-700 hover:text-primary-800 text-xs font-bold flex items-center gap-0.5 hover:underline transition-all"
            >
              Tout voir <ChevronRight size={14} />
            </Link>
          </div>

          {/* 3 Columns Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {categories.map(({ id, name, count, Icon }) => (
              <button
                key={id}
                onClick={() => navigate(`/recherche?category=${id}`)}
                className="bg-white rounded-2xl p-3 flex flex-col items-center text-center shadow-card border border-stone-200/50 hover:border-primary-700/30 hover:shadow-md active:scale-95 transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-amber-100/90 text-amber-600 flex items-center justify-center mb-2 shadow-inner">
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <span className="font-bold text-stone-900 text-xs mb-0.5 leading-tight truncate w-full">
                  {name}
                </span>
                <span className="text-[10px] text-stone-400 font-medium truncate w-full">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* RÉCEMMENT INSCRITS */}
        <section className="px-4 mt-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-stone-900 text-base">
              Récemment inscrits
            </h2>
            <Link
              to="/recherche?sort=recent"
              className="text-primary-700 hover:text-primary-800 text-xs font-bold flex items-center gap-0.5 hover:underline transition-all"
            >
              Tout voir <ChevronRight size={14} />
            </Link>
          </div>

          {/* 2 Columns Grid */}
          <div className="grid grid-cols-2 gap-3">
            {recentProviders.map((provider) => {
              const isFav = !!favorites[provider.id];
              return (
                <div
                  key={provider.id}
                  className="bg-white rounded-2xl p-3.5 shadow-card border border-stone-200/50 relative flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  {/* Heart Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(provider.id);
                    }}
                    aria-label="Ajouter aux favoris"
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-stone-100 active:scale-90 transition-all text-stone-400 hover:text-red-500 z-10"
                  >
                    <Heart
                      size={18}
                      className={isFav ? 'fill-emerald-600 text-emerald-600' : 'text-emerald-700/70'}
                      strokeWidth={1.8}
                    />
                  </button>

                  <div>
                    {/* Avatar Circle */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-200 border border-stone-100 shadow-sm mb-2.5">
                      <img
                        src={provider.avatarUrl}
                        alt={provider.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="w-full h-full bg-stone-300 flex items-center justify-center text-xs font-bold text-stone-600">
                        {provider.name.charAt(0)}
                      </div>
                    </div>

                    {/* Name & Profession */}
                    <h3 className="font-bold text-stone-900 text-sm leading-tight group-hover:text-primary-700 transition-colors">
                      {provider.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mb-1.5">
                      {provider.profession}
                    </p>

                    {/* Nouveau Badge */}
                    {provider.isNew && (
                      <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-md mb-2 border border-emerald-100/80">
                        Nouveau
                      </span>
                    )}

                    {/* Location */}
                    <div className="flex items-center gap-1 text-[11px] text-stone-400 font-medium mb-3">
                      <MapPin size={12} className="flex-shrink-0 text-stone-400" />
                      <span className="truncate">{provider.location}</span>
                    </div>
                  </div>

                  {/* Button Voir le profil */}
                  <button
                    onClick={() => navigate(`/prestataire/${provider.id}`)}
                    className="w-full border border-stone-200 rounded-xl py-1.5 text-center text-xs font-bold text-primary-700 hover:bg-primary-50 hover:border-primary-200 active:scale-[0.98] transition-all"
                  >
                    Voir le profil
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* NAVIGATION INFÉRIEURE (Fixed Mobile Nav) */}
        <nav
          aria-label="Navigation principale"
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-stone-200/80 px-4 py-2 flex justify-around items-center z-50 shadow-lg sm:rounded-b-[36px]"
        >
          {/* Item 1: Accueil (Active) */}
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-0.5 text-primary-700 py-1 px-3 rounded-xl transition-all"
          >
            <HomeIcon size={20} strokeWidth={2.5} />
            <span className="text-[10px] font-bold tracking-tight">Accueil</span>
          </button>

          {/* Item 2: Rejoindre */}
          <button
            onClick={() => navigate('/rejoindre')}
            className="flex flex-col items-center gap-0.5 text-stone-400 hover:text-stone-600 py-1 px-3 rounded-xl transition-all"
          >
            <UserPlus size={20} strokeWidth={1.8} />
            <span className="text-[10px] font-medium tracking-tight">Rejoindre</span>
          </button>

          {/* Item 3: Recherche */}
          <button
            onClick={() => navigate('/recherche')}
            className="flex flex-col items-center gap-0.5 text-stone-400 hover:text-stone-600 py-1 px-3 rounded-xl transition-all"
          >
            <Search size={20} strokeWidth={1.8} />
            <span className="text-[10px] font-medium tracking-tight">Recherche</span>
          </button>

          {/* Item 4: Profil */}
          <button
            onClick={() => navigate('/profil')}
            className="flex flex-col items-center gap-0.5 text-stone-400 hover:text-stone-600 py-1 px-3 rounded-xl transition-all"
          >
            <User size={20} strokeWidth={1.8} />
            <span className="text-[10px] font-medium tracking-tight">Profil</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
