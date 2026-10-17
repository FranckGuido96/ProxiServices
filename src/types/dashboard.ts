export interface ProviderProfileData {
  bio: string;
  name: string;
  trade: string;
  phone: string;
  ville: string;
  commune: string;
  quartier: string;
  services: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  viewsCount: number;
}