import React from 'react';
import { X, BookmarkX, ExternalLink, Trash2, BookOpen, Award, Briefcase, FileCheck2, Layers } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const SavedDrawer: React.FC = () => {
  const { 
    isSavedDrawerOpen, 
    setIsSavedDrawerOpen, 
    bookmarks, 
    toggleBookmark, 
    clearBookmarks,
    setCurrentView 
  } = useData();

  if (!isSavedDrawerOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'scholarship': return <Award className="w-4 h-4 text-amber-500" />;
      case 'admission': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'job': return <Briefcase className="w-4 h-4 text-emerald-500" />;
      case 'entry-test': return <FileCheck2 className="w-4 h-4 text-purple-500" />;
      default: return <Layers className="w-4 h-4 text-indigo-500" />;
    }
  };

  const handleNavigate = (type: string) => {
    setIsSavedDrawerOpen(false);
    if (type === 'scholarship') setCurrentView('scholarships');
    else if (type === 'admission') setCurrentView('admissions');
    else if (type === 'job') setCurrentView('jobs');
    else if (type === 'entry-test') setCurrentView('entry-tests');
    else if (type === 'study-material') setCurrentView('notes');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#0A192F] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold">
              ★
            </div>
            <div>
              <h3 className="font-bold text-sm">Saved Opportunities ({bookmarks.length})</h3>
              <p className="text-[11px] text-amber-300">Your personalized study & career shortlist</p>
            </div>
          </div>
          <button
            onClick={() => setIsSavedDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <BookmarkX className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">No saved opportunities yet</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Bookmark scholarships, admissions, test dates, and job deadlines by clicking the bookmark icon on any card!
              </p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-3.5 transition-all group relative"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-white shadow-xs shrink-0 mt-0.5">
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {item.type}
                      </span>
                      <h4 
                        onClick={() => handleNavigate(item.type)}
                        className="font-bold text-slate-900 text-xs sm:text-sm hover:text-blue-700 cursor-pointer line-clamp-2"
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleBookmark(item)}
                    className="text-slate-400 hover:text-rose-600 p-1 transition-colors shrink-0"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">Saved: {item.timestamp}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNavigate(item.type)}
                      className="text-amber-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Explore</span>
                    </button>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 font-semibold hover:underline flex items-center gap-0.5"
                      >
                        <span>Official Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarks.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={clearBookmarks}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Shortlist</span>
            </button>
            <button
              onClick={() => setIsSavedDrawerOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#0A192F] text-amber-300 font-bold text-xs hover:bg-[#112240]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
