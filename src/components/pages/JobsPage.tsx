import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Sparkles,
  Building,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdSlot } from '../common/AdSlot';
import { getDeadlineInfo, getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const JobsPage: React.FC = () => {
  const { jobs, bookmarks, toggleBookmark, openShareModal } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [freshOnly, setFreshOnly] = useState<boolean>(false);

  const jobTypes = ['All', 'Full-time', 'Internship', 'Remote', 'Part-time'];
  const locations = ['All', 'Remote', 'Islamabad', 'Lahore', 'Karachi', 'Rawalpindi'];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (job.status !== 'Published') return false;

      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = selectedType === 'All' || job.jobType === selectedType;
      const matchesLocation = selectedLocation === 'All' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesFresh = !freshOnly || job.freshGrad;

      return matchesSearch && matchesType && matchesLocation && matchesFresh;
    });
  }, [jobs, searchTerm, selectedType, selectedLocation, freshOnly]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Gateway Pakistan</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              Jobs & Internships for Students & Fresh Graduates
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Kickstart your professional journey with verified software engineering roles, management trainee
              programs (MTO), paid corporate internships, and remote US/European tech opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Ad placement: 300x250 Banner */}
      <AdSlot placement="jobs_banner_300x250" />

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
                placeholder="Search job title, skills (React, Python, Finance, ML), or company name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                <span>Job Type</span>
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {jobTypes.map(t => (
                  <option key={t} value={t}>{t === 'All' ? 'All Job Types' : t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Location</span>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 bg-amber-50 p-2 rounded-xl border border-amber-200/80 w-full">
                <input
                  type="checkbox"
                  checked={freshOnly}
                  onChange={(e) => setFreshOnly(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-400 w-4 h-4 cursor-pointer"
                />
                <span>Fresh Graduates & Students Only</span>
              </label>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('All');
                  setSelectedLocation('All');
                  setFreshOnly(false);
                }}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Recommended Ad placement: Native Banner */}
        <AdSlot placement="jobs_native" className="mb-6" />

        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Showing {filteredJobs.length} Career Opportunities
          </p>
          <span className="text-xs text-slate-600">Verified corporate postings</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No job opportunities match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filters or searching for different keywords.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const isSaved = bookmarks.some(b => b.id === job.id);
              const deadline = getDeadlineInfo(job.deadline);
              const verification = getVerificationBadge(job.verificationStatus);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all group relative"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Organization & Title */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-amber-400 font-extrabold flex items-center justify-center text-base shrink-0 shadow-xs">
                        {job.organization.slice(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-slate-400" />
                            {job.organization}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                            {job.jobType}
                          </span>
                          {job.freshGrad && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                              Fresh Grad Friendly
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                            {verification.label}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${deadline.badgeClass}`}>
                            {deadline.badgeText}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                          {job.title}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-slate-800">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                            {job.stipendOrSalary}
                          </span>
                          <span className="flex items-center gap-1 text-rose-600 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            Deadline: {job.deadline} ({deadline.badgeText})
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            {formatLastVerified(job.lastVerifiedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
                      <button
                        onClick={() => toggleBookmark({
                          id: job.id,
                          type: 'job',
                          title: job.title,
                          subtitle: `${job.organization} • ${job.location}`,
                          url: job.officialUrl,
                          timestamp: new Date().toLocaleDateString()
                        })}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isSaved 
                            ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold' 
                            : 'border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                        }`}
                        title="Save Job"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openShareModal(job.title, job.officialUrl, 'Jobs & Careers')}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      <a
                        href={job.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors"
                      >
                        <span>Official Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Skills & Description */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100">
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {job.description}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Skills:</span>
                      {job.skills.map((skill, idx) => (
                        <span key={idx} className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
