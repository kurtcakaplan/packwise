import React from 'react';
import { Star, Users, Award, Truck, RotateCcw, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const TrustIndicators = () => {
  const { t } = useLanguage();

  const indicators = [
    {
      icon: Star,
      title: t('customerRating'),
      value: '4.8/5',
      subtitle: t('basedOnReviews', { count: '2,847' }),
      color: 'text-yellow-600'
    },
    {
      icon: Users,
      title: t('happyCustomers'),
      value: '15,000+',
      subtitle: t('trustedWorldwide'),
      color: 'text-blue-600'
    },
    {
      icon: Award,
      title: t('yearsExperience'),
      value: '10+',
      subtitle: t('industryExpertise'),
      color: 'text-purple-600'
    },
    {
      icon: Truck,
      title: t('fastDelivery'),
      value: '24-48h',
      subtitle: t('averageDeliveryTime'),
      color: 'text-green-600'
    },
    {
      icon: RotateCcw,
      title: t('returnPolicy'),
      value: '30 ' + t('days'),
      subtitle: t('moneyBackGuarantee'),
      color: 'text-orange-600'
    },
    {
      icon: Shield,
      title: t('securePayments'),
      value: '100%',
      subtitle: t('sslProtected'),
      color: 'text-cyan-600'
    }
  ];

  return (
    <div className="bg-white py-12 border-t border-b border-slate-200">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">
          {t('whyChoosePackwise')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {indicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-slate-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:bg-slate-100 transition-colors">
                  <IconComponent size={24} className={indicator.color} />
                </div>
                <div className="text-lg font-bold text-slate-800 mb-1">
                  {indicator.value}
                </div>
                <div className="text-sm font-medium text-slate-700 mb-1">
                  {indicator.title}
                </div>
                <div className="text-xs text-slate-500">
                  {indicator.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;