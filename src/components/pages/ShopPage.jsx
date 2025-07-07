import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PRODUCT_CATEGORIES_DATA } from '../../data/initialData';
import HeroHeader from '../shop/HeroHeader';
import ProductCard from '../shop/ProductCard';

const ShopPage = ({ products, onNavigate, onAddToCart }) => {
  const { t, getLocalized } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('All');

  const filteredProducts = products.filter(p =>
    p.isActive && 
    getLocalized(p.name).toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategoryKey === 'All' || p.categoryKey === selectedCategoryKey)
  );

  return (
    <>
      <HeroHeader onNavigate={onNavigate} />
      <div className="container mx-auto p-4" id="products-section">
        <div className="mb-8 text-center mt-12">
          <h2 className="text-4xl font-bold text-slate-700 mb-2">{t('ourProducts')}</h2>
          <p className="text-slate-500 text-lg">{t('productsSubtitle')}</p>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="relative w-full sm:w-auto sm:flex-grow max-w-lg">
            <input
              type="text"
              placeholder={t('searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          </div>
          <div className="w-full sm:w-auto">
            <select
              value={selectedCategoryKey}
              onChange={(e) => setSelectedCategoryKey(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option value="All">{t('allCategories')}</option>
              {PRODUCT_CATEGORIES_DATA.map(cat => (
                <option key={cat.key} value={cat.key}>
                  {getLocalized(cat)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 text-xl py-10">
            {t('noProductsFound')}
          </p>
        )}
      </div>
    </>
  );
};

export default ShopPage;