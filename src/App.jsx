import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_USERS, 
  INITIAL_REFERENCES, 
  INITIAL_CONTACT_INFO,
  DELIVERY_OPTIONS 
} from './data/initialData';
import { generateId } from './utils/helpers';
import { validateEmail, validatePassword, rateLimit } from './utils/security';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import NotificationBar from './components/common/NotificationBar';
import PrivacyNotice from './components/common/PrivacyNotice';
import ShopPage from './components/pages/ShopPage';

// Import other pages
import ContactPage from './components/pages/ContactPage';
import ReferencesPage from './components/pages/ReferencesPage';
import CartPage from './components/pages/CartPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import CustomerLoginPage from './components/pages/CustomerLoginPage';
import CustomerRegisterPage from './components/pages/CustomerRegisterPage';
import AccountPage from './components/pages/AccountPage';
import AdminLoginPage from './components/pages/AdminLoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import CheckoutPage from './components/pages/CheckoutPage';
import OrderConfirmationPage from './components/pages/OrderConfirmationPage';

function AppInternal() {
  const { t, getLocalized } = useLanguage();

  // State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('shop');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [references, setReferences] = useState(INITIAL_REFERENCES);
  const [contactInfo, setContactInfo] = useState(INITIAL_CONTACT_INFO);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [checkoutData, setCheckoutData] = useState(null);

  // Sync cart with user data
  useEffect(() => {
    if (currentUser) {
      const userWithData = users.find(u => u.id === currentUser.id);
      setCart(userWithData?.cart || []);
    }
  }, [currentUser, users]);

  // Helper functions
  const showNotification = (messageKey, type, params = {}, duration = 3000) => {
    const message = t(messageKey, params);
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), duration);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Navigation
  const navigate = (page, data = null) => {
    console.log('Navigating to:', page, data); // Debug log
    setCurrentPage(page);
    if (page === 'productDetail' && data) {
      setSelectedProduct(data);
    }
    if (page === 'shop') {
      setSelectedProduct(null);
    }
    // Handle admin navigation
    if (page === 'adminRoot' || page === 'adminDashboard') {
      setCurrentPage('adminDashboard');
    }
    window.scrollTo(0, 0);
  };

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    if (!product.isActive || product.quantity < quantity) {
      showNotification('productUnavailableStock', 'error');
      return;
    }

    const performUpdate = prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.quantity) {
          showNotification('insufficientStockWarning', 'warning', {
            productName: getLocalized(product.name), 
            availableQty: product.quantity - existingItem.quantity
          });
          return prevCart.map(item => 
            item.id === product.id ? { ...item, quantity: product.quantity } : item
          );
        }
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      return [...prevCart, { 
        ...product, 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        images: product.images, 
        quantity 
      }];
    };

    setCart(performUpdate);
    if (currentUser) {
      setUsers(prevUsers => prevUsers.map(u => 
        u.id === currentUser.id ? {...u, cart: performUpdate(u.cart)} : u
      ));
    }
    showNotification('addedToCart', 'success', {productName: getLocalized(product.name)});
  };

  const removeFromCart = (productId) => {
    const performUpdate = prevCart => prevCart.filter(item => item.id !== productId);
    setCart(performUpdate);
    if (currentUser) {
      setUsers(prevUsers => prevUsers.map(u => 
        u.id === currentUser.id ? {...u, cart: performUpdate(u.cart)} : u
      ));
    }
    showNotification('itemRemovedCart', 'info');
  };

  const updateCartQuantity = (productId, quantity) => {
    const productInStore = products.find(p => p.id === productId);
    if (!productInStore) return;

    const performUpdate = prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, Math.min(quantity, productInStore.quantity));
        if (quantity > productInStore.quantity) {
          showNotification('insufficientStockWarning', 'warning', {
            productName: getLocalized(item.name), 
            availableQty: productInStore.quantity
          });
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    setCart(performUpdate);
    if (currentUser) {
      setUsers(prevUsers => prevUsers.map(u => 
        u.id === currentUser.id ? {...u, cart: performUpdate(u.cart)} : u
      ));
    }
    showNotification('cartUpdated', 'success');
  };

  // Auth functions with security enhancements
  const handleCustomerLogin = async (email, password) => {
    // Rate limiting
    if (!rateLimit(`login_${email}`, 5, 15 * 60 * 1000)) {
      showNotification('tooManyAttempts', 'error');
      return;
    }

    // Input validation
    if (!validateEmail(email)) {
      showNotification('invalidEmail', 'error');
      return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('account');
      showNotification('loginSuccess', 'success', {name: user.name});
    } else {
      showNotification('loginFailed', 'error');
    }
  };

  const handleCustomerRegister = async (name, email, password, companyName = '') => {
    // Input validation
    if (!validateEmail(email)) {
      showNotification('invalidEmail', 'error');
      return false;
    }

    if (!validatePassword(password)) {
      showNotification('passwordRequirements', 'error');
      return false;
    }

    if (users.find(u => u.email === email)) {
      showNotification('emailInUse', 'error');
      return false;
    }

    const newUser = { 
      id: generateId('user-', 5), 
      name, 
      email, 
      password, // In production, this should be hashed
      companyName, 
      taxNumber: '', 
      cart: [], 
      orders: [], 
      savedAddresses: [], 
      isAdmin: false 
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    showNotification('registrationSuccess', 'success');
    return true;
  };

  const handleCustomerLogout = () => {
    if (currentUser) {
      setUsers(prevUsers => prevUsers.map(u => 
        u.id === currentUser.id ? {...u, cart: cart} : u
      ));
    }
    setCurrentUser(null);
    setCart([]);
    setCurrentPage('shop');
    showNotification('logout', 'info');
  };

  const handleAdminLogin = (username, password) => {
    if (username === 'admin' && password === 'Fenerbahce.1') {
      setIsAdminLoggedIn(true);
      setCurrentPage('adminDashboard');
      showNotification('adminLoginSuccess', 'success');
    } else {
      showNotification('adminLoginInvalid', 'error');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('shop');
    showNotification('adminLoggedOut', 'info');
  };

  // Order functions
  const handlePlaceOrder = (orderData) => {
    const newOrder = {
      id: generateId('ORD-', 8),
      userId: currentUser?.id,
      items: [...cart],
      total: cartTotal + (orderData.deliveryOption?.cost || 0),
      shippingInfo: orderData.shippingInfo,
      deliveryOption: orderData.deliveryOption,
      paymentInfo: orderData.paymentInfo,
      status: 'confirmed',
      date: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);
    
    if (currentUser) {
      setUsers(prevUsers => prevUsers.map(u => 
        u.id === currentUser.id 
          ? {...u, orders: [newOrder, ...u.orders], cart: []} 
          : u
      ));
    }

    // Update product quantities
    setProducts(prevProducts => 
      prevProducts.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
          return {
            ...product,
            quantity: Math.max(0, product.quantity - cartItem.quantity)
          };
        }
        return product;
      })
    );

    setCart([]);
    setCheckoutData(newOrder);
    navigate('orderConfirmation');
    showNotification('orderPlacedSuccessfully', 'success');
  };

  // Admin functions
  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: generateId('prod-', 8),
      labelCode: generateId('GRSM-', 5)
    };
    setProducts(prev => [newProduct, ...prev]);
    showNotification('productAddedSuccess', 'success');
  };

  const handleUpdateProduct = (productData) => {
    setProducts(prev => 
      prev.map(p => p.id === productData.id ? productData : p)
    );
    showNotification('productUpdatedSuccess', 'success');
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showNotification('productDeletedSuccess', 'success');
  };

  const handleUpdateUser = (userData) => {
    setUsers(prev => 
      prev.map(u => u.id === userData.id ? userData : u)
    );
    if (currentUser && currentUser.id === userData.id) {
      setCurrentUser(userData);
    }
    showNotification('userUpdatedSuccess', 'success');
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    showNotification('userDeletedSuccess', 'success');
  };

  const handleUpdateReferences = (newReferences) => {
    setReferences(newReferences);
    showNotification('referencesUpdatedSuccess', 'success');
  };

  const handleUpdateContactInfo = (newContactInfo) => {
    setContactInfo(newContactInfo);
    showNotification('contactInfoUpdatedSuccess', 'success');
  };

  // Render page content
  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return (
          <ShopPage 
            products={products}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        );
      case 'cart':
        return (
          <CartPage 
            cart={cart}
            products={products}
            cartTotal={cartTotal}
            currentUser={currentUser}
            onNavigate={navigate}
            onRemoveFromCart={removeFromCart}
            onUpdateCartQuantity={updateCartQuantity}
          />
        );
      case 'productDetail':
        return (
          <ProductDetailPage 
            selectedProduct={selectedProduct}
            products={products}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        );
      case 'contact':
        return <ContactPage contactInfo={contactInfo} />;
      case 'references':
        return <ReferencesPage references={references} />;
      case 'customerLogin':
        return (
          <CustomerLoginPage 
            onLogin={handleCustomerLogin}
            onNavigate={navigate}
          />
        );
      case 'customerRegister':
        return (
          <CustomerRegisterPage 
            onRegister={handleCustomerRegister}
            onNavigate={navigate}
          />
        );
      case 'account':
        return (
          <AccountPage 
            currentUser={currentUser}
            users={users}
            onNavigate={navigate}
            onUpdateUser={handleUpdateUser}
          />
        );
      case 'adminLogin':
        return (
          <AdminLoginPage 
            onLogin={handleAdminLogin}
            onNavigate={navigate}
          />
        );
      case 'adminDashboard':
        return (
          <AdminDashboard 
            products={products}
            users={users}
            orders={orders}
            references={references}
            contactInfo={contactInfo}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onUpdateReferences={handleUpdateReferences}
            onUpdateContactInfo={handleUpdateContactInfo}
            onNavigate={navigate}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            cart={cart}
            cartTotal={cartTotal}
            currentUser={currentUser}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={navigate}
          />
        );
      case 'orderConfirmation':
        return (
          <OrderConfirmationPage 
            orderData={checkoutData}
            onNavigate={navigate}
          />
        );
      default:
        return (
          <ShopPage 
            products={products}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Navbar 
        currentUser={currentUser}
        cartItemCount={cartItemCount}
        isAdminLoggedIn={isAdminLoggedIn}
        onNavigate={navigate}
        onCustomerLogout={handleCustomerLogout}
        onAdminLogout={handleAdminLogout}
      />
      
      <NotificationBar 
        notification={notification}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <Footer />
      <PrivacyNotice />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInternal />
    </LanguageProvider>
  );
}