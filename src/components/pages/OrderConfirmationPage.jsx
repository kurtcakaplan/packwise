import React from 'react';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const OrderConfirmationPage = ({ orderData, onNavigate }) => {
  const { t, getLocalized } = useLanguage();

  if (!orderData) {
    onNavigate('shop');
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
            <CheckCircle size={64} className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">{t('orderConfirmed')}</h1>
            <p className="text-green-100">{t('thankYouForOrder')}</p>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                {t('orderNumber')}: #{orderData.id}
              </h2>
              <p className="text-slate-600">
                {t('orderDate')}: {new Date(orderData.date).toLocaleDateString()}
              </p>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <Package className="mr-2 text-cyan-600" />
                {t('orderItems')}
              </h3>
              <div className="bg-slate-50 rounded-lg p-4">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-slate-800">{getLocalized(item.name)}</p>
                      <p className="text-sm text-slate-600">
                        {t('quantity')}: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 font-bold text-lg">
                  <span>{t('total')}</span>
                  <span className="text-green-600">${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <Truck className="mr-2 text-cyan-600" />
                {t('shippingInformation')}
              </h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-medium text-slate-800">{orderData.shippingInfo.fullName}</p>
                <p className="text-slate-600">{orderData.shippingInfo.address}</p>
                <p className="text-slate-600">
                  {orderData.shippingInfo.city}, {orderData.shippingInfo.postalCode}
                </p>
                <p className="text-slate-600">{orderData.shippingInfo.country}</p>
                {orderData.shippingInfo.phone && (
                  <p className="text-slate-600 mt-2">{t('phone')}: {orderData.shippingInfo.phone}</p>
                )}
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-slate-600">
                    <strong>{t('deliveryOption')}:</strong> {t(orderData.deliveryOption.nameKey)}
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>{t('deliveryCost')}:</strong> ${orderData.deliveryOption.cost.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <CreditCard className="mr-2 text-cyan-600" />
                {t('paymentInformation')}
              </h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-600">
                  <strong>{t('cardNumber')}:</strong> **** **** **** {orderData.paymentInfo.cardNumber.slice(-4)}
                </p>
                <p className="text-slate-600">
                  <strong>{t('cardholderName')}:</strong> {orderData.paymentInfo.cardholderName}
                </p>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  {t('paymentProcessed')}
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <h4 className="font-semibold text-blue-800 mb-2">{t('whatHappensNext')}</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {t('orderProcessingInfo')}</li>
                <li>• {t('shippingNotificationInfo')}</li>
                <li>• {t('trackingNumberInfo')}</li>
                <li>• {t('deliveryTimeInfo')}</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('shop')}
                className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
              >
                {t('continueShopping')}
              </button>
              <button
                onClick={() => onNavigate('account')}
                className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
              >
                {t('viewMyOrders')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;