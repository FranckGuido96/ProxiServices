export interface ProfileReview {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
    reply?: string;
}

export interface ProfileWork {
    id: string;
    title: string;
    imageUrl: string;
}

export interface ProviderProfileDetail {
    interventionZones: string[];
    works: ProfileWork[];
    reviews: ProfileReview[];
}

const defaultDetail: ProviderProfileDetail = {
    interventionZones: ["Cocody", "Marcory"],
    works: [
        { id: 'w1', title: 'Chantier récent', imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80' },
    ],
    reviews: [],
};

export const providerProfileDetails: Record<string, ProviderProfileDetail> = {
    '2': {
        interventionZones: ["Anono", "Cocody", "Angré", "Deux Plateaux", "Marcory"],
        works: [
            { id: 'w1', title: 'Tableau Électrique Villa', imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80' },
            { id: 'w2', title: 'Installation Sanitaire Riviera', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80' },
            { id: 'w3', title: 'Rénovation Tuyauterie Cuisine', imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&auto=format&fit=crop&q=80' },
        ],
        reviews: [
            { id: 'r1', author: 'Jean-Marc B.', rating: 5, date: 'Il y a 2 jours', comment: 'Travail impeccable et ponctualité exemplaire. Il a trouvé la panne en 10 minutes alors que d\'autres cherchaient depuis des heures. Je recommande !', reply: 'Merci Jean-Marc pour votre confiance, au plaisir de vous aider à nouveau.' },
            { id: 'r2', author: 'Awa D.', rating: 5, date: 'Il y a 1 semaine', comment: 'Très professionnel. L\'installation est propre et bien expliquée. Un petit retard au début mais prévenu à l\'avance.', reply: 'Merci Awa ! Ravi d\'avoir répondu à vos attentes.' },
            { id: 'r3', author: 'Serge K.', rating: 4, date: 'Il y a 2 semaines', comment: 'Bon travail dans l\'ensemble, je recommande.' },
        ],
    },
    '7': {
        interventionZones: ["Cocody", "Angré", "Riviera"],
        works: [
            { id: 'w1', title: 'Installation sanitaire', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80' },
            { id: 'w2', title: 'Rénovation tuyauterie cuisine', imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&auto=format&fit=crop&q=80' },
        ],
        reviews: [
            { id: 'r1', author: 'Awa D.', rating: 5, date: 'Il y a 2h', comment: 'Intervention très rapide à Cocody et travail de plomberie impeccable !' },
            { id: 'r2', author: 'Bakary S.', rating: 5, date: 'Il y a 3 jours', comment: 'Ponctuel et très professionnel, je recommande.' },
            { id: 'r3', author: 'Marie K.', rating: 4, date: 'Il y a 1 semaine', comment: 'Bon travail, un peu de retard sur le rendez-vous.' },
        ],
    },
    default: defaultDetail,
};

export const getProviderProfileDetail = (id: string): ProviderProfileDetail =>
    providerProfileDetails[id] ?? providerProfileDetails.default;