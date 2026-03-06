# CLAUDE.md — IslandLoaf Stay (stayisl)

## Owner
Divindu Edirisinghe — AI Code Agency Pvt Ltd, Sri Lanka

## What This Project Is
The traveler-facing booking platform for IslandLoaf.
An AI chatbot (powered by Claude) that talks to tourists, recommends Sri Lankan experiences, and takes bookings.
No traditional search UI — everything happens through conversation.
Vision: Compete with Booking.com but for Sri Lanka, with AI at the core.

## Tech Stack
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- AI Chatbot: Anthropic Claude API (claude-sonnet-4-6)
- Payments: Stripe Checkout
- Hosting: Vercel
- Domain: islandloafstay.com

## How It Works
1. Traveler lands on site → greeted by Claude AI chatbot
2. Claude asks about their trip (dates, interests, budget, group size)
3. Claude fetches matching services from the vendor backend (isvv API)
4. Traveler adds services to cart
5. Checkout via Stripe
6. Booking confirmed → vendor notified

## Environment Variables Required
- NEXT_PUBLIC_VENDOR_API_URL (isvv Railway URL)
- VENDOR_API_URL (isvv Railway URL)
- ANTHROPIC_API_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_URL=https://islandloafstay.com

## Connected Platforms
- isvv (vendor backend) — source of all services and bookings
- Creator Platform — drives traffic via influencer campaigns

## Current Priorities
1. Stay live and stable on Vercel
2. Chatbot must recommend Galle experiences first
3. Booking flow must be smooth end to end
4. Support USD and LKR pricing display

## Rules for Claude
- Always use Anthropic Claude API (claude-sonnet-4-6), never OpenAI
- After completing any task, push changes to GitHub (Divi1545/stayisl)
- The chatbot persona is warm, local, knowledgeable about Sri Lanka
- Optimize for mobile — most users are tourists on phones
- Never break the cart or checkout flow
