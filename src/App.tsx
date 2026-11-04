import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { User } from 'lucide-react';
import { FavoritesProvider } from './context/FavoritesProvider';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import AllCategories from './pages/AllCategories';
import NewProviders from './pages/NewProviders';
import Favorites from './pages/Favorites';
import ProviderProfile from './pages/ProviderProfile';
import BecomeProviderStep1 from './pages/BecomeProviderStep1';
import BecomeProviderStep2 from './pages/BecomeProviderStep2';
import BecomeProviderStep3 from './pages/BecomeProviderStep3';
import ProviderDashboard from './pages/ProviderDashboard';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recherche" element={<SearchResults />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route path="/nouveaux-prestataires" element={<NewProviders />} />
          <Route path="/favoris" element={<Favorites />} />
          {/* Route statique déclarée avant la route dynamique /prestataire/:id */}
          <Route path="/prestataire/dashboard" element={<ProviderDashboard />} />
          <Route path="/prestataire/:id" element={<ProviderProfile />} />
          <Route path="/devenir-prestataire" element={<BecomeProviderStep1 />} />
          <Route path="/devenir-prestataire/activite" element={<BecomeProviderStep2 />} />
          <Route path="/devenir-prestataire/portfolio" element={<BecomeProviderStep3 />} />
          {/* Page provisoire : à remplacer par l'écran Connexion / Profil */}
          <Route
            path="/profil"
            element={
              <ComingSoon
                title="Mon"
                highlight="profil"
                description="Votre espace personnel est en cours de construction."
                icon={<User className="w-6 h-6" />}
              />
            }
          />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;