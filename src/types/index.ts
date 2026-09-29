export type ContentType = 
  | 'scholarship' 
  | 'admission' 
  | 'job' 
  | 'article' 
  | 'entry-test' 
  | 'study-material' 
  | 'hackathon' 
  | 'event' 
  | 'ai-tool';

export type StatusType = 'Published' | 'Draft';

export type VerificationStatus = 'Verified' | 'Needs Review' | 'Expired' | 'Demo/Sample';

export type DeadlineState = 'OPEN' | 'CLOSING SOON' | 'EXPIRED' | 'ONGOING';

export interface UniversityAdmission {
  id: string;
  universityName: string;
  shortName: string;
  logoUrl?: string;
  coverImage: string;
  province: 'Punjab' | 'Sindh' | 'KPK' | 'Balochistan' | 'Islamabad' | 'AJK' | 'Gilgit-Baltistan' | 'International';
  city: string;
  type: 'Public' | 'Private' | 'Semi-Government';
  degrees: string[];
  programs: string[];
  eligibility: string;
  deadline?: string;
  session: string; // e.g. Fall 2026, Spring 2027
  feeRange: string;
  sourceName: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  featured: boolean;
  status: StatusType;
  ranking?: string;
  description: string;
}

export interface JobInternship {
  id: string;
  title: string;
  organization: string;
  logoUrl?: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Internship' | 'Remote' | 'Contract';
  freshGrad: boolean;
  experienceLevel: 'Fresh / Entry Level' | '1-2 Years' | '3+ Years' | 'Students Only';
  stipendOrSalary: string;
  deadline?: string;
  sourceName: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  skills: string[];
  description: string;
  featured: boolean;
  status: StatusType;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  country: string;
  flagEmoji?: string;
  level: 'Undergraduate' | 'Masters' | 'PhD' | 'Postdoc' | 'All Levels';
  fundingType: 'Fully Funded' | 'Partial' | 'Tuition Waiver';
  benefits: string[];
  eligibility: string;
  deadline?: string;
  sourceName: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  featured: boolean;
  status: StatusType;
  description: string;
  tags: string[];
}

export interface EntryTest {
  id: string;
  name: string;
  shortName: string;
  conductingBody: string;
  targetPrograms: string;
  registrationDeadline?: string;
  testDate: string;
  eligibility: string;
  syllabusOverview: string;
  totalMarks: number;
  passingMarks: number;
  sourceName: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  pastPapersCount: number;
  featured: boolean;
  status: StatusType;
  sampleMcqs?: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    subject: string;
  }[];
}

export interface InternshipOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote' | 'Not specified by the employer';
  eligibility: string;
  education: string;
  skills: string;
  stipend: string;
  duration: string;
  deadline: string;
  applicationMethod: string;
  officialSourceUrl: string;
  applicationUrl?: string;
  verifiedOn: string;
  status: 'Verified / Open' | 'Needs Verification' | 'Closed / Expired';
  logoUrl?: string;
}

export interface EducationalArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Admissions' | 'Scholarships' | 'Career Guidance' | 'Tech & AI' | 'Study Tips' | 'Policy & News';
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  readTime: string;
  sourceName: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  status: StatusType;
  views: number;
  internships?: InternshipOpportunity[];
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  classLevel: 'Matric (9th-10th)' | 'FSc Pre-Medical' | 'FSc Pre-Engineering' | 'ICS' | 'I.Com' | 'BS / University' | 'CSS / PMS';
  materialType: 'Handwritten Notes' | 'Past Papers' | 'Chapter MCQs' | 'Formula Sheet' | 'Model Papers';
  fileFormat: 'PDF' | 'DOCX' | 'ZIP';
  fileSize: string;
  downloadUrl: string;
  sourceName: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  authorOrSource: string;
  downloadsCount: number;
  featured: boolean;
  status: StatusType;
  description: string;
}

export interface TechArticle {
  id: string;
  title: string;
  topic: 'Generative AI' | 'Agentic AI' | 'Programming' | 'Web Development' | 'Cybersecurity' | 'Tech Careers';
  readTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  keyTakeaways: string[];
  content: string;
  sourceName: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  resources: { name: string; url: string }[];
  featured: boolean;
}

export interface CompetitionHackathon {
  id: string;
  title: string;
  organizer: string;
  type: 'Hackathon' | 'Coding Contest' | 'Innovation Challenge' | 'Science Olympiad' | 'Ideathon';
  prizePool: string;
  deadline?: string;
  eventDate: string;
  eligibility: string;
  locationOrOnline: string;
  sourceName: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  tags: string[];
  featured: boolean;
  status: StatusType;
  description: string;
}

export interface EventWorkshop {
  id: string;
  title: string;
  organizer: string;
  type: 'Workshop' | 'Webinar' | 'Seminar' | 'Conference' | 'Bootcamp';
  mode: 'Online' | 'Offline' | 'Hybrid';
  date: string;
  time: string;
  location: string;
  price: 'Free' | 'Paid';
  sourceName: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  featured: boolean;
  status: StatusType;
  description: string;
  speaker?: string;
}

export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 
    | 'Writing AI'
    | 'Study AI'
    | 'Coding AI'
    | 'Research AI'
    | 'Image AI'
    | 'Video AI'
    | 'Audio AI'
    | 'Productivity AI'
    | 'Presentation AI'
    | 'Resume & Career AI';
  pricingType: 'Free' | 'Freemium' | 'Paid' | 'Free Trial';
  sourceName: string;
  url: string;
  officialUrl: string;
  publishedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  featured: boolean;
  rating: number;
  tags: string[];
}

export interface BookmarkedItem {
  id: string;
  type: ContentType;
  title: string;
  subtitle: string;
  url?: string;
  timestamp: string;
  verificationStatus?: VerificationStatus;
  deadline?: string;
}

export interface GlobalSearchResult {
  id: string;
  type: ContentType;
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  linkTarget: string;
  verificationStatus?: VerificationStatus;
  deadline?: string;
}
