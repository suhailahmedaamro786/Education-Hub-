/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { ShareModal } from './components/common/ShareModal';
import { SavedDrawer } from './components/common/SavedDrawer';
import { SubmitOpportunityModal } from './components/common/SubmitOpportunityModal';
import { HomePage } from './components/pages/HomePage';
import { AdmissionsPage } from './components/pages/AdmissionsPage';
import { JobsPage } from './components/pages/JobsPage';
import { ScholarshipsPage } from './components/pages/ScholarshipsPage';
import { EntryTestsPage } from './components/pages/EntryTestsPage';
import { NewsPage } from './components/pages/NewsPage';
import { NotesPage } from './components/pages/NotesPage';
import { AiTechPage } from './components/pages/AiTechPage';
import { HackathonsPage } from './components/pages/HackathonsPage';
import { EventsPage } from './components/pages/EventsPage';
import { StudentToolsPage } from './components/pages/StudentToolsPage';
import { AiToolsDirectoryPage } from './components/pages/AiToolsDirectoryPage';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, notification } = useData();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'jobs':
        return <JobsPage />;
      case 'scholarships':
        return <ScholarshipsPage />;
      case 'entry-tests':
        return <EntryTestsPage />;
      case 'news':
        return <NewsPage />;
      case 'notes':
        return <NotesPage />;
      case 'ai-tech':
        return <AiTechPage />;
      case 'hackathons':
        return <HackathonsPage />;
      case 'events':
        return <EventsPage />;
      case 'student-tools':
        return <StudentToolsPage />;
      case 'ai-tools':
        return <AiToolsDirectoryPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Toast Notification Alert */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-3 duration-300 max-w-sm">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-center gap-3 ${
            notification.type === 'success' 
              ? 'bg-[#0A192F] text-white border-amber-400/40' 
              : notification.type === 'error'
              ? 'bg-rose-950 text-white border-rose-500'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
            {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {notification.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
            <span className="text-xs font-semibold leading-snug">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Interactive Modals & Drawers */}
      <GlobalSearchModal />
      <ShareModal />
      <SavedDrawer />
      <SubmitOpportunityModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
