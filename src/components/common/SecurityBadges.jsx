import React from 'react';
import { Shield, Lock, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const SecurityBadges = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 my-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center text-green-700">
          <Shield size={16} className="mr-1" />
          <span className="font-medium">{t('secureCheckout')}</span>
        </div>
        <div className="flex items-center text-blue-700">
          <Lock size={16} className="mr-1" />
          <span className="font-medium">{t('sslEncrypted')}</span>
        </div>
        <div className="flex items-center text-purple-700">
          <Award size={16} className="mr-1" />
          <span className="font-medium">{t('trustedBusiness')}</span>
        </div>
        <div className="flex items-center text-green-700">
          <CheckCircle size={16} className="mr-1" />
          <span className="font-medium">{t('dataProtected')}</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;