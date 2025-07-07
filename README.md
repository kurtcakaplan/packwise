# Packwise E-commerce Platform

A modern, multilingual e-commerce platform built with React, featuring comprehensive payment and email integrations.

## 🚀 Features

### Core E-commerce
- **Product Management**: Full CRUD operations with multilingual support
- **Shopping Cart**: Real-time cart management with inventory validation
- **Order Processing**: Complete checkout flow with order tracking
- **User Management**: Customer accounts with order history
- **Admin Dashboard**: Comprehensive management interface

### Payment Integration Ready
- **Multiple Payment Providers**: Stripe, PayPal, Square, Bank Transfers
- **Flexible Payment Methods**: Credit cards, digital wallets, bank transfers
- **Secure Processing**: PCI-compliant payment handling
- **International Support**: Multi-currency and regional payment methods

### Email Service Integration
- **Multiple Email Providers**: SendGrid, Mailgun, AWS SES, SMTP
- **Templated Emails**: Order confirmations, shipping notifications, welcome emails
- **Automated Notifications**: Real-time email triggers for order events
- **Multilingual Templates**: Email content in multiple languages

### Multilingual Support
- **Languages**: English, Slovak, Hungarian
- **Dynamic Translation**: Real-time language switching
- **Admin Translation Management**: Edit translations through admin panel
- **Localized Content**: Products, emails, and UI in multiple languages

### Security Features
- **Input Validation**: Comprehensive form validation and sanitization
- **Rate Limiting**: Protection against brute force attacks
- **Secure Authentication**: Password strength requirements and secure login
- **Data Protection**: SSL encryption and secure data handling

## 🛠 Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Modern web browser
- Email service provider account (SendGrid, Mailgun, etc.)
- Payment processor account (Stripe, PayPal, etc.)

### Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd packwise-ecommerce
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your service credentials
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Admin Panel: Login with admin/Fenerbahce.1

## 🔧 Payment Integration Setup

### Stripe Integration
```javascript
import { StripeProvider } from './src/services/paymentService';

// Initialize Stripe
const stripeProvider = new StripeProvider(
  process.env.REACT_APP_STRIPE_SECRET_KEY,
  { /* options */ }
);

// Register with payment service
paymentService.registerProvider('stripe', stripeProvider);
```

### PayPal Integration
```javascript
import { PayPalProvider } from './src/services/paymentService';

// Initialize PayPal
const paypalProvider = new PayPalProvider(
  process.env.REACT_APP_PAYPAL_CLIENT_ID,
  process.env.REACT_APP_PAYPAL_CLIENT_SECRET
);

paymentService.registerProvider('paypal', paypalProvider);
```

### Bank Transfer Integration
```javascript
import { BankTransferProvider } from './src/services/paymentService';

// Configure bank details
const bankConfig = {
  apiKey: 'your_bank_api_key',
  bankCode: 'BANK_CODE',
  accountDetails: {
    // Bank-specific configuration
  }
};

const bankProvider = new BankTransferProvider(bankConfig);
paymentService.registerProvider('bank', bankProvider);
```

## 📧 Email Service Setup

### SendGrid Integration
```javascript
import { SendGridProvider } from './src/services/emailService';

// Initialize SendGrid
const sendgridProvider = new SendGridProvider(
  process.env.REACT_APP_SENDGRID_API_KEY,
  {
    defaultFrom: 'noreply@packwise.com',
    defaultFromName: 'Packwise'
  }
);

emailService.registerProvider('sendgrid', sendgridProvider);
```

### Mailgun Integration
```javascript
import { MailgunProvider } from './src/services/emailService';

// Initialize Mailgun
const mailgunProvider = new MailgunProvider(
  process.env.REACT_APP_MAILGUN_API_KEY,
  process.env.REACT_APP_MAILGUN_DOMAIN
);

emailService.registerProvider('mailgun', mailgunProvider);
```

### Custom SMTP Integration
```javascript
import { SMTPProvider } from './src/services/emailService';

// Configure SMTP
const smtpConfig = {
  host: 'smtp.your-domain.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your_username',
    pass: 'your_password'
  }
};

const smtpProvider = new SMTPProvider(smtpConfig);
emailService.registerProvider('smtp', smtpProvider);
```

## 🏦 Bank Integration Examples

### European SEPA Integration
```javascript
// SEPA bank transfer configuration
const sepaConfig = {
  apiKey: 'your_sepa_api_key',
  bankCode: 'SEPA',
  supportedCountries: ['DE', 'FR', 'IT', 'ES', 'NL'],
  currency: 'EUR'
};

const sepaProvider = new BankTransferProvider(sepaConfig);
paymentService.registerProvider('sepa', sepaProvider);
```

### US ACH Integration
```javascript
// ACH bank transfer configuration
const achConfig = {
  apiKey: 'your_ach_api_key',
  bankCode: 'ACH',
  routingNumber: '021000021',
  accountNumber: '1234567890',
  currency: 'USD'
};

const achProvider = new BankTransferProvider(achConfig);
paymentService.registerProvider('ach', achProvider);
```

## 📱 Usage Examples

### Processing Payments
```javascript
import { usePayment } from './src/hooks/usePayment';

function CheckoutComponent() {
  const { processPayment, isProcessing } = usePayment();

  const handlePayment = async (paymentData) => {
    try {
      const result = await processPayment({
        amount: 100.00,
        currency: 'USD',
        paymentMethod: {
          type: 'card',
          card: paymentData.card
        },
        customer: {
          email: 'customer@example.com'
        }
      }, 'stripe'); // Use Stripe provider

      if (result.success) {
        // Payment successful
        console.log('Payment ID:', result.transactionId);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };
}
```

### Sending Emails
```javascript
import { useEmail } from './src/hooks/useEmail';

function OrderConfirmation({ order }) {
  const { sendTemplatedEmail } = useEmail();

  const sendConfirmation = async () => {
    await sendTemplatedEmail(
      'orderConfirmation',
      { email: order.customerEmail },
      {
        orderNumber: order.id,
        customerName: order.customerName,
        items: order.items,
        total: order.total
      }
    );
  };
}
```

## 🔐 Security Considerations

### Payment Security
- All payment data is validated before processing
- PCI DSS compliance through certified payment processors
- Secure token-based payment method storage
- Encrypted transmission of sensitive data

### Email Security
- DKIM and SPF record configuration recommended
- Rate limiting on email sending
- Template injection protection
- Bounce and complaint handling

### General Security
- Input sanitization and validation
- CSRF protection
- Rate limiting on API endpoints
- Secure session management

## 🌍 Internationalization

### Adding New Languages
1. Add language code to `LanguageContext.jsx`
2. Create translation object with all required keys
3. Update language selector component
4. Test all UI elements in new language

### Managing Translations
- Use admin panel for real-time translation updates
- Export/import translation files for external translation services
- Validate translation completeness before deployment

## 📊 Analytics & Monitoring

### Payment Analytics
- Transaction success/failure rates
- Payment method preferences
- Revenue tracking by region/currency
- Fraud detection metrics

### Email Analytics
- Delivery rates by provider
- Open and click-through rates
- Bounce and complaint tracking
- Template performance metrics

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set:
- Payment provider credentials
- Email service API keys
- Database connection strings
- Security keys and tokens

### Production Checklist
- [ ] SSL certificate configured
- [ ] Payment webhooks configured
- [ ] Email domain verification completed
- [ ] Analytics tracking implemented
- [ ] Error monitoring setup
- [ ] Backup strategy implemented

## 🤝 Support

### Payment Issues
- Check provider status pages
- Verify API credentials
- Review webhook configurations
- Monitor transaction logs

### Email Delivery Issues
- Verify domain authentication
- Check sender reputation
- Review bounce/complaint rates
- Test email templates

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the excellent framework
- Payment providers for secure processing
- Email service providers for reliable delivery
- Open source community for inspiration and tools