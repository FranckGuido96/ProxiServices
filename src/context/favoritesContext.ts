import { createContext } from 'react';

export interface FavoritesContextValue {
  // Identifiants des prestataires favoris, du dernier ajouté au plus ancien
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);