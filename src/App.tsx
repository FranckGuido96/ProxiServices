import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesProvider';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import AllCategories from './pages/AllCategories';
import NewProviders from './pages/NewProviders';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Login from './pages/Login';
import RegisterClient from './pages/RegisterClient';
import ProviderProfile from './pages/ProviderProfile';
import BecomeProviderStep1 from './pages/BecomeProviderStep1';
import BecomeProviderStep2 from './pages/BecomeProviderStep2';
import BecomeProviderStep3 from './pages/BecomeProviderStep3';
import ProviderDashboard from './pages/ProviderDashboard';

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
          <Route path="/profil" element={<Profile />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<RegisterClient />} />
          {/* Route statique déclarée avant la route dynamique /prestataire/:id */}
          <Route path="/prestataire/dashboard" element={<ProviderDashboard />} />
          <Route path="/prestataire/:id" element={<ProviderProfile />} />
          <Route path="/devenir-prestataire" element={<BecomeProviderStep1 />} />
          <Route path="/devenir-prestataire/activite" element={<BecomeProviderStep2 />} />
          <Route path="/devenir-prestataire/portfolio" element={<BecomeProviderStep3 />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;