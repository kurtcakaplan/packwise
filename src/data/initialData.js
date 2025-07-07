import { generateId } from '../utils/helpers';
import EXCEL_PRODUCTS_DATABASE from './productDatabase';

export const PRODUCT_CATEGORIES_DATA = [
  { key: 'packing', en: 'Packing', sk: 'Balenie', hu: 'Csomagolás' },
  { key: 'food_beverage', en: 'Food & Beverage', sk: 'Potraviny a Nápoje', hu: 'Élelmiszer és Ital' },
  { key: 'hygiene_cleaning', en: 'Hygiene & Cleaning', sk: 'Hygiena a Čistenie', hu: 'Higiénia és Tisztítás' },
  { key: 'disposable', en: 'Disposable Products', sk: 'Jednorazové Výrobky', hu: 'Eldobható Termékek' },
  { key: 'industrial', en: 'Industrial Supplies', sk: 'Priemyselné Potreby', hu: 'Ipari Kellékek' }
];

export const DELIVERY_OPTIONS = [
  { id: 'standard', nameKey: 'standardDelivery', cost: 5.00, duration: '1-2 business days' },
  { id: 'express', nameKey: 'expressDelivery', cost: 15.00, duration: 'Next business day' }
];

export const INITIAL_USERS = [
  { 
    id: 'user1', 
    email: 'customer@example.com', 
    password: 'password123', 
    name: 'John Doe', 
    companyName: 'Doe Logistics', 
    taxNumber: 'SK2020202020', 
    cart: [], 
    orders: [
      {
        orderId: generateId('ORD-', 6), 
        date: '2024-05-01', 
        customerId: 'user1', 
        items: [{id: EXCEL_PRODUCTS_DATABASE[0].id, name: EXCEL_PRODUCTS_DATABASE[0].name, quantity: 5, price: EXCEL_PRODUCTS_DATABASE[0].price}], 
        totalAmount: 7.50, 
        shippingInfo: {
          fullName: 'John Doe', 
          address: '123 Main St', 
          city: 'Anytown', 
          postalCode: '12345', 
          country: 'USA', 
          phone: '555-0100', 
          email: 'customer@example.com'
        }, 
        deliveryOption: {nameKey: 'standardDelivery', cost: 5.00}
      }
    ], 
    savedAddresses: [{
      id: 'addr1', 
      fullName: 'John Doe', 
      address: '123 Main St', 
      city: 'Anytown', 
      postalCode: '12345', 
      country: 'USA', 
      phone: '555-0100', 
      email: 'customer@example.com', 
      isDefault: true
    }], 
    isAdmin: false
  },
  { 
    id: 'user2', 
    email: 'test@packwise.com', 
    password: 'test', 
    name: 'Jane Smith', 
    companyName: '', 
    taxNumber: '', 
    cart: [
      { 
        id: EXCEL_PRODUCTS_DATABASE[3].id, 
        labelCode: EXCEL_PRODUCTS_DATABASE[3].serialNumber, 
        name: EXCEL_PRODUCTS_DATABASE[3].name, 
        quantity: 2, 
        price: EXCEL_PRODUCTS_DATABASE[3].price, 
        images: EXCEL_PRODUCTS_DATABASE[3].images 
      },
    ], 
    orders: [], 
    savedAddresses: [], 
    isAdmin: false
  },
  { 
    id: 'admin-user', 
    email: 'admin@example.com', 
    password: 'password123', 
    name: 'Main Admin', 
    companyName: 'Packwise Corp', 
    taxNumber: '', 
    cart: [], 
    orders: [], 
    savedAddresses: [], 
    isAdmin: true 
  }
];

// Use the Excel products database as initial products
export const INITIAL_PRODUCTS = EXCEL_PRODUCTS_DATABASE;

export const INITIAL_REFERENCES = [
  { 
    id: 'ref1', 
    name: {
      en: 'Client A Logistics', 
      sk: 'Klient A Logistika', 
      hu: 'A Ügyfél Logisztika'
    }, 
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=80&fit=crop' 
  },
  { 
    id: 'ref2', 
    name: {
      en: 'FreshFoods Inc.', 
      sk: 'FreshFoods SK', 
      hu: 'FreshFoods Kft.'
    }, 
    logoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=80&fit=crop' 
  },
];

export const INITIAL_CONTACT_INFO = { 
  address: '123 Packing Lane, Industriville, PK 45678', 
  phone: '(555) 123-4567', 
  email: 'contact@packwise.com' 
};

export const SIMULATED_SALES_DATA = [
  { day: 'Mon', sales: Math.floor(Math.random() * 1000) + 200 },
  { day: 'Tue', sales: Math.floor(Math.random() * 1000) + 300 },
  { day: 'Wed', sales: Math.floor(Math.random() * 1000) + 400 },
  { day: 'Thu', sales: Math.floor(Math.random() * 1000) + 350 },
  { day: 'Fri', sales: Math.floor(Math.random() * 1000) + 500 },
  { day: 'Sat', sales: Math.floor(Math.random() * 1000) + 600 },
  { day: 'Sun', sales: Math.floor(Math.random() * 1000) + 450 },
];