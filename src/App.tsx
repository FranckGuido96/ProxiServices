import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Heart, User } from 'lucide-react';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProviderProfile from './pages/ProviderProfile';
import BecomeProviderStep1 from './pages/BecomeProviderStep1';
import BecomeProviderStep2 from './pages/BecomeProviderStep2';
import BecomeProviderStep3 from './pages/BecomeProviderStep3';
import ProviderDashboard from './pages/ProviderDashboard';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recherche" element={<SearchResults />} />
        {/* Route statique déclarée avant la route dynamique /prestataire/:id */}
        <Route path="/prestataire/dashboard" element={<ProviderDashboard />} />
        <Route path="/prestataire/:id" element={<ProviderProfile />} />
        <Route path="/devenir-prestataire" element={<BecomeProviderStep1 />} />
        <Route path="/devenir-prestataire/activite" element={<BecomeProviderStep2 />} />
        <Route path="/devenir-prestataire/portfolio" element={<BecomeProviderStep3 />} />
        {/* Pages provisoires : à remplacer par les écrans Favoris et Connexion / Profil */}
        <Route
          path="/favoris"
          element={
            <ComingSoon
              title="Mes"
              highlight="favoris"
              description="Retrouvez ici les prestataires que vous aurez enregistrés."
              icon={<Heart className="w-6 h-6" />}
            />
          }
        />
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
    </BrowserRouter>
  );
}

export default App;