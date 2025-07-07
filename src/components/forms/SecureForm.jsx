import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { validatePassword, sanitizeInput } from '../../utils/security';
import { useLanguage } from '../../contexts/LanguageContext';

const SecureForm = ({ children, onSubmit, className = '' }) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {children}
      {isSubmitting && (
        <div className="flex items-center justify-center py-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-600"></div>
          <span className="ml-2 text-sm text-slate-600">{t('processing')}</span>
        </div>
      )}
    </form>
  );
};

export const SecurePasswordInput = ({ 
  value, 
  onChange, 
  placeholder, 
  required = false,
  showStrength = false,
  name = 'password',
  id = 'password'
}) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    return score;
  };

  const handleChange = (e) => {
    const newValue = sanitizeInput(e.target.value);
    onChange({ ...e, target: { ...e.target, value: newValue } });
    if (showStrength) {
      setStrength(calculateStrength(newValue));
    }
  };

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength <= 2) return t('passwordWeak');
    if (strength <= 3) return t('passwordFair');
    if (strength <= 4) return t('passwordGood');
    return t('passwordStrong');
  };

  return (
    <div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className="w-full p-3 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {showStrength && value && (
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${(strength / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-slate-600">{getStrengthText()}</span>
          </div>
          {!validatePassword(value) && (
            <div className="flex items-center mt-1 text-xs text-red-600">
              <AlertTriangle size={12} className="mr-1" />
              {t('passwordRequirements')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const SecureInput = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  validation,
  name,
  id
}) => {
  const { t } = useLanguage();
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const newValue = sanitizeInput(e.target.value);
    onChange({ ...e, target: { ...e.target, value: newValue } });
    
    if (validation) {
      const validationResult = validation(newValue);
      setIsValid(validationResult.isValid);
      setErrorMessage(validationResult.message || '');
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:border-cyan-500 outline-none ${
            isValid ? 'border-slate-300 focus:ring-cyan-500' : 'border-red-300 focus:ring-red-500'
          }`}
        />
        {value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isValid ? (
              <CheckCircle size={16} className="text-green-500" />
            ) : (
              <AlertTriangle size={16} className="text-red-500" />
            )}
          </div>
        )}
      </div>
      {!isValid && errorMessage && (
        <div className="flex items-center mt-1 text-xs text-red-600">
          <AlertTriangle size={12} className="mr-1" />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SecureForm;