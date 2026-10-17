import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/provider-dashboard/DashboardHeader';
import { DashboardStats } from '../components/provider-dashboard/DashboardStats';
import { ProfileTab } from '../components/provider-dashboard/ProfileTab';
import { PortfolioTab } from '../components/provider-dashboard/PortfolioTab';
import { DashboardModal } from '../components/provider-dashboard/DashboardModal';
import { ViewsChartModal } from '../components/provider-dashboard/ViewsChartModal';
import { CallsListModal } from '../components/provider-dashboard/CallsListModal';
import { ReviewsModal } from '../components/provider-dashboard/ReviewsModal';
import { BottomNav } from '../components/navigation/BottomNav';
import { PortfolioItem, ProviderProfileData } from '../types/dashboard';

// TODO Supabase : remplacer par l'identifiant et le statut du prestataire connecté
const CURRENT_PROVIDER_ID = '7';
const CURRENT_PROVIDER_VERIFIED = true;

const initialProfile: ProviderProfileData = {
  bio: "Intervention rapide pour toutes vos urgences en plomberie à Cocody et environs. 10 ans d'expérience et matériel professionnel.",
  name: 'Koffi Yao',
  trade: 'Plombier',
  phone: '07 08 09 10 11',
  ville: 'Abidjan',
  commune: 'Cocody',
  quartier: 'Angré',
  services: ["Dépannage fuite d'eau", 'Installation sanitaire', 'Débouchage rapide', 'Rénovation salle de bain'],
};

const initialPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'Installation sanitaire villa Riviera',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
    date: 'Il y a 3 jours',
    viewsCount: 42,
  },
  {
    id: '2',
    title: 'Rénovation tuyauterie cuisine Cocody',
    imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&auto=format&fit=crop&q=80',
    date: 'Il y a 1 semaine',
    viewsCount: 68,
  },
];

export default function ProviderDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'portfolio'>('profile');
  const [openModal, setOpenModal] = useState<'views' | 'calls' | 'reviews' | null>(null);
  const [profile, setProfile] = useState<ProviderProfileData>(initialProfile);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);

  const formattedAddress = [profile.commune, profile.ville].filter(Boolean).join(', ');

  const tabs = [
    { id: 'profile' as const, label: 'Mon Profil' },
    { id: 'portfolio' as const, label: `Travaux (${portfolio.length})` },
  ];

  return (
    <div className="bg-background dark:bg-[#08080A] text-text dark:text-[#F5F5F5] min-h-screen pb-24">
      <DashboardHeader
        name={profile.name}
        trade={profile.trade}
        commune={formattedAddress}
        providerId={CURRENT_PROVIDER_ID}
        isVerified={CURRENT_PROVIDER_VERIFIED}
        services={profile.services}
        onBack={() => navigate(-1)}
        onEditProfile={() => setActiveTab('profile')}
      />

      <DashboardStats
        viewsCount={142}
        callsCount={28}
        rating={4.9}
        reviewsCount={48}
        portfolioCount={portfolio.length}
        onViewsClick={() => setOpenModal('views')}
        onCallsClick={() => setOpenModal('calls')}
        onRatingClick={() => setOpenModal('reviews')}
        onPortfolioClick={() => setActiveTab('portfolio')}
      />

      <div className="px-4 mb-4">
        <div className="bg-surface dark:bg-[#121215] p-1 rounded-2xl border border-border dark:border-white/10 flex items-center gap-1 shadow-sm dark:shadow-lg">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-pressed={activeTab === id}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === id
                  ? 'bg-primary-700 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md'
                  : 'text-text-secondary dark:text-white/60 hover:text-text dark:hover:text-white hover:bg-background dark:hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'profile' && <ProfileTab profile={profile} onChange={setProfile} />}
      {activeTab === 'portfolio' && <PortfolioTab portfolio={portfolio} onPortfolioChange={setPortfolio} />}

      <DashboardModal isOpen={openModal === 'views'} onClose={() => setOpenModal(null)} title="Vues du profil">
        <ViewsChartModal />
      </DashboardModal>
      <DashboardModal isOpen={openModal === 'calls'} onClose={() => setOpenModal(null)} title="Appels reçus">
        <CallsListModal />
      </DashboardModal>
      <DashboardModal isOpen={openModal === 'reviews'} onClose={() => setOpenModal(null)} title="Avis clients">
        <ReviewsModal />
      </DashboardModal>

      <BottomNav />
    </div>
  );
}