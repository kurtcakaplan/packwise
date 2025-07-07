import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const ContactPage = ({ contactInfo }) => {
  const { t } = useLanguage();
  const [contactForm, setContactFormState] = useState({ name: '', email: '', message: '' });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(t('thankYouMessage', {name: contactForm.name}));
    setContactFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          {t('contactUs')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-semibold text-slate-700 mb-3">
              {t('getInTouch')}
            </h3>
            <p className="text-slate-600 mb-4">
              {t('contactIntro')}
            </p>
            <div className="space-y-3">
              <p className="flex items-center text-slate-600">
                <MapPin size={20} className="mr-3 text-cyan-600"/>
                {contactInfo.address}
              </p>
              <p className="flex items-center text-slate-600">
                <Phone size={20} className="mr-3 text-cyan-600"/> 
                {contactInfo.phone}
              </p>
              <p className="flex items-center text-slate-600">
                <Mail size={20} className="mr-3 text-cyan-600"/> 
                {contactInfo.email}
              </p>
            </div>
          </div>
          
          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div>
              <label htmlFor="contact_name_field" className="block text-sm font-medium text-slate-700 mb-1">
                {t('fullName')}
              </label>
              <input 
                type="text" 
                name="name" 
                id="contact_name_field" 
                value={contactForm.name} 
                onChange={handleContactChange} 
                required 
                className="w-full p-2 border rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="contact_email_field" className="block text-sm font-medium text-slate-700 mb-1">
                {t('emailAddress')}
              </label>
              <input 
                type="email" 
                name="email" 
                id="contact_email_field" 
                value={contactForm.email} 
                onChange={handleContactChange} 
                required 
                className="w-full p-2 border rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="contact_message_field" className="block text-sm font-medium text-slate-700 mb-1">
                {t('message')}
              </label>
              <textarea 
                name="message" 
                id="contact_message_field" 
                value={contactForm.message} 
                onChange={handleContactChange} 
                required 
                rows="4" 
                className="w-full p-2 border rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-cyan-600 text-white hover:bg-cyan-700 py-3 px-4 rounded-lg font-semibold"
            >
              {t('sendMessage')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;