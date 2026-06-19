// src/utils/index.js

// Format price: 34900 → "$34,900" or "$1.25M"
export const formatPrice = (price, priceUnit = 'total') => {
  if (!price) return 'Price on request';
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(2)}M`;
  }
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(price);
  return priceUnit === 'month' ? `${formatted}/mo` : formatted;
};

// Truncate long text
export const truncate = (str, maxLen = 100) =>
  str && str.length > maxLen ? `${str.slice(0, maxLen)}…` : str;

// Mortgage calculator
export const calcMortgage = ({ principal, annualRate, termYears }) => {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

// Debounce helper (for search)
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Property type icons map (Lucide names)
export const TYPE_ICONS = {
  Apartment: 'Building2',
  Villa:     'Home',
  House:     'Home',
  Townhouse: 'Building',
  Penthouse: 'Layers',
  Studio:    'Square',
};

// Status badge class helper
export const getStatusClass = (status) =>
  status === 'For Rent' ? 'badge-rent' : 'badge-sale';
