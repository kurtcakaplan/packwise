import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sk', name: 'Slovenčina' },
    { code: 'hu', name: 'Magyar' }
  ];

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => setCurrentLanguage(e.target.value)}
        className="bg-slate-700 text-white p-1.5 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm cursor-pointer"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;