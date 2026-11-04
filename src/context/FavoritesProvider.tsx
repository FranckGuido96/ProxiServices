import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FavoritesContext, FavoritesContextValue } from './favoritesContext';

const STORAGE_KEY = 'ps-favorites';

const readStoredFavorites = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
};

// TODO Supabase : les favoris seront liés au compte du client (un compte est requis pour en ajouter)
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(readStoredFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Stockage indisponible (navigation privée, quota) : les favoris restent valables pour la session
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [id, ...prev]));
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite: (id: string) => favorites.includes(id),
      toggleFavorite,
    }),
    [favorites, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};