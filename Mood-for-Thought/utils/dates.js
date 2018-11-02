export const shiftDate = (date, days) => new Date(new Date().setDate(date.getDate() + days));
export const isSameDay = (date1, date2) => date1.toDateString() == date2.toDateString();
export const isToday = date => isSameDay(new Date(date), new Date());
export const isYesterday = date => isSameDay(new Date(date), shiftDate(new Date(), -1));
