export const MIN_PASSWORD_LENGTH = 8;

// Retire les séparateurs et le préfixe pays (+225 ou 00225) : "+225 07 01 23 45 67" devient "0701234567"
export const normalizePhone = (value: string): string => {
  const compact = value.replace(/[\s.\-()]/g, '');
  if (compact.startsWith('+225')) return compact.slice(4);
  if (compact.startsWith('00225')) return compact.slice(5);
  return compact;
};

// Numéro ivoirien à 10 chiffres commençant par 0
export const isValidPhone = (value: string): boolean => /^0\d{9}$/.test(normalizePhone(value));

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());