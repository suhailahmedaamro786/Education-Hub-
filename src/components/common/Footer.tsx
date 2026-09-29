import React, { useState } from 'react';
import { 
  GraduationCap, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Cpu, 
  Megaphone,
  BookOpen,
  Info,
  Download,
  Copy,
  ExternalLink,
  Code2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BaseModal, ContactModal } from './PolicyModals';
import { generateSitemapXml, downloadSitemapXml, MAIN_SITEMAP_ROUTES } from '../../utils/sitemapGenerator';

export const Footer: React.FC = () => {
  const { setCurrentView, showNotification } = useData();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Policy Modal States
  const [modalType, setModalType] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showNotification('Subscribed! You will receive weekly scholarship & admission alerts.', 'success');
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#071120] text-slate-300 border-t border-slate-800">
        {/* Newsletter Section */}
        <div className="bg-[#0A192F] border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="bg-gradient-to-br from-slate-900 via-[#112240] to-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-700/60 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>Free Weekly Educational Digest</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-brand">
                    Never Miss a Scholarship or Admission Deadline
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 max-w-xl">
                    Get verified notifications for HEC scholarships, Fulbright, Erasmus, MDCAT dates, and fresh graduate
                    tech jobs delivered to your inbox every Sunday.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  {subscribed ? (
                    <div className="flex items-center gap-3 p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-emerald-300 text-sm">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                      <div>
                        <p className="font-bold">You are now subscribed!</p>
                        <p className="text-xs text-emerald-400/80">Check your inbox for our latest scholarship digest.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Enter your student email..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-hidden focus:border-amber-400"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>Subscribe Free</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1.5 px-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Zero spam. Direct official announcements only. Unsubscribe anytime.</span>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
            {/* 1. Education Hub logo & Description */}
            <div className="lg:col-span-6 space-y-4">
              <div 
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xl text-white font-serif-brand">
                    EDUCATION<span className="text-amber-400">HUB</span>
                  </h4>
                  <p className="text-xs text-amber-300 font-semibold tracking-wider">
                    Learn • Grow • Succeed
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
                An educational platform helping students discover scholarships, admissions, jobs, internships,
                educational resources and AI tools.
              </p>
            </div>

            {/* 2. Quick Links */}
            <div className="lg:col-span-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Quick Links</span>
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <button 
                    onClick={() => setCurrentView('home')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('admissions')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Admissions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('scholarships')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Scholarships
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('jobs')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Jobs & Internships
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('ai-tech')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    AI & Technology
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('student-tools')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Student Tools
                  </button>
                </li>
              </ul>
            </div>

            {/* 3. Useful Links */}
            <div className="lg:col-span-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Useful Links</span>
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <button 
                    onClick={() => setModalType('about')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalType('contact')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalType('privacy')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalType('terms')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalType('disclaimer')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Disclaimer
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalType('advertise')} 
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Advertise With Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalType('sitemap')} 
                    className="hover:text-amber-300 transition-colors text-left font-medium text-amber-400/90"
                  >
                    Sitemap XML
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Subtle Gold Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>

          {/* 4. Founder & Technology Credits Section */}
          <div className="py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Founder Credit */}
              <div className="bg-[#0A192F]/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:border-amber-400/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    FOUNDER
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    Suhail Ahmed Aamro
                  </span>
                </div>
              </div>

              {/* Technology Partner Credit */}
              <div className="bg-[#0A192F]/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:border-amber-400/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    POWERED BY
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    AgentForce Tech
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Line */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span>© {currentYear} Education Hub. All rights reserved.</span>
            </div>
            <div className="text-[11px] text-slate-400">
              <span>Founded by <strong className="text-slate-300 font-semibold">Suhail Ahmed Aamro</strong></span>
              <span className="mx-2 text-slate-600">•</span>
              <span>Powered by <strong className="text-slate-300 font-semibold">AgentForce Tech</strong></span>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={modalType === 'contact'} onClose={() => setModalType(null)} />

      {/* About Modal */}
      <BaseModal isOpen={modalType === 'about'} onClose={() => setModalType(null)} title="About Education Hub">
        <div className="space-y-3">
          <p>
            <strong>Education Hub</strong> is a premier educational information platform founded to
            democratize access to verified academic resources for students throughout Pakistan and overseas.
          </p>
          <h4 className="font-bold text-slate-900">Our Core Vision</h4>
          <p>
            To bridge the information gap in Pakistan's higher education sector by delivering transparent, zero-cost
            intelligence regarding university admissions, fully funded global scholarships (Fulbright, Erasmus Mundus,
            DAAD, Commonwealth, CSC), entry test guidelines, and high-demand technology skills.
          </p>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-950 space-y-1">
            <p><strong>Founder:</strong> Suhail Ahmed Aamro</p>
            <p><strong>Technology Partner:</strong> AgentForce Tech</p>
          </div>
          <h4 className="font-bold text-slate-900">Why Students Trust Us</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Strictly authentic links to official university portals.</li>
            <li>Comprehensive coverage of all provinces: Punjab, Sindh, KPK, Balochistan, Islamabad, AJK, and GB.</li>
            <li>Free practical student utilities including GPA, CGPA, and Age calculators.</li>
          </ul>
        </div>
      </BaseModal>

      {/* Privacy Policy Modal */}
      <BaseModal isOpen={modalType === 'privacy'} onClose={() => setModalType(null)} title="Privacy Policy">
        <div className="space-y-3">
          <p className="text-xs text-slate-500">Last Updated: September 2026</p>
          <p>
            At Education Hub, one of our main priorities is the privacy of our visitors.
            This Privacy Policy document outlines the types of information recorded and how we safeguard it.
          </p>
          <h4 className="font-bold text-slate-900">1. Information We Collect</h4>
          <p>
            We only collect information voluntarily provided by users, such as email addresses for our weekly educational
            newsletter or details submitted via our Opportunity submission form.
          </p>
          <h4 className="font-bold text-slate-900">2. Cookies and Web Beacons</h4>
          <p>
            Like any other website, Education Hub uses basic browser storage (localStorage) to retain user preferences,
            such as bookmarked scholarships and calculator histories. These remain locally on your device.
          </p>
          <h4 className="font-bold text-slate-900">3. Third Party Advertisements & Links</h4>
          <p>
            Our website may display sponsored notices or standard ad network units (such as Google AdSense). Education Hub
            does not share personally identifiable information with third-party advertisers.
          </p>
        </div>
      </BaseModal>

      {/* Terms & Conditions Modal */}
      <BaseModal isOpen={modalType === 'terms'} onClose={() => setModalType(null)} title="Terms & Conditions">
        <div className="space-y-3">
          <p>
            Welcome to Education Hub. By accessing or using this website, you agree to comply with and be bound by the
            following terms and conditions of use.
          </p>
          <h4 className="font-bold text-slate-900">1. Academic Information Only</h4>
          <p>
            All content, including scholarship deadlines, admission eligibility criteria, past papers, and fee
            structures, is compiled for informational and educational purposes. While we strive for accuracy, users must
            always verify details on the official university or scholarship donor website prior to making decisions.
          </p>
          <h4 className="font-bold text-slate-900">2. Intellectual Property</h4>
          <p>
            The branding, design, calculators, and software code of Education Hub are proprietary. Educational past
            papers and syllabi belong to their respective examining authorities (PMDC, UET, NTS, BISE boards).
          </p>
        </div>
      </BaseModal>

      {/* Disclaimer Modal */}
      <BaseModal isOpen={modalType === 'disclaimer'} onClose={() => setModalType(null)} title="Disclaimer">
        <div className="space-y-3">
          <p>
            <strong>Education Hub</strong> is an independent academic resource platform and is not officially affiliated
            with or endorsed by the Higher Education Commission (HEC), Pakistan Medical and Dental Council (PMDC),
            National Testing Service (NTS), or any specific university unless explicitly stated.
          </p>
          <p>
            All registered trademarks, university crests, and institutional names are the property of their respective
            owners. Application links direct students directly to the official external application websites.
          </p>
        </div>
      </BaseModal>

      {/* Advertise With Us Modal */}
      <BaseModal isOpen={modalType === 'advertise'} onClose={() => setModalType(null)} title="Advertise With Education Hub">
        <div className="space-y-3">
          <p>
            Reach hundreds of thousands of motivated Pakistani and international high school, undergraduate, and graduate
            students searching for university degrees, test preparation, scholarships, and student services.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2">Audience Demographics:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>• 45% Undergraduate Seekers</div>
              <div>• 35% Postgrad / Study Abroad</div>
              <div>• 20% Tech & Professional Fresh Grads</div>
              <div>• Top Cities: Lahore, Islamabad, Karachi, Peshawar</div>
            </div>
          </div>
          <h4 className="font-bold text-slate-900">Available Ad Formats:</h4>
          <p className="text-xs">
            Leaderboard 728×90, Sidebar Rectangle 300×250, Sponsored Feature Articles, and Dedicated Newsletter Blasts.
          </p>
          <p className="text-xs">
            For rate cards and sponsorship guidelines, contact our academic desk.
          </p>
        </div>
      </BaseModal>

      {/* Sitemap XML Modal & Generator Utility */}
      <BaseModal isOpen={modalType === 'sitemap'} onClose={() => setModalType(null)} title="Sitemap XML Generator Utility">
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Education Hub automatically generates an SEO-standard XML sitemap containing all 12 core platform sections,
            priority rankings, and crawl frequency directives formatted for search engines (Google, Bing, Yandex).
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Main Pages Included ({MAIN_SITEMAP_ROUTES.length})</span>
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                protocol 0.9 valid
              </span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {MAIN_SITEMAP_ROUTES.map((route) => (
                <div key={route.path} className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/80">
                  <span className="font-semibold text-slate-800 truncate">{route.label}</span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded shrink-0">
                    p: {route.priority.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => {
                downloadSitemapXml();
                showNotification('sitemap.xml downloaded successfully!', 'success');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download sitemap.xml</span>
            </button>

            <button
              onClick={() => {
                const xml = generateSitemapXml();
                navigator.clipboard.writeText(xml);
                showNotification('Full Sitemap XML copied to clipboard!', 'success');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Copy XML Output</span>
            </button>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>View Raw /sitemap.xml</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </BaseModal>
    </>
  );
};
