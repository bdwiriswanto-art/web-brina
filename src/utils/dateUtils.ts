export const getTodayStr = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];
};
