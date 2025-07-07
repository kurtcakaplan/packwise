import React, { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import SecurityBadges from '../common/SecurityBadges';

const AdminLoginPage = ({ onLogin, onNavigate }) => {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onLogin(username, password);
    } catch (err) {
      setError(t('adminLoginInvalid'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">{t('adminLoginTitle')}</h2>
          <p className="text-slate-600 mt-2">{t('packwiseManagement')}</p>
        </div>
        
        <SecurityBadges />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700">
              <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <div>
            <label htmlFor="admin_username" className="block text-sm font-medium text-slate-700 mb-2">
              {t('username')}
            </label>
            <input
              type="text"
              id="admin_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="admin_password" className="block text-sm font-medium text-slate-700 mb-2">
              {t('password')}
            </label>
            <input
              type="password"
              id="admin_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('enterPassword')}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {t('processing')}...
              </>
            ) : (
              <>
                <Shield size={20} className="mr-2" />
                {t('loginButton')}
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            {t('notAnAdmin')} 
            <button 
              onClick={() => onNavigate('customerLogin')} 
              className="font-medium text-cyan-600 hover:text-cyan-800 ml-1 underline"
            >
              {t('customerLoginHere')}
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

export default AdminLoginPage;