import React, { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Code, 
  Bot, 
  Cpu, 
  ExternalLink, 
  BookOpen, 
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Share2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdSlot } from '../common/AdSlot';
import { getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const AiTechPage: React.FC = () => {
  const { techArticles, openShareModal, setCurrentView } = useData();

  const [activeTopic, setActiveTopic] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<any | null>(null);

  const topics = ['All', 'Generative AI', 'Agentic AI', 'Programming', 'Web Development', 'Cybersecurity'];

  const filteredTech = techArticles.filter(item => {
    if (activeTopic === 'All') return true;
    return item.topic === activeTopic;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Future-Proof Skills & Emerging Tech</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              AI, Agentic Systems & Software Engineering
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Curated roadmaps, practical architectural guides, and tutorials designed to help Pakistani engineering
              students master Generative AI, multi-agent frameworks, cloud architectures, and cybersecurity.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentView('ai-tools')}
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5"
              >
                <Bot className="w-4 h-4" />
                <span>Explore AI Tools Directory</span>
              </button>
              <button
                onClick={() => setCurrentView('hackathons')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Terminal className="w-4 h-4" />
                <span>View Tech Hackathons</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdSlot placement="header" />

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-colors ${
                activeTopic === topic
                  ? 'bg-[#0A192F] text-amber-400 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTech.map(guide => {
            const verification = getVerificationBadge(guide.verificationStatus);

            return (
              <div
                key={guide.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800">
                      {guide.topic}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {guide.readTime} • {guide.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1 mb-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                      {verification.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {formatLastVerified(guide.lastVerifiedAt)}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-900 transition-colors mb-2 leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {guide.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="space-y-1.5 mb-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core Insights:
                    </span>
                    {guide.keyTakeaways.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedTech(guide)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Tutorial</span>
                  </button>

                  {guide.officialUrl && (
                    <a
                      href={guide.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs flex items-center gap-1 hover:bg-[#112240] transition-colors"
                    >
                      <span>Official Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => openShareModal(guide.title, window.location.href, 'Tech & AI Guide')}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Article Reader Modal */}
      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#0A192F] text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {selectedTech.topic} • {selectedTech.level} • {selectedTech.readTime}
                </span>
                <button 
                  onClick={() => setSelectedTech(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-2xl font-bold mt-2 text-white font-serif-brand">{selectedTech.title}</h3>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-800 leading-relaxed whitespace-pre-line">
              {selectedTech.content}

              {selectedTech.resources && selectedTech.resources.length > 0 && (
                <div className="pt-4 border-t border-slate-200 mt-6">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                    Recommended Learning Resources
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTech.resources.map((res: any, i: number) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                      >
                        <span>{res.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                onClick={() => setSelectedTech(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
