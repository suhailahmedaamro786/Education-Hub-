import React, { useState } from 'react';
import { BaseModal } from './PolicyModals';
import { useData } from '../../context/DataContext';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

export const SubmitOpportunityModal: React.FC = () => {
  const { isSubmitModalOpen, setIsSubmitModalOpen, addContentItem, showNotification } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: 'scholarship',
    title: '',
    organization: '',
    categoryOrSubject: 'Engineering & Technology',
    deadline: '',
    officialUrl: '',
    eligibility: '',
    description: '',
    contactEmail: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.officialUrl) {
      showNotification('Please provide a title and official application link', 'error');
      return;
    }

    // Automatically register as pending/published item in system
    if (formData.type === 'scholarship') {
      addContentItem('scholarship', {
        title: formData.title,
        provider: formData.organization || 'Educational Partner',
        country: 'Pakistan',
        level: 'All Levels',
        fundingType: 'Fully Funded',
        benefits: ['Full or Partial Tuition Support'],
        eligibility: formData.eligibility || 'Check official guidelines',
        deadline: formData.deadline || '2026-12-31',
        officialUrl: formData.officialUrl,
        featured: false,
        status: 'Published',
        description: formData.description,
        tags: ['Student Submitted', 'Opportunity'],
      });
    } else if (formData.type === 'job') {
      addContentItem('job', {
        title: formData.title,
        organization: formData.organization || 'Verified Company',
        location: 'Pakistan (Multiple Cities)',
        jobType: 'Full-time',
        freshGrad: true,
        experienceLevel: 'Fresh / Entry Level',
        stipendOrSalary: 'Market Competitive',
        deadline: formData.deadline || '2026-11-30',
        officialUrl: formData.officialUrl,
        skills: ['Relevant Degree', 'Communication'],
        description: formData.description,
        featured: false,
        status: 'Published',
        postedDate: new Date().toISOString().split('T')[0],
      });
    } else if (formData.type === 'admission') {
      addContentItem('admission', {
        universityName: formData.organization || formData.title,
        shortName: formData.title.slice(0, 10),
        coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
        province: 'Punjab',
        city: 'Islamabad / Lahore',
        type: 'Public',
        degrees: ['BS', 'MS'],
        programs: ['Computer Science', 'Business', 'Engineering'],
        eligibility: formData.eligibility || 'Intermediate 50%+',
        deadline: formData.deadline || '2026-12-15',
        session: 'Spring 2027',
        feeRange: 'Standard HEC Structure',
        officialUrl: formData.officialUrl,
        featured: false,
        status: 'Published',
        description: formData.description,
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsSubmitModalOpen(false);
      setFormData({
        type: 'scholarship',
        title: '',
        organization: '',
        categoryOrSubject: 'Engineering & Technology',
        deadline: '',
        officialUrl: '',
        eligibility: '',
        description: '',
        contactEmail: '',
      });
    }, 2200);
  };

  return (
    <BaseModal
      isOpen={isSubmitModalOpen}
      onClose={() => setIsSubmitModalOpen(false)}
      title="Submit an Educational Opportunity"
    >
      {submitted ? (
        <div className="text-center py-8">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-900">Submission Received!</h4>
          <p className="text-slate-600 text-xs mt-1">
            Thank you! Your opportunity has been posted to Education Hub so thousands of students can benefit.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Are you an educational institute, scholarship foundation, software house, or student ambassador? Share
              verified opportunities to empower Pakistani youth!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Opportunity Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              >
                <option value="scholarship">Scholarship Program</option>
                <option value="admission">University Admission Notice</option>
                <option value="job">Job or Internship</option>
                <option value="hackathon">Hackathon or Competition</option>
                <option value="event">Workshop or Webinar</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Talent Hunt Scholarship 2026"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / University *</label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. NUST / Systems Ltd / HEC"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Application Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Official Application Link *</label>
            <input
              type="url"
              required
              value={formData.officialUrl}
              onChange={(e) => setFormData({ ...formData, officialUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
            <input
              type="text"
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              placeholder="e.g. Minimum 60% in FSc or BS Computer Science final year"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description & Details</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Key benefits, documents required, and guidance for applicants..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#112240] transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Submit for Review</span>
          </button>
        </form>
      )}
    </BaseModal>
  );
};
