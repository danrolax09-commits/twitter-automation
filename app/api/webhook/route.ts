import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('stripe-signature');
    const body = await request.text();

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const event: any = verifyWebhook(body, signature);

    switch ((event as any).type) {
      case 'checkout.session.completed':
        console.log('✓ Payment completed:', (event.data.object as any).id);
        break;
      case 'charge.succeeded':
        console.log('✓ Charge succeeded:', (event.data.object as any).id);
        break;
      default:
        console.log('Event:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
