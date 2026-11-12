// Supabase Edge Function: notify-telegram
// Follows Deno / Supabase standard runtime

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

interface NotifyPayload {
  type: 'new_ad' | 'new_order' | 'new_user' | 'ad_moderation' | 'ad_report' | 'contact_inquiry';
  payload: Record<string, any>;
}

serve(async (req) => {
  // CORS Headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { type, payload }: NotifyPayload = await req.json();

    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_ADMIN_CHAT_ID');

    if (!botToken || !chatId) {
      console.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_ADMIN_CHAT_ID not configured in Supabase environment.');
      return new Response(
        JSON.stringify({
          success: true,
          warning: 'Telegram tokens not set, notification logged to server console.',
          payload,
        }),
        { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    let text = '🔔 AvtoQism Bildirishnomasi:\n\n';

    switch (type) {
      case 'new_ad':
        text += `🆕 *Yangi e'lon!*
📦 *Mahsulot:* ${payload.title}
💰 *Narx:* ${payload.price}
📍 *Shahar:* ${payload.city}
👤 *Sotuvchi:* ${payload.sellerName || 'Foydalanuvchi'}
⚖️ *Holati:* ${payload.status === 'pending' ? 'Tekshiruv kutilmoqda' : 'Faol'}`;
        break;

      case 'new_order':
        text += `🛒 *Yangi buyurtma qabul qilindi!*
👤 *Buyurtmachi:* ${payload.customerName}
📞 *Telefon:* ${payload.phone}
💰 *Jami summa:* ${payload.total}
📦 *Tovarlar soni:* ${payload.itemsCount}`;
        break;

      case 'new_user':
        text += `👤 *Yangi foydalanuvchi ro‘yxatdan o‘tdi!*
Ism: ${payload.name}
Telefon: ${payload.phone}
Email: ${payload.email || '-'}`;
        break;

      case 'ad_moderation':
        text += `⚖️ *E'lon moderatsiyasi:*
Mahsulot: ${payload.title}
Qaror: ${payload.status === 'active' ? '✅ Tasdiqlandi' : '❌ Rad etildi'}
${payload.reason ? `Sabab: ${payload.reason}` : ''}`;
        break;

      case 'ad_report':
        text += `⚠️ *E'lon ustidan shikoyat kelib tushdi!*
E'lon ID: #${payload.adId}
Sabab: ${payload.reason}
Izoh: ${payload.comment || '-'}`;
        break;

      case 'contact_inquiry':
        text += `📩 *Aloqa sahifasidan yangi murojaat:*
Ism: ${payload.name}
Telefon: ${payload.phone}
Xabar: ${payload.message}`;
        break;

      default:
        text += JSON.stringify(payload);
    }

    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    const resData = await response.json();

    return new Response(JSON.stringify({ success: true, tgResponse: resData }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});
