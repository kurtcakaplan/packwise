import React, { useState } from 'react';
import { CreditCard, Truck, MapPin, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DELIVERY_OPTIONS } from '../../data/initialData';
import { validateCreditCard, validateCVV, validateExpiryDate } from '../../utils/security';

const CheckoutPage = ({ cart, cartTotal, currentUser, onPlaceOrder, onNavigate }) => {
  const { t, getLocalized } = useLanguage();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  const [deliveryOption, setDeliveryOption] = useState(DELIVERY_OPTIONS[0]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [errors, setErrors] = useState({});

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!shippingInfo.fullName.trim()) newErrors.fullName = t('nameRequired');
    if (!shippingInfo.email.trim()) newErrors.email = t('emailRequired');
    if (!shippingInfo.address.trim()) newErrors.address = t('addressRequired');
    if (!shippingInfo.city.trim()) newErrors.city = t('cityRequired');
    if (!shippingInfo.postalCode.trim()) newErrors.postalCode = t('postalCodeRequired');
    if (!shippingInfo.country.trim()) newErrors.country = t('countryRequired');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!validateCreditCard(paymentInfo.cardNumber)) {
      newErrors.cardNumber = t('invalidCardNumber');
    }
    if (!validateExpiryDate(paymentInfo.expiryDate)) {
      newErrors.expiryDate = t('invalidExpiryDate');
    }
    if (!validateCVV(paymentInfo.cvv)) {
      newErrors.cvv = t('invalidCVV');
    }
    if (!paymentInfo.cardholderName.trim()) {
      newErrors.cardholderName = t('cardholderNameRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    onPlaceOrder({
      shippingInfo,
      deliveryOption,
      paymentInfo
    });
  };

  const totalWithDelivery = cartTotal + deliveryOption.cost;

  if (cart.length === 0) {
    onNavigate('cart');
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">{t('checkout')}</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[
            { step: 1, label: t('shippingInfo'), icon: MapPin },
            { step: 2, label: t('payment'), icon: CreditCard },
            { step: 3, label: t('confirmation'), icon: CheckCircle }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= item.step ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {step > item.step ? (
                    <CheckCircle size={20} />
                  ) : (
                    <IconComponent size={20} />
                  )}
                </div>
                <span className={`ml-2 font-medium ${
                  step >= item.step ? 'text-cyan-600' : 'text-slate-600'
                }`}>
                  {item.label}
                </span>
                {index < 2 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step > item.step ? 'bg-cyan-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <MapPin className="mr-2 text-cyan-600" />
                  {t('shippingInformation')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('fullName')} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingChange}
                      className={`w-full p-3 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('emailAddress')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('address')} *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className={`w-full p-3 border rounded-lg ${errors.address ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('city')} *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className={`w-full p-3 border rounded-lg ${errors.city ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('postalCode')} *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingChange}
                      className={`w-full p-3 border rounded-lg ${errors.postalCode ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('country')} *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      className={`w-full p-3 border rounded-lg ${errors.country ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="w-full p-3 border rounded-lg border-slate-300"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Truck className="mr-2 text-cyan-600" />
                    {t('deliveryOptions')}
                  </h3>
                  <div className="space-y-3">
                    {DELIVERY_OPTIONS.map(option => (
                      <label
                        key={option.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                          deliveryOption.id === option.id ? 'border-cyan-500 bg-cyan-50' : 'border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryOption.id === option.id}
                          onChange={() => setDeliveryOption(option)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{t(option.nameKey)}</div>
                          <div className="text-sm text-slate-600">{option.duration}</div>
                        </div>
                        <div className="font-bold">${option.cost.toFixed(2)}</div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CreditCard className="mr-2 text-cyan-600" />
                  {t('paymentInformation')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('cardholderName')} *
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={paymentInfo.cardholderName}
                      onChange={handlePaymentChange}
                      className={`w-full p-3 border rounded-lg ${errors.cardholderName ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('cardNumber')} *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full p-3 border rounded-lg ${errors.cardNumber ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('expiryDate')} *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      className={`w-full p-3 border rounded-lg ${errors.expiryDate ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('cvv')} *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      className={`w-full p-3 border rounded-lg ${errors.cvv ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CheckCircle className="mr-2 text-cyan-600" />
                  {t('orderConfirmation')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800">{t('shippingAddress')}</h3>
                    <p className="text-slate-600">
                      {shippingInfo.fullName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.postalCode}<br />
                      {shippingInfo.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{t('deliveryOption')}</h3>
                    <p className="text-slate-600">{t(deliveryOption.nameKey)} - ${deliveryOption.cost.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{t('paymentMethod')}</h3>
                    <p className="text-slate-600">**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => step > 1 ? setStep(step - 1) : onNavigate('cart')}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                {step === 1 ? t('backToCart') : t('previous')}
              </button>
              {step < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  {t('next')}
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {t('placeOrder')}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h3 className="text-lg font-semibold mb-4">{t('orderSummary')}</h3>
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{getLocalized(item.name)}</p>
                      <p className="text-slate-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('subtotal')}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('delivery')}</span>
                  <span>${deliveryOption.cost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>{t('total')}</span>
                  <span>${totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;