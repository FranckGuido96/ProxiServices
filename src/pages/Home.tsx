import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { SearchCard } from '../components/home/SearchCard';
import { PromoCarousel } from '../components/home/PromoCarousel';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { ArtisansSection } from '../components/home/ArtisansSection';
import { BottomNav } from '../components/navigation/BottomNav';
import { SideMenuDrawer } from '../components/SideMenuDrawer';
import { useTheme } from '../hooks/useTheme';
import { categories } from '../data/categories';
import { getRecentProviders } from '../data/providers';
import { buildSearchPath } from '../utils/search';

const HOME_RECENT_COUNT = 4;
// TODO Supabase : charger les derniers prestataires inscrits
const recentProviders = getRecentProviders(HOME_RECENT_COUNT);

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const handleSearch = (service: string, location: string) => {
    navigate(buildSearchPath({ q: service, lieu: location }));
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] pb-24">
      <Header onOpenMenu={() => setIsMenuOpen(true)} theme={theme} onToggleTheme={toggleTheme} />
      <SearchCard onSearch={handleSearch} />
      <PromoCarousel />
      <CategoriesSection categories={categories} />
      <ArtisansSection providers={recentProviders} favorites={favorites} onToggleFavorite={toggleFavorite} />
      <BottomNav />
      <SideMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} favoritesCount={favorites.length} />
    </div>
  );
}