import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  UniversityAdmission,
  JobInternship,
  Scholarship,
  EntryTest,
  EducationalArticle,
  StudyMaterial,
  TechArticle,
  CompetitionHackathon,
  EventWorkshop,
  AITool,
  BookmarkedItem,
  GlobalSearchResult,
  StatusType,
} from '../types';
import {
  initialUniversities,
  initialScholarships,
  initialJobs,
  initialEntryTests,
  initialArticles,
  initialStudyMaterials,
  initialTechArticles,
  initialHackathons,
  initialEvents,
  initialAITools,
} from '../data/initialData';

interface DataContextType {
  // Navigation & Routing
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  selectedEntryTestId: string | null;
  setSelectedEntryTestId: (id: string | null) => void;

  // Data Collections
  universities: UniversityAdmission[];
  scholarships: Scholarship[];
  jobs: JobInternship[];
  entryTests: EntryTest[];
  articles: EducationalArticle[];
  studyMaterials: StudyMaterial[];
  techArticles: TechArticle[];
  hackathons: CompetitionHackathon[];
  events: EventWorkshop[];
  aiTools: AITool[];

  // Bookmarks
  bookmarks: BookmarkedItem[];
  toggleBookmark: (item: BookmarkedItem) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;

  // Global Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  allSearchItems: GlobalSearchResult[];

  // Modals & Panels
  isSavedDrawerOpen: boolean;
  setIsSavedDrawerOpen: (open: boolean) => void;
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;
  shareModal: { isOpen: boolean; title: string; url: string; category?: string };
  openShareModal: (title: string, url: string, category?: string) => void;
  closeShareModal: () => void;
  
  // Notification Toast
  notification: { message: string; type: 'success' | 'info' | 'error' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Admin Mode & Actions
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  addContentItem: (collectionType: string, newItem: any) => void;
  updateContentItem: (collectionType: string, id: string, updatedFields: any) => void;
  deleteContentItem: (collectionType: string, id: string) => void;
  toggleStatus: (collectionType: string, id: string) => void;
  toggleFeatured: (collectionType: string, id: string) => void;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  UNIVERSITIES: 'eduhub_universities',
  SCHOLARSHIPS: 'eduhub_scholarships',
  JOBS: 'eduhub_jobs',
  TESTS: 'eduhub_entry_tests',
  ARTICLES: 'eduhub_articles',
  MATERIALS: 'eduhub_study_materials',
  TECH: 'eduhub_tech_articles',
  HACKATHONS: 'eduhub_hackathons',
  EVENTS: 'eduhub_events',
  AI_TOOLS: 'eduhub_ai_tools',
  BOOKMARKS: 'eduhub_bookmarks',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const initialArticleFromPath = (() => {
    if (typeof window === 'undefined') return null;
    const match = window.location.pathname.match(/^\\/news\\/(.+)$/);
    if (!match) return null;
    const slug = decodeURIComponent(match[1]);
    return initialArticles.find(article => article.slug === slug) || null;
  })();

  const [currentView, setCurrentView] = useState<string>(initialArticleFromPath ? 'news' : (typeof window !== 'undefined' && window.location.pathname === '/news' ? 'news' : 'home'));
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(initialArticleFromPath?.id || null);
  const [selectedEntryTestId, setSelectedEntryTestId] = useState<string | null>(null);

  // Search & Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [shareModal, setShareModal] = useState<{ isOpen: boolean; title: string; url: string; category?: string }>({
    isOpen: false,
    title: '',
    url: '',
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Helper for localStorage
  const loadState = <T,>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      console.warn(`Failed to read ${key} from storage:`, e);
      return fallback;
    }
  };

  // State instances
  const [universities, setUniversities] = useState<UniversityAdmission[]>(() => loadState(STORAGE_KEYS.UNIVERSITIES, initialUniversities));
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => loadState(STORAGE_KEYS.SCHOLARSHIPS, initialScholarships));
  const [jobs, setJobs] = useState<JobInternship[]>(() => loadState(STORAGE_KEYS.JOBS, initialJobs));
  const [entryTests, setEntryTests] = useState<EntryTest[]>(() => loadState(STORAGE_KEYS.TESTS, initialEntryTests));
  const [articles, setArticles] = useState<EducationalArticle[]>(() => loadState(STORAGE_KEYS.ARTICLES, initialArticles));
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(() => loadState(STORAGE_KEYS.MATERIALS, initialStudyMaterials));
  const [techArticles, setTechArticles] = useState<TechArticle[]>(() => loadState(STORAGE_KEYS.TECH, initialTechArticles));
  const [hackathons, setHackathons] = useState<CompetitionHackathon[]>(() => loadState(STORAGE_KEYS.HACKATHONS, initialHackathons));
  const [events, setEvents] = useState<EventWorkshop[]>(() => loadState(STORAGE_KEYS.EVENTS, initialEvents));
  const [aiTools, setAiTools] = useState<AITool[]>(() => loadState(STORAGE_KEYS.AI_TOOLS, initialAITools));
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>(() => loadState(STORAGE_KEYS.BOOKMARKS, []));

  // Sync to local storage
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.UNIVERSITIES, JSON.stringify(universities)); }, [universities]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SCHOLARSHIPS, JSON.stringify(scholarships)); }, [scholarships]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(entryTests)); }, [entryTests]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles)); }, [articles]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(studyMaterials)); }, [studyMaterials]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TECH, JSON.stringify(techArticles)); }, [techArticles]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.HACKATHONS, JSON.stringify(hackathons)); }, [hackathons]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.AI_TOOLS, JSON.stringify(aiTools)); }, [aiTools]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks)); }, [bookmarks]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedArticleId, selectedEntryTestId]);

  // Toast notification
  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Bookmarking
  const toggleBookmark = (item: BookmarkedItem) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === item.id);
      if (exists) {
        showNotification(`Removed "${item.title.slice(0, 30)}..." from saved items`, 'info');
        return prev.filter(b => b.id !== item.id);
      } else {
        showNotification(`Saved "${item.title.slice(0, 30)}..." to your bookmarks!`, 'success');
        return [item, ...prev];
      }
    });
  };

  const isBookmarked = (id: string) => bookmarks.some(b => b.id === id);
  const clearBookmarks = () => {
    setBookmarks([]);
    showNotification('All saved bookmarks cleared', 'info');
  };

  // Share modal
  const openShareModal = (title: string, url: string, category?: string) => {
    setShareModal({
      isOpen: true,
      title,
      url: url || window.location.href,
      category,
    });
  };

  const closeShareModal = () => {
    setShareModal(prev => ({ ...prev, isOpen: false }));
  };

  // Global search compilation
  const allSearchItems = useMemo<GlobalSearchResult[]>(() => {
    const list: GlobalSearchResult[] = [];

    scholarships.filter(s => s.status === 'Published').forEach(s => {
      list.push({
        id: s.id,
        type: 'scholarship',
        title: s.title,
        subtitle: `${s.provider} • ${s.country} • ${s.fundingType}`,
        description: s.description,
        tags: s.tags,
        linkTarget: 'scholarships'
      });
    });

    universities.filter(u => u.status === 'Published').forEach(u => {
      list.push({
        id: u.id,
        type: 'admission',
        title: `${u.universityName} (${u.shortName})`,
        subtitle: `${u.city}, ${u.province} • ${u.session} • Deadline: ${u.deadline}`,
        description: `${u.ranking || ''} - ${u.programs.slice(0, 4).join(', ')}`,
        tags: u.programs,
        linkTarget: 'admissions'
      });
    });

    jobs.filter(j => j.status === 'Published').forEach(j => {
      list.push({
        id: j.id,
        type: 'job',
        title: j.title,
        subtitle: `${j.organization} • ${j.location} • ${j.jobType}`,
        description: j.description,
        tags: j.skills,
        linkTarget: 'jobs'
      });
    });

    entryTests.filter(t => t.status === 'Published').forEach(t => {
      list.push({
        id: t.id,
        type: 'entry-test',
        title: `${t.name} (${t.shortName})`,
        subtitle: `${t.conductingBody} • Test Date: ${t.testDate}`,
        description: t.syllabusOverview,
        tags: ['MDCAT', 'ECAT', 'NET', 'NTS', 'Entry Test'],
        linkTarget: 'entry-tests'
      });
    });

    articles.filter(a => a.status === 'Published').forEach(a => {
      list.push({
        id: a.id,
        type: 'article',
        title: a.title,
        subtitle: `${a.category} • By ${a.author} • ${a.readTime}`,
        description: a.excerpt,
        tags: a.tags,
        linkTarget: 'news'
      });
    });

    studyMaterials.filter(m => m.status === 'Published').forEach(m => {
      list.push({
        id: m.id,
        type: 'study-material',
        title: m.title,
        subtitle: `${m.subject} • ${m.classLevel} • ${m.materialType}`,
        description: m.description,
        tags: [m.subject, m.classLevel, m.materialType],
        linkTarget: 'notes'
      });
    });

    hackathons.filter(h => h.status === 'Published').forEach(h => {
      list.push({
        id: h.id,
        type: 'hackathon',
        title: h.title,
        subtitle: `${h.organizer} • Prize: ${h.prizePool}`,
        description: h.description,
        tags: h.tags,
        linkTarget: 'hackathons'
      });
    });

    events.filter(e => e.status === 'Published').forEach(e => {
      list.push({
        id: e.id,
        type: 'event',
        title: e.title,
        subtitle: `${e.organizer} • ${e.mode} • Date: ${e.date}`,
        description: e.description,
        tags: [e.type, e.mode],
        linkTarget: 'events'
      });
    });

    aiTools.forEach(tool => {
      list.push({
        id: tool.id,
        type: 'ai-tool',
        title: tool.name,
        subtitle: `${tool.category} • ${tool.pricingType}`,
        description: tool.description,
        tags: tool.tags,
        linkTarget: 'ai-tools'
      });
    });

    return list;
  }, [scholarships, universities, jobs, entryTests, articles, studyMaterials, hackathons, events, aiTools]);

  // Admin Actions
  const addContentItem = (collectionType: string, newItem: any) => {
    const id = `${collectionType.slice(0, 3)}-${Date.now()}`;
    const itemWithId = {
      ...newItem,
      id,
      status: (newItem.status || 'Published') as StatusType,
      featured: Boolean(newItem.featured),
      createdAt: new Date().toISOString().split('T')[0]
    };

    switch (collectionType) {
      case 'scholarship':
        setScholarships(prev => [itemWithId, ...prev]);
        break;
      case 'admission':
        setUniversities(prev => [itemWithId, ...prev]);
        break;
      case 'job':
        setJobs(prev => [itemWithId, ...prev]);
        break;
      case 'entry-test':
        setEntryTests(prev => [itemWithId, ...prev]);
        break;
      case 'article':
        setArticles(prev => [itemWithId, ...prev]);
        break;
      case 'study-material':
        setStudyMaterials(prev => [itemWithId, ...prev]);
        break;
      case 'hackathon':
        setHackathons(prev => [itemWithId, ...prev]);
        break;
      case 'event':
        setEvents(prev => [itemWithId, ...prev]);
        break;
      case 'ai-tool':
        setAiTools(prev => [itemWithId, ...prev]);
        break;
      default:
        console.error('Unknown collection type:', collectionType);
    }
    showNotification(`New ${collectionType} added successfully!`, 'success');
  };

  const updateContentItem = (collectionType: string, id: string, updatedFields: any) => {
    const updater = <T extends { id: string }>(list: T[]): T[] =>
      list.map(item => (item.id === id ? { ...item, ...updatedFields } : item));

    switch (collectionType) {
      case 'scholarship': setScholarships(updater); break;
      case 'admission': setUniversities(updater); break;
      case 'job': setJobs(updater); break;
      case 'entry-test': setEntryTests(updater); break;
      case 'article': setArticles(updater); break;
      case 'study-material': setStudyMaterials(updater); break;
      case 'hackathon': setHackathons(updater); break;
      case 'event': setEvents(updater); break;
      case 'ai-tool': setAiTools(updater); break;
    }
    showNotification(`Updated successfully!`, 'success');
  };

  const deleteContentItem = (collectionType: string, id: string) => {
    const filterOut = <T extends { id: string }>(list: T[]): T[] => list.filter(item => item.id !== id);

    switch (collectionType) {
      case 'scholarship': setScholarships(filterOut); break;
      case 'admission': setUniversities(filterOut); break;
      case 'job': setJobs(filterOut); break;
      case 'entry-test': setEntryTests(filterOut); break;
      case 'article': setArticles(filterOut); break;
      case 'study-material': setStudyMaterials(filterOut); break;
      case 'hackathon': setHackathons(filterOut); break;
      case 'event': setEvents(filterOut); break;
      case 'ai-tool': setAiTools(filterOut); break;
    }
    showNotification(`Item removed`, 'info');
  };

  const toggleStatus = (collectionType: string, id: string) => {
    const toggle = <T extends { id: string; status?: StatusType }>(list: T[]): T[] =>
      list.map(item => {
        if (item.id === id) {
          const next = item.status === 'Published' ? 'Draft' : 'Published';
          return { ...item, status: next };
        }
        return item;
      });

    switch (collectionType) {
      case 'scholarship': setScholarships(toggle); break;
      case 'admission': setUniversities(toggle); break;
      case 'job': setJobs(toggle); break;
      case 'entry-test': setEntryTests(toggle); break;
      case 'article': setArticles(toggle); break;
      case 'study-material': setStudyMaterials(toggle); break;
      case 'hackathon': setHackathons(toggle); break;
      case 'event': setEvents(toggle); break;
    }
    showNotification(`Status updated`, 'info');
  };

  const toggleFeatured = (collectionType: string, id: string) => {
    const toggle = <T extends { id: string; featured?: boolean }>(list: T[]): T[] =>
      list.map(item => (item.id === id ? { ...item, featured: !item.featured } : item));

    switch (collectionType) {
      case 'scholarship': setScholarships(toggle); break;
      case 'admission': setUniversities(toggle); break;
      case 'job': setJobs(toggle); break;
      case 'entry-test': setEntryTests(toggle); break;
      case 'article': setArticles(toggle); break;
      case 'study-material': setStudyMaterials(toggle); break;
      case 'hackathon': setHackathons(toggle); break;
      case 'event': setEvents(toggle); break;
      case 'ai-tool': setAiTools(toggle); break;
    }
    showNotification(`Featured state updated`, 'info');
  };

  const resetToDefaults = () => {
    setUniversities(initialUniversities);
    setScholarships(initialScholarships);
    setJobs(initialJobs);
    setEntryTests(initialEntryTests);
    setArticles(initialArticles);
    setStudyMaterials(initialStudyMaterials);
    setTechArticles(initialTechArticles);
    setHackathons(initialHackathons);
    setEvents(initialEvents);
    setAiTools(initialAITools);
    showNotification('System datasets restored to initial defaults', 'success');
  };

  return (
    <DataContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedArticleId,
        setSelectedArticleId,
        selectedEntryTestId,
        setSelectedEntryTestId,
        universities,
        scholarships,
        jobs,
        entryTests,
        articles,
        studyMaterials,
        techArticles,
        hackathons,
        events,
        aiTools,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        allSearchItems,
        isSavedDrawerOpen,
        setIsSavedDrawerOpen,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        shareModal,
        openShareModal,
        closeShareModal,
        notification,
        showNotification,
        isAdmin,
        setIsAdmin,
        addContentItem,
        updateContentItem,
        deleteContentItem,
        toggleStatus,
        toggleFeatured,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
