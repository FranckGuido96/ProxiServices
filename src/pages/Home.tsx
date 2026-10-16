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
import { providers } from '../data/providers';

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  // URLSearchParams encode les caractères spéciaux et n'ajoute que les critères renseignés
  const handleSearch = (service: string, location: string) => {
    const params = new URLSearchParams();
    if (service.trim()) params.set('q', service.trim());
    if (location.trim()) params.set('lieu', location.trim());
    const queryString = params.toString();
    navigate(queryString ? `/recherche?${queryString}` : '/recherche');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] pb-24">
      <Header onOpenMenu={() => setIsMenuOpen(true)} theme={theme} onToggleTheme={toggleTheme} />
      <SearchCard onSearch={handleSearch} />
      <PromoCarousel />
      <CategoriesSection
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        onSeeAll={() => navigate('/recherche')}
      />
      <ArtisansSection providers={providers} favorites={favorites} onToggleFavorite={toggleFavorite} />
      <BottomNav />
      <SideMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} favoritesCount={favorites.length} />
    </div>
  );
}