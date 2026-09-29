import React, { useState, useMemo } from 'react';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Share2, 
  Bookmark, 
  ChevronLeft,
  Sparkles,
  BookOpen,
  Eye,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EducationalArticle } from '../../types';
import { AdSlot } from '../common/AdSlot';
import { getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const NewsPage: React.FC = () => {
  const { 
    articles, 
    selectedArticleId, 
    setSelectedArticleId, 
    bookmarks, 
    toggleBookmark, 
    openShareModal, 
    setCurrentView 
  } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Scholarships', 'Admissions', 'Tech & AI', 'Study Tips', 'Career Guidance'];

  const selectedArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return articles.find(a => a.id === selectedArticleId) || null;
  }, [articles, selectedArticleId]);

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      if (art.status !== 'Published') return false;

      const matchesSearch = 
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchTerm, selectedCategory]);

  const featuredArticle = articles.find(a => a.featured && a.status === 'Published') || articles[0];

  // Article Detail View
  if (selectedArticle) {
    const isSaved = bookmarks.some(b => b.id === selectedArticle.id);
    const relatedArticles = articles
      .filter(a => a.id !== selectedArticle.id && a.status === 'Published')
      .slice(0, 3);

    return (
      <article className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => setSelectedArticleId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          {/* Article Header */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="relative h-64 sm:h-80 w-full bg-slate-900">
              <img 
                src={selectedArticle.imageUrl} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 inline-block mb-2">
                  {selectedArticle.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-serif-brand">
                  {selectedArticle.title}
                </h1>
              </div>
            </div>

            {/* Meta bar */}
            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 font-bold text-slate-900">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  {selectedArticle.author} ({selectedArticle.authorRole})
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {selectedArticle.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {selectedArticle.readTime}
                </span>
                <span className="text-slate-500">
                  Source: <strong className="text-slate-800">{selectedArticle.sourceName}</strong>
                </span>
                {(() => {
                  const verification = getVerificationBadge(selectedArticle.verificationStatus);
                  return (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                      {verification.label}
                    </span>
                  );
                })()}
                <span className="text-slate-400 text-[11px]">
                  {formatLastVerified(selectedArticle.lastVerifiedAt)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedArticle.officialUrl && (
                  <a
                    href={selectedArticle.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs flex items-center gap-1 hover:bg-[#112240] transition-colors shadow-xs"
                  >
                    <span>Official Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => toggleBookmark({
                    id: selectedArticle.id,
                    type: 'article',
                    title: selectedArticle.title,
                    subtitle: `${selectedArticle.category} • ${selectedArticle.author}`,
                    timestamp: new Date().toLocaleDateString()
                  })}
                  className={`p-2 rounded-xl border transition-colors ${
                    isSaved ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                  title="Save article"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openShareModal(selectedArticle.title, window.location.href, selectedArticle.category)}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                  title="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* In-content ad slot: 468x60 Banner */}
            <div className="px-6 pt-2">
              <AdSlot placement="news_banner_468x60" />
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 space-y-5 text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
              {selectedArticle.content}
            </div>

            {/* Tags & Share */}
            <div className="p-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Tags:</span>
                {selectedArticle.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => openShareModal(selectedArticle.title, window.location.href, selectedArticle.category)}
                className="px-4 py-2 rounded-xl bg-[#0A192F] text-amber-300 font-bold text-xs flex items-center gap-2 hover:bg-[#112240]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share with Study Group</span>
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="font-extrabold text-xl text-slate-900 mb-6 font-serif-brand">
              Related Educational Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => setSelectedArticleId(rel.id)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="h-36 overflow-hidden">
                    <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 group-hover:text-blue-900">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span>{rel.readTime}</span>
                      <span className="text-blue-700 font-semibold flex items-center gap-0.5">Read <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Articles Listing View
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Editorial Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              Educational News, Insights & Guides
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Stay ahead with verified breaking reports on PMDC policies, HEC notifications, international scholarship
              roadmaps, and university merit aggregate calculations.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Ad Slot: Native Banner */}
      <AdSlot placement="news_native" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* Featured Lead Story Banner */}
      {featuredArticle && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div 
            onClick={() => setSelectedArticleId(featuredArticle.id)}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-6 relative h-64 lg:h-auto overflow-hidden">
              <img 
                src={featuredArticle.imageUrl} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                Featured Lead Story
              </span>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block mb-2">
                  {featuredArticle.category} • By {featuredArticle.author}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors leading-tight font-serif-brand mb-3">
                  {featuredArticle.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{featuredArticle.readTime} • Published {featuredArticle.publishedAt}</span>
                <span className="text-amber-700 font-bold flex items-center gap-1">
                  Read Complete Story <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Category Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0A192F] text-amber-400'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search news & guides..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-800">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0A192F]/90 text-amber-300 border border-amber-400/30">
                    {article.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-1 mb-2">
                    {(() => {
                      const verification = getVerificationBadge(article.verificationStatus);
                      return (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                          {verification.label}
                        </span>
                      );
                    })()}
                    <span className="text-[10px] text-slate-400 font-medium">
                      {formatLastVerified(article.lastVerifiedAt)}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Source: {article.sourceName} • {article.readTime}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-900 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700">By {article.author}</span>
                  <span className="text-blue-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
