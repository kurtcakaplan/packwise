export const generateId = (prefix = '', length = 9) => {
  return prefix + Math.random().toString(36).substr(2, length).toUpperCase();
};

export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};