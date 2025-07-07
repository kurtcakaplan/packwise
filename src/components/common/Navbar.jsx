import React, { useState } from 'react';
import { ShoppingCart, UserCircle, LogOut } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ 
  currentUser, 
  cartItemCount, 
  isAdminLoggedIn, 
  onNavigate, 
  onCustomerLogout, 
  onAdminLogout 
}) => {
  const { t } = useLanguage();
  const [logoLoadError, setLogoLoadError] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-4 shadow-md sticky top-0 z-40">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('shop')}>
          {!logoLoadError ? (
            <img 
              src="/GER.png" 
              alt="Packwise Logo" 
              className="h-10 w-auto"
              onError={() => setLogoLoadError(true)}
            />
          ) : (
            <h1 className="text-2xl font-bold">Packwise</h1>
          )}
        </div>
        
        <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 mt-2 sm:mt-0 text-xs xxs:text-sm sm:text-base">
          <button 
            onClick={() => onNavigate('shop')} 
            className="hover:text-cyan-300 transition-colors px-1 sm:px-2"
          >
            {t('shop')}
          </button>
          <button 
            onClick={() => onNavigate('references')} 
            className="hover:text-cyan-300 transition-colors px-1 sm:px-2"
          >
            {t('references')}
          </button>
          <button 
            onClick={() => onNavigate('contact')} 
            className="hover:text-cyan-300 transition-colors px-1 sm:px-2"
          >
            {t('contact')}
          </button>
          
          <button 
            onClick={() => onNavigate('cart')} 
            className="relative hover:text-cyan-300 transition-colors px-1 sm:px-2"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1.5 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>
          
          <LanguageSwitcher />
          
          {currentUser ? (
            <>
              <button 
                onClick={() => onNavigate('account')} 
                className="hover:text-cyan-300 transition-colors px-1 sm:px-2 flex items-center"
              >
                <UserCircle size={18} className="mr-1"/>
                {t('myAccount')}
              </button>
              <button 
                onClick={onCustomerLogout} 
                className="flex items-center bg-orange-500 hover:bg-orange-600 px-2 py-1 rounded-md transition-colors"
              >
                <LogOut size={16} className="mr-1" /> 
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('customerLogin')} 
                className="hover:text-cyan-300 transition-colors px-1 sm:px-2"
              >
                {t('customerLogin')}
              </button>
              <button 
                onClick={() => onNavigate('customerRegister')} 
                className="bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded-md transition-colors"
              >
                {t('customerRegister')}
              </button>
            </>
          )}
          
          {isAdminLoggedIn && (
            <>
              <button 
                onClick={() => onNavigate('adminRoot')} 
                className="hover:text-cyan-300 transition-colors px-1 sm:px-2"
              >
                {t('admin')}
              </button>
              <button 
                onClick={onAdminLogout} 
                className="flex items-center bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md transition-colors"
              >
                <LogOut size={16} className="mr-1" /> 
                {t('logout')} (Admin)
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;