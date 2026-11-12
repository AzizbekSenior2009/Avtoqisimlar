import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ChevronRight,
  Phone,
  Send,
  ShoppingCart,
  Heart,
  Share2,
  AlertTriangle,
  MapPin,
  Clock,
  Eye,
  Star,
  CheckCircle,
  X,
} from 'lucide-react';
import { productService } from '../../services/productService';
import { sellerService } from '../../services/sellerService';
import { reviewService } from '../../services/reviewService';
import { favoriteService } from '../../services/favoriteService';
import { formatPrice, formatDate } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/products/ProductCard';
import ContactModal from '../../components/modals/ContactModal';
import ReportModal from '../../components/modals/ReportModal';
import './Product.css';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);

  // Modals
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // New review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const p = productService.getProductById(id);
    if (!p) {
      navigate('/404');
      return;
    }

    setProduct(p);
    setActiveImageIndex(0);
    setIsFavorite(favoriteService.isFavorite(p.id));

    // Increment views
    productService.incrementViews(p.id);

    // Fetch seller - prioritize product's own contact details if user entered them
    const existingSeller = p.seller_id ? sellerService.getSellerById(p.seller_id) : null;
    const effectiveSeller = {
      id: p.seller_id || 1,
      name: p.sellerName || existingSeller?.name || 'Sotuvchi',
      rating: existingSeller?.rating || 5.0,
      adsCount: existingSeller?.adsCount || 1,
      city: p.city || existingSeller?.city || 'Toshkent',
      phone: p.phone || existingSeller?.phone || '',
      telegram: p.telegram !== undefined && p.telegram !== null ? p.telegram : (existingSeller?.telegram || ''),
      workingHours: existingSeller?.workingHours || '09:00 - 20:00',
      verified: existingSeller?.verified ?? false,
    };
    setSeller(effectiveSeller);

    // Reviews
    setReviews(reviewService.getReviewsBySeller(effectiveSeller.id));

    // Similar & seller products
    setSimilarProducts(productService.getSimilarProducts(p.id, 4));
    setSellerProducts(productService.getSellerProducts(effectiveSeller.id, p.id, 4));
  }, [id, navigate]);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/images/products/placeholder.svg'];

  const handleFavoriteClick = () => {
    if (!user) {
      navigate('/login?next=' + encodeURIComponent(window.location.pathname));
      return;
    }
    const { added } = favoriteService.toggleFavorite(product.id);
    setIsFavorite(added);
    if (added) showToast("Sevimlilarga qo'shildi!", 'success');
    else showToast("Sevimlilardan o'chirildi", 'info');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Havola nusxalandi!', 'success');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login?next=' + encodeURIComponent(window.location.pathname));
      return;
    }
    if (!reviewComment.trim()) return;

    const newRev = reviewService.addReview({
      sellerId: seller.id,
      userName: user.name || 'Foydalanuvchi',
      rating: reviewRating,
      comment: reviewComment,
    });

    setReviews([newRev, ...reviews]);
    setReviewComment('');
    showToast('Sharhingiz muvaffaqiyatli saqlandi!', 'success');
  };

  return (
    <div className="product-page">
      <Helmet>
        <title>{product.title} — AvtoQism</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container">
        {/* Breadcrumb */}
        <div className="product-breadcrumb">
          <Link to="/">Bosh sahifa</Link>
          <ChevronRight size={14} />
          <Link to="/catalog">Katalog</Link>
          <ChevronRight size={14} />
          <span>{product.title}</span>
        </div>

        {/* Main Product Layout */}
        <div className="product-main-grid">
          {/* Left Column: Image Gallery */}
          <div className="product-gallery-section">
            <div
              className="product-main-image-wrap"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={images[activeImageIndex]}
                alt={product.title}
                className="product-main-img"
              />
              <span className={`product-gallery-badge ${product.condition === 'new' ? 'badge-new' : 'badge-used'}`}>
                {product.condition === 'new' ? 'Yangi' : 'Ishlatilgan'}
              </span>
            </div>

            {/* Thumbnail row */}
            {images.length > 1 && (
              <div className="product-thumbnails-row">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Kichik rasm ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Seller */}
          <div className="product-info-section">
            <h1 className="product-detail-title">{product.title}</h1>

            <div className="product-price-row">
              <div className="product-price-large">{formatPrice(product.price)}</div>
              <span className={`detail-cond-tag ${product.condition === 'new' ? 'new' : 'used'}`}>
                {product.condition === 'new' ? 'Yangi' : 'Ishlatilgan'}
              </span>
            </div>

            {/* Meta attributes */}
            <div className="product-specs-box">
              {product.oem && (
                <div className="spec-row">
                  <span className="spec-name">OEM:</span>
                  <span className="spec-value">{product.oem}</span>
                </div>
              )}
              {product.compatibleCars && product.compatibleCars.length > 0 && (
                <div className="spec-row">
                  <span className="spec-name">Mos avtomobillar:</span>
                  <span className="spec-value">{product.compatibleCars.join(', ')}</span>
                </div>
              )}
              <div className="spec-meta-line">
                <span className="meta-tag">
                  <MapPin size={14} /> {product.city || 'Toshkent'}
                </span>
                <span className="meta-tag">
                  <Clock size={14} /> {formatDate(product.createdAt) || 'Bugun'}
                </span>
                <span className="meta-tag">
                  <Eye size={14} /> {product.views || 1} ko'rildi
                </span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="product-action-buttons">
              <button
                type="button"
                className="btn-call-seller"
                onClick={() => setContactModalOpen(true)}
              >
                <Phone size={18} />
                <span>Qo'ng'iroq qilish</span>
              </button>

              {seller?.telegram && (
                <a
                  href={`https://t.me/${seller.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-telegram-seller"
                >
                  <Send size={18} />
                  <span>Telegramda yozish</span>
                </a>
              )}

              <button
                type="button"
                className={`btn-cart-add ${isInCart(product.id) ? 'in-cart' : ''}`}
                onClick={() => addToCart(product, 1)}
              >
                <ShoppingCart size={18} />
                <span>{isInCart(product.id) ? "Savatda mavjud" : "Savatga qo'shish"}</span>
              </button>
            </div>

            {/* Sub-actions (Favorite, Share, Report) */}
            <div className="product-sub-actions">
              <button
                type="button"
                className={`sub-action-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleFavoriteClick}
              >
                <Heart size={16} fill={isFavorite ? '#DC2626' : 'none'} color={isFavorite ? '#DC2626' : 'currentColor'} />
                <span>Sevimlilar</span>
              </button>

              <button type="button" className="sub-action-btn" onClick={handleShare}>
                <Share2 size={16} />
                <span>Ulashish</span>
              </button>

              <button
                type="button"
                className="sub-action-btn"
                onClick={() => setReportModalOpen(true)}
              >
                <AlertTriangle size={16} />
                <span>Shikoyat</span>
              </button>
            </div>

            {/* Seller Card (IMAGE B - Page 3) */}
            {seller && (
              <div className="product-seller-card">
                <div className="seller-card-top">
                  <div className="seller-avatar-round">
                    {seller.name.charAt(0)}
                  </div>
                  <div className="seller-card-info">
                    <div className="seller-name-row">
                      <h4 className="seller-title">{seller.name}</h4>
                      {seller.verified && (
                        <CheckCircle size={16} className="seller-verified-icon" />
                      )}
                    </div>
                    <div className="seller-rating-row">
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      <span className="seller-stars">{seller.rating || '4.8'}</span>
                      <span className="seller-review-count">({seller.adsCount || 120} ta e'lon)</span>
                    </div>
                    <div className="seller-city-time">
                      <MapPin size={13} />
                      <span>{seller.city}</span>
                      {seller.workingHours && <span>• {seller.workingHours}</span>}
                    </div>
                  </div>
                </div>

                <div className="seller-card-buttons">
                  <Link to={`/seller/${seller.id}`} className="seller-link-btn primary">
                    Do'kon sahifasi
                  </Link>
                  <Link to={`/catalog?seller=${seller.id}`} className="seller-link-btn outline">
                    Barcha e'lonlar
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="product-description-card">
          <h3 className="section-subheading">Tavsif</h3>
          <div className="description-text">
            {product.description || "Original sifatli ehtiyot qism. Barcha sinovlardan o'tgan va kafolatlangan."}
          </div>
        </div>

        {/* Similar Listings */}
        {similarProducts.length > 0 && (
          <div className="product-related-section">
            <h3 className="section-subheading">O'xshash e'lonlar</h3>
            <div className="related-cards-grid">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Seller Reviews */}
        <div className="product-reviews-section">
          <h3 className="section-subheading">Sotuvchi sharhlari ({reviews.length})</h3>

          {/* Add Review Form */}
          <form className="add-review-form" onSubmit={handleAddReview}>
            <div className="rating-select-row">
              <span className="rating-label">Baholang:</span>
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="star-btn"
                    onClick={() => setReviewRating(star)}
                  >
                    <Star
                      size={20}
                      fill={star <= reviewRating ? '#F59E0B' : 'none'}
                      color={star <= reviewRating ? '#F59E0B' : '#94A3B8'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              placeholder="Sotuvchi va xarid tajribangiz haqida fikr bildiring..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="review-textarea"
            />

            <button type="submit" className="btn-submit-review">
              Sharh qoldirish
            </button>
          </form>

          {/* Reviews List */}
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="no-reviews-text">Hozircha sharhlar yo'q. Birinchi bo'lib fikr bildiring!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="review-item">
                  <div className="review-item-head">
                    <span className="reviewer-name">{rev.userName}</span>
                    <div className="reviewer-stars">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                  </div>
                  <p className="reviewer-comment">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar on Mobile */}
      <div className="product-mobile-bottom-bar show-mobile-only">
        <button
          type="button"
          className="mobile-btn-call"
          onClick={() => setContactModalOpen(true)}
        >
          <Phone size={18} />
          <span>Qo'ng'iroq qilish</span>
        </button>

        {seller?.telegram && (
          <a
            href={`https://t.me/${seller.telegram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-btn-telegram"
          >
            <Send size={18} />
            <span>Telegram</span>
          </a>
        )}
      </div>

      {/* Modals */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        seller={seller}
        productTitle={product.title}
      />

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        product={product}
      />

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={28} />
          </button>
          <img
            src={images[activeImageIndex]}
            alt={product.title}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
