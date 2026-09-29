import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Video, 
  Building,
  User,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdSlot } from '../common/AdSlot';
import { getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const EventsPage: React.FC = () => {
  const { events, bookmarks, toggleBookmark, openShareModal } = useData();
  const [selectedMode, setSelectedMode] = useState<string>('All');

  const modes = ['All', 'Online', 'Offline', 'Hybrid'];

  const filteredEvents = events.filter(e => {
    if (e.status !== 'Published') return false;
    if (selectedMode !== 'All' && e.mode !== selectedMode) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Campus Events & Professional Workshops</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              Educational Events, Webinars & Bootcamps
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Attend hands-on coding masterclasses, embassy visa seminars, medical college interview clinics, and tech
              developer meetups conducted by industry leaders and university alumni.
            </p>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdSlot placement="header" />

      {/* Mode Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {modes.map(mode => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-colors ${
                selectedMode === mode
                  ? 'bg-[#0A192F] text-amber-400 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {mode === 'All' ? 'All Formats' : `${mode} Events`}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const isSaved = bookmarks.some(b => b.id === evt.id);
            const verification = getVerificationBadge(evt.verificationStatus);

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                        {evt.mode === 'Online' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        <span>{evt.mode}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {evt.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleBookmark({
                          id: evt.id,
                          type: 'event',
                          title: evt.title,
                          subtitle: `${evt.organizer} • Date: ${evt.date}`,
                          url: evt.officialUrl,
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
                        onClick={() => openShareModal(evt.title, evt.officialUrl, 'Events & Workshops')}
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
                      {formatLastVerified(evt.lastVerifiedAt)}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-900 transition-colors mb-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mb-3">
                    Hosted by {evt.organizer}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-semibold text-slate-800">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="line-clamp-1">{evt.location}</span>
                    </div>
                    {evt.speaker && (
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-[11px] text-slate-700">
                        <User className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>Speaker: <strong>{evt.speaker}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4">
                  <a
                    href={evt.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Official Source / Reserve</span>
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
