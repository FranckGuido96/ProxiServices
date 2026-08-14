import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProviderProfile from './pages/ProviderProfile';
import BecomeProviderStep1 from './pages/BecomeProviderStep1';
import BecomeProviderStep2 from './pages/BecomeProviderStep2';
import BecomeProviderStep3 from './pages/BecomeProviderStep3';
import ProviderDashboard from './pages/ProviderDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recherche" element={<SearchResults />} />
        <Route path="/prestataire/:id" element={<ProviderProfile />} />
        <Route path="/devenir-prestataire" element={<BecomeProviderStep1 />} />
        <Route path="/devenir-prestataire/activite" element={<BecomeProviderStep2 />} />
        <Route path="/devenir-prestataire/portfolio" element={<BecomeProviderStep3 />} />
        <Route path="/prestataire/dashboard" element={<ProviderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;