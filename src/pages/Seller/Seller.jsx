import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Send, MapPin, Clock, Star, CheckCircle, Package } from 'lucide-react';
import { sellerService } from '../../services/sellerService';
import { productService } from '../../services/productService';
import { reviewService } from '../../services/reviewService';
import ProductCard from '../../components/products/ProductCard';
import ContactModal from '../../components/modals/ContactModal';
import './Seller.css';

export default function Seller() {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('ads'); // ads | about | reviews
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const s = sellerService.getSellerById(id) || {
      id: Number(id) || 1,
      name: 'AutoParts.uz',
      rating: 4.8,
      adsCount: 120,
      city: 'Toshkent',
      phone: '+998 90 123 45 67',
      telegram: '@autopartsuz',
      workingHours: '09:00 - 21:00',
      description: "Avtomobil ehtiyot qismlari — ishonchli tanlov! Barcha turdagi avtomobillar uchun original va sifatli qismlar mavjud. Toshkent bo'ylab yetkazib berish xizmati 2 soat ichida.",
      verified: true,
    };
    setSeller(s);

    const prods = productService.getSellerProducts(s.id, null, 20);
    setProducts(prods);

    const revs = reviewService.getReviewsBySeller(s.id);
    setReviews(revs);
  }, [id]);

  if (!seller) return null;

  return (
    <div className="seller-page">
      <Helmet>
        <title>{seller.name} — AvtoQism</title>
      </Helmet>

      {/* Navy Header Banner */}
      <div className="seller-banner">
        <div className="container">
          <div className="seller-banner-content">
            <h1 className="seller-banner-title">{seller.name}</h1>
            <p className="seller-banner-sub">Avtomobil ehtiyot qismlari onlayn do'koni</p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Profile Card overlapping banner */}
        <div className="seller-profile-card">
          <div className="seller-profile-main">
            <div className="seller-avatar-big">
              {seller.name.charAt(0)}
            </div>

            <div className="seller-details-block">
              <div className="seller-name-row">
                <h2 className="seller-profile-name">{seller.name}</h2>
                {seller.verified && (
                  <span className="seller-verified-badge">
                    <CheckCircle size={15} /> Tasdiqlangan
                  </span>
                )}
              </div>

              <div className="seller-info-meta">
                <span className="seller-meta-stat">
                  <Star size={15} fill="#F59E0B" color="#F59E0B" />
                  <strong>{seller.rating}</strong> ({seller.adsCount} ta e'lon)
                </span>
                <span className="seller-meta-stat">
                  <MapPin size={15} /> {seller.city}
                </span>
                {seller.workingHours && (
                  <span className="seller-meta-stat">
                    <Clock size={15} /> {seller.workingHours}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="seller-header-actions">
            <button
              type="button"
              className="seller-action-btn orange"
              onClick={() => setContactModalOpen(true)}
            >
              <Phone size={18} />
              <span>Qo'ng'iroq qilish</span>
            </button>

            {seller.telegram && (
              <a
                href={`https://t.me/${seller.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="seller-action-btn blue"
              >
                <Send size={18} />
                <span>Telegram</span>
              </a>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="seller-tabs-bar">
          <button
            type="button"
            className={`seller-tab-btn ${activeTab === 'ads' ? 'active' : ''}`}
            onClick={() => setActiveTab('ads')}
          >
            Barcha e'lonlar ({products.length})
          </button>
          <button
            type="button"
            className={`seller-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            Haqimizda
          </button>
          <button
            type="button"
            className={`seller-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Sharhlar ({reviews.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="seller-tab-content">
          {activeTab === 'ads' && (
            <div className="seller-products-grid">
              {products.length === 0 ? (
                <p className="no-items-text">Hozircha e'lonlar mavjud emas.</p>
              ) : (
                products.map((p) => <ProductCard key={p.id} product={p} />)
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="seller-about-card">
              <h3>Do'kon haqida</h3>
              <p>{seller.description}</p>

              <div className="seller-features-list">
                <div className="feat-item">✓ Barcha tovarlar kafolatlangan</div>
                <div className="feat-item">✓ 2 soat ichida yetkazib berish (Toshkent bo'ylab)</div>
                <div className="feat-item">✓ Naqd va karta orqali to'lov imkoniyati</div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="seller-reviews-card">
              <h3>Mijozlar fikrlari</h3>
              {reviews.length === 0 ? (
                <p className="no-items-text">Hozircha ushbu sotuvchiga sharhlar qoldirilmagan.</p>
              ) : (
                <div className="seller-reviews-list">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="seller-review-row">
                      <div className="rev-head">
                        <strong>{rev.userName}</strong>
                        <div className="rev-stars">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                          ))}
                        </div>
                      </div>
                      <p className="rev-comment">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        seller={seller}
      />
    </div>
  );
}
