# Integration Guide

This guide provides detailed instructions for integrating various payment processors and email services with your Packwise e-commerce platform.

## Payment Integrations

### Stripe Integration

#### Setup Steps
1. **Create Stripe Account**
   - Visit [Stripe Dashboard](https://dashboard.stripe.com)
   - Complete account verification
   - Obtain API keys from Developers > API keys

2. **Configure Environment Variables**
   ```env
   REACT_APP_STRIPE_ENABLED=true
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
   REACT_APP_STRIPE_SECRET_KEY=sk_test_...
   REACT_APP_STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. **Initialize Stripe Provider**
   ```javascript
   import { StripeProvider } from '../services/paymentService';
   
   const stripeProvider = new StripeProvider(
     process.env.REACT_APP_STRIPE_SECRET_KEY,
     {
       apiVersion: '2023-10-16',
       maxNetworkRetries: 3
     }
   );
   
   paymentService.registerProvider('stripe', stripeProvider);
   ```

4. **Webhook Configuration**
   - Add webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook secret to environment variables

#### Supported Payment Methods
- Credit/Debit Cards (Visa, Mastercard, Amex)
- Apple Pay
- Google Pay
- SEPA Direct Debit
- iDEAL
- Bancontact

### PayPal Integration

#### Setup Steps
1. **Create PayPal Developer Account**
   - Visit [PayPal Developer](https://developer.paypal.com)
   - Create application
   - Obtain Client ID and Secret

2. **Configure Environment Variables**
   ```env
   REACT_APP_PAYPAL_ENABLED=true
   REACT_APP_PAYPAL_CLIENT_ID=your_client_id
   REACT_APP_PAYPAL_CLIENT_SECRET=your_client_secret
   REACT_APP_PAYPAL_ENVIRONMENT=sandbox
   ```

3. **Initialize PayPal Provider**
   ```javascript
   import { PayPalProvider } from '../services/paymentService';
   
   const paypalProvider = new PayPalProvider(
     process.env.REACT_APP_PAYPAL_CLIENT_ID,
     process.env.REACT_APP_PAYPAL_CLIENT_SECRET,
     {
       environment: process.env.REACT_APP_PAYPAL_ENVIRONMENT
     }
   );
   
   paymentService.registerProvider('paypal', paypalProvider);
   ```

#### Webhook Configuration
- Add webhook URL: `https://yourdomain.com/api/paypal/webhook`
- Subscribe to events: `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`

### Square Integration

#### Setup Steps
1. **Create Square Developer Account**
   - Visit [Square Developer Dashboard](https://developer.squareup.com)
   - Create application
   - Obtain Application ID and Access Token

2. **Configure Environment Variables**
   ```env
   REACT_APP_SQUARE_ENABLED=true
   REACT_APP_SQUARE_APPLICATION_ID=your_app_id
   REACT_APP_SQUARE_ACCESS_TOKEN=your_access_token
   REACT_APP_SQUARE_ENVIRONMENT=sandbox
   ```

3. **Initialize Square Provider**
   ```javascript
   import { SquareProvider } from '../services/paymentService';
   
   const squareProvider = new SquareProvider(
     process.env.REACT_APP_SQUARE_APPLICATION_ID,
     process.env.REACT_APP_SQUARE_ACCESS_TOKEN,
     {
       environment: process.env.REACT_APP_SQUARE_ENVIRONMENT
     }
   );
   
   paymentService.registerProvider('square', squareProvider);
   ```

### Bank Transfer Integration

#### European SEPA
```javascript
const sepaConfig = {
  apiKey: 'your_bank_api_key',
  bankCode: 'SEPA',
  iban: 'DE89370400440532013000',
  bic: 'COBADEFFXXX',
  currency: 'EUR',
  supportedCountries: ['DE', 'FR', 'IT', 'ES', 'NL', 'AT', 'BE']
};

const sepaProvider = new BankTransferProvider(sepaConfig);
paymentService.registerProvider('sepa', sepaProvider);
```

#### US ACH
```javascript
const achConfig = {
  apiKey: 'your_bank_api_key',
  bankCode: 'ACH',
  routingNumber: '021000021',
  accountNumber: '1234567890',
  currency: 'USD'
};

const achProvider = new BankTransferProvider(achConfig);
paymentService.registerProvider('ach', achProvider);
```

## Email Service Integrations

### SendGrid Integration

#### Setup Steps
1. **Create SendGrid Account**
   - Visit [SendGrid](https://sendgrid.com)
   - Verify your domain
   - Create API key with Mail Send permissions

2. **Configure Environment Variables**
   ```env
   REACT_APP_SENDGRID_ENABLED=true
   REACT_APP_SENDGRID_API_KEY=SG.your_api_key
   REACT_APP_SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   REACT_APP_SENDGRID_FROM_NAME=Your Company
   ```

3. **Initialize SendGrid Provider**
   ```javascript
   import { SendGridProvider } from '../services/emailService';
   
   const sendgridProvider = new SendGridProvider(
     process.env.REACT_APP_SENDGRID_API_KEY,
     {
       defaultFrom: process.env.REACT_APP_SENDGRID_FROM_EMAIL,
       defaultFromName: process.env.REACT_APP_SENDGRID_FROM_NAME
     }
   );
   
   emailService.registerProvider('sendgrid', sendgridProvider);
   ```

4. **Domain Authentication**
   - Add DNS records provided by SendGrid
   - Verify domain authentication
   - Set up DKIM and SPF records

### Mailgun Integration

#### Setup Steps
1. **Create Mailgun Account**
   - Visit [Mailgun](https://mailgun.com)
   - Add and verify your domain
   - Obtain API key

2. **Configure Environment Variables**
   ```env
   REACT_APP_MAILGUN_ENABLED=true
   REACT_APP_MAILGUN_API_KEY=your_api_key
   REACT_APP_MAILGUN_DOMAIN=mg.yourdomain.com
   REACT_APP_MAILGUN_FROM_EMAIL=noreply@yourdomain.com
   ```

3. **Initialize Mailgun Provider**
   ```javascript
   import { MailgunProvider } from '../services/emailService';
   
   const mailgunProvider = new MailgunProvider(
     process.env.REACT_APP_MAILGUN_API_KEY,
     process.env.REACT_APP_MAILGUN_DOMAIN,
     {
       defaultFrom: process.env.REACT_APP_MAILGUN_FROM_EMAIL
     }
   );
   
   emailService.registerProvider('mailgun', mailgunProvider);
   ```

### AWS SES Integration

#### Setup Steps
1. **Configure AWS SES**
   - Create AWS account
   - Set up SES in your region
   - Verify email addresses/domains
   - Request production access

2. **Configure Environment Variables**
   ```env
   REACT_APP_AWS_SES_ENABLED=true
   REACT_APP_AWS_ACCESS_KEY_ID=your_access_key
   REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_key
   REACT_APP_AWS_REGION=us-east-1
   REACT_APP_AWS_FROM_EMAIL=noreply@yourdomain.com
   ```

3. **Initialize AWS Provider**
   ```javascript
   import { AWSProvider } from '../services/emailService';
   
   const awsProvider = new AWSProvider(
     process.env.REACT_APP_AWS_ACCESS_KEY_ID,
     process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
     process.env.REACT_APP_AWS_REGION,
     {
       defaultFrom: process.env.REACT_APP_AWS_FROM_EMAIL
     }
   );
   
   emailService.registerProvider('aws', awsProvider);
   ```

### Custom SMTP Integration

#### Setup Steps
1. **Configure SMTP Server**
   - Obtain SMTP credentials from your email provider
   - Note server settings (host, port, security)

2. **Configure Environment Variables**
   ```env
   REACT_APP_SMTP_ENABLED=true
   REACT_APP_SMTP_HOST=smtp.yourdomain.com
   REACT_APP_SMTP_PORT=587
   REACT_APP_SMTP_SECURE=false
   REACT_APP_SMTP_USER=your_username
   REACT_APP_SMTP_PASS=your_password
   ```

3. **Initialize SMTP Provider**
   ```javascript
   import { SMTPProvider } from '../services/emailService';
   
   const smtpConfig = {
     host: process.env.REACT_APP_SMTP_HOST,
     port: parseInt(process.env.REACT_APP_SMTP_PORT),
     secure: process.env.REACT_APP_SMTP_SECURE === 'true',
     auth: {
       user: process.env.REACT_APP_SMTP_USER,
       pass: process.env.REACT_APP_SMTP_PASS
     }
   };
   
   const smtpProvider = new SMTPProvider(smtpConfig);
   emailService.registerProvider('smtp', smtpProvider);
   ```

## Testing Integrations

### Payment Testing
```javascript
// Test payment processing
const testPayment = async () => {
  const testData = {
    amount: 10.00,
    currency: 'USD',
    paymentMethod: {
      type: 'card',
      card: {
        number: '4242424242424242', // Stripe test card
        expiry: '12/25',
        cvv: '123',
        holderName: 'Test User'
      }
    },
    customer: {
      email: 'test@example.com'
    }
  };

  try {
    const result = await paymentService.processPayment(testData, 'stripe');
    console.log('Test payment result:', result);
  } catch (error) {
    console.error('Test payment failed:', error);
  }
};
```

### Email Testing
```javascript
// Test email sending
const testEmail = async () => {
  const testData = {
    to: 'test@example.com',
    subject: 'Test Email',
    html: '<h1>Test Email</h1><p>This is a test email.</p>',
    text: 'Test Email\n\nThis is a test email.'
  };

  try {
    const result = await emailService.sendEmail(testData, 'sendgrid');
    console.log('Test email result:', result);
  } catch (error) {
    console.error('Test email failed:', error);
  }
};
```

## Production Deployment

### Security Checklist
- [ ] Use production API keys
- [ ] Enable webhook signature verification
- [ ] Implement rate limiting
- [ ] Set up monitoring and alerting
- [ ] Configure proper CORS settings
- [ ] Use HTTPS for all endpoints

### Monitoring
- Set up payment success/failure rate monitoring
- Monitor email delivery rates
- Track API response times
- Set up error alerting

### Backup Plans
- Configure multiple payment providers
- Set up multiple email providers
- Implement graceful fallbacks
- Monitor provider status pages