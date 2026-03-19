import Stripe from 'stripe';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

export const stripe = () => new Stripe(secretKey, {
  apiVersion: '2024-06-20',
});

export const verifyWebhook = (body: string, signature: string) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not set');
  }

  try {
    return stripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    throw new Error(`Webhook signature verification failed: ${error.message}`);
  }
};
