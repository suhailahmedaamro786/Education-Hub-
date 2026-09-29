import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Briefcase, 
  FileCheck2, 
  Newspaper, 
  Layers, 
  Bot, 
  FolderGit2, 
  Calendar 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ContentType } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    allSearchItems, 
    setCurrentView,
    setSelectedArticleId,
    setSelectedEntryTestId
  } = useData();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener: Cmd+K or Ctrl+K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'scholarship', label: 'Scholarships' },
    { id: 'admission', label: 'Admissions' },
    { id: 'job', label: 'Jobs & Internships' },
    { id: 'entry-test', label: 'Entry Tests' },
    { id: 'article', label: 'Articles' },
    { id: 'study-material', label: 'Study Notes' },
    { id: 'ai-tool', label: 'AI Tools' },
    { id: 'hackathon', label: 'Hackathons' },
    { id: 'event', label: 'Events' },
  ];

  const filteredResults = allSearchItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(q);
    const subtitleMatch = item.subtitle.toLowerCase().includes(q);
    const descMatch = item.description.toLowerCase().includes(q);
    const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(q));

    return titleMatch || subtitleMatch || descMatch || tagsMatch;
  });

  const getIcon = (type: ContentType) => {
    switch (type) {
      case 'scholarship': return <Award className="w-4 h-4 text-amber-500" />;
      case 'admission': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'job': return <Briefcase className="w-4 h-4 text-emerald-500" />;
      case 'entry-test': return <FileCheck2 className="w-4 h-4 text-purple-500" />;
      case 'article': return <Newspaper className="w-4 h-4 text-rose-500" />;
      case 'study-material': return <Layers className="w-4 h-4 text-indigo-500" />;
      case 'ai-tool': return <Bot className="w-4 h-4 text-cyan-500" />;
      case 'hackathon': return <FolderGit2 className="w-4 h-4 text-orange-500" />;
      case 'event': return <Calendar className="w-4 h-4 text-teal-500" />;
      default: return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleSelect = (targetView: string, itemType: ContentType, itemId: string) => {
    setIsSearchOpen(false);
    if (itemType === 'article') {
      setSelectedArticleId(itemId);
    } else if (itemType === 'entry-test') {
      setSelectedEntryTestId(itemId);
    }
    setCurrentView(targetView);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scholarships, universities, jobs, MDCAT, study material, AI tools..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0A192F] text-amber-400 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-100">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-slate-500 font-medium text-sm">No educational results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for keywords like "NUST", "Fulbright", "MDCAT", "React", "Physics", or "FSc".</p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelect(item.linkTarget, item.type, item.id)}
                className="p-3 hover:bg-amber-50/50 rounded-xl cursor-pointer group transition-all flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-xs transition-colors shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.type.replace('-', ' ')}
                      </span>
                      {item.verificationStatus && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {item.verificationStatus}
                        </span>
                      )}
                      <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-900 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{item.subtitle}</p>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-amber-600 font-semibold shrink-0 self-center">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filteredResults.length} opportunities</span>
          <span className="text-[11px] text-slate-400">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
};
