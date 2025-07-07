import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import TrustIndicators from '../common/TrustIndicators';

const HeroHeader = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleShopNowClick = () => {
    // Scroll to products section on the same page
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If products section not found, navigate to shop
      onNavigate('shop');
    }
  };

  return (
    <>
      <div className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-20 sm:py-28 md:py-32 lg:py-40 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=500&fit=crop" 
          alt="Packwise Solutions Header" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-500/10 rounded-full blur-xl"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                {t('heroTitle')}
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleShopNowClick}
                className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
              >
                <span className="flex items-center">
                  {t('shop')} {t('now')}
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              <button 
                onClick={() => onNavigate('contact')} 
                className="group border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm"
              >
                {t('getQuote')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <TrustIndicators />
    </>
  );
};

export default HeroHeader;