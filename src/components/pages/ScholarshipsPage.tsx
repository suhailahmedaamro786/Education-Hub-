import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  Globe2, 
  Calendar, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  GraduationCap,
  Filter,
  DollarSign
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Scholarship } from '../../types';
import { AdSlot } from '../common/AdSlot';
import { getDeadlineInfo, getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const ScholarshipsPage: React.FC = () => {
  const { scholarships, bookmarks, toggleBookmark, openShareModal } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedFunding, setSelectedFunding] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const countries = ['All', 'Pakistan', 'United States', 'European Union', 'United Kingdom', 'Germany', 'China'];
  const fundingTypes = ['All', 'Fully Funded', 'Partial', 'Tuition Waiver'];
  const degreeLevels = ['All', 'Undergraduate', 'Masters', 'PhD', 'All Levels'];

  const filteredScholarships = useMemo(() => {
    return scholarships.filter(sch => {
      if (sch.status !== 'Published') return false;

      const matchesSearch = 
        sch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sch.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sch.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sch.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCountry = selectedCountry === 'All' || sch.country === selectedCountry;
      const matchesFunding = selectedFunding === 'All' || sch.fundingType === selectedFunding;
      const matchesLevel = selectedLevel === 'All' || sch.level === selectedLevel || sch.level === 'All Levels';

      return matchesSearch && matchesCountry && matchesFunding && matchesLevel;
    });
  }, [scholarships, searchTerm, selectedCountry, selectedFunding, selectedLevel]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Global Scholarships Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              Pakistani & International Scholarships
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Discover verified fully funded scholarships covering 100% tuition, monthly living stipends, and travel
              grants for Undergraduate, Masters, and PhD degrees worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Ad placement: 300x250 Banner */}
      <AdSlot placement="scholarships_banner_300x250" />

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search scholarship name, country (USA, Germany, UK, Pakistan), or donor (HEC, Fulbright, DAAD)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Destination Country</span>
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {countries.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                <span>Funding Type</span>
              </label>
              <select
                value={selectedFunding}
                onChange={(e) => setSelectedFunding(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {fundingTypes.map(f => (
                  <option key={f} value={f}>{f === 'All' ? 'All Funding' : f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>Degree Level</span>
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {degreeLevels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl === 'All' ? 'All Degree Levels' : lvl}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCountry('All');
                  setSelectedFunding('All');
                  setSelectedLevel('All');
                }}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Recommended Ad placement: Native Banner */}
        <AdSlot placement="scholarships_native" className="mb-6" />

        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Showing {filteredScholarships.length} Verified Scholarships
          </p>
          <span className="text-xs text-slate-600">No consultancy fees required</span>
        </div>

        {filteredScholarships.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Award className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No scholarships match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the country or degree level filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((sch) => {
              const isSaved = bookmarks.some(b => b.id === sch.id);
              const deadline = getDeadlineInfo(sch.deadline);
              const verification = getVerificationBadge(sch.verificationStatus);

              return (
                <div
                  key={sch.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Flags, Type & Actions */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{sch.flagEmoji || '🎓'}</span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            {sch.country}
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              sch.fundingType === 'Fully Funded' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {sch.fundingType}
                            </span>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${deadline.badgeClass}`}>
                              {deadline.badgeText}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleBookmark({
                            id: sch.id,
                            type: 'scholarship',
                            title: sch.title,
                            subtitle: `${sch.provider} • ${sch.country}`,
                            url: sch.officialUrl,
                            timestamp: new Date().toLocaleDateString()
                          })}
                          className={`p-2 rounded-xl transition-colors ${
                            isSaved 
                              ? 'bg-amber-400 text-slate-950 font-bold' 
                              : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                          }`}
                          title="Save Scholarship"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openShareModal(sch.title, sch.officialUrl, 'Scholarships')}
                          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                        {verification.label}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {formatLastVerified(sch.lastVerifiedAt)}
                      </span>
                    </div>

                    {/* Title & Provider */}
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-900 transition-colors mb-1">
                      {sch.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mb-3">
                      Offered by {sch.provider}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {sch.description}
                    </p>

                    {/* Key Benefits List */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Included Coverage:
                      </span>
                      {sch.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Buttons */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Degree Level:</span>
                      <span className="font-bold text-slate-800">{sch.level}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Deadline:</span>
                      <span className="font-bold text-rose-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {sch.deadline} ({deadline.badgeText})
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setSelectedScholarship(sch)}
                        className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                      >
                        Requirements
                      </button>

                      <a
                        href={sch.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 rounded-xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-xs"
                      >
                        <span>Official Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#0A192F] text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {selectedScholarship.country} • {selectedScholarship.fundingType}
                </span>
                <button 
                  onClick={() => setSelectedScholarship(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-xl font-bold mt-1 text-white">{selectedScholarship.title}</h3>
              <p className="text-xs text-slate-300">Provider: {selectedScholarship.provider}</p>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-amber-700 mb-1">
                  Eligibility Criteria
                </h4>
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed">
                  {selectedScholarship.eligibility}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">
                  Complete Benefits & Allowances
                </h4>
                <div className="space-y-1.5">
                  {selectedScholarship.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">
                  Program Overview
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedScholarship.description}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <span className="text-slate-500">Application Deadline:</span>
                <span className="font-bold text-rose-600">{selectedScholarship.deadline}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedScholarship(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <a
                href={selectedScholarship.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Go to Official Application Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
