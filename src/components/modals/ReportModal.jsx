import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { reportService } from '../../services/reportService';
import { useToast } from '../../context/ToastContext';

const REASONS = [
  "Noto'g'ri narx yoki ma'lumot",
  "E'lon allaqachon sotilgan",
  "Firibgarlik shubhasi",
  "Taqiqlangan mahsulot",
  'Boshqa sabab',
];

export default function ReportModal({ isOpen, onClose, product }) {
  const [reason, setReason] = useState(REASONS[0]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    reportService.createReport({
      adId: product.id,
      adTitle: product.title,
      reason,
      comment,
    });

    setLoading(false);
    showToast('Shikoyatingiz qabul qilindi va ko‘rib chiqiladi', 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="E'lon ustidan shikoyat" maxWidth={460}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
          E'lon: <strong>{product.title}</strong>
        </p>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            Shikoyat sababini tanlang:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {REASONS.map((r) => (
              <label
                key={r}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: 6,
                  background: reason === r ? '#F1F5F9' : 'transparent',
                }}
              >
                <input
                  type="radio"
                  name="reportReason"
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span>{r}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Qo'shimcha izoh (ixtiyoriy)
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Vaziyatni qisqacha tushuntiring..."
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 'var(--radius-input)',
              border: '1px solid var(--border)',
              fontSize: 14,
              fontFamily: 'inherit',
              outline: 'none',
              resize: 'none',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            height: 42,
            background: 'var(--red)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: 'var(--radius-btn)',
            fontWeight: 700,
            fontSize: 14,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Yuborilmoqda...' : 'Shikoyatni yuborish'}
        </button>
      </form>
    </Modal>
  );
}
