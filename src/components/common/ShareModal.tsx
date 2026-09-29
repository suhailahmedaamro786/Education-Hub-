import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Linkedin, Twitter, Facebook, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ShareModal: React.FC = () => {
  const { shareModal, closeShareModal, showNotification } = useData();
  const [copied, setCopied] = useState(false);

  if (!shareModal.isOpen) return null;

  const currentUrl = shareModal.url || window.location.href;
  const shareText = `Check out "${shareModal.title}" on Education Hub Pakistan: ${currentUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    showNotification('Link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800 text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: 'Twitter / X',
      icon: Twitter,
      color: 'bg-slate-900 hover:bg-slate-800 text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareModal.title)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-[#0A192F] text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">Share Opportunity</h3>
            <p className="text-xs text-amber-300">Help fellow students discover this</p>
          </div>
          <button 
            onClick={closeShareModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 text-sm line-clamp-2">{shareModal.title}</h4>
            {shareModal.category && (
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1 inline-block">
                {shareModal.category}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {shareLinks.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold shadow-xs transition-colors ${platform.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{platform.name}</span>
                </a>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Direct Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-700 select-all"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={closeShareModal}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
