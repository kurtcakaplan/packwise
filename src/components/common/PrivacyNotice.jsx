import React, { useState, useEffect } from 'react';
import { X, Shield, Eye, Cookie } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const PrivacyNotice = () => {
  const { t } = useLanguage();
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('gersim_privacy_accepted');
    if (!hasAccepted) {
      setShowNotice(true);
    }
  }, []);

  const acceptPrivacy = () => {
    localStorage.setItem('gersim_privacy_accepted', 'true');
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 shadow-2xl z-50 border-t-4 border-cyan-500">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-cyan-400 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium mb-1">{t('privacyNoticeTitle')}</p>
            <p className="text-slate-300">{t('privacyNoticeText')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setShowNotice(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <Eye size={16} />
            <span className="sr-only">{t('viewPrivacyPolicy')}</span>
          </button>
          <button
            onClick={acceptPrivacy}
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md font-medium transition-colors"
          >
            {t('acceptPrivacy')}
          </button>
          <button
            onClick={() => setShowNotice(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;