/**
 * Central site configuration for Education Hub
 * Base URL is configurable via VITE_SITE_URL environment variable.
 */

export const SITE_CONFIG = {
  name: 'Education Hub',
  tagline: 'Learn • Grow • Succeed',
  description: 'Educational directory and resource platform helping students discover scholarships, admissions, career pathways, entry test preparation, and study utilities.',
  founder: 'Suhail Ahmed Aamro',
  technologyPartner: 'AgentForce Tech',
  // Configurable base URL with fallback to the official deployed app address
  baseUrl: (import.meta.env.VITE_SITE_URL || 'https://education-hub-learn-grow-succeed.ai.studio').replace(/\/+$/, ''),
  editorialContact: 'contact@education-hub-learn-grow-succeed.ai.studio', // Official correspondence
};

/**
 * Returns an absolute URL using the configured base URL.
 */
export function getAbsoluteUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.baseUrl}${cleanPath}`;
}
