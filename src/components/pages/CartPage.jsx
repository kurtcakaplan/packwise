import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CartPage = ({ 
  cart, 
  products, 
  cartTotal, 
  currentUser, 
  onNavigate, 
  onRemoveFromCart, 
  onUpdateCartQuantity 
}) => {
  const { t, getLocalized } = useLanguage();

  const handleProceedToCheckout = () => {
    if (currentUser) {
      onNavigate('checkout');
    } else {
      onNavigate('customerLogin');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-slate-700 mb-6">
          {t('yourShoppingCart')}
        </h2>
        <div className="text-center py-10">
          <ShoppingCart size={64} className="mx-auto text-slate-400 mb-4" />
          <p className="text-slate-500 text-xl">{t('cartIsEmpty')}</p>
          <button 
            onClick={() => onNavigate('shop')} 
            className="mt-4 bg-cyan-500 text-white hover:bg-cyan-600 py-2 px-6 rounded-md"
          >
            {t('continueShopping')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">
        {t('yourShoppingCart')}
      </h2>
      
      <div className="bg-white rounded-lg shadow-md">
        {cart.map(item => {
          const productInStore = products.find(p => p.id === item.id);
          return (
            <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
              <div className="flex items-center">
                <img 
                  src={(item.images && item.images[0]) || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop'} 
                  alt={getLocalized(item.name)} 
                  className="w-16 h-16 object-cover rounded-md mr-4"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src='https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop'; 
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {getLocalized(item.name)}
                  </h3>
                  <p className="text-sm text-slate-500">
                    ${item.price.toFixed(2)} {t('each')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => onUpdateCartQuantity(item.id, parseInt(e.target.value))} 
                  min="1" 
                  max={productInStore ? productInStore.quantity : item.quantity} 
                  className="w-16 p-1 border rounded-md text-center"
                />
                <p className="text-md font-semibold text-slate-700 w-20 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button 
                  onClick={() => onRemoveFromCart(item.id)} 
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
        
        <div className="p-6 bg-slate-50 rounded-b-lg">
          <div className="flex justify-end items-center mb-6">
            <span className="text-xl font-bold text-slate-700">{t('total')}:</span>
            <span className="text-2xl font-extrabold text-cyan-700 ml-3">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => onNavigate('shop')} 
              className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 py-3 px-6 rounded-md font-semibold text-lg"
            >
              {t('continueShopping')}
            </button>
            <button 
              onClick={handleProceedToCheckout}
              className="flex-1 bg-green-500 text-white hover:bg-green-600 py-3 px-6 rounded-md font-semibold text-lg"
            >
              {currentUser ? t('proceedToCheckout') : t('loginToCheckout')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;