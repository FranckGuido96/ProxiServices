import { useContext } from 'react';
import { FavoritesContext, FavoritesContextValue } from '../context/favoritesContext';

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé à l\'intérieur de <FavoritesProvider>');
  }
  return context;
}