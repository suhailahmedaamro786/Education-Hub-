import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Search, 
  Download, 
  FileText, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  Eye, 
  Sparkles,
  BookOpen,
  ArrowDownToLine,
  Filter,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StudyMaterial } from '../../types';
import { AdSlot } from '../common/AdSlot';
import { getVerificationBadge, formatLastVerified } from '../../utils/statusHelper';

export const NotesPage: React.FC = () => {
  const { studyMaterials, bookmarks, toggleBookmark, openShareModal, showNotification } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);

  const classLevels = [
    'All',
    'FSc Pre-Medical',
    'FSc Pre-Engineering',
    'ICS',
    'Matric (9th-10th)',
    'BS / University',
    'CSS / PMS'
  ];

  const subjects = ['All', 'Physics', 'Biology', 'Mathematics', 'Computer Science', 'Pakistan Studies', 'English'];

  const filteredMaterials = useMemo(() => {
    return studyMaterials.filter(mat => {
      if (mat.status !== 'Published') return false;

      const matchesSearch = 
        mat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mat.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mat.authorOrSource.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass = selectedClass === 'All' || mat.classLevel === selectedClass;
      const matchesSubject = selectedSubject === 'All' || mat.subject === selectedSubject;

      return matchesSearch && matchesClass && matchesSubject;
    });
  }, [studyMaterials, searchTerm, selectedClass, selectedSubject]);

  const handleDownload = (mat: StudyMaterial) => {
    showNotification(`Downloading "${mat.title.slice(0, 30)}..." [${mat.fileSize}]`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Academic Library & Repository</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              Notes, Solved Past Papers & Study Material
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Download free high-yield revision notes, BISE board past papers, FBISE model papers, MDCAT chapter-wise
              MCQs, and university computer science cheat sheets verified by subject specialists.
            </p>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdSlot placement="header" />

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3 relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes by subject (Physics, Calculus, Biology), topic, or board..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>Class / Academic Level</span>
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {classLevels.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Classes & Degrees' : c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>Subject</span>
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50"
              >
                {subjects.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All Subjects' : s}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedClass('All');
                  setSelectedSubject('All');
                }}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Available Study Guides ({filteredMaterials.length})
          </p>
          <span className="text-xs text-slate-600">Free PDF Downloads</span>
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No notes match your filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the class or subject filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => {
              const isSaved = bookmarks.some(b => b.id === mat.id);

              return (
                <div
                  key={mat.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Type & Badges */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{mat.fileFormat}</span>
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {mat.fileSize}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleBookmark({
                            id: mat.id,
                            type: 'study-material',
                            title: mat.title,
                            subtitle: `${mat.subject} • ${mat.classLevel}`,
                            timestamp: new Date().toLocaleDateString()
                          })}
                          className={`p-2 rounded-xl transition-colors ${
                            isSaved ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                          }`}
                          title="Save Material"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openShareModal(mat.title, window.location.href, 'Study Material')}
                          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {mat.classLevel}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        {mat.materialType}
                      </span>
                      {(() => {
                        const verification = getVerificationBadge(mat.verificationStatus);
                        return (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${verification.badgeClass}`}>
                            {verification.label}
                          </span>
                        );
                      })()}
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-900 transition-colors mb-2">
                      {mat.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {mat.description}
                    </p>

                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                      <p><strong className="text-slate-700">Source:</strong> {mat.authorOrSource}</p>
                      <p><strong className="text-slate-700">Downloads:</strong> {mat.downloadsCount.toLocaleString()} students</p>
                      <p className="text-slate-400">{formatLastVerified(mat.lastVerifiedAt)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 mt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedMaterial(mat)}
                        className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => handleDownload(mat)}
                        className="py-2 rounded-xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <ArrowDownToLine className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>

                    {mat.officialUrl && (
                      <a
                        href={mat.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Official Source Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#0A192F] text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {selectedMaterial.subject} • {selectedMaterial.classLevel}
                </span>
                <button 
                  onClick={() => setSelectedMaterial(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-xl font-bold mt-1 text-white">{selectedMaterial.title}</h3>
              <p className="text-xs text-slate-300">Verified by: {selectedMaterial.authorOrSource}</p>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">File Information:</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {selectedMaterial.fileFormat} Document • {selectedMaterial.fileSize}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium block">Total Downloads:</span>
                  <span className="font-bold text-emerald-600 text-xs">
                    {selectedMaterial.downloadsCount.toLocaleString()} Verified
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">
                  Document Overview
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedMaterial.description}
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-2">
                <p className="font-bold">✨ Highlights covered in this booklet:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Formulas and solved example applications aligned with recent board exam patterns.</li>
                  <li>Common exam traps, negative marking prevention, and step-marking advice.</li>
                  <li>Print-ready high-contrast black & white format for minimal photocopy costs.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedMaterial(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(selectedMaterial);
                  setSelectedMaterial(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download {selectedMaterial.fileSize} PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
