import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  PlusCircle, 
  ChevronRight,
  Sparkles,
  BookOpen,
  Briefcase,
  Award,
  FileCheck2,
  Newspaper,
  FolderGit2,
  Wrench,
  Bot,
  Calendar,
  Layers
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    setIsSearchOpen, 
    bookmarks, 
    setIsSavedDrawerOpen, 
    setIsSubmitModalOpen,
    setSelectedArticleId,
    setSelectedEntryTestId
  } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);

  const breakingAlerts = [
    '⚡ MDCAT 2026: PMDC releases updated syllabus and weightages.',
    '🎓 NUST Islamabad: Fall 2026 & Spring 2027 Registration opens.',
    '🌍 Fulbright Foreign Student Program 2027: GRE guidelines announced.',
    '💼 Systems Limited & Jazz open applications for Fresh Graduate Batch.',
    '🚀 FAST-NUCES Spring 2027 Computing Programs Registration open.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex(prev => (prev + 1) % breakingAlerts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [breakingAlerts.length]);

  const navLinks = [
    { id: 'home', label: 'Home', icon: GraduationCap },
    { id: 'admissions', label: 'Admissions & Universities', icon: BookOpen },
    { id: 'jobs', label: 'Jobs & Internships', icon: Briefcase },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'entry-tests', label: 'Entry Tests', icon: FileCheck2 },
    { id: 'news', label: 'Educational News', icon: Newspaper },
    { id: 'notes', label: 'Notes & Study Material', icon: Layers },
    { id: 'ai-tech', label: 'AI & Technology', icon: Sparkles },
    { id: 'hackathons', label: 'Hackathons', icon: FolderGit2 },
    { id: 'events', label: 'Events & Workshops', icon: Calendar },
    { id: 'student-tools', label: 'Free Student Tools', icon: Wrench },
    { id: 'ai-tools', label: 'AI Tools Directory', icon: Bot },
  ];

  const handleNavClick = (viewId: string) => {
    setSelectedArticleId(null);
    setSelectedEntryTestId(null);
    setCurrentView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A192F] text-white shadow-lg border-b border-slate-800">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#071120] text-slate-300 text-xs border-b border-slate-800/80 px-4 py-1.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Breaking News Ticker */}
          <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
              Curated Notices
            </span>
            <div className="text-slate-300 truncate text-[11px] sm:text-xs font-medium transition-opacity duration-300">
              {breakingAlerts[newsIndex]}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-4 text-xs shrink-0">
            <button 
              onClick={() => setIsSubmitModalOpen(true)}
              className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1 font-medium"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Opportunity</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Verified Portals</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Pakistan & Global</span>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#0A192F]"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-white font-serif-brand">
                  EDUCATION<span className="text-amber-400">HUB</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  PK & Global
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-300 font-semibold tracking-wider">
                Learn • Grow • Succeed
              </p>
            </div>
          </div>

          {/* Center Search Bar Trigger */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-sm px-4 py-2.5 rounded-xl border border-slate-700/80 hover:border-amber-400/50 transition-all shadow-inner group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-400">Search scholarships, admissions, jobs...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search icon for mobile / small screen */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-amber-400" />
            </button>

            {/* Saved Items Bookmark Button */}
            <button
              onClick={() => setIsSavedDrawerOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-amber-300 border border-slate-700/80 transition-all"
              aria-label="Bookmarks"
              title="Saved Opportunities"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center shadow-sm">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Featured Action CTA button */}
            <button
              onClick={() => handleNavClick('scholarships')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/20 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Find Scholarships</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Category Bar */}
      <nav className="hidden lg:block bg-[#0e213d] border-t border-slate-800/90 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-1 text-xs font-semibold">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400/80'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F] border-b border-slate-800 px-4 pt-2 pb-6 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search Input */}
          <div className="mb-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between bg-slate-800 text-slate-400 px-3 py-2.5 rounded-xl text-sm"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search everything...</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-4">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSubmitModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Educational Opportunity</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
