import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SITE_CONFIG } from '../../config/siteConfig';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between border-b border-slate-800">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { showNotification } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Query', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Please fill all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showNotification('Thank you! Your message has been sent to our academic desk.', 'success');
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Contact Education Hub">
      {submitted ? (
        <div className="text-center py-8">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-900">Message Received!</h4>
          <p className="text-slate-600 text-xs mt-1">Our student support and editorial team will respond within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input 
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Suhail Ahmed"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input 
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Subject</label>
            <select
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            >
              <option value="General Query">General Educational Query</option>
              <option value="Scholarship Guidance">Scholarship Application Guidance</option>
              <option value="University Correction">University Data Correction</option>
              <option value="Partnership & Advertising">Partnership & Advertising</option>
              <option value="Content Contribution">Content Contribution / Study Notes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
            <textarea 
              rows={4}
              required
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we assist your educational journey?"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>{SITE_CONFIG.editorialContact}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>+92 (051) 890-4422 (Islamabad Desk)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Evacuee Trust Complex, Sector F-5/1, Islamabad, Pakistan</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#112240] transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </BaseModal>
  );
};
