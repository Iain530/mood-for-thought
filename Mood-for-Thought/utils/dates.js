export const shiftDate = (date, days) => new Date(new Date(date).setDate(date.getDate() + days));
export const isSameDay = (date1, date2) => date1.toDateString() == date2.toDateString();
export const isToday = date => isSameDay(new Date(date), new Date());
export const isYesterday = date => isSameDay(new Date(date), shiftDate(new Date(), -1));
export const atMidnight = date => new Date(new Date(date).setHours(0, 0, 0, 0));
export const now = () => new Date();
export const sortByDate = (key, reverse = false) => (a, b) => {
    const diff = new Date(b[key]) - new Date(a[key]);
    return reverse ? 0 - diff : diff;
};
