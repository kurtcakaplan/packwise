import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  FileText,
  Globe,
  Save,
  UserCheck,
  UserX,
  Shield,
  ShieldCheck,
  Warehouse
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import StockManagement from './StockManagement';

const AdminDashboard = ({ 
  products, 
  users, 
  orders, 
  references, 
  contactInfo,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateUser,
  onDeleteUser,
  onUpdateReferences,
  onUpdateContactInfo,
  onNavigate 
}) => {
  const { t, getLocalized, uiTranslations, setUiTranslations, currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: { en: '', sk: '', hu: '' },
    description: { en: '', sk: '', hu: '' },
    price: 0,
    quantity: 0,
    dimensions: '',
    categoryKey: 'packing',
    images: [''],
    isActive: true
  });

  // Site content state
  const [siteContent, setSiteContent] = useState({
    heroTitle: { en: 'Packwise: Innovative Solutions', sk: 'Packwise: Inovatívne Riešenia', hu: 'Packwise: Innovatív Megoldások' },
    heroSubtitle: { en: 'Providing top-tier packing, food & beverage, and hygiene products tailored to your needs.', sk: 'Poskytujeme špičkové produkty pre balenie, potraviny a nápoje, a hygienu.', hu: 'Csúcsminőségű csomagolási, élelmiszeripari és higiéniai termékeket kínálunk.' },
    footerText: { en: 'Your Partner in Quality Solutions.', sk: 'Váš Partner v Kvalitných Riešeniach.', hu: 'Az Ön Partnere Minőségi Megoldásokban.' }
  });

  // Settings state
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Packwise',
    siteDescription: 'Quality Solutions for Packing, Food & Beverage, and Hygiene',
    currency: 'USD',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    minimumOrderValue: 0,
    maximumOrderValue: 10000
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalStock = products.reduce((sum, product) => sum + product.quantity, 0);
  const activeProducts = products.filter(p => p.isActive).length;
  const lowStockProducts = products.filter(p => p.quantity < 10 && p.quantity > 0);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...newProduct });
      setEditingProduct(null);
    } else {
      onAddProduct(newProduct);
    }
    setNewProduct({
      name: { en: '', sk: '', hu: '' },
      description: { en: '', sk: '', hu: '' },
      price: 0,
      quantity: 0,
      dimensions: '',
      categoryKey: 'packing',
      images: [''],
      isActive: true
    });
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setActiveTab('products');
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditingUser(null);
    setNewProduct({
      name: { en: '', sk: '', hu: '' },
      description: { en: '', sk: '', hu: '' },
      price: 0,
      quantity: 0,
      dimensions: '',
      categoryKey: 'packing',
      images: [''],
      isActive: true
    });
  };

  const handleUserEdit = (user) => {
    setEditingUser({
      ...user,
      newPassword: ''
    });
    setActiveTab('users');
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...editingUser };
    if (updatedUser.newPassword) {
      updatedUser.password = updatedUser.newPassword;
    }
    delete updatedUser.newPassword;
    onUpdateUser(updatedUser);
    setEditingUser(null);
  };

  const toggleAdminAccess = (user) => {
    const updatedUser = { ...user, isAdmin: !user.isAdmin };
    onUpdateUser(updatedUser);
  };

  const handleSiteContentUpdate = () => {
    // Update translations with new content
    const newTranslations = { ...uiTranslations };
    newTranslations[currentLanguage] = {
      ...newTranslations[currentLanguage],
      heroTitle: siteContent.heroTitle[currentLanguage],
      heroSubtitle: siteContent.heroSubtitle[currentLanguage],
      footerSlogan: siteContent.footerText[currentLanguage]
    };
    setUiTranslations(newTranslations);
  };

  const handleContactInfoUpdate = () => {
    onUpdateContactInfo(contactInfo);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <h1 className="text-3xl font-bold">{t('adminDashboard')}</h1>
          <p className="text-purple-100 mt-2">{t('packwiseManagement')}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {[
              { id: 'overview', label: t('dashboardOverview'), icon: BarChart3 },
              { id: 'products', label: t('manageProducts'), icon: Package },
              { id: 'stock', label: t('stockManagement'), icon: Warehouse },
              { id: 'orders', label: t('manageOrders'), icon: ShoppingCart },
              { id: 'users', label: t('manageUsers'), icon: Users },
              { id: 'content', label: t('siteContent'), icon: FileText },
              { id: 'localization', label: t('localization'), icon: Globe },
              { id: 'settings', label: t('settings'), icon: Settings }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <IconComponent size={16} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">{t('totalRevenue')}</p>
                      <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                    </div>
                    <DollarSign size={32} className="text-green-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">{t('totalOrders')}</p>
                      <p className="text-2xl font-bold">{orders.length}</p>
                    </div>
                    <ShoppingCart size={32} className="text-blue-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">{t('totalProducts')}</p>
                      <p className="text-2xl font-bold">{products.length}</p>
                    </div>
                    <Package size={32} className="text-purple-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">{t('totalUsers')}</p>
                      <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                    <Users size={32} className="text-orange-200" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">{t('recentOrders')}</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex justify-between items-center p-3 bg-white rounded border">
                        <div>
                          <p className="font-medium">#{order.id}</p>
                          <p className="text-sm text-slate-600">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${order.total.toFixed(2)}</p>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">{t('lowStockAlert')}</h3>
                  <div className="space-y-3">
                    {lowStockProducts.slice(0, 5).map(product => (
                      <div key={product.id} className="flex justify-between items-center p-3 bg-white rounded border">
                        <div>
                          <p className="font-medium">{getLocalized(product.name)}</p>
                          <p className="text-sm text-slate-600">#{product.serialNumber}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            {product.quantity} {t('left')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stock Management Tab */}
          {activeTab === 'stock' && (
            <StockManagement 
              products={products}
              onUpdateProduct={onUpdateProduct}
            />
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('manageProducts')}</h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setNewProduct({
                      name: { en: '', sk: '', hu: '' },
                      description: { en: '', sk: '', hu: '' },
                      price: 0,
                      quantity: 0,
                      dimensions: '',
                      categoryKey: 'packing',
                      images: [''],
                      isActive: true
                    });
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
                >
                  <Plus size={20} className="mr-2" />
                  {t('addNewProduct')}
                </button>
              </div>

              {/* Product Form */}
              {(editingProduct !== null || newProduct.name.en) && (
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingProduct ? t('editProduct') : t('addNewProduct')}
                  </h3>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('productName')} (EN)
                        </label>
                        <input
                          type="text"
                          value={newProduct.name.en}
                          onChange={(e) => setNewProduct(prev => ({
                            ...prev,
                            name: { ...prev.name, en: e.target.value }
                          }))}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('price')} ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct(prev => ({
                            ...prev,
                            price: parseFloat(e.target.value) || 0
                          }))}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('quantity')}
                        </label>
                        <input
                          type="number"
                          value={newProduct.quantity}
                          onChange={(e) => setNewProduct(prev => ({
                            ...prev,
                            quantity: parseInt(e.target.value) || 0
                          }))}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('dimensions')}
                        </label>
                        <input
                          type="text"
                          value={newProduct.dimensions}
                          onChange={(e) => setNewProduct(prev => ({
                            ...prev,
                            dimensions: e.target.value
                          }))}
                          className="w-full p-3 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('description')} (EN)
                      </label>
                      <textarea
                        value={newProduct.description.en}
                        onChange={(e) => setNewProduct(prev => ({
                          ...prev,
                          description: { ...prev.description, en: e.target.value }
                        }))}
                        className="w-full p-3 border rounded-lg"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('imageURL')}
                      </label>
                      <input
                        type="url"
                        value={newProduct.images[0]}
                        onChange={(e) => setNewProduct(prev => ({
                          ...prev,
                          images: [e.target.value]
                        }))}
                        className="w-full p-3 border rounded-lg"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newProduct.isActive}
                        onChange={(e) => setNewProduct(prev => ({
                          ...prev,
                          isActive: e.target.checked
                        }))}
                        className="mr-2"
                      />
                      <label className="text-sm text-slate-700">{t('productIsActive')}</label>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                      >
                        {editingProduct ? t('updateProduct') : t('addProduct')}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="bg-slate-500 text-white px-6 py-2 rounded-lg hover:bg-slate-600"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products List */}
              <div className="bg-white rounded-lg border">
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
                          {t('price')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('stock')}
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
                      {products.map(product => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=50&h=50&fit=crop'}
                                alt={getLocalized(product.name)}
                                className="w-10 h-10 rounded object-cover mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-slate-900">
                                  {getLocalized(product.name)}
                                </div>
                                <div className="text-sm text-slate-500">
                                  {product.sku || product.serialNumber}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                              {product.serialNumber}
                            </code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            <span className={`font-medium ${
                              product.quantity === 0 ? 'text-red-600' :
                              product.quantity <= (product.minStockLevel || 10) ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {product.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.isActive ? t('active') : t('inactive')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => startEditProduct(product)}
                                className="text-blue-600 hover:text-blue-900"
                                title={t('edit')}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => onDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-900"
                                title={t('delete')}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t('manageOrders')}</h2>
              <div className="bg-white rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('orderNumber')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('customer')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('date')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('total')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('status')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {orders.map(order => {
                        const customer = users.find(u => u.id === order.userId);
                        return (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {customer?.name || 'Guest'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t('manageUsers')}</h2>
              
              {/* User Edit Form */}
              {editingUser && (
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">{t('editUser')}</h3>
                  <form onSubmit={handleUserUpdate} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('fullName')}
                        </label>
                        <input
                          type="text"
                          value={editingUser.name}
                          onChange={(e) => setEditingUser(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('emailAddress')}
                        </label>
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('companyNameOptional')}
                        </label>
                        <input
                          type="text"
                          value={editingUser.companyName || ''}
                          onChange={(e) => setEditingUser(prev => ({ ...prev, companyName: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('newPassword')} ({t('optional')})
                        </label>
                        <input
                          type="password"
                          value={editingUser.newPassword || ''}
                          onChange={(e) => setEditingUser(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                          placeholder={t('leaveBlankToKeepCurrent')}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingUser.isAdmin}
                          onChange={(e) => setEditingUser(prev => ({ ...prev, isAdmin: e.target.checked }))}
                          className="mr-2"
                        />
                        <span className="text-sm text-slate-700">{t('adminAccess')}</span>
                      </label>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                      >
                        {t('saveChanges')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingUser(null)}
                        className="bg-slate-500 text-white px-6 py-2 rounded-lg hover:bg-slate-600"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('user')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('email')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('company')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('role')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('orders')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {t('actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {users.map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {user.companyName || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isAdmin 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.isAdmin ? 'Admin' : 'Customer'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {user.orders?.length || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUserEdit(user)}
                                className="text-blue-600 hover:text-blue-900"
                                title={t('editUser')}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => toggleAdminAccess(user)}
                                className={`${user.isAdmin ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`}
                                title={user.isAdmin ? t('removeAdminAccess') : t('grantAdminAccess')}
                              >
                                {user.isAdmin ? <ShieldCheck size={16} /> : <Shield size={16} />}
                              </button>
                              <button
                                onClick={() => onDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900"
                                title={t('deleteUser')}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Site Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t('siteContent')}</h2>
              
              {/* Hero Section */}
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('heroSection')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('heroTitle')} ({currentLanguage.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={siteContent.heroTitle[currentLanguage]}
                      onChange={(e) => setSiteContent(prev => ({
                        ...prev,
                        heroTitle: { ...prev.heroTitle, [currentLanguage]: e.target.value }
                      }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('heroSubtitle')} ({currentLanguage.toUpperCase()})
                    </label>
                    <textarea
                      value={siteContent.heroSubtitle[currentLanguage]}
                      onChange={(e) => setSiteContent(prev => ({
                        ...prev,
                        heroSubtitle: { ...prev.heroSubtitle, [currentLanguage]: e.target.value }
                      }))}
                      className="w-full p-3 border rounded-lg"
                      rows="3"
                    />
                  </div>
                  <button
                    onClick={handleSiteContentUpdate}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    {t('saveChanges')}
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('contactInformation')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('address')}
                    </label>
                    <input
                      type="text"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('phone')}
                    </label>
                    <input
                      type="text"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
                <button
                  onClick={handleContactInfoUpdate}
                  className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  {t('saveChanges')}
                </button>
              </div>

              {/* Footer Content */}
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('footerContent')}</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t('footerText')} ({currentLanguage.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={siteContent.footerText[currentLanguage]}
                    onChange={(e) => setSiteContent(prev => ({
                      ...prev,
                      footerText: { ...prev.footerText, [currentLanguage]: e.target.value }
                    }))}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <button
                  onClick={handleSiteContentUpdate}
                  className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  {t('saveChanges')}
                </button>
              </div>
            </div>
          )}

          {/* Localization Tab */}
          {activeTab === 'localization' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t('localization')}</h2>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('translationManagement')}</h3>
                <p className="text-slate-600 mb-4">{t('translationInstructions')}</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('currentLanguage')}: {currentLanguage.toUpperCase()}
                    </label>
                    <p className="text-sm text-slate-500">
                      Translation management is available through the site content section above. 
                      Each content field can be edited per language.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t('settings')}</h2>
              
              {/* General Settings */}
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('generalSettings')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('siteName')}
                    </label>
                    <input
                      type="text"
                      value={systemSettings.siteName}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('currency')}
                    </label>
                    <select
                      value={systemSettings.currency}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('siteDescription')}
                    </label>
                    <textarea
                      value={systemSettings.siteDescription}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('securitySettings')}</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={systemSettings.maintenanceMode}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium">{t('maintenanceMode')}</span>
                      <p className="text-sm text-slate-600">{t('maintenanceModeDesc')}</p>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={systemSettings.allowRegistration}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, allowRegistration: e.target.checked }))}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium">{t('allowRegistration')}</span>
                      <p className="text-sm text-slate-600">{t('allowRegistrationDesc')}</p>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={systemSettings.emailNotifications}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium">{t('emailNotifications')}</span>
                      <p className="text-sm text-slate-600">{t('emailNotificationsDesc')}</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Settings */}
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('orderSettings')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('minimumOrderValue')} ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={systemSettings.minimumOrderValue}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, minimumOrderValue: parseFloat(e.target.value) || 0 }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('maximumOrderValue')} ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={systemSettings.maximumOrderValue}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, maximumOrderValue: parseFloat(e.target.value) || 0 }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('systemInformation')}</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">{t('version')}:</span> 1.0.0
                  </div>
                  <div>
                    <span className="font-medium">{t('lastUpdate')}:</span> {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert('Settings saved successfully!')}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 flex items-center"
              >
                <Save size={16} className="mr-2" />
                {t('saveChanges')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;