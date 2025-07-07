import React, { useState, useEffect } from 'react';
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Search, 
  Filter,
  Download,
  Upload,
  BarChart3,
  RefreshCw,
  Edit,
  Eye,
  Plus,
  Minus
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  getStockSummary, 
  getLowStockProducts, 
  getOutOfStockProducts,
  getProductsByCategory,
  updateProductStock,
  PRODUCT_CATEGORIES
} from '../../data/productDatabase';

const StockManagement = ({ products, onUpdateProduct }) => {
  const { t, getLocalized } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // all, low, out, normal
  const [sortBy, setSortBy] = useState('name'); // name, stock, price, category
  const [sortOrder, setSortOrder] = useState('asc');
  const [stockSummary, setStockSummary] = useState(null);
  const [editingStock, setEditingStock] = useState(null);
  const [newStockValue, setNewStockValue] = useState('');

  useEffect(() => {
    setStockSummary(getStockSummary());
  }, [products]);

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = getLocalized(product.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.categoryKey === selectedCategory;
      
      const matchesStockFilter = (() => {
        switch (stockFilter) {
          case 'low': return product.quantity <= product.minStockLevel && product.quantity > 0;
          case 'out': return product.quantity === 0;
          case 'normal': return product.quantity > product.minStockLevel;
          default: return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesStockFilter;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = getLocalized(a.name);
          bValue = getLocalized(b.name);
          break;
        case 'stock':
          aValue = a.quantity;
          bValue = b.quantity;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'category':
          aValue = a.categoryKey;
          bValue = b.categoryKey;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });

  const handleStockUpdate = (product, newQuantity) => {
    const updatedProduct = { ...product, quantity: newQuantity, updatedAt: new Date().toISOString() };
    onUpdateProduct(updatedProduct);
    setEditingStock(null);
    setNewStockValue('');
    setStockSummary(getStockSummary());
  };

  const handleQuickStockAdjustment = (product, adjustment) => {
    const newQuantity = Math.max(0, product.quantity + adjustment);
    handleStockUpdate(product, newQuantity);
  };

  const getStockStatusColor = (product) => {
    if (product.quantity === 0) return 'text-red-600 bg-red-50';
    if (product.quantity <= product.minStockLevel) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getStockStatusText = (product) => {
    if (product.quantity === 0) return t('outOfStock');
    if (product.quantity <= product.minStockLevel) return t('lowStock');
    return t('inStock');
  };

  const exportStockReport = () => {
    const csvContent = [
      ['Serial Number', 'SKU', 'Product Name', 'Category', 'Current Stock', 'Min Stock', 'Max Stock', 'Price', 'Total Value', 'Status'].join(','),
      ...filteredProducts.map(product => [
        product.serialNumber,
        product.sku,
        getLocalized(product.name),
        product.categoryKey,
        product.quantity,
        product.minStockLevel,
        product.maxStockLevel,
        product.price,
        (product.price * product.quantity).toFixed(2),
        getStockStatusText(product)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">{t('stockManagement')}</h2>
        <div className="flex space-x-3">
          <button
            onClick={exportStockReport}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Download size={16} className="mr-2" />
            {t('exportReport')}
          </button>
          <button
            onClick={() => setStockSummary(getStockSummary())}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
          >
            <RefreshCw size={16} className="mr-2" />
            {t('refresh')}
          </button>
        </div>
      </div>

      {/* Stock Summary Cards */}
      {stockSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">{t('totalProducts')}</p>
                <p className="text-2xl font-bold text-blue-800">{stockSummary.totalProducts}</p>
              </div>
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">{t('totalStock')}</p>
                <p className="text-2xl font-bold text-green-800">{stockSummary.totalStock}</p>
              </div>
              <BarChart3 className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">{t('lowStock')}</p>
                <p className="text-2xl font-bold text-yellow-800">{stockSummary.lowStockCount}</p>
              </div>
              <AlertTriangle className="text-yellow-600" size={24} />
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">{t('outOfStock')}</p>
                <p className="text-2xl font-bold text-red-800">{stockSummary.outOfStockCount}</p>
              </div>
              <TrendingDown className="text-red-600" size={24} />
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">{t('totalValue')}</p>
                <p className="text-2xl font-bold text-purple-800">${stockSummary.totalValue}</p>
              </div>
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder={t('searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">{t('allCategories')}</option>
            {PRODUCT_CATEGORIES.map(category => (
              <option key={category.key} value={category.key}>
                {getLocalized(category)}
              </option>
            ))}
          </select>
          
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">{t('allStock')}</option>
            <option value="normal">{t('normalStock')}</option>
            <option value="low">{t('lowStock')}</option>
            <option value="out">{t('outOfStock')}</option>
          </select>
          
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">{t('sortByName')}</option>
              <option value="stock">{t('sortByStock')}</option>
              <option value="price">{t('sortByPrice')}</option>
              <option value="category">{t('sortByCategory')}</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border rounded-lg hover:bg-slate-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t('product')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t('serialNumber')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t('currentStock')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t('stockLevels')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t('value')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=50&h=50&fit=crop'}
                        alt={getLocalized(product.name)}
                        className="w-12 h-12 rounded object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {getLocalized(product.name)}
                        </div>
                        <div className="text-sm text-slate-500">
                          {product.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                      {product.serialNumber}
                    </code>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingStock === product.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={newStockValue}
                          onChange={(e) => setNewStockValue(e.target.value)}
                          className="w-20 p-1 border rounded text-sm"
                          min="0"
                        />
                        <button
                          onClick={() => handleStockUpdate(product, parseInt(newStockValue) || 0)}
                          className="text-green-600 hover:text-green-800"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => {
                            setEditingStock(null);
                            setNewStockValue('');
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold">{product.quantity}</span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleQuickStockAdjustment(product, -1)}
                            className="w-6 h-6 bg-red-100 text-red-600 rounded hover:bg-red-200 flex items-center justify-center"
                            disabled={product.quantity === 0}
                          >
                            <Minus size={12} />
                          </button>
                          <button
                            onClick={() => handleQuickStockAdjustment(product, 1)}
                            className="w-6 h-6 bg-green-100 text-green-600 rounded hover:bg-green-200 flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div>Min: {product.minStockLevel}</div>
                    <div>Max: {product.maxStockLevel}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">${product.price.toFixed(2)}</div>
                    <div className="text-sm text-slate-500">
                      Total: ${(product.price * product.quantity).toFixed(2)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusColor(product)}`}>
                      {getStockStatusText(product)}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingStock(product.id);
                          setNewStockValue(product.quantity.toString());
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title={t('editStock')}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {/* View product details */}}
                        className="text-green-600 hover:text-green-900"
                        title={t('viewDetails')}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-500 text-lg">{t('noProductsFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockManagement;