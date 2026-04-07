// calculateExchange: returns a raw number
export const calculateExchange = (amount, fromRate, toRate) => {
  if (!amount || amount <= 0) return 0;
  return (amount / fromRate) * toRate;
};

// formatCurrency: turns a raw number into a display string e.g. "1,364.20"
export const formatCurrency = (value) => {
  if (!value || value === 0) return "0.00";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};