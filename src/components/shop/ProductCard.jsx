import React from 'react';
import { ShoppingCart, Ruler } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PRODUCT_CATEGORIES_DATA } from '../../data/initialData';

const ProductCard = ({ product, onNavigate, onAddToCart }) => {
  const { t, getLocalized } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <img 
        src={(product.images && product.images[0]) || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'} 
        alt={getLocalized(product.name)} 
        className="w-full h-48 object-cover"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src='https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'; 
        }}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-slate-800 mb-1">
          {getLocalized(product.name)}
        </h3>
        <p className="text-xs text-cyan-600 mb-1 bg-cyan-50 px-2 py-0.5 rounded-full inline-block">
          {getLocalized(PRODUCT_CATEGORIES_DATA.find(c => c.key === product.categoryKey))}
        </p>
        <p className="text-sm text-slate-500 mb-1 flex items-center">
          <Ruler size={14} className="mr-1 text-cyan-600"/> 
          {product.dimensions}
        </p>
        <p className="text-xs text-slate-600 mb-2 flex-grow">
          {getLocalized(product.description).substring(0,60)}...
        </p>
        <p className="text-lg font-bold text-cyan-700 mb-3">
          ${product.price.toFixed(2)}
        </p>
        <div className="mt-auto space-y-2">
          <button 
            onClick={() => onNavigate('productDetail', product)} 
            className="w-full bg-slate-200 text-slate-700 hover:bg-slate-300 py-2 px-4 rounded-md text-sm font-medium"
          >
            {t('viewDetails')}
          </button>
          <button 
            onClick={() => onAddToCart(product)} 
            disabled={!product.isActive || product.quantity === 0}
            className={`w-full py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center ${
              (!product.isActive || product.quantity === 0) 
                ? 'bg-slate-400 text-slate-600 cursor-not-allowed' 
                : 'bg-cyan-500 text-white hover:bg-cyan-600'
            }`}
          >
            <ShoppingCart size={16} className="mr-2"/> 
            {t('addToCart')}
          </button>
          {(!product.isActive || product.quantity === 0) && (
            <p className="text-xs text-red-500 text-center">
              {!product.isActive ? t('currentlyUnavailable') : t('outOfStock')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;