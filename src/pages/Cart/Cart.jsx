import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/utils';
import OrderModal from '../../components/modals/OrderModal';
import './Cart.css';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  return (
    <div className="cart-page">
      <Helmet>
        <title>Savat — AvtoQism</title>
      </Helmet>

      <div className="container">
        <h1 className="cart-page-title">Savat ({items.length})</h1>

        {items.length === 0 ? (
          <div className="cart-empty-box">
            <div className="cart-empty-icon">
              <ShoppingBag size={48} />
            </div>
            <h2>Savat bo'sh</h2>
            <p>Hozircha savatingizda hech qanday mahsulot yo'q</p>
            <Link to="/catalog" className="btn-go-catalog">
              Katalogga o'tish
            </Link>
          </div>
        ) : (
          <div className="cart-layout-grid">
            {/* Items list */}
            <div className="cart-items-card">
              <div className="cart-items-head">
                <span>Mahsulotlar</span>
                <button type="button" className="cart-clear-all" onClick={clearCart}>
                  Savatni tozalash
                </button>
              </div>

              <div className="cart-items-list">
                {items.map((item) => {
                  const product = item.product;
                  const img =
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : '/images/products/placeholder.svg';

                  return (
                    <div key={product.id} className="cart-item-row">
                      <Link to={`/product/${product.id}`} className="cart-item-img-wrap">
                        <img src={img} alt={product.title} />
                      </Link>

                      <div className="cart-item-info">
                        <Link to={`/product/${product.id}`} className="cart-item-title">
                          {product.title}
                        </Link>
                        <div className="cart-item-price">{formatPrice(product.price)}</div>
                        <span className="cart-item-city">{product.city || 'Toshkent'}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="cart-qty-controls">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, item.quantity - 1)}
                          aria-label="Kamaytirish"
                        >
                          <Minus size={15} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, item.quantity + 1)}
                          aria-label="Ko'paytirish"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <div className="cart-item-subtotal">
                        {formatPrice((product.price || 0) * item.quantity)}
                      </div>

                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(product.id)}
                        aria-label="O'chirish"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="cart-summary-card">
              <h3 className="summary-title">Buyurtma xulosasi</h3>

              <div className="summary-rows">
                <div className="summary-row">
                  <span className="summary-label">Mahsulotlar:</span>
                  <span className="summary-value">{items.length} xil</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Yetkazib berish:</span>
                  <span className="summary-value green">Sotuvchi bilan kelishiladi</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row total">
                  <span className="summary-label">Jami summa:</span>
                  <span className="summary-value total-val">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button
                type="button"
                className="btn-checkout-cta"
                onClick={() => setOrderModalOpen(true)}
              >
                <span>Buyurtma berish</span>
                <ArrowRight size={18} />
              </button>

              <div className="cart-guarantee-note">
                ✓ Xavfsiz xarid va kafolatlangan tovarlar
              </div>
            </div>
          </div>
        )}
      </div>

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </div>
  );
}
