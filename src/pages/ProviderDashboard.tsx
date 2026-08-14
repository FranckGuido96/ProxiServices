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

export default function ProviderDashboard() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<'profile' | 'portfolio'>('profile');
    const [openModal, setOpenModal] = useState<'views' | 'calls' | 'reviews' | null>(null);
    const [address, setAddress] = useState({
        ville: 'Abidjan',
        commune: 'Cocody',
        quartier: 'Angré',
    });
    const [services, setServices] = useState<string[]>([
        'Dépannage fuite d\'eau', 'Installation sanitaire', 'Débouchage rapide', 'Rénovation salle de bain',
    ]);

    const provider = {
        name: 'Koffi Yao',
        trade: 'Plombier',
    };

    const formattedAddress = `${address.commune}, ${address.ville}`;

    return (
        <div className="bg-background dark:bg-[#08080A] text-text dark:text-[#F5F5F5] min-h-screen pb-24">
            <DashboardHeader
                name={provider.name}
                trade={provider.trade}
                commune={formattedAddress}
                services={services}
                onBack={() => navigate(-1)}
                onEditProfile={() => setActiveTab('profile')}
            />

            <DashboardStats
                viewsCount={142}
                callsCount={28}
                rating={4.9}
                reviewsCount={48}
                portfolioCount={2}
                onViewsClick={() => setOpenModal('views')}
                onCallsClick={() => setOpenModal('calls')}
                onRatingClick={() => setOpenModal('reviews')}
                onPortfolioClick={() => setActiveTab('portfolio')}
            />

            <div className="px-4 mb-4">
                <div className="bg-surface dark:bg-[#121215] p-1 rounded-2xl border border-border dark:border-white/10 flex items-center gap-1 shadow-sm dark:shadow-lg">
                    {[
                        { id: 'profile' as const, label: 'Mon Profil' },
                        { id: 'portfolio' as const, label: 'Travaux (2)' },
                    ].map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === id
                                    ? 'bg-primary-700 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md'
                                    : 'text-text-secondary dark:text-white/60 hover:text-text dark:hover:text-white hover:bg-background dark:hover:bg-white/5'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'profile' && <ProfileTab onServicesChange={setServices} onAddressChange={setAddress} />}
            {activeTab === 'portfolio' && <PortfolioTab />}

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