interface SearchCriteria {
  q?: string;
  lieu?: string;
}

// Construit l'adresse de la page de résultats : URLSearchParams encode les caractères spéciaux
// et n'ajoute que les critères renseignés
export const buildSearchPath = ({ q = '', lieu = '' }: SearchCriteria = {}): string => {
  const params = new URLSearchParams();
  if (q.trim()) params.set('q', q.trim());
  if (lieu.trim()) params.set('lieu', lieu.trim());
  const query = params.toString();
  return query ? `/recherche?${query}` : '/recherche';
};