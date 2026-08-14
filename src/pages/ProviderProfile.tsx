import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileHeader } from '../components/provider-profile/ProfileHeader';
import { ProfileTabs, ProfileTab } from '../components/provider-profile/ProfileTabs';
import { PresentationTab } from '../components/provider-profile/PresentationTab';
import { WorksTab } from '../components/provider-profile/WorksTab';
import { ReviewsTab } from '../components/provider-profile/ReviewsTab';
import { WriteReviewModal } from '../components/provider-profile/WriteReviewModal';
import { BottomNav } from '../components/navigation/BottomNav';
import { providers } from '../data/providers';
import { getProviderProfileDetail } from '../data/providerProfileDetails';

export default function ProviderProfile() {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<ProfileTab>('presentation');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const provider = providers.find((p) => p.id === id) ?? providers[0];
    const detail = getProviderProfileDetail(provider.id);

    return (
        <div className="min-h-screen bg-background dark:bg-[#050505] pb-24">
            <ProfileHeader provider={provider} isFavorite={isFavorite} onToggleFavorite={() => setIsFavorite((v) => !v)} />

            <ProfileTabs
                active={activeTab}
                onChange={setActiveTab}
                worksCount={detail.works.length}
                reviewsCount={detail.reviews.length}
            />

            {activeTab === 'presentation' && (
                <PresentationTab
                    description={provider.description}
                    interventionZones={detail.interventionZones}
                    services={provider.services}
                />
            )}
            {activeTab === 'works' && <WorksTab works={detail.works} />}
            {activeTab === 'reviews' && (
                <ReviewsTab
                    rating={provider.rating}
                    reviews={detail.reviews}
                    onWriteReview={() => setIsReviewModalOpen(true)}
                />
            )}

            <WriteReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
            />

            <BottomNav />
        </div>
    );
}