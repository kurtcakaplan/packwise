import React from 'react';
import { Building } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const ReferencesPage = ({ references }) => {
  const { t, getLocalized } = useLanguage();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          {t('ourValuedPartners')}
        </h2>
        <p className="text-slate-600 mb-6 text-center">
          {t('referencesIntro')}
        </p>
        
        {references.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
            {references.map(ref => (
              <div 
                key={ref.id} 
                className="p-4 bg-slate-100 rounded-lg text-center aspect-video flex flex-col justify-center items-center"
              >
                {ref.logoUrl ? (
                  <img 
                    src={ref.logoUrl} 
                    alt={getLocalized(ref.name)} 
                    className="max-h-16 max-w-full object-contain mb-2" 
                    onError={(e) => e.target.style.display='none'}
                  />
                ) : (
                  <Building size={32} className="mx-auto mb-2 text-cyan-600" />
                )}
                <p className="text-sm font-medium text-slate-700">
                  {getLocalized(ref.name)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">
            {t('noReferences')}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReferencesPage;