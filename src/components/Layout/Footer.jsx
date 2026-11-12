import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Phone, Mail, MapPin, ArrowRight, Instagram, Youtube, Facebook, ChevronDown } from 'lucide-react';
import Logo from '../ui/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { subscriberService } from '../../services/subscriberService';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [openSections, setOpenSections] = useState({
    links: false,
    contact: false,
    social: false,
  });

  const toggleSection = (sec) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast("Iltimos, to'g'ri email manzilini kiriting!", 'error');
      return;
    }

    subscriberService.addSubscriber(email);
    setEmail('');
    showToast(t('footer.subscribed', "Obuna bo'ldingiz!"), 'success');
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Top Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Tagline */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <Logo variant="white" />
            </div>
            <p className="footer-tagline">
              {t('footer.tagline', 'Avtomobil qismlari - ishonchli tanlov!')}
            </p>
            <div className="footer-newsletter">
              <h5 className="newsletter-title">
                {t('footer.newsletterTitle', "Yangiliklardan xabardor bo'ling")}
              </h5>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder={t('footer.emailPlaceholder', 'Email manzilingiz')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn" aria-label="Obuna bo'lish">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className={`footer-col ${openSections.links ? 'is-open' : ''}`}>
            <div className="footer-col-head" onClick={() => toggleSection('links')}>
              <h4 className="footer-col-title">{t('footer.links', 'Foydali havolalar')}</h4>
              <ChevronDown size={18} className="footer-accordion-icon show-mobile-only" />
            </div>
            <ul className="footer-nav-list">
              <li>
                <Link to="/">{t('footer.home', 'Bosh sahifa')}</Link>
              </li>
              <li>
                <Link to="/catalog">{t('footer.catalog', 'Katalog')}</Link>
              </li>
              <li>
                <Link to="/delivery">{t('footer.delivery', 'Yetkazib berish')}</Link>
              </li>
              <li>
                <Link to="/contact">{t('footer.contact', 'Aloqa')}</Link>
              </li>
              <li>
                <Link to="/about">{t('footer.about', 'Biz haqimizda')}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className={`footer-col ${openSections.contact ? 'is-open' : ''}`}>
            <div className="footer-col-head" onClick={() => toggleSection('contact')}>
              <h4 className="footer-col-title">{t('footer.connect', "Biz bilan bog'laning")}</h4>
              <ChevronDown size={18} className="footer-accordion-icon show-mobile-only" />
            </div>
            <ul className="footer-contact-list">
              <li>
                <Phone size={16} className="contact-icon" />
                <a href="tel:+998901234567">+998 90 123 45 67</a>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <a href="mailto:info@avtoqism.uz">info@avtoqism.uz</a>
              </li>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Toshkent, Uzbekistan</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className={`footer-col ${openSections.social ? 'is-open' : ''}`}>
            <div className="footer-col-head" onClick={() => toggleSection('social')}>
              <h4 className="footer-col-title">{t('footer.social', 'Ijtimoiy tarmoqlar')}</h4>
              <ChevronDown size={18} className="footer-accordion-icon show-mobile-only" />
            </div>
            <div className="footer-social-list">
              <a
                href="https://t.me/avtoqism"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn telegram"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn instagram"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn youtube"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn facebook"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            {t('footer.copyright', '© 2025 AvtoQism. Barcha huquqlar himoyalangan.')}
          </div>
          <div className="footer-legal-links">
            <Link to="/terms">{t('footer.terms', 'Foydalanish shartlari')}</Link>
            <span className="legal-sep">|</span>
            <Link to="/privacy">{t('footer.privacy', 'Maxfiylik siyosati')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
