import { getItem, setItem, KEYS } from './storage';
import { sendTelegramNotification } from './telegramService';

export const reportService = {
  getReports() {
    return getItem(KEYS.REPORTS, []);
  },

  createReport({ adId, adTitle, reason, comment }) {
    const list = getItem(KEYS.REPORTS, []);
    const newReport = {
      id: Date.now(),
      adId,
      adTitle,
      reason,
      comment,
      status: 'pending', // pending | resolved | dismissed
      createdAt: new Date().toISOString(),
    };
    list.unshift(newReport);
    setItem(KEYS.REPORTS, list);

    sendTelegramNotification('ad_report', {
      adId,
      reason,
      comment,
    });

    return newReport;
  },

  resolveReport(reportId, action = 'resolved') {
    const list = getItem(KEYS.REPORTS, []);
    const index = list.findIndex((r) => String(r.id) === String(reportId));
    if (index !== -1) {
      list[index].status = action;
      setItem(KEYS.REPORTS, list);
      return list[index];
    }
    return null;
  },
};
