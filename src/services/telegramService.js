import { supabase, isDemoMode } from './supabase';

/**
 * Sends a notification to Telegram via Supabase Edge Function or console logs in demo mode.
 * @param {string} type - 'new_ad' | 'new_order' | 'new_user' | 'ad_moderation' | 'ad_report' | 'contact_inquiry'
 * @param {object} payload - Detail fields
 */
export async function sendTelegramNotification(type, payload) {
  if (isDemoMode) {
    const formattedMessage = formatTelegramMessage(type, payload);
    console.group('%c[Telegram Bot Alert (Demo Mode)]', 'color: #0284C7; font-weight: bold;');
    console.log(formattedMessage);
    console.log('Payload:', payload);
    console.groupEnd();
    return { success: true, demo: true, message: formattedMessage };
  }

  try {
    const { data, error } = await supabase.functions.invoke('notify-telegram', {
      body: { type, payload },
    });
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to send Telegram notification:', err);
    return { success: false, error: err.message };
  }
}

function formatTelegramMessage(type, p) {
  switch (type) {
    case 'new_ad':
      return `🆕 Yangi e'lon!\nMahsulot: ${p.title}\nNarx: ${p.price}\nShahar: ${p.city}\nSotuvchi: ${p.sellerName || 'Foydalanuvchi'}\nHolati: ${p.status === 'pending' ? 'Tekshiruv kutilmoqda' : 'Faol'}`;
    case 'new_order':
      return `🛒 Yangi buyurtma!\nBuyurtmachi: ${p.customerName}\nTelefon: ${p.phone}\nJami: ${p.total}\nMahsulotlar soni: ${p.itemsCount}`;
    case 'new_user':
      return `👤 Yangi foydalanuvchi!\nIsm: ${p.name}\nTelefon: ${p.phone}\nEmail: ${p.email || '-'}`;
    case 'ad_moderation':
      return `⚖️ E'lon moderatsiyasi!\nMahsulot: ${p.title}\nQaror: ${p.status === 'active' ? '✅ Tasdiqlandi' : '❌ Rad etildi'}${p.reason ? `\nSabab: ${p.reason}` : ''}`;
    case 'ad_report':
      return `⚠️ Shikoyat tushdi!\nE'lon ID: #${p.adId}\nSabab: ${p.reason}\nIzoh: ${p.comment || '-'}`;
    default:
      return `🔔 AvtoQism bildirishnomasi: ${JSON.stringify(p)}`;
  }
}
