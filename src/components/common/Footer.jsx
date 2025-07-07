import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-800 text-slate-300 p-6 mt-12 text-center">
      <p>&copy; {new Date().getFullYear()} Packwise. {t('allRightsReserved')}</p>
      <p className="text-sm">{t('footerSlogan')}</p>
    </footer>
  );
};

export default Footer;