# 🏝️ IslandLoafStay - Customer Booking Platform

A modern, customer-facing tourism booking website for Sri Lanka that connects to the IslandLoafVendor backend platform.

## ✨ Features

- **Service Discovery**: Browse stays, tours, vehicles, wellness services, tickets, and products
- **Advanced Search & Filtering**: Find exactly what you need with powerful filters
- **Guest Checkout**: No account required - book with just email
- **Stripe Payments**: Secure payment processing
- **AI Travel Assistant**: Get personalized recommendations via chatbot
- **Mobile Responsive**: Beautiful UI on all devices
- **Real-time Availability**: Check service availability instantly
- **Booking Management**: Lookup and manage bookings via email

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Payments**: Stripe Checkout
- **AI**: OpenAI GPT-4
- **Backend**: IslandLoafVendor API (handles all data operations)
- **Deployment**: Vercel

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  IslandLoafStay.com                 │
│  (Customer Frontend - Next.js)      │
│                                     │
│  • Browse services                  │
│  • AI chatbot                       │
│  • Booking form                     │
│  • Stripe Checkout                  │
│                                     │
│  NO DATABASE CONNECTION ✅          │
└─────────────┬───────────────────────┘
              │
              │ API Calls Only
              ▼
┌─────────────────────────────────────┐
│  IslandLoafVendor.com               │
│  (Backend API)                      │
│                                     │
│  • All business logic               │
│  • Database operations              │
│  • Commission calculations          │
│  • Vendor payouts                   │
└─────────────┬───────────────────────┘
              │
              ▼
       Supabase Database
```

**This is a pure frontend application!** All data, bookings, and payments are managed through the vendor backend API.

## 📦 Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd islandloaf-stay
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_VENDOR_API_URL`: Your vendor backend API URL
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe public key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret
- `OPENAI_API_KEY`: OpenAI API key for chatbot

**Note:** ✅ **No database credentials needed!** This is a frontend-only app. All data operations go through the IslandLoafVendor backend API.

4. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🏗️ Project Structure

```
islandloaf-stay/
├── app/
│   ├── api/
│   │   ├── chat/           # AI chatbot API
│   │   ├── checkout/       # Stripe checkout session
│   │   └── webhooks/       # Stripe webhooks
│   ├── book/[id]/          # Booking flow page
│   ├── booking/
│   │   ├── success/        # Payment success page
│   │   └── lookup/         # Booking lookup page
│   ├── search/             # Service search/browse
│   ├── services/[id]/      # Service detail page
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── ChatWidget.tsx      # AI chatbot widget
│   ├── ServiceCard.tsx     # Service card component
│   ├── SearchBar.tsx       # Search bar component
│   ├── Navbar.tsx          # Navigation bar
│   └── Footer.tsx          # Footer component
├── lib/
│   ├── api.ts              # Vendor API client
│   ├── stripe.ts           # Stripe client
│   ├── supabase.ts         # Supabase client
│   └── types.ts            # TypeScript types
└── public/                 # Static assets
```

## 🔧 Configuration

### Stripe Webhooks

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Forward webhooks to local development:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

3. Copy the webhook signing secret to `.env.local`

### OpenAI Setup

1. Get your API key from https://platform.openai.com/api-keys
2. Add to `.env.local` as `OPENAI_API_KEY`
3. The chatbot uses GPT-4 with function calling for service recommendations

### Vendor Backend

**Important:** This app requires the IslandLoafVendor backend API to be running. The vendor backend provides these public endpoints:

- `GET /api/public/services` - List all available services
- `GET /api/public/services/:id` - Get service details
- `GET /api/public/availability` - Check service availability
- `POST /api/public/bookings` - Create new booking
- `POST /api/public/bookings/confirm` - Confirm booking after payment
- `GET /api/public/bookings/lookup` - Lookup booking by email/reference
- `POST /api/public/chat` - AI chatbot endpoint

The vendor backend handles ALL database operations, business logic, and commission calculations. This customer app is a pure frontend.

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import to Vercel**

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Add environment variables
- Deploy!

3. **Setup Stripe Webhook**

After deployment, add your production webhook URL to Stripe:
- URL: `https://your-domain.com/api/webhooks/stripe`
- Events: `checkout.session.completed`, `checkout.session.expired`

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Services

Services are managed through the vendor backend platform. This customer app automatically fetches and displays all available services.

## 📱 Features Detail

### Homepage
- Hero section with search
- Service categories
- Featured services
- Why choose us section
- Call-to-action

### Search & Browse
- Filter by type, location, price
- Sort by price, rating
- Responsive grid layout
- Mobile-friendly filters

### Service Details
- Image gallery
- Full description
- Amenities list
- Pricing information
- Booking button
- Location map (placeholder)

### Booking Flow
1. **Step 1**: Select dates and number of guests
2. **Step 2**: Enter customer details
3. **Step 3**: Review booking
4. **Step 4**: Pay with Stripe Checkout

### AI Chatbot
- Natural language search
- Service recommendations
- Package creation assistance
- Local knowledge
- Booking guidance

### Booking Management
- Lookup bookings by email + reference
- View booking status
- Download confirmation
- Contact vendor

## 🔒 Security

- Environment variables for sensitive data
- Stripe webhook signature verification
- Input validation on all forms
- HTTPS in production
- No sensitive data in client-side code

## 🤝 API Integration

### Vendor Backend Endpoints

```typescript
GET  /api/public/services           // List all services
GET  /api/public/services/:id       // Get service details
POST /api/public/bookings           // Create booking
POST /api/public/bookings/confirm   // Confirm booking
GET  /api/public/bookings/lookup    // Lookup booking
GET  /api/public/availability       // Check availability
GET  /api/public/search             // Search services
```

## 📊 Performance

- Server-side rendering for SEO
- Image optimization with Next/Image
- Code splitting
- Lazy loading
- Fast page loads

## 🐛 Troubleshooting

### Common Issues

**API not responding**
- Check vendor backend is running
- Verify `NEXT_PUBLIC_VENDOR_API_URL` is correct

**Stripe errors**
- Verify all Stripe keys are correct
- Check webhook secret matches
- Ensure webhook endpoint is accessible

**Chatbot not working**
- Verify `OPENAI_API_KEY` is valid
- Check API quota/billing
- Review console for errors

## 📄 License

All rights reserved © 2026 IslandLoafStay

## 🙏 Support

For support, email support@islandloafstay.com or contact the development team.

---

Built with ❤️ for Sri Lankan Tourism
