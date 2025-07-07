import React, { useState, useEffect } from 'react';
import { ChevronLeft, Ruler, Box, ShoppingCart, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PRODUCT_CATEGORIES_DATA } from '../../data/initialData';

const ProductDetailPage = ({ selectedProduct, products, onNavigate, onAddToCart }) => {
  const { t, getLocalized } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [displayImage, setDisplayImage] = useState('');

  const product = selectedProduct ? products.find(p => p.id === selectedProduct.id) : null;

  useEffect(() => {
    if (product?.images?.[0]) {
      setDisplayImage(product.images[0]);
    }
  }, [product]);

  if (!selectedProduct || !product) {
    return (
      <div className="container mx-auto p-4 text-center">
        {t('productNotFound')} 
        <button 
          onClick={() => onNavigate('shop')} 
          className="text-cyan-600 hover:underline ml-2"
        >
          {t('goBackToShop')}
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => onNavigate('shop')} 
        className="mb-6 flex items-center text-cyan-600 hover:text-cyan-800"
      >
        <ChevronLeft size={20} /> {t('backToProducts')}
      </button>
      
      <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img 
            src={displayImage || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop'} 
            alt={getLocalized(product.name)} 
            className="w-full h-64 md:h-[500px] object-cover" 
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src='https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop'; 
            }}
          />
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 p-2 bg-slate-100 overflow-x-auto">
              {product.images.map((imgUrl, index) => (
                <img 
                  key={index}
                  src={imgUrl}
                  alt={`${getLocalized(product.name)} thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    displayImage === imgUrl ? 'border-cyan-500' : 'border-transparent hover:border-slate-300'
                  }`}
                  onClick={() => setDisplayImage(imgUrl)}
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src='https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop'; 
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="md:w-1/2 p-6 md:p-8">
          <span className="text-xs text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full mb-2 inline-block">
            {getLocalized(PRODUCT_CATEGORIES_DATA.find(c => c.key === product.categoryKey))}
          </span>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            {getLocalized(product.name)}
          </h2>
          
          <p className="text-slate-600 mb-2 flex items-center">
            <Ruler size={18} className="mr-2 text-cyan-600"/> 
            {t('dimensions')}: {product.dimensions}
          </p>
          
          <p className="text-slate-600 mb-4 flex items-center">
            <Box size={18} className="mr-2 text-cyan-600"/> 
            {t('stock')}: {product.quantity > 0 ? `${product.quantity} ${t('stockAvailable')}` : t('outOfStock')}
          </p>
          
          <p className="text-slate-700 mb-4 leading-relaxed">
            <FileText size={18} className="inline mr-2 text-cyan-600 align-text-bottom"/>
            {getLocalized(product.description)}
          </p>
          
          <p className="text-3xl font-extrabold text-cyan-700 mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          {product.isActive && product.quantity > 0 ? (
            <div className="flex items-center space-x-4">
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.quantity)))} 
                min="1" 
                max={product.quantity} 
                className="w-20 p-2 border rounded-md text-center"
              />
              <button 
                onClick={() => onAddToCart(product, quantity)} 
                className="flex-grow bg-cyan-500 text-white hover:bg-cyan-600 py-3 px-6 rounded-md font-semibold flex items-center justify-center"
              >
                <ShoppingCart size={20} className="mr-2"/> 
                {t('addToCart')}
              </button>
            </div>
          ) : (
            <p className="text-red-600 font-semibold p-3 bg-red-100 rounded-md">
              {!product.isActive ? t('currentlyUnavailable') : t('outOfStock')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;