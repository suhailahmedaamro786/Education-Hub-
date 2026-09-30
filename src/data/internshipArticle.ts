import { EducationalArticle } from '../types';

const VERIFIED_ON = '2026-09-29';
const PRODUCTION_URL = 'https://education-hub-dusky.vercel.app/news/latest-internships-pakistan-2026';

export const latestInternshipArticle: EducationalArticle = {
  id: 'art-internships-pakistan-september-2026',
  slug: 'latest-internships-pakistan-2026',
  title: 'Latest Internship Opportunities in Pakistan – September 2026',
  category: 'Career Guidance',
  excerpt: 'Explore verified internship opportunities in Pakistan for students and fresh graduates, including eligibility, location, stipend, deadline and official application information.',
  content: `Education Hub is sharing the internship opportunities below after checking the listed source on 29 September 2026. Only opportunities marked 🟢 Verified / Open are included.

### Verification
- 🟢 Verified / Open
- Last Verified: 29 September 2026

Internship availability can change quickly. Candidates should verify the employer's current listing before applying.

Where information is unavailable, this article uses “Not specified by the employer” rather than guessing.`,
  author: 'Education Hub Research Cell',
  authorRole: 'Content & Research',
  readTime: '7 min read',
  sourceName: 'Verified internship listings',
  officialUrl: PRODUCTION_URL,
  publishedAt: VERIFIED_ON,
  lastVerifiedAt: VERIFIED_ON,
  verificationStatus: 'Verified',
  imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
  tags: ['Internships', 'Pakistan', 'Students', 'Fresh Graduates', 'Career Opportunities', '2026'],
  featured: true,
  status: 'Published',
  views: 0,
  seoTitle: 'Latest Internship Opportunities in Pakistan 2026 – Students & Fresh Graduates',
  metaDescription: 'Explore verified internship opportunities in Pakistan for students and fresh graduates, including eligibility, location, stipend, deadline and official application information.',
  canonicalUrl: PRODUCTION_URL,
  ogTitle: 'Latest Internship Opportunities in Pakistan 2026 – Students & Fresh Graduates',
  ogDescription: 'Explore verified internship opportunities in Pakistan for students and fresh graduates, including eligibility, location, stipend, deadline and official application information.',
  internships: [
    {
      id: 'intern-codenexsys-web-development-2026',
      title: 'Web Development Intern',
      company: 'CodeNexSys',
      location: 'North Nazimabad, Karachi',
      workMode: 'On-site',
      eligibility: 'Not specified by the employer',
      education: 'Not specified by the employer',
      skills: 'Not specified by the employer',
      stipend: 'PKR 20,000–30,000/month',
      duration: '2 months',
      deadline: 'Not specified',
      applicationMethod: 'Apply through the verified LinkedIn listing.',
      officialSourceUrl: 'https://pk.linkedin.com/jobs/view/web-development-intern-at-codenexsys-4468996450',
      applicationUrl: 'https://pk.linkedin.com/jobs/view/web-development-intern-at-codenexsys-4468996450',
      verifiedOn: VERIFIED_ON,
      status: 'Verified / Open'
    },
    {
      id: 'intern-8cloud-technologies-2026',
      title: 'Internship Program',
      company: '8Cloud Technologies',
      location: 'Karachi',
      workMode: 'On-site & Hybrid',
      eligibility: 'Not specified by the employer',
      education: 'Not specified by the employer',
      skills: 'Not specified by the employer',
      stipend: 'PKR 25,000–30,000/month',
      duration: '2 months',
      deadline: 'Not specified',
      applicationMethod: 'Apply through the verified LinkedIn listing.',
      officialSourceUrl: 'https://pk.linkedin.com/jobs/view/internship-program-at-8cloud-technologies-4470923090',
      applicationUrl: 'https://pk.linkedin.com/jobs/view/internship-program-at-8cloud-technologies-4470923090',
      verifiedOn: VERIFIED_ON,
      status: 'Verified / Open'
    },
    {
      id: 'intern-techstack-seo-2026',
      title: 'SEO Internship Program',
      company: 'TechStack Ltd',
      location: 'Gulshan-e-Iqbal, Karachi',
      workMode: 'On-site',
      eligibility: 'Not specified by the employer',
      education: 'Not specified by the employer',
      skills: 'SEO',
      stipend: 'PKR 20,000–25,000/month',
      duration: 'Not specified',
      deadline: 'Not specified',
      applicationMethod: 'Apply through the verified LinkedIn listing.',
      officialSourceUrl: 'https://pk.linkedin.com/jobs/view/seo-internship-program-at-techstack-ltd-4470398487',
      applicationUrl: 'https://pk.linkedin.com/jobs/view/seo-internship-program-at-techstack-ltd-4470398487',
      verifiedOn: VERIFIED_ON,
      status: 'Verified / Open'
    },
    {
      id: 'intern-itechgemini-product-manager-2026',
      title: 'Product Manager Intern',
      company: 'iTechGemini Pvt Ltd',
      location: 'Pakistan',
      workMode: 'Remote',
      eligibility: 'Not specified by the employer',
      education: 'Not specified by the employer',
      skills: 'Product management',
      stipend: 'Not specified by employer',
      duration: '3 months',
      deadline: 'Not specified',
      applicationMethod: 'Apply through the verified LinkedIn listing.',
      officialSourceUrl: 'https://pk.linkedin.com/jobs/view/product-manager-intern-remote-at-itechgemini-pvt-ltd-4470559543',
      applicationUrl: 'https://pk.linkedin.com/jobs/view/product-manager-intern-remote-at-itechgemini-pvt-ltd-4470559543',
      verifiedOn: VERIFIED_ON,
      status: 'Verified / Open'
    },
    {
      id: 'intern-tech-avenue-uiux-2026',
      title: 'UI/UX Designer Intern',
      company: 'Tech Avenue Private Limited',
      location: 'Pakistan',
      workMode: 'Remote / Full-time',
      eligibility: 'Not specified by the employer',
      education: 'Not specified by the employer',
      skills: 'UI/UX design',
      stipend: 'Not specified by employer',
      duration: 'Not specified',
      deadline: '24 October 2026',
      applicationMethod: 'Apply through the verified LinkedIn source.',
      officialSourceUrl: 'https://pk.linkedin.com/in/bibi-marium-khan-6482831b9',
      applicationUrl: 'https://pk.linkedin.com/in/bibi-marium-khan-6482831b9',
      verifiedOn: VERIFIED_ON,
      status: 'Verified / Open'
    },
    {
      id: 'intern-ydp-batch-2-2026',
      title: 'Youth Digital Program (YDP) Batch 2',
      company: 'Youth Digital Program (YDP)',
      location: 'Pakistan-China Friendship Centre, Islamabad',
      workMode: 'On-site',
      eligibility: 'Not specified by the employer',
      education: 'Not specified by the employer',
      skills: 'Digital skills',
      stipend: 'Unpaid',
      duration: 'Not specified',
      deadline: 'Not specified',
      applicationMethod: 'Apply through the verified LinkedIn listing.',
      officialSourceUrl: 'https://pk.linkedin.com/jobs/view/ydp-batch-2-internship-applications-are-open-at-youth-digital-program-ydp-4466684598',
      applicationUrl: 'https://pk.linkedin.com/jobs/view/ydp-batch-2-internship-applications-are-open-at-youth-digital-program-ydp-4466684598',
      verifiedOn: VERIFIED_ON,
      status: 'Verified / Open'
    }
  ]
};
