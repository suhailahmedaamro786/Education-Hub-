/**
 * Education Hub - Adsterra Advertising Configuration
 * 
 * INSTRUCTIONS FOR PUBLISHER:
 * 1. Log in to your Adsterra Publisher Dashboard (https://publishers.adsterra.com/).
 * 2. Copy the exact code snippet for each activated ad unit.
 * 3. Paste the code into the `code` property of the corresponding placement below.
 * 4. Change `enabled: false` to `enabled: true` for that placement.
 * 
 * IMPORTANT:
 * - Do not modify the Adsterra script content when pasting.
 * - Paste the complete script/div code as provided by Adsterra into the template literal.
 * - If `enabled` is false or `code` is empty, no ads or placeholders will be rendered on the website.
 * - Popunder and Smartlink are NOT included in automatic placements to ensure optimal student UX.
 */

export type AdType =
  | 'banner_728x90'
  | 'banner_300x250'
  | 'banner_468x60'
  | 'banner_160x600'
  | 'banner_320x50'
  | 'native_banner';

export type AdPlacement =
  // Homepage
  | 'home_header_728x90'
  | 'home_native_banner'
  | 'home_footer_728x90'
  // Scholarships
  | 'scholarships_header_728x90'
  | 'scholarships_native_banner'
  | 'scholarships_sidebar_300x250'
  // Jobs
  | 'jobs_header_728x90'
  | 'jobs_native_banner'
  | 'jobs_sidebar_300x250'
  // News
  | 'news_header_728x90'
  | 'news_native_banner'
  | 'news_incontent_468x60'
  // Admissions & Entry Tests
  | 'admissions_header_728x90'
  | 'entry_tests_header_728x90'
  | 'entry_tests_incontent_300x250'
  // Free Student Tools & Notes
  | 'student_tools_header_728x90'
  | 'notes_header_728x90'
  // Mobile Sticky
  | 'mobile_sticky_320x50';

export interface AdUnitConfig {
  placement: AdPlacement;
  adType: AdType;
  label: string;
  enabled: boolean;
  code: string;
  width: number;
  height: number;
  isResponsive?: boolean;
}

export const ADS_CONFIG: Record<AdPlacement, AdUnitConfig> = {
  // 1. HOMEPAGE PLACEMENTS
  home_header_728x90: {
    placement: 'home_header_728x90',
    adType: 'banner_728x90',
    label: 'Homepage Top Header Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 728x90 CODE HERE
    width: 728,
    height: 90,
    isResponsive: true,
  },
  home_native_banner: {
    placement: 'home_native_banner',
    adType: 'native_banner',
    label: 'Homepage Native In-Content Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA NATIVE BANNER CODE HERE
    width: 728,
    height: 180,
    isResponsive: true,
  },
  home_footer_728x90: {
    placement: 'home_footer_728x90',
    adType: 'banner_728x90',
    label: 'Homepage Footer Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 728x90 FOOTER CODE HERE
    width: 728,
    height: 90,
    isResponsive: true,
  },

  // 2. SCHOLARSHIP PLACEMENTS
  scholarships_header_728x90: {
    placement: 'scholarships_header_728x90',
    adType: 'banner_728x90',
    label: 'Scholarships Top Header Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 728x90 CODE HERE
    width: 728,
    height: 90,
    isResponsive: true,
  },
  scholarships_native_banner: {
    placement: 'scholarships_native_banner',
    adType: 'native_banner',
    label: 'Scholarships Native In-Feed Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA NATIVE BANNER CODE HERE
    width: 728,
    height: 180,
    isResponsive: true,
  },
  scholarships_sidebar_300x250: {
    placement: 'scholarships_sidebar_300x250',
    adType: 'banner_300x250',
    label: 'Scholarships Sidebar Rectangle Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 300x250 CODE HERE
    width: 300,
    height: 250,
  },

  // 3. JOBS & INTERNSHIPS PLACEMENTS
  jobs_header_728x90: {
    placement: 'jobs_header_728x90',
    adType: 'banner_728x90',
    label: 'Jobs Top Header Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 728x90 CODE HERE
    width: 728,
    height: 90,
    isResponsive: true,
  },
  jobs_native_banner: {
    placement: 'jobs_native_banner',
    adType: 'native_banner',
    label: 'Jobs Native In-Feed Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA NATIVE BANNER CODE HERE
    width: 728,
    height: 180,
    isResponsive: true,
  },
  jobs_sidebar_300x250: {
    placement: 'jobs_sidebar_300x250',
    adType: 'banner_300x250',
    label: 'Jobs Sidebar Rectangle Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 300x250 CODE HERE
    width: 300,
    height: 250,
  },

  // 4. NEWS & ARTICLES PLACEMENTS
  news_header_728x90: {
    placement: 'news_header_728x90',
    adType: 'banner_728x90',
    label: 'News Header Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 728x90 CODE HERE
    width: 728,
    height: 90,
    isResponsive: true,
  },
  news_native_banner: {
    placement: 'news_native_banner',
    adType: 'native_banner',
    label: 'News Native Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA NATIVE BANNER CODE HERE
    width: 728,
    height: 180,
    isResponsive: true,
  },
  news_incontent_468x60: {
    placement: 'news_incontent_468x60',
    adType: 'banner_468x60',
    label: 'News In-Article 468x60 / Responsive Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 468x60 CODE HERE
    width: 468,
    height: 60,
    isResponsive: true,
  },

  // 5. ADMISSIONS & ENTRY TESTS PLACEMENTS
  admissions_header_728x90: {
    placement: 'admissions_header_728x90',
    adType: 'banner_728x90',
    label: 'Admissions Header Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 728x90 CODE HERE
    width: 728,
    height: 90,
    isResponsive: true,
  },
  entry_tests_header_728x90: {
    placement: 'entry_tests_header_728x90',
    adType: 'banner_728x90',
    label: 'Entry Tests Header Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 728x90 CODE HERE
    width: 728,
    height: 90,
    isResponsive: true,
  },
  entry_tests_incontent_300x250: {
    placement: 'entry_tests_incontent_300x250',
    adType: 'banner_300x250',
    label: 'Entry Tests In-Content 300x250 Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 300x250 CODE HERE
    width: 300,
    height: 250,
  },

  // 6. TOOLS & NOTES PLACEMENTS
  student_tools_header_728x90: {
    placement: 'student_tools_header_728x90',
    adType: 'banner_728x90',
    label: 'Student Tools Header Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 728x90 CODE HERE
    width: 728,
    height: 90,
    isResponsive: true,
  },
  notes_header_728x90: {
    placement: 'notes_header_728x90',
    adType: 'banner_728x90',
    label: 'Study Notes Header Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 728x90 CODE HERE
    width: 728,
    height: 90,
    isResponsive: true,
  },

  // 7. MOBILE STICKY (OPTIONAL)
  mobile_sticky_320x50: {
    placement: 'mobile_sticky_320x50',
    adType: 'banner_320x50',
    label: 'Mobile Sticky 320x50 Banner',
    enabled: false,
    code: ``, // PASTE YOUR REAL ADSTERRA 320x50 CODE HERE
    width: 320,
    height: 50,
  },
};
