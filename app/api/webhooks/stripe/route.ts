import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const VENDOR_API_URL = process.env.VENDOR_API_URL || process.env.NEXT_PUBLIC_VENDOR_API_URL || 'https://www.islandloafvendor.com';

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Stripe secret key not configured');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-12-15.clover',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    try {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('Payment successful for session:', session.id);

      // Update booking status to confirmed
      try {
        await fetch(`${VENDOR_API_URL}/api/public/bookings/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stripeSessionId: session.id,
            status: 'confirmed',
            paymentStatus: 'paid',
            stripePaymentIntentId: session.payment_intent,
          }),
        });

        console.log('Booking confirmed in vendor backend');
      } catch (error) {
        console.error('Error confirming booking in vendor backend:', error);
      }
    }

    // Handle failed payments
    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Payment session expired:', session.id);

      // Update booking status to cancelled
      try {
        await fetch(`${VENDOR_API_URL}/api/public/bookings/cancel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stripeSessionId: session.id,
            status: 'cancelled',
            paymentStatus: 'failed',
          }),
        });
      } catch (error) {
        console.error('Error cancelling booking in vendor backend:', error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    );
  }
}


