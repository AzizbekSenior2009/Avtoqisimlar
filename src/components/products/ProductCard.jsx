import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Clock } from 'lucide-react';
import { formatPrice, formatDate } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { favoriteService } from '../../services/favoriteService';
import './ProductCard.css';

export default function ProductCard({
  product,
  isFavorite = false,
  onFavoriteToggle = null,
}) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [favorite, setFavorite] = React.useState(isFavorite);
  const [animatingHeart, setAnimatingHeart] = React.useState(false);

  React.useEffect(() => {
    setFavorite(favoriteService.isFavorite(product.id));
  }, [product.id]);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login?next=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setAnimatingHeart(true);
    const { added } = favoriteService.toggleFavorite(product.id);
    setFavorite(added);

    if (added) {
      showToast("Sevimlilarga qo'shildi!", 'success');
    } else {
      showToast("Sevimlilardan o'chirildi", 'info');
    }

    if (onFavoriteToggle) {
      onFavoriteToggle(product.id, added);
    }

    setTimeout(() => setAnimatingHeart(false), 400);
  };

  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : '/images/products/placeholder.svg';

  const conditionLabel = product.condition === 'new' ? 'Yangi' : 'Ishlatilgan';
  const conditionClass = product.condition === 'new' ? 'badge-new' : 'badge-used';

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img
            src={imageSrc}
            alt={product.title}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/products/placeholder.svg';
            }}
          />

          {/* Condition Badge Top Left */}
          <span className={`product-condition-badge ${conditionClass}`}>
            {conditionLabel}
          </span>

          {/* Heart Button Top Right */}
          <button
            type="button"
            className={`product-heart-btn ${favorite ? 'active' : ''} ${
              animatingHeart ? 'pop-anim' : ''
            }`}
            onClick={handleHeartClick}
            aria-label="Sevimlilarga saqlash"
          >
            <Heart
              size={18}
              fill={favorite ? '#DC2626' : 'none'}
              color={favorite ? '#DC2626' : '#64748B'}
            />
          </button>
        </div>

        <div className="product-card-body">
          <h3 className="product-title" title={product.title}>
            {product.title}
          </h3>

          <div className="product-price">{formatPrice(product.price)}</div>

          <div className="product-meta">
            <span className="product-meta-item">
              <MapPin size={13} className="meta-icon" />
              <span>{product.city || 'Toshkent'}</span>
            </span>
            <span className="product-meta-item">
              <Clock size={13} className="meta-icon" />
              <span>{formatDate(product.createdAt) || 'Bugun, 14:30'}</span>
            </span>
          </div>
        </div>
      </Link>

      <div className="product-card-footer">
        <Link to={`/product/${product.id}`} className="btn-details">
          Batafsil →
        </Link>
      </div>
    </div>
  );
}
