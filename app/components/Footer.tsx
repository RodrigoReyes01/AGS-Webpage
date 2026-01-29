'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Operational Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.operationalContact')}</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <a href="mailto:info@aviationgroundsolutions.com" className="hover:text-brand-blue transition-colors">
                  info@aviationgroundsolutions.com
                </a>
              </p>
              <p>
                <a href="mailto:flightops@aviatiogroundsolutions.com" className="hover:text-brand-blue transition-colors">
                  flightops@aviatiogroundsolutions.com
                </a>
              </p>
            </div>

            {/* Main Contact */}
            <h3 className="text-lg font-semibold mt-6 mb-4">{t('footer.mainContact')}</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <p className="font-medium text-white">Sergio Estrada</p>
              <p>{t('footer.comercialDirector')}</p>
              <p>+502 4100-2147</p>
              <p>
                <a href="mailto:sestrada@aviationgroundsolutions.com" className="hover:text-brand-blue transition-colors">
                  sestrada@aviationgroundsolutions.com
                </a>
              </p>
            </div>

            {/* Analytics Contact */}
            <h3 className="text-lg font-semibold mt-6 mb-4">{t('footer.analyticsContact')}</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <p className="font-medium text-white">Rodrigo Reyes</p>
              <p>{t('footer.logisticsDirector')}</p>
              <p>
                <a href="mailto:rodrigo@aviationgroundsolutions.com" className="hover:text-brand-blue transition-colors">
                  rodrigo@aviationgroundsolutions.com
                </a>
              </p>
            </div>
          </div>

          {/* Be in the Know */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.beInTheKnow')}</h3>
            <p className="text-sm text-gray-300">
              {t('footer.beInTheKnowDescription')}
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.menu')}</h3>
            <nav className="space-y-2 text-sm">
              <Link href="#home" className="block text-gray-300 hover:text-brand-blue transition-colors">
                {t('footer.home')}
              </Link>
              <Link href="#services" className="block text-gray-300 hover:text-brand-blue transition-colors">
                {t('footer.ourServices')}
              </Link>
              <Link href="#about" className="block text-gray-300 hover:text-brand-blue transition-colors">
                {t('footer.aboutUs')}
              </Link>
            </nav>
          </div>

          {/* Follow us on */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.followUs')}</h3>
            <div className="space-y-2">
              <a 
                href="https://www.linkedin.com/company/agsgt/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-gray-300 hover:text-brand-blue transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Logo and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/images/logo-mobile.png"
              />
              <ImageWithFallback
                src="/images/logo.png"
                alt="Aviation Ground Solutions Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
                showLoadingPlaceholder={false}
              />
            </picture>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Aviation Ground Solutions. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
