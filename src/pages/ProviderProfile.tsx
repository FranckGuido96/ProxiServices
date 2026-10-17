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
import { NewReview, PendingReview } from '../types/review';

interface ProviderProfileContentProps {
  id: string | undefined;
}

function ProviderProfileContent({ id }: ProviderProfileContentProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('presentation');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);

  const provider = providers.find((p) => p.id === id) ?? providers[0];
  const detail = getProviderProfileDetail(provider.id);

  const handleSubmitReview = async (review: NewReview) => {
    // TODO Supabase : insérer l'avis (prestataire, note, commentaire) avec le statut « en attente de modération ».
    // Si l'insertion échoue, lever l'erreur : la fenêtre n'affichera pas la confirmation.
    setPendingReviews((prev) => [{ id: Date.now().toString(), ...review }, ...prev]);
  };

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
          providerName={provider.name}
          pendingReviews={pendingReviews}
          onWriteReview={() => setIsReviewModalOpen(true)}
        />
      )}

      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleSubmitReview}
      />

      <BottomNav />
    </div>
  );
}

export default function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  // La clé remet à zéro l'onglet, le favori et les avis en attente quand on passe d'une fiche à une autre
  return <ProviderProfileContent key={id} id={id} />;
}