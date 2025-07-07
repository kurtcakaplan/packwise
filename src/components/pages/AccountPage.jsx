import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, Settings, History, Package } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AccountPage = ({ currentUser, users, onNavigate, onUpdateUser }) => {
  const { t, getLocalized } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [userSettings, setUserSettings] = useState({
    name: '',
    email: '',
    companyName: '',
    taxNumber: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const userFromState = users.find(u => u.id === currentUser?.id);

  useEffect(() => {
    if (userFromState) {
      setUserSettings({
        name: userFromState.name || '',
        email: userFromState.email || '',
        companyName: userFromState.companyName || '',
        taxNumber: userFromState.taxNumber || '',
        phone: userFromState.phone || '',
        address: userFromState.address || '',
        city: userFromState.city || '',
        postalCode: userFromState.postalCode || '',
        country: userFromState.country || ''
      });
    }
  }, [userFromState]);

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setUserSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ ...userFromState, ...userSettings });
  };

  if (!currentUser) {
    onNavigate('customerLogin');
    return null;
  }

  const userOrders = userFromState?.orders || [];
  const userCart = userFromState?.cart || [];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-3 mr-4">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t('welcomeUser', { name: currentUser.name })}</h1>
              <p className="text-cyan-100">{currentUser.email}</p>
            </div>
          </div>
        </div>

        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: t('accountOverview'), icon: User },
              { id: 'orders', label: t('myOrders'), icon: Package },
              { id: 'settings', label: t('profileSettings'), icon: Settings }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-600'
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

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <ShoppingBag className="text-cyan-600 mr-3\" size={24} />
                  <h3 className="text-lg font-semibold">{t('myCart')}</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  {userCart.length === 0 
                    ? t('cartIsEmpty')
                    : t('youHaveItemsInCart', { count: userCart.length })
                  }
                </p>
                <button
                  onClick={() => onNavigate('cart')}
                  className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors"
                >
                  {t('viewCart')}
                </button>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <History className="text-green-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold">{t('recentOrders')}</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  {userOrders.length === 0 
                    ? t('noOrdersYet')
                    : t('totalOrders', { count: userOrders.length })
                  }
                </p>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  {t('viewOrders')}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">{t('orderHistory')}</h3>
              {userOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={64} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-500 text-lg">{t('noOrdersYet')}</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="mt-4 bg-cyan-500 text-white px-6 py-2 rounded-md hover:bg-cyan-600 transition-colors"
                  >
                    {t('startShopping')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map(order => (
                    <div key={order.id} className="border rounded-lg p-4 bg-slate-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">#{order.id}</h4>
                          <p className="text-sm text-slate-600">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <h5 className="font-medium mb-2">{t('orderItems')}:</h5>
                        <ul className="text-sm text-slate-600">
                          {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{getLocalized(item.name)} x {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">{t('profileSettings')}</h3>
              <form onSubmit={handleSettingsSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('fullName')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userSettings.name}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('emailAddress')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userSettings.email}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('companyNameOptional')}
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={userSettings.companyName}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('taxNumber')}
                    </label>
                    <input
                      type="text"
                      name="taxNumber"
                      value={userSettings.taxNumber}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userSettings.phone}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('address')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={userSettings.address}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('city')}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={userSettings.city}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('postalCode')}
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={userSettings.postalCode}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('country')}
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={userSettings.country}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                >
                  {t('saveSettings')}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;