import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const VENDOR_API_URL = process.env.VENDOR_API_URL || 'https://islandloafvendor.repl.co';

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
    const {
      serviceId,
      serviceName,
      amount,
      currency,
      customerEmail,
      customerName,
      bookingDetails,
      successUrl,
      cancelUrl,
    } = await req.json();

    // Validate inputs
    if (!serviceId || !serviceName || !amount || !customerEmail || !bookingDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Stripe Checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: (currency || 'USD').toLowerCase(),
            unit_amount: Math.round(amount * 100), // Convert to cents
            product_data: {
              name: serviceName,
              description: `Booking from ${bookingDetails.startDate} to ${bookingDetails.endDate}`,
              images: bookingDetails.image ? [bookingDetails.image] : [],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        serviceId: serviceId.toString(),
        customerName,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        guests: bookingDetails.guests.toString(),
        specialRequests: bookingDetails.specialRequests || '',
      },
    });

    // Create booking in vendor backend with pending status
    try {
      await fetch(`${VENDOR_API_URL}/api/public/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          customerName,
          customerEmail,
          startDate: bookingDetails.startDate,
          endDate: bookingDetails.endDate,
          guestsCount: bookingDetails.guests,
          totalPrice: amount,
          stripeSessionId: session.id,
          status: 'pending',
          paymentStatus: 'pending',
          specialRequests: bookingDetails.specialRequests,
        }),
      });
    } catch (error) {
      console.error('Error creating booking in vendor backend:', error);
      // Continue anyway - webhook will handle it
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}


