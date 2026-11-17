import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Menu,
  ChevronRight,
  CheckCircle,
  Flame,
  Star,
  ShieldCheck,
  Truck,
  Headphones,
  Globe,
  Send,
  Instagram,
  Youtube,
  UserCheck,
  Check,
  Cog,
  Disc,
  ArrowDownUp,
  Zap,
  Car,
  Droplets,
  Circle,
  Package,
} from 'lucide-react';
import ProductCard from '../../components/products/ProductCard';
import { categoryService } from '../../services/categoryService';
import { brandService } from '../../services/brandService';
import { productService } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import './Home.css';

// Category icon map
const CATEGORY_ICONS = {
  dvigatel: Cog,
  'tormoz-tizimi': Disc,
  osma: ArrowDownUp,
  elektrika: Zap,
  kuzov: Car,
  'moy-suyuqliklar': Droplets,
  shinalar: Circle,
  aksessuarlar: Package,
};

const HERO_SLIDES = [
  {
    title1: 'AvtoQism',
    title2: 'Avtomobil qismlari',
    highlight: 'bir joyda!',
    bullet1: 'Sifatli mahsulotlar',
    bullet2: 'Qulay narxlar',
    bullet3: 'Tez yetkazib berish',
    ctaLink: '/catalog',
  },
  {
    title1: 'Ishonchli',
    title2: 'Barcha rusumlar uchun',
    highlight: 'ehtiyot qismlar',
    bullet1: 'Kafolatlangan sifat',
    bullet2: 'Tezkor qidiruv',
    bullet3: 'Barcha viloyatlarga',
    ctaLink: '/catalog',
  },
  {
    title1: 'AvtoQism',
    title2: 'O‘z avtomobilingiz uchun',
    highlight: 'eng yaxshisi!',
    bullet1: 'Hamyonbop narx',
    bullet2: 'Original ehtiyot qismlar',
    bullet3: '24/7 buyurtma',
    ctaLink: '/catalog',
  },
  {
    title1: 'Tezkor',
    title2: 'Chevrolet, KIA, Lada',
    highlight: 'va boshqalar!',
    bullet1: 'Minglab yangi e’lonlar',
    bullet2: 'To‘g‘ridan-to‘g‘ri sotuvchi',
    bullet3: 'Vositachilarsiz savdo',
    ctaLink: '/catalog',
  },
];

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setCategories(categoryService.getCategories());
    setBrands(brandService.getBrands());
    setNewProducts(productService.getNewAds(4));
  }, []);

  // Autoplay hero banner 5s
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="home-page">
      <Helmet>
        <title>AvtoQism — O'zbekistonning eng yirik avto ehtiyot qismlar bozori</title>
        <meta
          name="description"
          content="AvtoQism - O'zbekistonda barcha turdagi avtomobillar uchun ehtiyot qismlar: dvigatel, tormoz, osma, elektrika, moylar va shinalar."
        />
      </Helmet>

      {/* ── Main Top Section ── */}
      <section className="home-top-section">
        <div className="container">
          <div className="home-top-grid">
            {/* 1. Left Card: Categories list */}
            <div className="categories-card hide-mobile">
              <Link to="/catalog" className="categories-header-btn">
                <Menu size={18} />
                <span>{t('home.allCategories', 'Barcha kategoriyalar →')}</span>
              </Link>
              <div className="categories-list">
                {categories.slice(0, 8).map((cat) => {
                  const IconComponent = CATEGORY_ICONS[cat.slug] || Package;
                  return (
                    <Link
                      key={cat.id}
                      to={`/catalog?category=${cat.slug}`}
                      className="category-row-item"
                    >
                      <div className="category-row-left">
                        <IconComponent size={17} className="cat-icon" />
                        <span className="cat-name">{cat.name}</span>
                      </div>
                      <ChevronRight size={15} className="cat-arrow" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 2. Middle Card: Hero banner with custom Chevrolet & auto parts banner */}
            <div
              className="hero-banner"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Background Image & Contrast Overlay (8K Ultra HD) */}
              <img
                src="/images/brands/avtoqism_banner_8k.png"
                alt="AvtoQism Chevrolet va ehtiyot qismlari"
                className="hero-banner-bg"
              />
              <div className="hero-banner-overlay" />

              <div className="hero-content">
                <div className="hero-titles">
                  <h1 className="hero-title-main">{slide.title1}</h1>
                  <h2 className="hero-title-sub">{slide.title2}</h2>
                  <div className="hero-title-highlight">{slide.highlight}</div>
                </div>

                <div className="hero-bullets">
                  <div className="hero-bullet">
                    <span className="bullet-check">✓</span>
                    <span>{slide.bullet1}</span>
                  </div>
                  <div className="hero-bullet">
                    <span className="bullet-check">✓</span>
                    <span>{slide.bullet2}</span>
                  </div>
                  <div className="hero-bullet">
                    <span className="bullet-check">✓</span>
                    <span>{slide.bullet3}</span>
                  </div>
                </div>

                <Link to={slide.ctaLink} className="hero-cta-btn">
                  {t('hero.catalogBtn', "Katalogni ko'rish →")}
                </Link>
              </div>

              {/* Hero Carousel Dots */}
              <div className="hero-dots">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`hero-dot ${currentSlide === idx ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slayd ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 3. Right Card: Auth / Profile Card */}
            <div className="home-auth-card">
              {user ? (
                <div className="auth-card-logged">
                  <div className="auth-card-user-info">
                    <div className="auth-avatar-big">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="auth-user-text">
                      <div className="auth-user-greeting">Xush kelibsiz!</div>
                      <div className="auth-user-name">{user.name}</div>
                    </div>
                  </div>

                  <div className="auth-card-stats">
                    <div className="auth-stat-box">
                      <span className="auth-stat-label">Faol e'lonlar</span>
                      <span className="auth-stat-val">3 ta</span>
                    </div>
                    <div className="auth-stat-box">
                      <span className="auth-stat-label">Sevimlilar</span>
                      <span className="auth-stat-val">2 ta</span>
                    </div>
                  </div>

                  <div className="auth-card-actions">
                    <Link to="/dashboard" className="btn-auth-blue">
                      Kabinetga o'tish
                    </Link>
                    <Link to="/post-ad" className="btn-auth-outline">
                      + E'lon berish
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="auth-card-guest">
                  <div className="auth-card-icon-circle">
                    <div className="car-check-icon-wrap">
                      <Car size={36} className="car-svg-icon" />
                      <CheckCircle size={18} className="check-svg-badge" />
                    </div>
                  </div>

                  <h3 className="auth-card-title">
                    {t('home.authCardTitle', 'AvtoQism bilan boshqacha qulay!')}
                  </h3>
                  <p className="auth-card-desc">
                    {t('home.authCardDesc', "E'lon berish, saqlash va xarid qilish uchun kiring")}
                  </p>

                  <div className="auth-card-buttons">
                    <Link to="/login" className="btn-auth-blue">
                      {t('home.loginBtn', 'Kirish')}
                    </Link>
                    <Link to="/register" className="btn-auth-outline">
                      {t('home.registerBtn', "Ro'yxatdan o'tish")}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular Brands Section ── */}
      <section className="home-brands-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <Flame size={22} className="section-flame-icon" />
              <h2 className="section-heading">
                {t('home.popularBrands', 'Mashhur brendlar')}
              </h2>
            </div>
            <Link to="/catalog" className="section-view-all">
              {t('home.viewAll', "Barchasini ko'rish →")}
            </Link>
          </div>

          <div className="brands-tiles-row">
            {brands.map((b) => (
              <Link
                key={b.id}
                to={`/catalog?brand=${b.slug}`}
                className="brand-tile-item"
              >
                <div className="brand-logo-wrap">
                  <img src={b.logo} alt={b.name} className="brand-logo-img" />
                </div>
                <span className="brand-name">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Ads + Why Us Section ── */}
      <section className="home-new-ads-section">
        <div className="container">
          <div className="new-ads-layout-grid">
            {/* Left: 4 Product Cards */}
            <div className="new-ads-column">
              <div className="section-header">
                <div className="section-title-wrap">
                  <Star size={20} className="section-star-icon" />
                  <h2 className="section-heading">
                    {t('home.newAds', "Yangi e'lonlar")}
                  </h2>
                </div>
                <Link to="/catalog" className="section-view-all">
                  {t('home.viewAll', "Barchasini ko'rish →")}
                </Link>
              </div>

              <div className="new-ads-cards-grid">
                {newProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

            {/* Right: Why Us Card */}
            <div className="why-us-column">
              <div className="why-us-card">
                <h3 className="why-us-title">
                  {t('home.whyUs', 'Nega aynan biz?')}
                </h3>

                <div className="why-us-items">
                  <div className="why-us-item">
                    <div className="why-check-circle">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <div className="why-item-text">
                      <span className="why-item-title">
                        {t('home.why1', 'Tasdiqlangan sotuvchilar')}
                      </span>
                    </div>
                  </div>

                  <div className="why-us-item">
                    <div className="why-check-circle">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <div className="why-item-text">
                      <span className="why-item-title">
                        {t('home.why2', 'Eng yaxshi narxlar')}
                      </span>
                    </div>
                  </div>

                  <div className="why-us-item">
                    <div className="why-check-circle">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <div className="why-item-text">
                      <span className="why-item-title">
                        {t('home.why3', "Bepul e'lon berish")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Car + Shield Illustration */}
                <div className="why-us-illustration">
                  <img
                    src="/images/why-us-car.svg"
                    alt="Why Us Illustration"
                    className="why-us-car-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits & Socials Section ── */}
      <section className="home-benefits-section">
        <div className="container">
          <div className="benefits-row">
            {/* Pill 1 */}
            <div className="benefit-pill">
              <div className="benefit-icon-circle">
                <Truck size={24} />
              </div>
              <div className="benefit-text">
                <span className="benefit-title">
                  {t('home.benefitDelivery', 'Tez yetkazib berish')}
                </span>
                <span className="benefit-sub">
                  {t('home.benefitDeliverySub', "Butun O'zbekiston bo'ylab")}
                </span>
              </div>
            </div>

            {/* Pill 2 */}
            <div className="benefit-pill">
              <div className="benefit-icon-circle">
                <ShieldCheck size={24} />
              </div>
              <div className="benefit-text">
                <span className="benefit-title">
                  {t('home.benefitSafe', 'Xavfsiz xarid')}
                </span>
                <span className="benefit-sub">
                  {t('home.benefitSafeSub', "Ma'lumotlaringiz himoyalangan")}
                </span>
              </div>
            </div>

            {/* Pill 3 */}
            <div className="benefit-pill">
              <div className="benefit-icon-circle">
                <Headphones size={24} />
              </div>
              <div className="benefit-text">
                <span className="benefit-title">
                  {t('home.benefitSupport', "24/7 qo'llab-quvvatlash")}
                </span>
                <span className="benefit-sub">
                  {t('home.benefitSupportSub', 'Biz har doim siz bilan')}
                </span>
              </div>
            </div>

            {/* Social Icons Card */}
            <div className="benefits-social-card">
              <a
                href="https://t.me/avtoqism"
                target="_blank"
                rel="noopener noreferrer"
                className="benefit-social-btn telegram"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="benefit-social-btn instagram"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="benefit-social-btn youtube"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://avtoqism.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="benefit-social-btn website"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
