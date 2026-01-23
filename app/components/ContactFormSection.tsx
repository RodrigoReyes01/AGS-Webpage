'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

const ContactFormSection: React.FC = () => {
  const { t, locale } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { firstName, lastName, email, message } = formData;
    
    // Build the email body based on locale
    let emailBody = '';
    let subject = '';
    
    if (locale === 'es') {
      // Spanish version
      emailBody = `Hola, soy ${firstName} ${lastName}, mi dirección de correo es ${email}.

${message}

¡Gracias!
${firstName} ${lastName}
${email}`;
      subject = `Contacto de ${firstName} ${lastName}`;
    } else {
      // English version
      emailBody = `Hi, I'm ${firstName} ${lastName} from ${email}.

${message}

Thank you!
${firstName} ${lastName}
${email}`;
      subject = `Contact from ${firstName} ${lastName}`;
    }

    // Create mailto link
    const mailtoLink = `mailto:sestrada@aviationgroundsolutions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-8 md:px-16">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
          {t('contact.title')}
        </h2>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name and Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.firstName')}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.lastName')}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {t('contact.send')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;
