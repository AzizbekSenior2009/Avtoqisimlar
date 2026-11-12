import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Send, User, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import '../Login/Auth.css';

export default function Register() {
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';
  const navigate = useNavigate();
  const { register, loginWithTelegram } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Parollar bir-biriga mos kelmadi');
      return;
    }
    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }

    setLoading(true);
    setError('');

    const res = await register({
      fullName,
      phone,
      email: email || `${Date.now()}@avtoqism.uz`,
      password,
    });

    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      showToast("Ro'yxatdan muvaffaqiyatli o'tdingiz!", 'success');
      navigate(next);
    }
  };

  return (
    <div className="auth-page">
      <Helmet>
        <title>Ro'yxatdan o'tish — AvtoQism</title>
      </Helmet>

      <div className="auth-card">
        {/* Navigation Tabs */}
        <div className="auth-card-tabs">
          <Link to={`/login?next=${encodeURIComponent(next)}`} className="auth-tab-btn">
            Kirish
          </Link>
          <button type="button" className="auth-tab-btn active">
            Ro'yxatdan o'tish
          </button>
        </div>

        <div className="auth-card-body">
          <h2 className="auth-heading">AvtoQism'da yangi hisob ochish</h2>

          {error && <div className="auth-error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <input
                type="text"
                className="auth-input"
                placeholder="Ism va familiya *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="phone-input-wrap">
              <span className="uz-flag-badge">🇺🇿</span>
              <input
                type="tel"
                className="auth-input-phone"
                placeholder="+998 90 123 45 67 *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <input
                type="email"
                className="auth-input"
                placeholder="Email manzil (ixtiyoriy)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <input
                type="password"
                className="auth-input"
                placeholder="Parol yarating *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <input
                type="password"
                className="auth-input"
                placeholder="Parolni tasdiqlang *"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-auth-orange">
              {loading ? 'Yaratilmoqda...' : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <div className="auth-divider">
            <span>yoki</span>
          </div>

          <button
            type="button"
            className="btn-telegram-auth"
            onClick={async () => {
              await loginWithTelegram();
              navigate(next);
            }}
          >
            <Send size={18} />
            <span>Telegram orqali ro'yxatdan o'tish</span>
          </button>

          <p className="auth-terms-note">
            Ro'yxatdan o'tish orqali <Link to="/terms">foydalanish shartlariga</Link> rozilik bildirasiz
          </p>
        </div>
      </div>
    </div>
  );
}
