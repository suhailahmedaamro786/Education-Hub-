import React, { useState } from 'react';
import { 
  FolderGit2, 
  Calendar, 
  Trophy, 
  MapPin, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Users, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdSlot } from '../common/AdSlot';
import { getDeadlineInfo, getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const HackathonsPage: React.FC = () => {
  const { hackathons, bookmarks, toggleBookmark, openShareModal } = useData();
  const [selectedType, setSelectedType] = useState<string>('All');

  const types = ['All', 'Hackathon', 'Coding Contest', 'Innovation Challenge'];

  const filteredHackathons = hackathons.filter(h => {
    if (h.status !== 'Published') return false;
    if (selectedType !== 'All' && h.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>Competitions & Innovation Arena</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              Hackathons, Coding Challenges & Olympiads
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Showcase your problem-solving prowess, win substantial cash prizes, secure international mentorship from
              tech giants (Google, Microsoft, Meta), and represent Pakistan in global competitive programming tournaments.
            </p>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdSlot placement="header" />

      {/* Type Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-colors ${
                selectedType === t
                  ? 'bg-[#0A192F] text-amber-400 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hack) => {
            const isSaved = bookmarks.some(b => b.id === hack.id);
            const deadline = getDeadlineInfo(hack.deadline);
            const verification = getVerificationBadge(hack.verificationStatus);

            return (
              <div
                key={hack.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-800 border border-orange-200">
                        {hack.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${deadline.badgeClass}`}>
                        {deadline.badgeText}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleBookmark({
                          id: hack.id,
                          type: 'hackathon',
                          title: hack.title,
                          subtitle: `${hack.organizer} • Prize: ${hack.prizePool}`,
                          url: hack.officialUrl,
                          timestamp: new Date().toLocaleDateString()
                        })}
                        className={`p-2 rounded-xl transition-colors ${
                          isSaved ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openShareModal(hack.title, hack.officialUrl, 'Hackathons')}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1 mb-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                      {verification.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {formatLastVerified(hack.lastVerifiedAt)}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-900 transition-colors mb-1">
                    {hack.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mb-3">
                    Organized by {hack.organizer}
                  </p>

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 mb-3 flex items-center justify-between">
                    <span className="text-xs text-amber-900 font-semibold flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-amber-600" />
                      <span>Prize Pool:</span>
                    </span>
                    <span className="font-extrabold text-amber-950 text-xs sm:text-sm">
                      {hack.prizePool}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {hack.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Eligibility:</span>
                      <span className="font-medium text-slate-800 text-[11px]">{hack.eligibility}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Location:</span>
                      <span className="font-medium text-slate-800 text-[11px]">{hack.locationOrOnline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Reg. Deadline:</span>
                      <span className="font-bold text-rose-600">{hack.deadline} ({deadline.badgeText})</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4">
                  <a
                    href={hack.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Official Source / Register</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
