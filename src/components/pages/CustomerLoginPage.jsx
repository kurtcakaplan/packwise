import React, { useState } from 'react';
import { UserCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { validateEmail, rateLimit } from '../../utils/security';
import SecureForm, { SecureInput, SecurePasswordInput } from '../forms/SecureForm';
import SecurityBadges from '../common/SecurityBadges';

const CustomerLoginPage = ({ onLogin, onNavigate }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Rate limiting
    if (!rateLimit(`login_${email}`, 5, 15 * 60 * 1000)) {
      setIsBlocked(true);
      setError(t('tooManyAttempts'));
      return;
    }

    // Validation
    if (!validateEmail(email)) {
      setError(t('invalidEmail'));
      return;
    }

    if (password.length < 6) {
      setError(t('passwordTooShort'));
      return;
    }

    try {
      await onLogin(email, password);
    } catch (err) {
      setError(t('loginFailed'));
    }
  };

  const emailValidation = (value) => ({
    isValid: validateEmail(value),
    message: validateEmail(value) ? '' : t('invalidEmailFormat')
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <UserCircle size={32} className="text-cyan-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">{t('loginTitle')}</h2>
          <p className="text-slate-600 mt-2">{t('secureLoginSubtitle')}</p>
        </div>
        
        <SecurityBadges />
        
        <SecureForm onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700">
              <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {isBlocked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-sm">
              {t('accountTemporarilyBlocked')}
            </div>
          )}
          
          <div>
            <label htmlFor="customer_email" className="block text-sm font-medium text-slate-700 mb-2">
              {t('emailAddress')}
            </label>
            <SecureInput
              type="email"
              id="customer_email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              validation={emailValidation}
            />
          </div>
          
          <div>
            <label htmlFor="customer_password" className="block text-sm font-medium text-slate-700 mb-2">
              {t('password')}
            </label>
            <SecurePasswordInput
              id="customer_password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('enterPassword')}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isBlocked}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white hover:from-cyan-700 hover:to-cyan-800 py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {t('loginButton')}
          </button>
        </SecureForm>
        
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-slate-600">
            {t('dontHaveAccount')} 
            <button 
              onClick={() => onNavigate('customerRegister')} 
              className="font-medium text-cyan-600 hover:text-cyan-800 ml-1 underline"
            >
              {t('registerHere')}
            </button>
          </p>
          
          <p className="text-sm text-slate-500">
            {t('areYouAdmin')} 
            <button 
              onClick={() => onNavigate('adminLogin')} 
              className="font-medium text-purple-600 hover:text-purple-800 ml-1 underline"
            >
              {t('adminLoginHere')}
            </button>
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">
            {t('protectedBySSL')} • {t('yourDataIsSafe')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginPage;