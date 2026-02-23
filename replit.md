# IslandLoaf Travel

## Overview
IslandLoaf is a ChatGPT-style AI travel assistant for Sri Lankan tourism. The app features a full-screen chatbot interface where users can chat with an AI to discover stays, tours, vehicles, and experiences, then proceed to checkout.

## Project Structure
- `/app` - Next.js App Router pages and API routes
  - `page.tsx` - Main chatbot interface
  - `checkout/page.tsx` - Booking checkout page
  - `api/chat/route.ts` - AI chat endpoint
- `/lib` - Utility functions, types, mock data, and API helpers
  - `api.ts` - VendorAPI client for backend connection
- `/components` - Reusable UI components
- `/public` - Static assets

## Tech Stack
- **Framework**: Next.js 16.1.1 with App Router
- **Styling**: Tailwind CSS 4 with dark theme
- **AI**: OpenAI via Replit AI Integrations (gpt-4o-mini)
- **Backend**: Connected to www.islandloafvendor.com

## Design System
- **Theme**: Light pink/coral gradient (rose-50 to orange-50)
- **Layout**: ChatGPT-style - minimal header, message area, input at bottom
- **Typography**: Geist Sans font family
- **Colors**: Rose-to-orange gradient accents (#f43f5e to #f97316) on light backgrounds

## Key Features
- Full-screen AI chatbot interface
- AI recommends services from backend (shows as cards in chat)
- Cart system with localStorage persistence
- Checkout page for booking requests

## Development
- Run with: `npm run dev -- -p 5000 -H 0.0.0.0`
- Frontend runs on port 5000

## Environment Variables
- `NEXT_PUBLIC_VENDOR_API_URL` - Backend API URL (https://www.islandloafvendor.com)
- `VENDOR_API_KEY` - API key for vendor backend
- `AI_INTEGRATIONS_OPENAI_API_KEY` - OpenAI API key (auto-configured by Replit)
- `AI_INTEGRATIONS_OPENAI_BASE_URL` - OpenAI base URL (auto-configured by Replit)

## Deployment
Configured for autoscale deployment with:
- Build: `npm run build`
- Start: `npm run start -- -p 5000 -H 0.0.0.0`

## Recent Changes (January 2026)
- Redesigned as ChatGPT-style chatbot-only interface
- Removed traditional website elements (hero, grids, side chat, header, footer)
- Full-screen chat with AI that fetches real services from backend
- Cart modal with checkout flow
- Connected to www.islandloafvendor.com backend
