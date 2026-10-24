// Données de démonstration de l'Espace Prestataire.
// TODO Supabase : remplacer par les données réelles du prestataire connecté.

export interface DashboardReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DashboardCall {
  id: string;
  number: string;
  date: string;
  time: string;
}

export interface MonthlyViews {
  month: string;
  vues: number;
}

export interface NotificationSegment {
  text: string;
  emphasis?: 'name' | 'quote' | 'accent';
}

export interface DashboardNotification {
  id: string;
  icon: 'star' | 'trend';
  title: string;
  time: string;
  isNew: boolean;
  segments: NotificationSegment[];
}

// ----- Avis -----
const featuredReviews: DashboardReview[] = [
  { id: '1', author: 'Awa D.', rating: 5, comment: 'Intervention très rapide à Cocody et travail de plomberie impeccable !', date: 'Il y a 2h' },
  { id: '2', author: 'Bakary S.', rating: 5, comment: 'Ponctuel et très professionnel, je recommande.', date: 'Il y a 3 jours' },
  { id: '3', author: 'Marie K.', rating: 4, comment: 'Bon travail, un peu de retard sur le rendez-vous.', date: 'Il y a 1 semaine' },
];

const reviewerNames = ['Yao K.', 'Fatou B.', 'Jean-Marc T.', 'Aïcha D.', 'Kouadio R.', 'Salimata C.', 'Diallo M.', 'Chantal N.'];
const reviewComments = [
  'Très satisfait du service rendu.',
  'Travail propre et rapide, merci.',
  'Prestataire sérieux, je referai appel à lui.',
  'Bon rapport qualité-prix.',
  "Explications claires avant l'intervention.",
];

const generatedReviews: DashboardReview[] = Array.from({ length: 45 }, (_, i) => ({
  id: `extra-${i + 1}`,
  author: reviewerNames[i % reviewerNames.length],
  rating: i % 9 === 0 ? 4 : 5,
  comment: reviewComments[i % reviewComments.length],
  date: `Il y a ${2 + (i % 6)} semaines`,
}));

export const demoReviews: DashboardReview[] = [...featuredReviews, ...generatedReviews];

export const averageRating = (reviews: DashboardReview[]): number =>
  reviews.length === 0
    ? 0
    : Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10) / 10;

// ----- Appels (numéros fictifs) -----
const callPrefixes = ['07', '05', '01'];
const callDates = ["Aujourd'hui", 'Hier', 'Il y a 2 jours', 'Il y a 3 jours', 'Il y a 5 jours', 'Il y a 1 semaine'];

export const demoCalls: DashboardCall[] = Array.from({ length: 28 }, (_, i) => {
  const digits = String((i * 7919 + 1234567) % 100000000).padStart(8, '0');
  const groups = digits.match(/.{2}/g) ?? [];
  return {
    id: String(i + 1),
    number: `${callPrefixes[i % callPrefixes.length]} ${groups.join(' ')}`,
    date: callDates[Math.min(Math.floor(i / 5), callDates.length - 1)],
    time: `${String(8 + (i % 10)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
  };
});

// ----- Vues du profil -----
export const demoMonthlyViews: MonthlyViews[] = [
  { month: 'Jan', vues: 62 },
  { month: 'Fév', vues: 78 },
  { month: 'Mar', vues: 55 },
  { month: 'Avr', vues: 90 },
  { month: 'Mai', vues: 104 },
  { month: 'Juin', vues: 88 },
  { month: 'Juil', vues: 120 },
  { month: 'Août', vues: 98 },
  { month: 'Sep', vues: 134 },
  { month: 'Oct', vues: 110 },
  { month: 'Nov', vues: 109 },
  { month: 'Déc', vues: 142 },
];

// Évolution en % du dernier mois par rapport au précédent (null si elle n'est pas calculable)
export const getViewsTrend = (data: MonthlyViews[]): number | null => {
  if (data.length < 2) return null;
  const previous = data[data.length - 2].vues;
  const current = data[data.length - 1].vues;
  if (previous === 0) return null;
  return Math.round(((current - previous) / previous) * 100);
};

// ----- Notifications (construites à partir des données ci-dessus) -----
const latestReview = demoReviews[0];
const viewsTrend = getViewsTrend(demoMonthlyViews);

const notifications: DashboardNotification[] = [
  {
    id: 'n-review',
    icon: 'star',
    title: `Nouvel avis ${latestReview.rating} étoile${latestReview.rating > 1 ? 's' : ''}`,
    time: latestReview.date,
    isNew: true,
    segments: [
      { text: latestReview.author, emphasis: 'name' },
      { text: ' a laissé un avis : ' },
      { text: `« ${latestReview.comment} »`, emphasis: 'quote' },
    ],
  },
];

if (viewsTrend !== null && viewsTrend > 0) {
  notifications.push({
    id: 'n-views',
    icon: 'trend',
    title: 'Vos vues sont en hausse !',
    time: 'Hier',
    isNew: true,
    segments: [
      { text: 'Votre profil a été vu ' },
      { text: `${viewsTrend}% de plus`, emphasis: 'accent' },
      { text: ' ces 30 derniers jours.' },
    ],
  });
}

export const demoNotifications: DashboardNotification[] = notifications;