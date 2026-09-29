/**
 * Education Hub - Sitemap XML Generation Utility
 * Generates SEO-compliant sitemap XML compliant with sitemaps.org protocol 0.9.
 */

import { initialArticles, initialScholarships, initialUniversities } from '../data/initialData';
import { SITE_CONFIG } from '../config/siteConfig';

export interface SitemapRoute {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
  label: string;
}

export const MAIN_SITEMAP_ROUTES: SitemapRoute[] = [
  {
    path: '/',
    label: 'Home',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    path: '/admissions',
    label: 'Admissions & Universities',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    path: '/scholarships',
    label: 'Scholarships',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    path: '/jobs',
    label: 'Jobs & Internships',
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    path: '/entry-tests',
    label: 'Entry Tests (MDCAT, ECAT, NET)',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '/news',
    label: 'Educational News & Updates',
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    path: '/notes',
    label: 'Notes & Study Material',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '/ai-tech',
    label: 'AI & Technology',
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    path: '/hackathons',
    label: 'Competitions & Hackathons',
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    path: '/events',
    label: 'Events & Workshops',
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    path: '/student-tools',
    label: 'Free Student Tools',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/ai-tools',
    label: 'AI Tools Directory',
    changefreq: 'weekly',
    priority: 0.7,
  },
];

/**
 * Generates the complete XML string for the sitemap.
 * @param baseUrl The base domain (defaults to SITE_CONFIG.baseUrl or window.location.origin)
 * @param includeDynamicEntities Whether to append individual news articles and scholarships
 */
export function generateSitemapXml(
  baseUrl?: string,
  includeDynamicEntities: boolean = true
): string {
  const domain = (
    baseUrl ||
    (typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_CONFIG.baseUrl)
  ).replace(/\/+$/, '');

  const today = new Date().toISOString().split('T')[0];

  const urlEntries: string[] = [];

  // 1. Add All Main Hub Pages
  for (const route of MAIN_SITEMAP_ROUTES) {
    const loc = `${domain}${route.path}`;
    const lastmod = route.lastmod || today;

    urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`);
  }

  // 2. Add Dynamic Educational Articles
  if (includeDynamicEntities && initialArticles?.length) {
    for (const article of initialArticles) {
      if (article.status === 'Published') {
        const loc = `${domain}/news?article=${encodeURIComponent(article.slug || article.id)}`;
        urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${article.publishedAt || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
      }
    }
  }

  // 3. Add Dynamic Scholarships
  if (includeDynamicEntities && initialScholarships?.length) {
    for (const sch of initialScholarships) {
      if (sch.status === 'Published') {
        const loc = `${domain}/scholarships?id=${encodeURIComponent(sch.id)}`;
        urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
      }
    }
  }

  // 4. Add Dynamic University Admissions
  if (includeDynamicEntities && initialUniversities?.length) {
    for (const uni of initialUniversities) {
      if (uni.status === 'Published') {
        const loc = `${domain}/admissions?id=${encodeURIComponent(uni.id)}`;
        urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${uni.publishedAt || today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
      }
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries.join('\n')}
</urlset>`;
}

/**
 * Triggers a browser download of the generated sitemap.xml file.
 */
export function downloadSitemapXml(baseUrl?: string): void {
  const xmlContent = generateSitemapXml(baseUrl, true);
  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Escapes special XML characters.
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
