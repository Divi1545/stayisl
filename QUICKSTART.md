# ⚡ Quick Start - IslandLoafStay

Get up and running in 5 minutes!

## 🚀 Fast Setup

```bash
# 1. Clone and install
git clone <your-repo-url>
cd islandloaf-stay
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your keys

# 3. Run!
npm run dev
```

Open http://localhost:3000 🎉

## 🔑 Required Keys

You need these API keys:

### 1. Stripe (Test Keys)
- Go to: https://dashboard.stripe.com/test/apikeys
- Copy: `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Copy: `Secret key` → `STRIPE_SECRET_KEY`

### 2. OpenAI
- Go to: https://platform.openai.com/api-keys
- Create new key → `OPENAI_API_KEY`

### 3. Stripe Webhooks (Local)
```bash
# Terminal 1: Run dev server
npm run dev

# Terminal 2: Forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the webhook secret → STRIPE_WEBHOOK_SECRET
```

## 🧪 Test the App

### 1. Browse Services
- Homepage: http://localhost:3000
- Search: http://localhost:3000/search

### 2. Test Booking
- Pick any service
- Click "Book Now"
- Use test card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

### 3. Try Chatbot
- Click blue button (bottom right)
- Ask: "Find me a villa in Galle"
- Watch AI respond!

## 📁 Key Files

```
app/
├── page.tsx              # Homepage
├── search/page.tsx       # Browse services
├── services/[id]/        # Service detail
├── book/[id]/            # Booking flow
└── api/
    ├── chat/             # AI chatbot
    ├── checkout/         # Stripe payment
    └── webhooks/stripe/  # Payment confirmation

components/
├── ChatWidget.tsx        # AI assistant
├── ServiceCard.tsx       # Service display
└── Navbar.tsx            # Navigation

lib/
├── api.ts                # Backend API client
├── types.ts              # TypeScript types
└── stripe.ts             # Stripe config
```

## 🎨 Customize

### Change Colors
Edit `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    }
  }
}
```

### Add Components
```bash
npx shadcn@latest add <component>
```

## 🐛 Common Issues

### "Failed to fetch services"
→ Check vendor backend is running

### "Stripe error"
→ Verify API keys in `.env.local`

### "OpenAI error"
→ Check API key and billing

## 📚 Learn More

- Full docs: [README.md](./README.md)
- Deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Setup guide: [SETUP.md](./SETUP.md)

## 🆘 Help

Stuck? Check:
1. Console logs (F12 in browser)
2. Terminal output
3. `.env.local` variables

---

**You're ready to build!** 🎉


