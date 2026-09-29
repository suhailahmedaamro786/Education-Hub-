import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  Wrench, 
  Calendar, 
  ArrowRightLeft, 
  GraduationCap, 
  FileText, 
  QrCode, 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Sparkles,
  Percent,
  Clock,
  Trash2,
  Plus
} from 'lucide-react';
import QRCode from 'qrcode';
import { useData } from '../../context/DataContext';
import { AdSlot } from '../common/AdSlot';
import { SITE_CONFIG } from '../../config/siteConfig';

export const StudentToolsPage: React.FC = () => {
  const { showNotification } = useData();

  const [activeTab, setActiveTab] = useState<string>('percentage');

  // Tool 1: Percentage Calculator States
  const [percObtained, setPercObtained] = useState<string>('890');
  const [percTotal, setPercTotal] = useState<string>('1100');
  const [percentOfX, setPercentOfX] = useState<string>('15');
  const [percentOfY, setPercentOfY] = useState<string>('1200');

  // Tool 2: CGPA Calculator States
  const [semesters, setSemesters] = useState<{ id: number; name: string; gpa: number; credits: number }[]>([
    { id: 1, name: 'Semester 1', gpa: 3.65, credits: 17 },
    { id: 2, name: 'Semester 2', gpa: 3.82, credits: 18 },
    { id: 3, name: 'Semester 3', gpa: 3.50, credits: 16 },
    { id: 4, name: 'Semester 4', gpa: 3.75, credits: 17 },
  ]);

  // Tool 3: Age Calculator States
  const [dob, setDob] = useState<string>('2004-05-14');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Tool 4: Unit Converter States
  const [unitCategory, setUnitCategory] = useState<'length' | 'weight' | 'data' | 'temp'>('length');
  const [unitVal, setUnitVal] = useState<string>('100');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');

  // Tool 5: Course GPA Calculator States
  const [courses, setCourses] = useState<{ id: number; name: string; credits: number; grade: string }[]>([
    { id: 1, name: 'Programming Fundamentals', credits: 4, grade: 'A' },
    { id: 2, name: 'Calculus & Analytical Geometry', credits: 3, grade: 'A-' },
    { id: 3, name: 'Applied Physics', credits: 3, grade: 'B+' },
    { id: 4, name: 'English Composition', credits: 3, grade: 'A' },
    { id: 5, name: 'Islamic Studies', credits: 2, grade: 'A' },
  ]);

  // Tool 6: Word & Character Counter
  const [counterText, setCounterText] = useState<string>(
    'Education Hub empowers students across Pakistan with free academic tools, verified university admissions, and international scholarship guidelines. Prepare for your MDCAT, ECAT, and GRE exams today!'
  );
  const [copied, setCopied] = useState(false);

  // Tool 7: QR Code Generator
  const [qrText, setQrText] = useState<string>(SITE_CONFIG.baseUrl);
  const [qrColorDark, setQrColorDark] = useState<string>('#0A192F');
  const [qrColorLight, setQrColorLight] = useState<string>('#FFFFFF');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Tool 8: Basic Study Timer (Pomodoro)
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);

  // Generate QR Code
  useEffect(() => {
    if (!qrText) return;
    QRCode.toDataURL(qrText, {
      width: 320,
      margin: 2,
      color: {
        dark: qrColorDark,
        light: qrColorLight,
      },
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
  }, [qrText, qrColorDark, qrColorLight]);

  // Study Timer Interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (timerMode === 'focus') {
        setSessionsCompleted(prev => prev + 1);
        showNotification('Focus session completed! Take a well-deserved break.', 'success');
      } else {
        showNotification('Break finished! Ready to focus again?', 'info');
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode]);

  // Percentage Calculations
  const marksObtained = parseFloat(percObtained) || 0;
  const totalPossible = parseFloat(percTotal) || 1;
  const marksPercentage = totalPossible > 0 ? (marksObtained / totalPossible) * 100 : 0;

  const getPakistaniGrade = (pct: number) => {
    if (pct >= 80) return { grade: 'A-1 (Exceptional)', color: 'text-emerald-600', remarks: 'First Division with Distinction' };
    if (pct >= 70) return { grade: 'A (Excellent)', color: 'text-blue-600', remarks: 'First Division' };
    if (pct >= 60) return { grade: 'B (Good)', color: 'text-amber-600', remarks: 'First Division' };
    if (pct >= 50) return { grade: 'C (Fair)', color: 'text-orange-600', remarks: 'Second Division' };
    if (pct >= 40) return { grade: 'D (Satisfactory)', color: 'text-slate-600', remarks: 'Third Division' };
    if (pct >= 33) return { grade: 'E (Pass)', color: 'text-slate-500', remarks: 'Passing Line' };
    return { grade: 'F (Fail)', color: 'text-rose-600', remarks: 'Needs Improvement' };
  };

  const gradeInfo = getPakistaniGrade(marksPercentage);

  // Percentage of Value
  const valX = parseFloat(percentOfX) || 0;
  const valY = parseFloat(percentOfY) || 0;
  const calcPercentOf = (valX / 100) * valY;

  // CGPA Calculations
  const totalCredits = semesters.reduce((acc, sem) => acc + (sem.credits || 0), 0);
  const totalQualityPoints = semesters.reduce((acc, sem) => acc + (sem.gpa * sem.credits || 0), 0);
  const cumulativeCGPA = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';

  // HEC Course GPA Scale mapping
  const gradePoints: Record<string, number> = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.0,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.0,
    'C-': 1.67,
    'D+': 1.33,
    'D': 1.0,
    'F': 0.0,
  };

  const courseCredits = courses.reduce((acc, c) => acc + (c.credits || 0), 0);
  const courseQualityPoints = courses.reduce((acc, c) => acc + ((gradePoints[c.grade] || 0) * c.credits), 0);
  const semesterGPA = courseCredits > 0 ? (courseQualityPoints / courseCredits).toFixed(2) : '0.00';

  // Age Calculator Calculations
  const calculateAge = () => {
    if (!dob) return null;
    const start = new Date(dob);
    const end = new Date(targetDate || new Date());

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return null;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // CSS Eligibility Check (21 to 30 years)
    const isCssEligible = years >= 21 && (years < 30 || (years === 30 && months === 0 && days === 0));
    // MDCAT minimum 16 years
    const isMdcatEligible = years >= 16;

    return { years, months, days, totalDays, totalWeeks, isCssEligible, isMdcatEligible };
  };

  const ageResult = calculateAge();

  // Word Counter Calculations
  const trimmed = counterText.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const charWithSpaces = counterText.length;
  const charWithoutSpaces = counterText.replace(/\s+/g, '').length;
  const sentenceCount = trimmed ? (counterText.match(/[.!?]+(?:\s+|$)/g) || []).length || 1 : 0;
  const paragraphCount = trimmed ? counterText.split(/\n+/).filter(Boolean).length : 0;
  const readingTimeMin = Math.ceil(wordCount / 200) || 1;
  const speakingTimeMin = Math.ceil(wordCount / 130) || 1;

  // Unit Converter Logic
  const convertUnits = () => {
    const v = parseFloat(unitVal);
    if (isNaN(v)) return '0';

    if (unitCategory === 'length') {
      // Base: meters
      const toMeters: Record<string, number> = { m: 1, km: 1000, cm: 0.01, ft: 0.3048, in: 0.0254, mi: 1609.34 };
      const fromMeters: Record<string, number> = { m: 1, km: 0.001, cm: 100, ft: 3.28084, in: 39.3701, mi: 0.000621371 };
      const inM = v * (toMeters[fromUnit] || 1);
      return (inM * (fromMeters[toUnit] || 1)).toFixed(4).replace(/\.?0+$/, '');
    }

    if (unitCategory === 'weight') {
      // Base: kilograms
      const toKg: Record<string, number> = { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 };
      const fromKg: Record<string, number> = { kg: 1, g: 1000, lb: 2.20462, oz: 35.274 };
      const inKg = v * (toKg[fromUnit] || 1);
      return (inKg * (fromKg[toUnit] || 1)).toFixed(4).replace(/\.?0+$/, '');
    }

    if (unitCategory === 'data') {
      // Base: Megabytes
      const toMB: Record<string, number> = { b: 0.00000095367, kb: 0.000976562, mb: 1, gb: 1024, tb: 1048576 };
      const fromMB: Record<string, number> = { b: 1048576, kb: 1024, mb: 1, gb: 0.000976562, tb: 0.00000095367 };
      const inMB = v * (toMB[fromUnit] || 1);
      return (inMB * (fromMB[toUnit] || 1)).toFixed(4).replace(/\.?0+$/, '');
    }

    if (unitCategory === 'temp') {
      if (fromUnit === toUnit) return v.toString();
      if (fromUnit === 'c' && toUnit === 'f') return ((v * 9) / 5 + 32).toFixed(2);
      if (fromUnit === 'f' && toUnit === 'c') return (((v - 32) * 5) / 9).toFixed(2);
      if (fromUnit === 'c' && toUnit === 'k') return (v + 273.15).toFixed(2);
      if (fromUnit === 'k' && toUnit === 'c') return (v - 273.15).toFixed(2);
      if (fromUnit === 'f' && toUnit === 'k') return ((((v - 32) * 5) / 9) + 273.15).toFixed(2);
      if (fromUnit === 'k' && toUnit === 'f') return ((((v - 273.15) * 9) / 5) + 32).toFixed(2);
    }

    return v.toString();
  };

  // Timer helpers
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setTimerPreset = (mode: 'focus' | 'shortBreak' | 'longBreak', minutes: number) => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    setTimerSeconds(minutes * 60);
  };

  const toolsList = [
    { id: 'percentage', label: 'Percentage Calculator', icon: Percent },
    { id: 'cgpa', label: 'CGPA Calculator', icon: GraduationCap },
    { id: 'age', label: 'Age & Eligibility', icon: Calendar },
    { id: 'converter', label: 'Unit Converter', icon: ArrowRightLeft },
    { id: 'gpa', label: 'GPA (Semester) Calculator', icon: Calculator },
    { id: 'counter', label: 'Word & Character Counter', icon: FileText },
    { id: 'qrcode', label: 'QR Code Generator', icon: QrCode },
    { id: 'timer', label: 'Study Pomodoro Timer', icon: Timer },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>Free Academic Utilities Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif-brand">
              Free Student Calculators & Study Tools
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Every tool is fully interactive, running 100% locally in your browser. Calculate academic marks
              percentages, multi-semester CGPA on HEC 4.0 scale, test eligibility age cutoffs, and generate QR codes.
            </p>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdSlot placement="header" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tool Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {toolsList.map(tool => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#0A192F] text-amber-400 shadow-md ring-2 ring-amber-400'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* TOOL 1: PERCENTAGE CALCULATOR */}
        {activeTab === 'percentage' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Academic Marks Percentage Calculator</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ideal for Matric, FSc, O/A Levels, and Board exam score evaluation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Marks Obtained *</label>
                  <input
                    type="number"
                    value={percObtained}
                    onChange={(e) => setPercObtained(e.target.value)}
                    placeholder="e.g. 890"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Marks *</label>
                  <input
                    type="number"
                    value={percTotal}
                    onChange={(e) => setPercTotal(e.target.value)}
                    placeholder="e.g. 1100"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Quick Percentage Computation (X% of Y)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Percentage (%)</label>
                    <input
                      type="number"
                      value={percentOfX}
                      onChange={(e) => setPercentOfX(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Of Total Value</label>
                    <input
                      type="number"
                      value={percentOfY}
                      onChange={(e) => setPercentOfY(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 mt-2">
                  Result: <strong>{percentOfX}% of {percentOfY} = {calcPercentOf.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Result Display Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0A192F] to-[#112240] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Calculated Result
                </span>
                <div className="mt-4">
                  <div className="text-5xl font-extrabold text-amber-400 tracking-tight">
                    {marksPercentage.toFixed(2)}%
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {marksObtained} marks out of {totalPossible}
                  </p>
                </div>

                <div className="mt-8 space-y-3 pt-6 border-t border-slate-700/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Board Division / Grade:</span>
                    <span className="font-bold text-white text-sm">{gradeInfo.grade}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Standard Remarks:</span>
                    <span className="font-bold text-amber-300">{gradeInfo.remarks}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Status:</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${marksPercentage >= 33 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                      {marksPercentage >= 33 ? 'Passed' : 'Fail'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-3 rounded-2xl bg-slate-900/60 border border-slate-700 text-[11px] text-slate-300">
                💡 <strong>Medical & Engineering Tip:</strong> Most Pakistani public medical colleges require minimum 60% in FSc Pre-Medical to sit for MDCAT.
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: CGPA CALCULATOR */}
        {activeTab === 'cgpa' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Multi-Semester CGPA Calculator</h3>
                  <p className="text-xs text-slate-500 mt-1">Standard HEC Pakistan 4.0 Credit-Weighted Scale</p>
                </div>
                <button
                  onClick={() => setSemesters(prev => [
                    ...prev,
                    { id: Date.now(), name: `Semester ${prev.length + 1}`, gpa: 3.5, credits: 16 }
                  ])}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Semester</span>
                </button>
              </div>

              <div className="space-y-3">
                {semesters.map((sem, idx) => (
                  <div key={sem.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={sem.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSemesters(prev => prev.map(s => s.id === sem.id ? { ...s, name: val } : s));
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                    />
                    <div className="w-24">
                      <label className="text-[10px] text-slate-400 block font-semibold">GPA (0-4.0)</label>
                      <input
                        type="number"
                        step="0.01"
                        max="4.0"
                        min="0"
                        value={sem.gpa}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setSemesters(prev => prev.map(s => s.id === sem.id ? { ...s, gpa: val } : s));
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-[10px] text-slate-400 block font-semibold">Credit Hours</label>
                      <input
                        type="number"
                        min="1"
                        value={sem.credits}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setSemesters(prev => prev.map(s => s.id === sem.id ? { ...s, credits: val } : s));
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>
                    {semesters.length > 1 && (
                      <button
                        onClick={() => setSemesters(prev => prev.filter(s => s.id !== sem.id))}
                        className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CGPA Summary Display */}
            <div className="lg:col-span-4 bg-[#0A192F] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Cumulative Academic Standing
                </span>
                <div className="mt-4">
                  <div className="text-6xl font-extrabold text-amber-400 tracking-tight">
                    {cumulativeCGPA}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Out of 4.00 Maximum Scale
                  </p>
                </div>

                <div className="mt-8 space-y-3 pt-6 border-t border-slate-700/80 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Completed Credits:</span>
                    <span className="font-bold text-white text-sm">{totalCredits} Credits</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Semesters:</span>
                    <span className="font-bold text-white">{semesters.length} Completed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">HEC Recognition:</span>
                    <span className="font-bold text-emerald-400">
                      {parseFloat(cumulativeCGPA) >= 3.5 ? 'First Class (Gold / Honors)' : parseFloat(cumulativeCGPA) >= 3.0 ? 'First Division' : 'Good Standing'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-3 rounded-2xl bg-slate-900/60 border border-slate-700 text-[11px] text-slate-300">
                🎓 <strong>Scholarship Threshold:</strong> Fulbright and Erasmus programs strongly prefer a CGPA of 3.3+ (minimum 3.0).
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: AGE & ELIGIBILITY CALCULATOR */}
        {activeTab === 'age' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Age & Exam Eligibility Calculator</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Check exact age requirements for CSS Competitive Exams, PMDC MDCAT, and Public Sector Jobs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth (DOB) *</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Exam Cutoff Date *</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <span className="font-bold text-slate-900">Official Pakistani Cutoff Rules:</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>FPSC CSS Exam:</strong> Age must be between 21 and 30 years on 31st December of preceding year (relaxations apply for government employees/scheduled castes).</li>
                  <li><strong>PMDC MDCAT:</strong> Minimum age requirement is 16 years on the test date.</li>
                </ul>
              </div>
            </div>

            {/* Age Result Display */}
            <div className="lg:col-span-5 bg-[#0A192F] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              {ageResult ? (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Exact Age Calculation
                  </span>
                  <div className="mt-4">
                    <div className="text-4xl font-extrabold text-amber-400 tracking-tight">
                      {ageResult.years} Y, {ageResult.months} M, {ageResult.days} D
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Total {ageResult.totalDays.toLocaleString()} Days ({ageResult.totalWeeks} Weeks)
                    </p>
                  </div>

                  <div className="mt-8 space-y-3 pt-6 border-t border-slate-700/80 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">CSS Exam Eligibility (21-30):</span>
                      <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${ageResult.isCssEligible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {ageResult.isCssEligible ? 'Eligible' : 'Not in 21-30 bracket'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">MDCAT Age (16+):</span>
                      <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${ageResult.isMdcatEligible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {ageResult.isMdcatEligible ? 'Eligible' : 'Under 16'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Please select a valid date of birth.
                </div>
              )}

              <div className="mt-8 p-3 rounded-2xl bg-slate-900/60 border border-slate-700 text-[11px] text-slate-300">
                Check official FPSC or PMDC gazettes for regional age relaxation quotas.
              </div>
            </div>
          </div>
        )}

        {/* TOOL 4: UNIT CONVERTER */}
        {activeTab === 'converter' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Academic Unit Converter</h3>
            <p className="text-xs text-slate-500 mb-6">Convert units in Physics, Engineering & Computer Science</p>

            <div className="flex items-center gap-2 mb-6">
              {(['length', 'weight', 'data', 'temp'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setUnitCategory(cat);
                    if (cat === 'length') { setFromUnit('m'); setToUnit('ft'); }
                    if (cat === 'weight') { setFromUnit('kg'); setToUnit('lb'); }
                    if (cat === 'data') { setFromUnit('gb'); setToUnit('mb'); }
                    if (cat === 'temp') { setFromUnit('c'); setToUnit('f'); }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                    unitCategory === cat ? 'bg-[#0A192F] text-amber-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Value</label>
                <input
                  type="number"
                  value={unitVal}
                  onChange={(e) => setUnitVal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">From Unit</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50"
                >
                  {unitCategory === 'length' && (
                    <>
                      <option value="m">Meters (m)</option>
                      <option value="km">Kilometers (km)</option>
                      <option value="cm">Centimeters (cm)</option>
                      <option value="ft">Feet (ft)</option>
                      <option value="in">Inches (in)</option>
                      <option value="mi">Miles (mi)</option>
                    </>
                  )}
                  {unitCategory === 'weight' && (
                    <>
                      <option value="kg">Kilograms (kg)</option>
                      <option value="g">Grams (g)</option>
                      <option value="lb">Pounds (lb)</option>
                      <option value="oz">Ounces (oz)</option>
                    </>
                  )}
                  {unitCategory === 'data' && (
                    <>
                      <option value="b">Bytes (B)</option>
                      <option value="kb">Kilobytes (KB)</option>
                      <option value="mb">Megabytes (MB)</option>
                      <option value="gb">Gigabytes (GB)</option>
                      <option value="tb">Terabytes (TB)</option>
                    </>
                  )}
                  {unitCategory === 'temp' && (
                    <>
                      <option value="c">Celsius (°C)</option>
                      <option value="f">Fahrenheit (°F)</option>
                      <option value="k">Kelvin (K)</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">To Unit</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50"
                >
                  {unitCategory === 'length' && (
                    <>
                      <option value="ft">Feet (ft)</option>
                      <option value="m">Meters (m)</option>
                      <option value="km">Kilometers (km)</option>
                      <option value="cm">Centimeters (cm)</option>
                      <option value="in">Inches (in)</option>
                      <option value="mi">Miles (mi)</option>
                    </>
                  )}
                  {unitCategory === 'weight' && (
                    <>
                      <option value="lb">Pounds (lb)</option>
                      <option value="kg">Kilograms (kg)</option>
                      <option value="g">Grams (g)</option>
                      <option value="oz">Ounces (oz)</option>
                    </>
                  )}
                  {unitCategory === 'data' && (
                    <>
                      <option value="mb">Megabytes (MB)</option>
                      <option value="gb">Gigabytes (GB)</option>
                      <option value="tb">Terabytes (TB)</option>
                      <option value="kb">Kilobytes (KB)</option>
                    </>
                  )}
                  {unitCategory === 'temp' && (
                    <>
                      <option value="f">Fahrenheit (°F)</option>
                      <option value="c">Celsius (°C)</option>
                      <option value="k">Kelvin (K)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Result Box */}
            <div className="mt-8 p-6 bg-[#0A192F] text-white rounded-2xl text-center">
              <span className="text-xs uppercase font-bold text-amber-300">Converted Value</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 mt-2">
                {unitVal} {fromUnit.toUpperCase()} = {convertUnits()} {toUnit.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* TOOL 5: COURSE SEMESTER GPA CALCULATOR */}
        {activeTab === 'gpa' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Semester Course GPA Calculator</h3>
                  <p className="text-xs text-slate-500 mt-1">HEC Standard Letter Grade Multiplier</p>
                </div>
                <button
                  onClick={() => setCourses(prev => [
                    ...prev,
                    { id: Date.now(), name: `Course ${prev.length + 1}`, credits: 3, grade: 'A' }
                  ])}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Course</span>
                </button>
              </div>

              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCourses(prev => prev.map(c => c.id === course.id ? { ...c, name: val } : c));
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                      placeholder="Course Title"
                    />
                    <div className="w-24">
                      <label className="text-[10px] text-slate-400 block font-semibold">Credits (1-4)</label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={course.credits}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setCourses(prev => prev.map(c => c.id === course.id ? { ...c, credits: val } : c));
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>
                    <div className="w-28">
                      <label className="text-[10px] text-slate-400 block font-semibold">Letter Grade</label>
                      <select
                        value={course.grade}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCourses(prev => prev.map(c => c.id === course.id ? { ...c, grade: val } : c));
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      >
                        {Object.keys(gradePoints).map(g => (
                          <option key={g} value={g}>{g} ({gradePoints[g].toFixed(2)})</option>
                        ))}
                      </select>
                    </div>
                    {courses.length > 1 && (
                      <button
                        onClick={() => setCourses(prev => prev.filter(c => c.id !== course.id))}
                        className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* GPA Summary Display */}
            <div className="lg:col-span-4 bg-[#0A192F] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Semester GPA
                </span>
                <div className="mt-4">
                  <div className="text-6xl font-extrabold text-amber-400 tracking-tight">
                    {semesterGPA}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    On a 4.00 Grade Point Scale
                  </p>
                </div>

                <div className="mt-8 space-y-3 pt-6 border-t border-slate-700/80 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Credit Hours:</span>
                    <span className="font-bold text-white text-sm">{courseCredits} Credits</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Quality Points:</span>
                    <span className="font-bold text-amber-300">{courseQualityPoints.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-3 rounded-2xl bg-slate-900/60 border border-slate-700 text-[11px] text-slate-300">
                A grade point average of 3.67+ earns you Dean’s Honor Roll recognition in most Pakistani universities.
              </div>
            </div>
          </div>
        )}

        {/* TOOL 6: WORD & CHARACTER COUNTER */}
        {activeTab === 'counter' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Word & Character Counter</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Essential for university statements of purpose (SOP), scholarship essays, and research abstracts.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(counterText);
                      setCopied(true);
                      showNotification('Text copied to clipboard!', 'success');
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => setCounterText('')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <textarea
                rows={8}
                value={counterText}
                onChange={(e) => setCounterText(e.target.value)}
                placeholder="Paste or type your scholarship essay, admission statement, or assignment here..."
                className="w-full p-4 rounded-2xl border border-slate-300 text-sm leading-relaxed focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Words</span>
                  <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{wordCount}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Characters</span>
                  <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{charWithSpaces}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Without Spaces</span>
                  <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{charWithoutSpaces}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Reading Time</span>
                  <span className="text-2xl font-extrabold text-blue-600 mt-1 block">~{readingTimeMin} min</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>Sentences: <strong>{sentenceCount}</strong> • Paragraphs: <strong>{paragraphCount}</strong></span>
                <span>Speaking Duration: <strong>~{speakingTimeMin} min</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 7: QR CODE GENERATOR */}
        {activeTab === 'qrcode' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl mx-auto">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">QR Code Generator for Students</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Create instant, scan-ready QR codes for study notes, portfolio links, GitHub repositories, and WhatsApp study groups.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enter URL or Plain Text *</label>
                <textarea
                  rows={3}
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  placeholder="https://... or paste your study note text"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Foreground Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={qrColorDark}
                      onChange={(e) => setQrColorDark(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-700">{qrColorDark}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Background Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={qrColorLight}
                      onChange={(e) => setQrColorLight(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-700">{qrColorLight}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                Tip: Use high-contrast colors (e.g. Navy on White) for optimal camera scanner readability.
              </div>
            </div>

            {/* QR Code Output Box */}
            <div className="lg:col-span-5 bg-[#0A192F] text-white rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-xl text-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Ready to Download
                </span>
                <div className="mt-4 p-4 bg-white rounded-2xl shadow-md inline-block">
                  {qrDataUrl && (
                    <img src={qrDataUrl} alt="Generated QR Code" className="w-48 h-48 mx-auto" />
                  )}
                </div>
              </div>

              <div className="mt-6 w-full">
                {qrDataUrl && (
                  <a
                    href={qrDataUrl}
                    download="education-hub-qr.png"
                    className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download QR Image (PNG)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TOOL 8: BASIC STUDY TIMER */}
        {activeTab === 'timer' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs max-w-xl mx-auto text-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Pomodoro Study Timer</h3>
              <p className="text-xs text-slate-500 mt-1">Boost focus and prevent burnout during MDCAT & university exams</p>
            </div>

            {/* Presets */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setTimerPreset('focus', 25)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  timerMode === 'focus' ? 'bg-[#0A192F] text-amber-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Focus (25m)
              </button>
              <button
                onClick={() => setTimerPreset('shortBreak', 5)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  timerMode === 'shortBreak' ? 'bg-[#0A192F] text-amber-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Short Break (5m)
              </button>
              <button
                onClick={() => setTimerPreset('longBreak', 15)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  timerMode === 'longBreak' ? 'bg-[#0A192F] text-amber-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Long Break (15m)
              </button>
            </div>

            {/* Big Timer Countdown */}
            <div className="py-6">
              <div className="w-56 h-56 rounded-full border-8 border-amber-400/20 bg-slate-900 text-white flex flex-col items-center justify-center mx-auto shadow-inner relative">
                <span className="text-5xl font-mono font-extrabold text-amber-400">
                  {formatTime(timerSeconds)}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                  {timerMode === 'focus' ? 'Deep Work' : 'Break Time'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-6 py-2.5 rounded-2xl bg-[#0A192F] hover:bg-[#112240] text-amber-400 font-bold text-sm flex items-center gap-2 shadow-md transition-colors"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  if (timerMode === 'focus') setTimerSeconds(25 * 60);
                  else if (timerMode === 'shortBreak') setTimerSeconds(5 * 60);
                  else setTimerSeconds(15 * 60);
                }}
                className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-center gap-4">
              <span>Completed Study Sprints Today: <strong>{sessionsCompleted}</strong></span>
              <span>Total Focused: <strong>{sessionsCompleted * 25} mins</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
