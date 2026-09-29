import React, { useState } from 'react';
import { 
  FileCheck2, 
  Calendar, 
  Clock, 
  Award, 
  BookOpen, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  HelpCircle, 
  CheckCircle2, 
  XCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EntryTest } from '../../types';
import { AdSlot } from '../common/AdSlot';
import { getDeadlineInfo, getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const EntryTestsPage: React.FC = () => {
  const { entryTests, bookmarks, toggleBookmark, openShareModal, setCurrentView } = useData();

  const [activeTest, setActiveTest] = useState<EntryTest>(entryTests[0]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (mcqId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [mcqId]: optionIndex
    }));
  };

  const calculateScore = () => {
    if (!activeTest.sampleMcqs) return { correct: 0, total: 0, percentage: 0 };
    let correct = 0;
    activeTest.sampleMcqs.forEach(mcq => {
      if (selectedAnswers[mcq.id] === mcq.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: activeTest.sampleMcqs.length,
      percentage: Math.round((correct / activeTest.sampleMcqs.length) * 100)
    };
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const isSaved = bookmarks.some(b => b.id === activeTest.id);
  const scoreInfo = calculateScore();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>National Aptitude & Entrance Test Wing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              Entry Tests Preparation (MDCAT, ECAT, NET & NTS)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Complete test schedules, official syllabus weightages, past papers count, and free interactive practice
              MCQs for medical and engineering university admissions across Pakistan.
            </p>
          </div>
        </div>
      </div>

      {/* Ad Slot */}
      <AdSlot placement="header" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Selector for Tests */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {entryTests.map((test) => (
            <button
              key={test.id}
              onClick={() => {
                setActiveTest(test);
                setSelectedAnswers({});
                setShowResults(false);
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTest.id === test.id
                  ? 'bg-[#0A192F] text-amber-400 shadow-md ring-2 ring-amber-400'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-amber-500" />
              <span>{test.shortName}</span>
            </button>
          ))}
        </div>

        {/* Selected Test Detail Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Test Overview Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                      {activeTest.conductingBody}
                    </span>
                    {(() => {
                      const verification = getVerificationBadge(activeTest.verificationStatus);
                      const deadline = getDeadlineInfo(activeTest.registrationDeadline);
                      return (
                        <>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                            {verification.label}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${deadline.badgeClass}`}>
                            {deadline.badgeText}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                    {activeTest.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Target: {activeTest.targetPrograms}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">
                    {formatLastVerified(activeTest.lastVerifiedAt)}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleBookmark({
                      id: activeTest.id,
                      type: 'entry-test',
                      title: activeTest.name,
                      subtitle: `${activeTest.conductingBody} • Date: ${activeTest.testDate}`,
                      url: activeTest.officialUrl,
                      timestamp: new Date().toLocaleDateString()
                    })}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isSaved ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold' : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                    }`}
                    title="Bookmark Test"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openShareModal(activeTest.name, activeTest.officialUrl, 'Entry Tests')}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Vital Stat Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Registration Ends</span>
                  <span className="text-xs sm:text-sm font-bold text-rose-600 flex items-center gap-1 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeTest.registrationDeadline}
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Exam Date</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {activeTest.testDate}
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Marks</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1 block">
                    {activeTest.totalMarks} Marks
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Past Papers</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-700 mt-1 block">
                    {activeTest.pastPapersCount} Available
                  </span>
                </div>
              </div>

              {/* Syllabus Breakdown */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                    Syllabus & Weightage Structure
                  </h4>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 leading-relaxed font-medium">
                    {activeTest.syllabusOverview}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                    Eligibility & Aggregate Criteria
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {activeTest.eligibility}
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentView('notes')}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Download Past Papers & Notes</span>
                </button>

                <a
                  href={activeTest.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <span>Official Source / Registration</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* In-content sponsor placement */}
            <AdSlot placement="in-content" />
          </div>

          {/* Right Column: Interactive Practice MCQs Quiz */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Interactive Practice MCQs</h3>
                    <p className="text-[11px] text-slate-500">Test your readiness on authentic past questions</p>
                  </div>
                </div>

                {showResults && (
                  <button
                    onClick={handleResetQuiz}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1"
                    title="Retry Quiz"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry</span>
                  </button>
                )}
              </div>

              {activeTest.sampleMcqs && activeTest.sampleMcqs.length > 0 ? (
                <div className="space-y-6">
                  {activeTest.sampleMcqs.map((mcq, idx) => {
                    const selected = selectedAnswers[mcq.id];
                    const isCorrect = selected === mcq.correctAnswer;

                    return (
                      <div key={mcq.id} className="space-y-2.5">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block mb-0.5">
                              {mcq.subject}
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                              {mcq.question}
                            </p>
                          </div>
                        </div>

                        {/* Options */}
                        <div className="space-y-1.5 pl-7">
                          {mcq.options.map((opt, optIdx) => {
                            let optStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700';

                            if (selected === optIdx) {
                              optStyle = 'border-blue-500 bg-blue-50 text-blue-900 font-semibold ring-1 ring-blue-500';
                            }

                            if (showResults) {
                              if (optIdx === mcq.correctAnswer) {
                                optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500';
                              } else if (selected === optIdx && !isCorrect) {
                                optStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-medium ring-1 ring-rose-500 line-through';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectOption(mcq.id, optIdx)}
                                className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${optStyle}`}
                              >
                                <span>{opt}</span>
                                {showResults && optIdx === mcq.correctAnswer && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                                {showResults && selected === optIdx && !isCorrect && (
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}

                          {/* Explanation */}
                          {showResults && (
                            <div className="p-2.5 bg-amber-50 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 mt-2 leading-relaxed">
                              <strong>Explanation:</strong> {mcq.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Submit / Score view */}
                  <div className="pt-4 border-t border-slate-100">
                    {!showResults ? (
                      <button
                        onClick={() => setShowResults(true)}
                        className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                      >
                        Submit Answers & Check Score
                      </button>
                    ) : (
                      <div className="p-4 bg-slate-900 text-white rounded-2xl text-center space-y-1">
                        <span className="text-xs text-slate-300 font-medium">Your Practice Result:</span>
                        <div className="text-2xl font-extrabold text-amber-400">
                          {scoreInfo.correct} / {scoreInfo.total} ({scoreInfo.percentage}%)
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {scoreInfo.percentage >= 70 ? 'Excellent prep! Keep refining weak areas.' : 'Review explanations above and practice more past papers.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-500">
                  <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p>Sample questions for {activeTest.shortName} are being updated by our academic cell.</p>
                  <button 
                    onClick={() => setCurrentView('notes')}
                    className="mt-3 text-amber-600 font-bold hover:underline"
                  >
                    Browse Solved Past Papers
                  </button>
                </div>
              )}
            </div>

            {/* Recommended Ad placement: Desktop Sidebar 300x250 */}
            <AdSlot placement="desktop_sidebar" className="mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
