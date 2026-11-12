import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import Modal from '../ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { orderService } from '../../services/orderService';
import { formatPrice } from '../../lib/utils';

export default function OrderModal({ isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+998 ');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || phone.trim().length < 9) {
      alert("Iltimos, ismingiz va to'liq telefon raqamingizni kiriting!");
      return;
    }

    setLoading(true);

    const newOrder = orderService.createOrder({
      customerName: fullName,
      phone,
      comment,
      items: items.map((i) => ({
        id: i.product.id,
        title: i.product.title,
        price: i.product.price,
        quantity: i.quantity,
      })),
      total: totalAmount,
      userId: user?.id || null,
    });

    clearCart();
    setOrderInfo(newOrder);
    setSubmitted(true);
    setLoading(false);

    if (onSuccess) onSuccess(newOrder);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={submitted ? 'Buyurtma qabul qilindi!' : 'Buyurtma berish'}
      maxWidth={480}
    >
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#DCFCE7',
              color: 'var(--green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <CheckCircle2 size={44} />
          </div>
          <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: 'var(--navy)' }}>
            Buyurtmangiz muvaffaqiyatli qabul qilindi!
          </h4>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16 }}>
            Buyurtma raqami: <strong>{orderInfo?.orderNumber}</strong>
          </p>
          <p style={{ fontSize: 14, color: 'var(--text)', marginBottom: 24, lineHeight: 1.5 }}>
            Tez orada sotuvchilarimiz siz bilan bog'lanib, yetkazib berish va to'lov tafsilotlarini kelishib olishadi.
          </p>
          <button
            type="button"
            onClick={handleClose}
            style={{
              width: '100%',
              height: 44,
              background: 'var(--primary)',
              color: 'var(--white)',
              borderRadius: 'var(--radius-btn)',
              fontWeight: 700,
              fontSize: 15,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Tushunarli
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 8, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14 }}>
              <span style={{ color: 'var(--muted)' }}>Mahsulotlar:</span>
              <span style={{ fontWeight: 600 }}>{items.length} xil</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Jami summa:</span>
              <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{formatPrice(totalAmount)}</span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text)' }}>
              Ism va familiya *
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: Sardor Aliyev"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: '100%',
                height: 44,
                padding: '0 14px',
                borderRadius: 'var(--radius-input)',
                border: '1px solid var(--border)',
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text)' }}>
              Telefon raqam *
            </label>
            <input
              type="tel"
              required
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                height: 44,
                padding: '0 14px',
                borderRadius: 'var(--radius-input)',
                border: '1px solid var(--border)',
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text)' }}>
              Izoh yoki yetkazib berish manzili
            </label>
            <textarea
              rows={3}
              placeholder="Masalan: Toshkent sh., Chilonzor tumani..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-input)',
                border: '1px solid var(--border)',
                fontSize: 14,
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 8,
              background: '#EFF6FF',
              color: '#1E40AF',
              fontSize: 12,
            }}
          >
            <ShieldCheck size={20} style={{ flexShrink: 0 }} />
            <span>To'lov usuli mahsulotni ko'rgach sotuvchi bilan bevosita kelishiladi.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              height: 46,
              background: 'var(--orange)',
              color: 'var(--white)',
              borderRadius: 'var(--radius-btn)',
              fontWeight: 700,
              fontSize: 15,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 4,
              boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)',
            }}
          >
            {loading ? 'Yuborilmoqda...' : 'Tasdiqlash va buyurtma berish'}
          </button>
        </form>
      )}
    </Modal>
  );
}
