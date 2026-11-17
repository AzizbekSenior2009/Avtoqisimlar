import { supabase, isDemoMode } from './supabase';
import { getItem, setItem, KEYS } from './storage';
import { sendTelegramNotification } from './telegramService';

export const authService = {
  getCurrentUser() {
    return getItem(KEYS.CURRENT_USER, null);
  },

  async login(emailOrPhone, password) {
    if (isDemoMode) {
      const users = getItem(KEYS.USERS, []);
      const user = users.find(
        (u) =>
          (u.email?.toLowerCase() === emailOrPhone?.toLowerCase() ||
            u.phone?.replace(/\s+/g, '') === emailOrPhone?.replace(/\s+/g, '')) &&
          u.password === password
      );

      if (!user) {
        // Allow demo login for admin or azizbek if password matches
        if (
          (emailOrPhone === 'admin@avtoqism.uz' || emailOrPhone === 'admin') &&
          password === 'admin123'
        ) {
          const adminUser = users.find((u) => u.role === 'admin') || {
            id: 99,
            name: 'Admin AvtoQism',
            email: 'admin@avtoqism.uz',
            phone: '+998 90 000 00 00',
            role: 'admin',
          };
          setItem(KEYS.CURRENT_USER, adminUser);
          return { user: adminUser, error: null };
        }
        if (password === '123456' || password === 'demo123') {
          const standardUser = users.find((u) => u.id === 1) || {
            id: 1,
            name: 'Azizbek',
            email: 'azizbeksiddiqov077@gmail.com',
            phone: '+998 93 695 30 66',
            role: 'user',
          };
          setItem(KEYS.CURRENT_USER, standardUser);
          return { user: standardUser, error: null };
        }
        return { user: null, error: 'Telefon raqam, email yoki parol noto‘g‘ri' };
      }

      setItem(KEYS.CURRENT_USER, user);
      return { user, error: null };
    }

    // Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrPhone,
        password,
      });
      if (error) throw error;
      const userObj = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name || 'Foydalanuvchi',
        phone: data.user.user_metadata?.phone || '',
        role: data.user.user_metadata?.role || 'user',
      };
      setItem(KEYS.CURRENT_USER, userObj);
      return { user: userObj, error: null };
    } catch (err) {
      return { user: null, error: err.message };
    }
  },

  async register({ fullName, phone, email, password }) {
    if (isDemoMode) {
      const users = getItem(KEYS.USERS, []);
      const existing = users.find(
        (u) =>
          u.email?.toLowerCase() === email?.toLowerCase() ||
          u.phone?.replace(/\s+/g, '') === phone?.replace(/\s+/g, '')
      );
      if (existing) {
        return { user: null, error: 'Bu telefon yoki email allaqachon ro‘yxatdan o‘tgan' };
      }

      const newUser = {
        id: Date.now(),
        name: fullName,
        phone,
        email,
        password,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      setItem(KEYS.USERS, users);
      setItem(KEYS.CURRENT_USER, newUser);

      sendTelegramNotification('new_user', {
        name: fullName,
        phone,
        email,
      });

      return { user: newUser, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role: 'user',
          },
        },
      });
      if (error) throw error;
      const userObj = {
        id: data.user.id,
        email,
        name: fullName,
        phone,
        role: 'user',
      };
      setItem(KEYS.CURRENT_USER, userObj);
      return { user: userObj, error: null };
    } catch (err) {
      return { user: null, error: err.message };
    }
  },

  async verifySms(phone, code) {
    // In demo mode, code 123456 or any 6-digit code succeeds
    if (code === '123456' || code?.length === 6) {
      const users = getItem(KEYS.USERS, []);
      let user = users.find((u) => u.phone?.replace(/\s+/g, '') === phone?.replace(/\s+/g, ''));
      if (!user) {
        user = {
          id: Date.now(),
          name: 'Foydalanuvchi',
          phone,
          role: 'user',
          createdAt: new Date().toISOString(),
        };
        users.push(user);
        setItem(KEYS.USERS, users);
      }
      setItem(KEYS.CURRENT_USER, user);
      return { user, error: null };
    }
    return { user: null, error: 'SMS kod noto‘g‘ri. Demo kod: 123456' };
  },

  async loginWithTelegram() {
    // Demo mode: simulate logging in with verified Azizbek profile
    const users = getItem(KEYS.USERS, []);
    const demoUser = users.find((u) => u.id === 1) || {
      id: 1,
      name: 'Azizbek',
      phone: '+998 93 695 30 66',
      email: 'azizbeksiddiqov077@gmail.com',
      role: 'user',
    };
    setItem(KEYS.CURRENT_USER, demoUser);
    return { user: demoUser, error: null };
  },

  async logout() {
    if (!isDemoMode && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(KEYS.CURRENT_USER);
    return { success: true };
  },

  async updateProfile(updatedData) {
    const currentUser = getItem(KEYS.CURRENT_USER, null);
    if (!currentUser) return { user: null, error: 'Avtorizatsiyadan o‘tilmagan' };

    const users = getItem(KEYS.USERS, []);
    const index = users.findIndex((u) => u.id === currentUser.id);
    const updated = { ...currentUser, ...updatedData };

    if (index !== -1) {
      users[index] = updated;
      setItem(KEYS.USERS, users);
    }
    setItem(KEYS.CURRENT_USER, updated);
    return { user: updated, error: null };
  },
};
