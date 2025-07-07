import React, { useState } from 'react';
import { UserPlus, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { validateEmail, validatePassword, sanitizeInput } from '../../utils/security';
import SecureForm, { SecureInput, SecurePasswordInput } from '../forms/SecureForm';
import SecurityBadges from '../common/SecurityBadges';

const CustomerRegisterPage = ({ onRegister, onNavigate }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === 'agreeToTerms' ? e.target.checked : sanitizeInput(e.target.value);
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('nameRequired');
    } else if (formData.name.length < 2) {
      newErrors.name = t('nameTooShort');
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = t('invalidEmailFormat');
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = t('passwordRequirements');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordsDoNotMatch');
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = t('mustAgreeToTerms');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await onRegister(
        formData.name,
        formData.email,
        formData.password,
        formData.companyName
      );
      
      if (success) {
        onNavigate('customerLogin');
      }
    } catch (err) {
      setErrors({ general: t('registrationFailed') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailValidation = (value) => ({
    isValid: validateEmail(value),
    message: validateEmail(value) ? '' : t('invalidEmailFormat')
  });

  const nameValidation = (value) => ({
    isValid: value.length >= 2,
    message: value.length >= 2 ? '' : t('nameTooShort')
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <UserPlus size={32} className="text-cyan-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">{t('registerTitle')}</h2>
          <p className="text-slate-600 mt-2">{t('createSecureAccount')}</p>
        </div>
        
        <SecurityBadges />
        
        <SecureForm onSubmit={handleSubmit} className="space-y-5">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700">
              <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{errors.general}</span>
            </div>
          )}
          
          <div>
            <label htmlFor="register_name" className="block text-sm font-medium text-slate-700 mb-2">
              {t('fullName')} <span className="text-red-500">*</span>
            </label>
            <SecureInput
              type="text"
              id="register_name"
              name="name"
              value={formData.name}
              onChange={handleChange('name')}
              placeholder={t('enterFullName')}
              required
              validation={nameValidation}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="register_company" className="block text-sm font-medium text-slate-700 mb-2">
              {t('companyNameOptional')}
            </label>
            <SecureInput
              type="text"
              id="register_company"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange('companyName')}
              placeholder={t('enterCompanyName')}
            />
          </div>
          
          <div>
            <label htmlFor="register_email" className="block text-sm font-medium text-slate-700 mb-2">
              {t('emailAddress')} <span className="text-red-500">*</span>
            </label>
            <SecureInput
              type="email"
              id="register_email"
              name="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="your@email.com"
              required
              validation={emailValidation}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="register_password" className="block text-sm font-medium text-slate-700 mb-2">
              {t('password')} <span className="text-red-500">*</span>
            </label>
            <SecurePasswordInput
              id="register_password"
              name="password"
              value={formData.password}
              onChange={handleChange('password')}
              placeholder={t('createStrongPassword')}
              required
              showStrength={true}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="register_confirm_password" className="block text-sm font-medium text-slate-700 mb-2">
              {t('confirmPassword')} <span className="text-red-500">*</span>
            </label>
            <SecurePasswordInput
              id="register_confirm_password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              placeholder={t('confirmYourPassword')}
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange('agreeToTerms')}
              className="mt-1 h-4 w-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-slate-700">
              {t('agreeToTermsText')} 
              <button type="button" className="text-cyan-600 hover:text-cyan-800 underline ml-1">
                {t('termsAndConditions')}
              </button> 
              {t('and')} 
              <button type="button" className="text-cyan-600 hover:text-cyan-800 underline ml-1">
                {t('privacyPolicy')}
              </button>
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-xs text-red-600">{errors.agreeToTerms}</p>
          )}
          
          <button 
            type="submit" 
            disabled={isSubmitting || !formData.agreeToTerms}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white hover:from-cyan-700 hover:to-cyan-800 py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {t('creating')}...
              </>
            ) : (
              <>
                <CheckCircle size={20} className="mr-2" />
                {t('registerButton')}
              </>
            )}
          </button>
        </SecureForm>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            {t('alreadyHaveAccount')} 
            <button 
              onClick={() => onNavigate('customerLogin')} 
              className="font-medium text-cyan-600 hover:text-cyan-800 ml-1 underline"
            >
              {t('loginHere')}
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

export default CustomerRegisterPage;