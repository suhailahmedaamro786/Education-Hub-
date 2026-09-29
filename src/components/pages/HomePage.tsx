import React from 'react';
import { 
  GraduationCap, 
  Search, 
  Award, 
  BookOpen, 
  Briefcase, 
  FileCheck2, 
  Newspaper, 
  Layers, 
  Sparkles, 
  FolderGit2, 
  Calendar, 
  Wrench, 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  DollarSign, 
  MapPin, 
  Clock, 
  ExternalLink,
  Users,
  Compass,
  Trophy
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdSlot } from '../common/AdSlot';
import { getDeadlineInfo, getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const HomePage: React.FC = () => {
  const { 
    setCurrentView, 
    setIsSearchOpen, 
    scholarships, 
    universities, 
    jobs, 
    articles, 
    hackathons, 
    events, 
    aiTools,
    setSelectedArticleId,
    setSelectedEntryTestId,
    openShareModal
  } = useData();

  // Data subsets for the Home Page
  const featuredScholarships = scholarships.filter(s => s.status === 'Published').slice(0, 3);
  const latestAdmissions = universities.filter(u => u.status === 'Published').slice(0, 3);
  const featuredJobs = jobs.filter(j => j.status === 'Published').slice(0, 3);
  const latestNews = articles.filter(a => a.status === 'Published').slice(0, 3);
  const upcomingEvents = events.filter(e => e.status === 'Published').slice(0, 2);
  const latestHackathons = hackathons.filter(h => h.status === 'Published').slice(0, 2);
  const popularAiTools = aiTools.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. PROFESSIONAL HERO SECTION */}
      <section className="relative bg-[#0A192F] text-white pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        {/* Subtle decorative glow orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-transparent border border-amber-400/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Pakistan’s #1 Student Educational Portal • Learn • Grow • Succeed</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif-brand">
              Empowering Your Future with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Verified Education & Global Careers
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Find domestic & international fully funded scholarships, top HEC university admissions, fresh graduate
              software jobs, entry test preparation (MDCAT/ECAT), and free academic utility tools.
            </p>

            {/* Prominent Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div 
                onClick={() => setIsSearchOpen(true)}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-amber-400/60 p-2 sm:p-2.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all shadow-2xl group"
              >
                <div className="p-2 sm:p-3 bg-amber-400 text-slate-950 rounded-xl group-hover:scale-105 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-1">
                    Search scholarships, admissions, jobs, internships, courses...
                  </span>
                </div>
                <span className="hidden sm:inline-block px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs">
                  Search
                </span>
              </div>

              {/* Quick Search Chips */}
              <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-300">
                <span className="text-slate-400 text-[11px] font-medium">Trending Searches:</span>
                {['MDCAT 2026', 'NUST Admissions', 'Fulbright USA', 'Systems Ltd', 'ECAT Prep', 'Erasmus'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setIsSearchOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-amber-200 border border-slate-700/60 text-[11px] font-semibold transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setCurrentView('scholarships')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Find Scholarships</span>
              </button>

              <button
                onClick={() => setCurrentView('admissions')}
                className="px-6 py-3.5 rounded-2xl bg-[#112240] hover:bg-[#1b345f] text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Find Admissions</span>
              </button>

              <button
                onClick={() => setCurrentView('student-tools')}
                className="px-6 py-3.5 rounded-2xl bg-[#112240] hover:bg-[#1b345f] text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Explore Student Tools</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Quick Feature Highlights */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              onClick={() => setCurrentView('scholarships')}
              className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl hover:border-amber-400/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Fully Funded Grants</h4>
                  <p className="text-[11px] text-slate-400">100% Tuition & Stipends</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setCurrentView('admissions')}
              className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl hover:border-amber-400/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-400/10 text-blue-400 group-hover:bg-blue-400 group-hover:text-slate-950 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">HEC Universities</h4>
                  <p className="text-[11px] text-slate-400">NUST, FAST, LUMS, AKU</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setCurrentView('entry-tests')}
              className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl hover:border-amber-400/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-400/10 text-purple-400 group-hover:bg-purple-400 group-hover:text-slate-950 transition-colors">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Entry Test Practice</h4>
                  <p className="text-[11px] text-slate-400">MDCAT, ECAT, NET, NTS</p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setCurrentView('jobs')}
              className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl hover:border-amber-400/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Fresh Grad Careers</h4>
                  <p className="text-[11px] text-slate-400">Software & Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Ad placement: 728x90 Banner below Hero (and optional Mobile Banner) */}
      <AdSlot placement="homepage_banner_728x90" className="w-full flex justify-center" />
      <AdSlot placement="mobile_banner_320x50" className="w-full flex justify-center" />

      {/* 2. LATEST SCHOLARSHIPS (PAKISTANI & GLOBAL) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Global Academic Grants
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-brand">
                Featured Fully Funded Scholarships
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('scholarships')}
              className="text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
            >
              <span>View All Scholarships</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredScholarships.map((sch) => {
              const deadline = getDeadlineInfo(sch.deadline);
              const verification = getVerificationBadge(sch.verificationStatus);

              return (
                <div
                  key={sch.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{sch.flagEmoji || '🎓'}</span>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                          {verification.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${deadline.badgeClass}`}>
                          {deadline.badgeText}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {sch.country} • {sch.level}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-900 transition-colors mb-1.5">
                      {sch.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mb-2">
                      By {sch.provider}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                      {sch.description}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {formatLastVerified(sch.lastVerifiedAt)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                    <button
                      onClick={() => setCurrentView('scholarships')}
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-0.5"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={sch.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-xs flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <span>Official Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LATEST ADMISSIONS (PAKISTAN UNIVERSITIES) */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                Admissions 2026/2027
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-brand">
                Featured University Admissions
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('admissions')}
              className="text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 group"
            >
              <span>Explore All Universities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestAdmissions.map((uni) => {
              const deadline = getDeadlineInfo(uni.deadline);
              const verification = getVerificationBadge(uni.verificationStatus);

              return (
                <div
                  key={uni.id}
                  className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img src={uni.coverImage} alt={uni.universityName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0A192F]/90 text-amber-300">
                        {uni.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border backdrop-blur-xs ${deadline.badgeClass}`}>
                        {deadline.badgeText}
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-3 text-white text-xs font-bold drop-shadow-sm">
                      {uni.city}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                          {verification.label}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {formatLastVerified(uni.lastVerifiedAt)}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-900 transition-colors mb-1">
                        {uni.universityName}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mb-2">
                        Session: {uni.session}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {uni.eligibility}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs gap-2">
                      <button
                        onClick={() => setCurrentView('admissions')}
                        className="text-xs font-bold text-slate-700 hover:text-slate-900"
                      >
                        View Notice
                      </button>
                      <a
                        href={uni.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs flex items-center gap-1 hover:bg-[#112240] transition-colors"
                      >
                        <span>Official Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ENTRY TEST HIGHLIGHT CALLOUT */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-purple-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-900/50 px-3 py-1 rounded-full inline-block">
              Entry Test Wing
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-brand">
              Prepare for MDCAT, ECAT, NET & NTS with Verified MCQs
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Access authentic solved past papers, formula sheets, syllabus weightage charts, and run timed
              practice test sessions with detailed question explanations.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('entry-tests')}
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shrink-0 cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Launch Entry Test Prep</span>
          </button>
        </div>
      </section>

      {/* 5. CAREER & FRESH GRADUATE OPPORTUNITIES */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                Careers & Internships
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-brand">
                Career & Internship Opportunities
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('jobs')}
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
            >
              <span>View All Jobs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => {
              const deadline = getDeadlineInfo(job.deadline);
              const verification = getVerificationBadge(job.verificationStatus);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-900">{job.organization}</span>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                          {verification.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${deadline.badgeClass}`}>
                          {deadline.badgeText}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-900 transition-colors mb-2">
                      {job.title}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{job.stipendOrSalary}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium pt-1">
                        {formatLastVerified(job.lastVerifiedAt)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setCurrentView('jobs')}
                      className="text-xs font-bold text-slate-700 hover:text-slate-900"
                    >
                      Details
                    </button>
                    <a
                      href={job.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-amber-400 font-bold text-xs flex items-center gap-1 hover:bg-slate-800 transition-colors"
                    >
                      <span>Official Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommended Ad placement: Native Banner */}
      <AdSlot placement="homepage_native" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* 6. FREE STUDENT UTILITY TOOLS */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              Zero-Cost Utilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-brand">
              Popular Free Student Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Calculate semester grades, exact age cutoffs, word counts for statements of purpose, and convert units.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: 'percentage', label: 'Percentage Calculator', desc: 'Board Marks % & Grades' },
              { id: 'cgpa', label: 'CGPA Calculator', desc: 'HEC 4.0 Multi-Semester' },
              { id: 'age', label: 'Age & Eligibility', desc: 'CSS & MDCAT Cutoffs' },
              { id: 'converter', label: 'Unit Converter', desc: 'Physics & Engineering' },
              { id: 'gpa', label: 'Semester GPA', desc: 'Course-by-Course Points' },
              { id: 'counter', label: 'Word Counter', desc: 'SOP & Essay Stats' },
              { id: 'qrcode', label: 'QR Code Generator', desc: 'Study Notes & Links' },
              { id: 'timer', label: 'Study Pomodoro Timer', desc: 'Focus Sprints' },
            ].map((tool) => (
              <div
                key={tool.id}
                onClick={() => setCurrentView('student-tools')}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-400/60 transition-all cursor-pointer group"
              >
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-900 transition-colors">
                  {tool.label}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{tool.desc}</p>
                <span className="text-xs text-amber-600 font-bold mt-3 inline-flex items-center gap-1">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. POPULAR AI TOOLS DIRECTORY HIGHLIGHT */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block mb-1">
                Artificial Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-brand">
                Featured AI Tools for Academic Success
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('ai-tools')}
              className="text-xs sm:text-sm font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group"
            >
              <span>Explore AI Directory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularAiTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {tool.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {tool.pricingType}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-900 mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {tool.description}
                  </p>
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Visit Tool</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. UPCOMING HACKATHONS & EVENTS */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hackathons Box */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block">
                    Competitions
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-serif-brand">Upcoming Hackathons</h3>
                </div>
                <button
                  onClick={() => setCurrentView('hackathons')}
                  className="text-xs font-bold text-orange-700 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {latestHackathons.map((h) => {
                  const deadline = getDeadlineInfo(h.deadline);
                  const verification = getVerificationBadge(h.verificationStatus);

                  return (
                    <div key={h.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">{h.type}</span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                              {verification.label}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${deadline.badgeClass}`}>
                              {deadline.badgeText}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{h.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mb-2">{h.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                          <span>Prize Pool: <strong className="text-amber-700">{h.prizePool}</strong></span>
                          <span className="text-[11px] text-slate-400">{formatLastVerified(h.lastVerifiedAt)}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Reg Deadline: <strong>{h.deadline}</strong></span>
                        <a href={h.officialUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-lg bg-[#0A192F] text-amber-400 font-bold hover:bg-[#112240] flex items-center gap-1 transition-colors">
                          <span>Official Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Events Box */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
                    Seminars & Workshops
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-serif-brand">Campus Events & Workshops</h3>
                </div>
                <button
                  onClick={() => setCurrentView('events')}
                  className="text-xs font-bold text-teal-700 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((e) => {
                  const verification = getVerificationBadge(e.verificationStatus);

                  return (
                    <div key={e.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">{e.mode} • {e.price}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                            {verification.label}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{e.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mb-2">{e.description}</p>
                        <div className="text-[11px] text-slate-400 mb-2">
                          {formatLastVerified(e.lastVerifiedAt)}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Date: <strong>{e.date}</strong></span>
                        <a href={e.officialUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-lg bg-[#0A192F] text-amber-400 font-bold hover:bg-[#112240] flex items-center gap-1 transition-colors">
                          <span>Official Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EDUCATIONAL NEWS & INSIGHTS */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block mb-1">
                Editorial & Policy Updates
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-brand">
                Educational News & Insights
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('news')}
              className="text-xs sm:text-sm font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1 group"
            >
              <span>View All News</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((art) => {
              const verification = getVerificationBadge(art.verificationStatus);

              return (
                <div
                  key={art.id}
                  onClick={() => {
                    setSelectedArticleId(art.id);
                    setCurrentView('news');
                  }}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 overflow-hidden relative">
                      <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0A192F]/90 text-amber-300">
                        {art.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                          {verification.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {formatLastVerified(art.lastVerifiedAt)}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Source: {art.sourceName} • {art.readTime}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-900 transition-colors mb-2">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">By {art.author}</span>
                      <span className="text-blue-700 font-bold flex items-center gap-0.5">
                        Read Guide <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad slot before footer */}
      <AdSlot placement="footer" />
    </div>
  );
};
