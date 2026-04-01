import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (dateString, formatStr = 'MMM dd, yyyy') => {
  if (!dateString) return 'N/A';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    if (!isValid(date)) return 'Invalid Date';
    return format(date, formatStr);
  } catch (error) {
    return 'Invalid Date';
  }
};

export const formatCurrency = (amount) => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};
