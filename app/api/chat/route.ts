import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { VendorAPI } from '@/lib/api';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  ...(process.env.AI_INTEGRATIONS_OPENAI_BASE_URL && {
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  }),
});

export async function POST(req: NextRequest) {
  try {
    const { messages, cart } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    let services: any[] = [];
    try {
      services = await VendorAPI.getServices();
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }

    const servicesContext = services.length > 0
      ? `\n\nAvailable services from the backend (use these for recommendations):\n${JSON.stringify(services.map(s => ({
          id: s.id,
          name: s.name,
          type: s.type,
          location: s.location,
          description: s.description,
          basePrice: s.basePrice,
          currency: s.currency || 'USD',
          images: s.images,
          rating: s.rating
        })), null, 2)}`
      : '\n\nNote: Could not fetch services from backend. Provide general travel advice and ask user to try again.';

    const cartContext = cart && cart.length > 0
      ? `\n\nUser's current cart: ${JSON.stringify(cart)}`
      : '';

    const systemMessage = {
      role: 'system',
      content: `You are a friendly AI travel assistant for IslandLoaf, helping users plan their perfect Sri Lanka trip.

Your role is to:
1. Ask about their travel preferences (beaches, mountains, wildlife, temples, adventure, wellness)
2. Understand travel dates, group size, and budget
3. Recommend specific services from the available list
4. Create customized travel packages
5. Guide them through booking

IMPORTANT: When you want to show service cards to the user, include the service data in this exact format at the END of your message:
[SERVICES_DATA]
[{"id": 1, "name": "...", "type": "...", "location": "...", "description": "...", "basePrice": 100, "currency": "USD", "images": ["url"]}]
[/SERVICES_DATA]

Only include this block when recommending actual services. Include all fields: id, name, type, location, description, basePrice, currency, images.

Be conversational and enthusiastic about Sri Lanka. Keep responses concise but helpful. After showing services, ask if they'd like to add any to their trip.

Available service types: stays, tours, vehicles, wellness, tickets, products
Popular destinations: Colombo, Galle, Ella, Kandy, Sigiriya, Negombo, Mirissa, Arugam Bay
${servicesContext}${cartContext}`,
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_completion_tokens: 1000,
    });

    const responseContent = completion.choices[0]?.message?.content || 'I apologize, but I encountered an issue. Please try again.';

    let responseMessage = responseContent;
    let responseServices: any[] = [];

    const servicesMatch = responseContent.match(/\[SERVICES_DATA\]([\s\S]*?)\[\/SERVICES_DATA\]/);
    if (servicesMatch) {
      try {
        responseServices = JSON.parse(servicesMatch[1].trim());
        responseMessage = responseContent.replace(/\[SERVICES_DATA\][\s\S]*?\[\/SERVICES_DATA\]/, '').trim();
      } catch (e) {
        console.error('Failed to parse services data:', e);
      }
    }

    return NextResponse.json({
      message: responseMessage,
      services: responseServices
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { message: 'Sorry, I encountered an error. Please try again.', services: [] },
      { status: 500 }
    );
  }
}
