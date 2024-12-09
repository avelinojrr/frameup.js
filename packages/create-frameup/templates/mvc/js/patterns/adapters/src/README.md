# Adapter Pattern - README Guide

## Purpose
The **Adapter Pattern** is a structural design pattern that allows objects with incompatible interfaces to work together by translating the interface of one class into an interface that the client expects. It acts as a bridge between two systems, enabling integration without altering their source code.

## Use Cases
- When integrating a third-party library or legacy code into your system.
- When the interfaces of two systems or classes are incompatible.
- When you want to reuse an existing class but its interface does not match the rest of your codebase.

## Structure
The Adapter Pattern typically involves three main components:
1. **Target**: Defines the domain-specific interface that the client expects.
2. **Adaptee**: The existing class or system with an incompatible interface.
3. **Adapter**: The class that bridges the gap between the target and the adaptee.

### Example Structure:
```
src/
  adapters/
    paymentAdapter.js
  services/
    paymentService.js
  thirdParty/
    stripeClient.js
```

## Responsibilities
- **Adapter**: Translates requests from the client into a format that the adaptee can understand.
- **Client**: Interacts with the adapter as if it were using the expected interface.
- **Adaptee**: Performs the actual functionality but is unaware of the adapter.

## Example Implementation

### Adaptee (`stripeClient.js`)
```js
class StripeClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  processPayment(amount, currency) {
    console.log(`Processing payment of ${amount} ${currency} through Stripe.`);
    // Actual Stripe payment logic goes here
    return { status: 'success', amount, currency };
  }
}

export default StripeClient;
```

### Target Interface
The target defines the expected interface for processing payments.
```js
class PaymentProcessor {
  process(amount, currency) {
    throw new Error('Method not implemented.');
  }
}

export default PaymentProcessor;
```

### Adapter (`paymentAdapter.js`)
```js
import PaymentProcessor from './paymentProcessor.js';
import StripeClient from '../thirdParty/stripeClient.js';

class StripeAdapter extends PaymentProcessor {
  constructor(apiKey) {
    super();
    this.stripe = new StripeClient(apiKey);
  }

  process(amount, currency) {
    return this.stripe.processPayment(amount, currency);
  }
}

export default StripeAdapter;
```

### Client Code (`paymentService.js`)
```js
import StripeAdapter from '../adapters/paymentAdapter.js';

const apiKey = 'your-stripe-api-key'; // Remember use a ENV variable
const paymentProcessor = new StripeAdapter(apiKey);

const processPayment = async (amount, currency) => {
  try {
    const result = paymentProcessor.process(amount, currency);
    console.log('Payment Result:', result);
  } catch (error) {
    console.error('Error processing payment:', error);
  }
};

processPayment(100, 'USD');
```

## Best Practices
1. **Encapsulation**: Keep the adaptee isolated within the adapter to ensure the client is unaware of the underlying implementation.
2. **Single Responsibility**: Ensure the adapter focuses only on translating the interface and does not add extra logic.
3. **Reusability**: Write adapters that can be reused across different parts of the application where the same adaptee needs integration.
4. **Error Handling**: Include proper error handling in the adapter to deal with issues from the adaptee.

## Summary
- The Adapter Pattern helps integrate systems with incompatible interfaces.
- It provides a consistent interface for clients while hiding the complexity of the underlying system.
- By using adapters, you can make your codebase more flexible, modular, and maintainable.

This implementation example with ES6 demonstrates how to use the Adapter Pattern to integrate a third-party payment system like Stripe into your application.
