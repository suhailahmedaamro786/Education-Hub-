import React, { useState, useMemo } from 'react';
import { 
  Bot, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Star, 
  Check, 
  Filter, 
  BookOpen, 
  Code, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Layers, 
  Presentation, 
  Briefcase 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AITool } from '../../types';
import { AdSlot } from '../common/AdSlot';
import { getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const AiToolsDirectoryPage: React.FC = () => {
  const { aiTools } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');

  const categories = [
    'All',
    'Writing AI',
    'Study AI',
    'Coding AI',
    'Research AI',
    'Image AI',
    'Video AI',
    'Audio AI',
    'Productivity AI',
    'Presentation AI',
    'Resume & Career AI',
  ];

  const pricingTypes = ['All', 'Free', 'Freemium', 'Paid', 'Free Trial'];

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesPrice = selectedPricing === 'All' || tool.pricingType === selectedPricing;

      return matchesSearch && matchesCat && matchesPrice;
    });
  }, [aiTools, searchTerm, selectedCategory, selectedPricing]);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Writing AI': return <FileText className="w-4 h-4 text-emerald-500" />;
      case 'Study AI': return <BookOpen className="w-4 h-4 text-amber-500" />;
      case 'Coding AI': return <Code className="w-4 h-4 text-blue-500" />;
      case 'Research AI': return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'Image AI': return <Image className="w-4 h-4 text-rose-500" />;
      case 'Video AI': return <Video className="w-4 h-4 text-red-500" />;
      case 'Audio AI': return <Music className="w-4 h-4 text-violet-500" />;
      case 'Productivity AI': return <Layers className="w-4 h-4 text-cyan-500" />;
      case 'Presentation AI': return <Presentation className="w-4 h-4 text-orange-500" />;
      case 'Resume & Career AI': return <Briefcase className="w-4 h-4 text-indigo-500" />;
      default: return <Bot className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Bot className="w-3.5 h-3.5" />
              <span>Smart Student Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              AI Tools Directory for Students & Researchers
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Curated catalog of top artificial intelligence tools designed to accelerate study workflows, academic
              paper literature review, automated code debugging, presentation slides, and resume building.
            </p>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdSlot placement="header" />

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search AI tool by name (ChatGPT, Consensus, Cursor), keywords (research, coding, slides)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
            {/* Category selection */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1">
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0A192F] text-amber-400'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Pricing filter */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <span className="text-xs font-semibold text-slate-500">Pricing:</span>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50"
              >
                {pricingTypes.map(p => (
                  <option key={p} value={p}>{p === 'All' ? 'All Pricing' : p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sub category row */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full scrollbar-none pt-1">
            {categories.slice(6).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0A192F] text-amber-400'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Showing {filteredTools.length} Handpicked AI Solutions
          </p>
          <span className="text-xs text-slate-600">Updated for 2026 Academic Research</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-amber-50 transition-colors">
                      {getCategoryIcon(tool.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {tool.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          tool.pricingType === 'Free'
                            ? 'bg-emerald-100 text-emerald-800'
                            : tool.pricingType === 'Freemium'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tool.pricingType}
                        </span>
                        {tool.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-slate-950" />
                            <span>Staff Pick</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{tool.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1 mb-2 flex-wrap">
                  {(() => {
                    const verification = getVerificationBadge(tool.verificationStatus);
                    return (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                        {verification.label}
                      </span>
                    );
                  })()}
                  <span className="text-[10px] text-slate-400 font-medium">
                    {formatLastVerified(tool.lastVerifiedAt)}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-900 transition-colors mb-1">
                  {tool.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  {tool.tagline}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {tool.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Official Source / Visit {tool.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
