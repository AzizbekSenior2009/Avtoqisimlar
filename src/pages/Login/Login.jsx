import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Send, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './Auth.css';

export default function Login() {
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';
  const navigate = useNavigate();
  const { login, verifySms, loginWithTelegram } = useAuth();
  const { showToast } = useToast();

  const [authMode, setAuthMode] = useState('phone'); // 'phone' | 'email'
  const [phone, setPhone] = useState('+998 93 695 30 66');
  const [smsSent, setSmsSent] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendSms = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      setError('Iltimos, telefon raqamingizni kiriting');
      return;
    }
    setError('');
    setSmsSent(true);
    showToast('Tasdiqlash kodi: 123456 (demo rejim)', 'info', 6000);
  };

  const handleVerifySms = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await verifySms(phone, smsCode || '123456');
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      showToast('Muvaffaqiyatli kirdingiz!', 'success');
      navigate(next);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(email, password);
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      showToast('Xush kelibsiz!', 'success');
      navigate(next);
    }
  };

  const handleTelegramLogin = async () => {
    setLoading(true);
    const res = await loginWithTelegram();
    setLoading(false);
    if (!res.error) {
      showToast('Telegram orqali muvaffaqiyatli kirdingiz!', 'success');
      navigate(next);
    }
  };

  const handleDemoAdmin = async () => {
    setLoading(true);
    const res = await login('admin@avtoqism.uz', 'admin123');
    setLoading(false);
    if (!res.error) {
      showToast('Admin sifatida tizimga kirdingiz!', 'success');
      navigate('/admin');
    }
  };

  const handleDemoUser = async () => {
    setLoading(true);
    const res = await login('azizbek@avtoqism.uz', '123456');
    setLoading(false);
    if (!res.error) {
      showToast('Azizbek sifatida tizimga kirdingiz!', 'success');
      navigate(next);
    }
  };

  return (
    <div className="auth-page">
      <Helmet>
        <title>Kirish — AvtoQism</title>
      </Helmet>

      <div className="auth-card">
        {/* Navigation Tabs (IMAGE B - Page 6) */}
        <div className="auth-card-tabs">
          <button type="button" className="auth-tab-btn active">
            Kirish
          </button>
          <Link to={`/register?next=${encodeURIComponent(next)}`} className="auth-tab-btn">
            Ro'yxatdan o'tish
          </Link>
        </div>

        <div className="auth-card-body">
          {/* Headset illustration / icon */}
          <div className="auth-header-icon-circle">
            <Phone size={36} className="auth-phone-icon" />
          </div>

          <h2 className="auth-heading">
            {smsSent ? 'SMS kodni kiriting' : 'Telefon raqamingizni kiriting'}
          </h2>

          {error && <div className="auth-error-alert">{error}</div>}

          {/* Phone SMS Method (Mockup exact) */}
          {authMode === 'phone' && (
            <>
              {!smsSent ? (
                <form onSubmit={handleSendSms} className="auth-form">
                  <div className="phone-input-wrap">
                    <span className="uz-flag-badge">🇺🇿</span>
                    <input
                      type="tel"
                      className="auth-input-phone"
                      placeholder="+998 93 695 30 66"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-auth-orange">
                    SMS kod yuborish
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifySms} className="auth-form">
                  <p className="sms-hint-text">
                    <strong>{phone}</strong> raqamiga yuborilgan 6 xonali kodni kiriting (Demo: <strong>123456</strong>):
                  </p>

                  <input
                    type="text"
                    maxLength={6}
                    className="auth-input-code"
                    placeholder="123456"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    required
                  />

                  <button type="submit" disabled={loading} className="btn-auth-orange">
                    {loading ? 'Tekshirilmoqda...' : 'Tasdiqlash va kirish'}
                  </button>

                  <button
                    type="button"
                    className="auth-back-link"
                    onClick={() => setSmsSent(false)}
                  >
                    Raqamni o'zgartirish
                  </button>
                </form>
              )}
            </>
          )}

          {/* Email / Password Method Toggle */}
          {authMode === 'email' && (
            <form onSubmit={handleEmailLogin} className="auth-form">
              <div className="auth-field">
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Email manzil (masalan: admin@avtoqism.uz)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-field">
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Parol (masalan: admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="forgot-pass-wrap">
                <Link to="/forgot-password">Parolni unutdingizmi?</Link>
              </div>

              <button type="submit" disabled={loading} className="btn-auth-orange">
                {loading ? 'Kirilmoqda...' : 'Kirish'}
              </button>
            </form>
          )}

          {/* Switch phone / email */}
          <button
            type="button"
            className="auth-toggle-mode-btn"
            onClick={() => {
              setAuthMode(authMode === 'phone' ? 'email' : 'phone');
              setError('');
            }}
          >
            {authMode === 'phone' ? 'Email va parol orqali kirish' : 'Telefon raqam orqali kirish'}
          </button>

          <div className="auth-divider">
            <span>yoki</span>
          </div>

          {/* Telegram Login Button */}
          <button
            type="button"
            className="btn-telegram-auth"
            onClick={handleTelegramLogin}
          >
            <Send size={18} />
            <span>Telegram orqali davom etish</span>
          </button>

          {/* Demo 1-Click Fast Logins */}
          <div className="demo-shortcuts">
            <span className="demo-shortcuts-label">Tezkor demo login:</span>
            <div className="demo-shortcuts-btns">
              <button type="button" onClick={handleDemoUser} className="demo-badge-btn">
                👤 Azizbek (Foydalanuvchi)
              </button>
              <button type="button" onClick={handleDemoAdmin} className="demo-badge-btn admin">
                🛡️ Admin (admin@avtoqism.uz)
              </button>
            </div>
          </div>

          <p className="auth-terms-note">
            Kirish orqali <Link to="/terms">foydalanish shartlariga</Link> rozilik bildirasiz
          </p>
        </div>
      </div>
    </div>
  );
}
