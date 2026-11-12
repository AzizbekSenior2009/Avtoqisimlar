import React, { useState } from 'react';
import { Phone, Copy, Check, Send } from 'lucide-react';
import Modal from '../ui/Modal';
import { useToast } from '../../context/ToastContext';

export default function ContactModal({ isOpen, onClose, seller, productTitle }) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  if (!seller) return null;

  const phone = seller.phone || '';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanPhone);
    setCopied(true);
    showToast('Telefon raqami nusxalandi!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sotuvchi bilan bog'lanish" maxWidth={440}>
      <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--light-blue)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <Phone size={30} />
        </div>

        <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          {seller.name || 'Sotuvchi'}
        </h4>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
          {productTitle ? `"${productTitle}" bo'yicha` : seller.city || 'Toshkent'}
        </p>

        <div
          style={{
            background: '#F1F5F9',
            padding: '16px',
            borderRadius: 12,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 19, fontWeight: 800, color: 'var(--navy)', letterSpacing: 0.5 }}>
            {phone}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--white)',
              border: '1px solid var(--border)',
              padding: '8px 12px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              color: copied ? 'var(--green)' : 'var(--text)',
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Nusxalandi' : 'Nusxalash'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href={`tel:${cleanPhone}`}
            style={{
              flex: 1,
              height: 44,
              background: 'var(--orange)',
              color: 'var(--white)',
              borderRadius: 'var(--radius-btn)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              textDecoration: 'none',
              gap: 8,
            }}
          >
            <Phone size={18} />
            Qo'ng'iroq qilish
          </a>

          {seller.telegram && (
            <a
              href={`https://t.me/${seller.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                height: 44,
                background: 'var(--primary)',
                color: 'var(--white)',
                borderRadius: 'var(--radius-btn)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                textDecoration: 'none',
                gap: 8,
              }}
            >
              <Send size={18} />
              Telegram
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}
