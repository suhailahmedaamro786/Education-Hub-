import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  ChevronRight, 
  GraduationCap,
  Building,
  CheckCircle2,
  Filter,
  DollarSign
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { UniversityAdmission } from '../../types';
import { AdSlot } from '../common/AdSlot';
import { getDeadlineInfo, getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const AdmissionsPage: React.FC = () => {
  const { 
    universities, 
    bookmarks, 
    toggleBookmark, 
    openShareModal, 
    setCurrentView 
  } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [selectedUni, setSelectedUni] = useState<UniversityAdmission | null>(null);

  const provinces = ['All', 'Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad', 'AJK', 'Gilgit-Baltistan', 'International'];
  const uniTypes = ['All', 'Public', 'Private', 'Semi-Government'];
  const degreeLevels = ['All', 'BS', 'MS', 'PhD', 'MBBS', 'MBA'];

  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      if (uni.status !== 'Published') return false;

      const matchesSearch = 
        uni.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesProvince = selectedProvince === 'All' || uni.province === selectedProvince;
      const matchesType = selectedType === 'All' || uni.type === selectedType;
      const matchesDegree = selectedDegree === 'All' || uni.degrees.includes(selectedDegree);

      return matchesSearch && matchesProvince && matchesType && matchesDegree;
    });
  }, [universities, searchTerm, selectedProvince, selectedType, selectedDegree]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Higher Education Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              University Admissions & Degree Programs
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Explore verified admissions for Pakistan’s top HEC-ranked public & private universities, medical colleges,
              and premier engineering faculties. Compare eligibility, fee structures, and application deadlines.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button 
                onClick={() => setCurrentView('entry-tests')}
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Check Entry Test Dates (MDCAT/ECAT/NET)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdSlot placement="header" />

      {/* Search & Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search university name, city (Lahore, Karachi, Islamabad), or discipline (Computer Science, MBBS, BBA)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>

            {/* Province Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Province / Region</span>
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {provinces.map(prov => (
                  <option key={prov} value={prov}>{prov === 'All' ? 'All Provinces' : prov}</option>
                ))}
              </select>
            </div>

            {/* University Type Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-amber-500" />
                <span>University Sector</span>
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {uniTypes.map(t => (
                  <option key={t} value={t}>{t === 'All' ? 'All Sectors' : `${t} Universities`}</option>
                ))}
              </select>
            </div>

            {/* Degree Level Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>Degree Level</span>
              </label>
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {degreeLevels.map(deg => (
                  <option key={deg} value={deg}>{deg === 'All' ? 'All Degrees' : `${deg} Degree Programs`}</option>
                ))}
              </select>
            </div>

            {/* Reset Filter Button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedProvince('All');
                  setSelectedType('All');
                  setSelectedDegree('All');
                }}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* University Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Showing {filteredUniversities.length} Institutions with Open Admissions
          </p>
          <span className="text-xs text-slate-600">Updated for 2026/2027 Academic Sessions</span>
        </div>

        {filteredUniversities.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No universities match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the province or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni) => {
              const isSaved = bookmarks.some(b => b.id === uni.id);
              const deadline = getDeadlineInfo(uni.deadline);
              const verification = getVerificationBadge(uni.verificationStatus);

              return (
                <div 
                  key={uni.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Image & Badges */}
                  <div className="relative h-44 overflow-hidden bg-slate-800">
                    <img 
                      src={uni.coverImage} 
                      alt={uni.universityName} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

                    {/* Top status badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0A192F]/90 text-amber-300 border border-amber-400/30">
                          {uni.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border backdrop-blur-xs ${deadline.badgeClass}`}>
                          {deadline.badgeText}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => toggleBookmark({
                            id: uni.id,
                            type: 'admission',
                            title: uni.universityName,
                            subtitle: `${uni.city} • Deadline: ${uni.deadline}`,
                            url: uni.officialUrl,
                            timestamp: new Date().toLocaleDateString()
                          })}
                          className={`p-2 rounded-full backdrop-blur-xs transition-colors ${
                            isSaved ? 'bg-amber-400 text-slate-950' : 'bg-slate-900/70 text-white hover:bg-slate-900'
                          }`}
                          title="Bookmark"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openShareModal(uni.universityName, uni.officialUrl, 'Admissions')}
                          className="p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 backdrop-blur-xs transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        {uni.session}
                      </span>
                      <h3 className="text-white font-extrabold text-base leading-snug line-clamp-1">
                        {uni.shortName} – {uni.city}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                          {verification.label}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {formatLastVerified(uni.lastVerifiedAt)}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">
                        {uni.universityName}
                      </h4>
                      {uni.ranking && (
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md mb-2">
                          <Award className="w-3 h-3 text-blue-600" />
                          <span>{uni.ranking}</span>
                        </div>
                      )}
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {uni.description}
                      </p>

                      {/* Programs Tags */}
                      <div className="mt-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Top Degrees & Programs
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {uni.programs.slice(0, 4).map((prog, idx) => (
                            <span 
                              key={idx}
                              className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                            >
                              {prog}
                            </span>
                          ))}
                          {uni.programs.length > 4 && (
                            <span className="text-[10px] text-slate-500 font-semibold px-1 py-0.5">
                              +{uni.programs.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details Box */}
                      <div className="mt-3.5 bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Estimated Tuition:</span>
                          <span className="font-semibold text-slate-800">{uni.feeRange}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Deadline:</span>
                          <span className="font-bold text-rose-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {uni.deadline} ({deadline.badgeText})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedUni(uni)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                      >
                        Eligibility Details
                      </button>

                      <a
                        href={uni.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3.5 rounded-xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-xs flex items-center gap-1 transition-colors shadow-xs"
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

      {/* University Detail Modal */}
      {selectedUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#0A192F] text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {selectedUni.type} University • {selectedUni.province}
                </span>
                <button 
                  onClick={() => setSelectedUni(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-xl font-bold mt-1 text-white">{selectedUni.universityName}</h3>
              <p className="text-xs text-slate-300">{selectedUni.city} • Session: {selectedUni.session}</p>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-amber-700 mb-1">
                  Eligibility Criteria
                </h4>
                <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-950 leading-relaxed">
                  {selectedUni.eligibility}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">
                  Offered Degree Programs
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUni.programs.map((p, i) => (
                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 block">Fee Estimate:</span>
                  <span className="font-bold text-slate-900 text-xs">{selectedUni.feeRange}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 block">Application Deadline:</span>
                  <span className="font-bold text-rose-600 text-xs">{selectedUni.deadline}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">
                  About the Institution
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedUni.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedUni(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <a
                href={selectedUni.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Go to Official Admission Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
