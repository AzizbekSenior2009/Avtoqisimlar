import React from 'react';
import { Send, Shield, Truck, Menu } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import './TopStrip.css';

export default function TopStrip({ onOpenMenu }) {
  const { lang, setLanguage, t } = useLanguage();
  const { showToast } = useToast();

  const handleIconClick = (text) => {
    showToast(text, 'info', 2000);
  };

  return (
    <div className="topstrip">
      <div className="container topstrip-container">
        {/* Desktop View */}
        <div className="topstrip-desktop-items hide-mobile">
          <a
            href="https://t.me/avtoqism"
            target="_blank"
            rel="noopener noreferrer"
            className="topstrip-link"
          >
            <Send size={15} className="topstrip-icon" />
            <span>{t('topstrip.telegram', 'Bizning Telegram kanalimiz')}</span>
          </a>

          <span className="topstrip-divider">|</span>

          <div className="topstrip-item">
            <Shield size={15} className="topstrip-icon" />
            <span>{t('topstrip.guarantee', 'Sifat kafolati')}</span>
          </div>

          <span className="topstrip-divider">|</span>

          <div className="topstrip-item">
            <Truck size={15} className="topstrip-icon" />
            <span>{t('topstrip.delivery', "Butun O'zbekiston bo'ylab")}</span>
          </div>
        </div>

        {/* Mobile View (4 icons) */}
        <div className="topstrip-mobile-items show-mobile-only">
          <a
            href="https://t.me/avtoqism"
            target="_blank"
            rel="noopener noreferrer"
            className="topstrip-mobile-btn"
            aria-label="Telegram"
          >
            <Send size={18} />
          </a>

          <button
            type="button"
            className="topstrip-mobile-btn"
            onClick={() => handleIconClick(t('topstrip.guarantee', 'Sifat kafolati'))}
            aria-label="Sifat kafolati"
          >
            <Shield size={18} />
          </button>

          <button
            type="button"
            className="topstrip-mobile-btn"
            onClick={() => handleIconClick(t('topstrip.delivery', "Butun O'zbekiston bo'ylab"))}
            aria-label="Yetkazib berish"
          >
            <Truck size={18} />
          </button>

          <button
            type="button"
            className="topstrip-mobile-btn topstrip-menu-trigger"
            onClick={onOpenMenu}
            aria-label="Menyu"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Language Switcher (Desktop) */}
        <div className="topstrip-lang hide-mobile">
          <button
            type="button"
            className={`lang-btn ${lang === 'uz' ? 'active' : ''}`}
            onClick={() => setLanguage('uz')}
          >
            UZ
          </button>
          <span className="lang-sep">|</span>
          <button
            type="button"
            className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
            onClick={() => setLanguage('ru')}
          >
            RU
          </button>
          <span className="lang-sep">|</span>
          <button
            type="button"
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}
