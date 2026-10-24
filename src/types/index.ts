export interface Category {
  id: string;
  title: string;
  iconName: string;
  count: number;
}

export interface Provider {
  id: string;
  name: string;
  trade: string;
  categoryId: string;
  isNew: boolean;
  isVerified: boolean;
  // Date d'inscription au format AAAA-MM-JJ : sert à trier les « récemment inscrits »
  registeredAt: string;
  location: string;
  commune: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  whatsapp: string;
  avatarUrl: string;
  description: string;
  services: string[];
  interventionZones?: string[];
  isFavorite?: boolean;
}