/**
 * Adsterra Advertising Configuration for Education Hub
 *
 * POLICY & ARCHITECTURAL RULES:
 * 1. Popunder and Smartlink are NOT used automatically.
 * 2. No fake ad IDs or synthetic scripts are generated.
 * 3. When `enabled` is false or `code` is empty, NO fake advertisements or mock placeholders are rendered.
 * 4. Paste the EXACT, UNMODIFIED ad code from your Adsterra Publisher Dashboard into the corresponding `code` string.
 *    Then set `enabled: true`.
 */

export type AdType =
  | 'banner_728x90'
  | 'banner_300x250'
  | 'banner_468x60'
  | 'banner_160x600'
  | 'banner_320x50'
  | 'native_banner'
  | 'custom';

export interface AdUnitConfig {
  /** Identifier/name of the ad slot placement */
  placement: string;
  /** Format of the Adsterra ad unit */
  adType: AdType;
  /**
   * Set to `true` to activate the ad once your real Adsterra code is pasted below.
   * While `false`, nothing will be rendered on the website (no placeholders).
   */
  enabled: boolean;
  /**
   * Paste your REAL Adsterra code snippet here exactly as copied from your Adsterra dashboard.
   * Leave blank until ready.
   */
  code: string;
  /**
   * Execution mode:
   * - 'iframe': Isolated document execution (standard for Banners, prevents `atOptions` clashes).
   * - 'dom': Direct DOM insertion (standard for Native Banner container + invoke.js).
   * - 'auto': Automatically selects based on adType.
   */
  renderMode?: 'auto' | 'iframe' | 'dom';
  /**
   * Dimensions to reserve layout space and prevent Cumulative Layout Shift (CLS).
   */
  dimensions?: {
    width?: number | string;
    height?: number | string;
    minHeight?: number | string;
  };
}

export const ADSTERRA_CONFIG: Record<string, AdUnitConfig> = {
  // ==========================================
  // 1. HOMEPAGE PLACEMENTS
  // ==========================================
  
  /**
   * Placement: Homepage Top Leaderboard (728x90)
   * Location: Directly below the Hero section on the Homepage.
   * Recommended Format: 728x90 Banner
   */
  homepage_banner_728x90: {
    placement: 'homepage_banner_728x90',
    adType: 'banner_728x90',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA 728x90 BANNER CODE HERE
    renderMode: 'iframe',
    dimensions: { width: 728, height: 90, minHeight: 90 },
  },

  /**
   * Placement: Homepage Native Banner
   * Location: In-content section on the Homepage (between curated sections).
   * Recommended Format: Native Banner (Multi-card responsive widget)
   */
  homepage_native: {
    placement: 'homepage_native',
    adType: 'native_banner',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA NATIVE BANNER CODE HERE
    renderMode: 'dom',
    dimensions: { width: '100%', minHeight: 160 },
  },

  // ==========================================
  // 2. SCHOLARSHIP PAGES PLACEMENTS
  // ==========================================

  /**
   * Placement: Scholarship Pages Native Banner
   * Location: Above the scholarship directory cards and filters.
   * Recommended Format: Native Banner
   */
  scholarships_native: {
    placement: 'scholarships_native',
    adType: 'native_banner',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA NATIVE BANNER CODE HERE
    renderMode: 'dom',
    dimensions: { width: '100%', minHeight: 160 },
  },

  /**
   * Placement: Scholarship Pages 300x250 Banner
   * Location: Sub-header / sidebar area on Scholarship pages.
   * Recommended Format: 300x250 Medium Rectangle
   */
  scholarships_banner_300x250: {
    placement: 'scholarships_banner_300x250',
    adType: 'banner_300x250',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA 300x250 BANNER CODE HERE
    renderMode: 'iframe',
    dimensions: { width: 300, height: 250, minHeight: 250 },
  },

  // ==========================================
  // 3. JOBS & INTERNSHIPS PLACEMENTS
  // ==========================================

  /**
   * Placement: Jobs Pages Native Banner
   * Location: Above the job listings feed.
   * Recommended Format: Native Banner
   */
  jobs_native: {
    placement: 'jobs_native',
    adType: 'native_banner',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA NATIVE BANNER CODE HERE
    renderMode: 'dom',
    dimensions: { width: '100%', minHeight: 160 },
  },

  /**
   * Placement: Jobs Pages 300x250 Banner
   * Location: Sidebar / header placement on Jobs page.
   * Recommended Format: 300x250 Medium Rectangle
   */
  jobs_banner_300x250: {
    placement: 'jobs_banner_300x250',
    adType: 'banner_300x250',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA 300x250 BANNER CODE HERE
    renderMode: 'iframe',
    dimensions: { width: 300, height: 250, minHeight: 250 },
  },

  // ==========================================
  // 4. NEWS & ARTICLES PLACEMENTS
  // ==========================================

  /**
   * Placement: News Pages Native Banner
   * Location: In the news hub feed above news categories.
   * Recommended Format: Native Banner
   */
  news_native: {
    placement: 'news_native',
    adType: 'native_banner',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA NATIVE BANNER CODE HERE
    renderMode: 'dom',
    dimensions: { width: '100%', minHeight: 160 },
  },

  /**
   * Placement: News Pages 468x60 Banner
   * Location: Inside article view & header.
   * Recommended Format: 468x60 Full Banner
   */
  news_banner_468x60: {
    placement: 'news_banner_468x60',
    adType: 'banner_468x60',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA 468x60 BANNER CODE HERE
    renderMode: 'iframe',
    dimensions: { width: 468, height: 60, minHeight: 60 },
  },

  // ==========================================
  // 5. DESKTOP SIDEBAR PLACEMENT
  // ==========================================

  /**
   * Placement: Desktop Sidebar (300x250 or 160x600)
   * Location: Sticky desktop sidebar column.
   * Recommended Format: 300x250 or 160x600
   */
  desktop_sidebar: {
    placement: 'desktop_sidebar',
    adType: 'banner_300x250',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA 300x250 OR 160x600 BANNER CODE HERE
    renderMode: 'iframe',
    dimensions: { width: 300, height: 250, minHeight: 250 },
  },

  // ==========================================
  // 6. MOBILE RESPONSIVE PLACEMENT
  // ==========================================

  /**
   * Placement: Mobile Banner (320x50)
   * Location: Mobile screens header/footer banner.
   * Recommended Format: 320x50 Mobile Leaderboard
   */
  mobile_banner_320x50: {
    placement: 'mobile_banner_320x50',
    adType: 'banner_320x50',
    enabled: false,
    code: ``, // <-- PASTE REAL ADSTERRA 320x50 BANNER CODE HERE
    renderMode: 'iframe',
    dimensions: { width: 320, height: 50, minHeight: 50 },
  },
};

/**
 * Helper to retrieve an ad unit configuration with fallback alias support.
 */
export function getAdsterraConfig(placement: string): AdUnitConfig | undefined {
  if (ADSTERRA_CONFIG[placement]) {
    return ADSTERRA_CONFIG[placement];
  }

  // Common aliases mapping
  const aliasMap: Record<string, string> = {
    'header': 'homepage_banner_728x90',
    'in-content': 'homepage_native',
    'footer': 'homepage_banner_728x90',
    'sidebar': 'desktop_sidebar',
    'scholarships-top': 'scholarships_native',
    'jobs-top': 'jobs_native',
    'news-top': 'news_native',
  };

  const mappedKey = aliasMap[placement];
  if (mappedKey && ADSTERRA_CONFIG[mappedKey]) {
    return ADSTERRA_CONFIG[mappedKey];
  }

  return undefined;
}
