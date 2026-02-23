# 🛠️ Setup Guide - IslandLoafStay

Quick start guide to get the IslandLoafStay customer booking platform running locally.

## Prerequisites

Make sure you have installed:

- **Node.js** 18+ ([Download](https://nodejs.org))
- **npm** or **yarn**
- **Git**

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd islandloaf-stay
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Stripe SDK
- OpenAI SDK
- Supabase client
- And more...

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```bash
# Vendor Backend API
NEXT_PUBLIC_VENDOR_API_URL=https://islandloafvendor.repl.co
VENDOR_API_URL=https://islandloafvendor.repl.co

# Stripe (Get from https://dashboard.stripe.com)
# Use TEST keys for development
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here

# OpenAI (Get from https://platform.openai.com)
OPENAI_API_KEY=sk-proj-your_key_here

# App URL (for local development)
NEXT_PUBLIC_URL=http://localhost:3000

# Optional: Supabase (if you want to use it)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Setup Stripe Webhooks (Local Development)

To test Stripe payments locally, you need to forward webhooks:

1. **Install Stripe CLI**
   ```bash
   # macOS (Homebrew)
   brew install stripe/stripe-cli/stripe
   
   # Windows (Scoop)
   scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
   scoop install stripe
   
   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe**
   ```bash
   stripe login
   ```

3. **Forward webhooks to your local server**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the webhook signing secret** (starts with `whsec_`) to your `.env.local`

Keep this terminal window open while developing!

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Verify Setup

### Test Checklist

1. **Homepage loads** ✓
   - Navigate to http://localhost:3000
   - Should see hero section and featured services

2. **Browse services** ✓
   - Click "Browse" or search
   - Services should load from vendor backend

3. **Service details** ✓
   - Click on any service card
   - Should see full details and images

4. **Booking flow** ✓
   - Click "Book Now"
   - Complete all steps
   - Should redirect to Stripe Checkout

5. **Chatbot** ✓
   - Click the blue chat button (bottom right)
   - Ask: "Find me a villa in Galle"
   - Should get AI response

6. **Test payment** ✓
   - Complete a booking
   - Use test card: `4242 4242 4242 4242`
   - Should see success page

## Common Setup Issues

### Issue: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Failed to fetch services"

**Possible causes:**
- Vendor backend is not running
- Wrong `NEXT_PUBLIC_VENDOR_API_URL`
- CORS issues

**Solution:**
- Verify vendor backend is accessible
- Check the API URL in `.env.local`
- Test the API directly: `curl https://your-vendor-api.com/api/public/services`

### Issue: "Stripe error"

**Solution:**
- Verify Stripe keys are correct
- Make sure you're using TEST keys (start with `pk_test_` and `sk_test_`)
- Check if Stripe CLI is running

### Issue: "OpenAI API error"

**Solution:**
- Verify API key is correct
- Check your OpenAI account has credits
- Ensure you're using GPT-4 or compatible model

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Development Tips

### Hot Reload

Next.js supports hot reloading. Any changes you make will automatically update in the browser.

### TypeScript

The project uses TypeScript for type safety. If you see TypeScript errors:

```bash
# Check for errors
npm run build
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix automatically
npm run lint -- --fix
```

### Adding UI Components

Use Shadcn/ui CLI to add more components:

```bash
npx shadcn@latest add <component-name>

# Examples:
npx shadcn@latest add dropdown-menu
npx shadcn@latest add popover
npx shadcn@latest add tabs
```

## Project Structure

```
islandloaf-stay/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── (pages)/           # Application pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   └── *.tsx             # Custom components
├── lib/                   # Utility functions
│   ├── api.ts            # API client
│   ├── types.ts          # TypeScript types
│   └── *.ts              # Other utilities
├── public/               # Static files
└── .env.local            # Environment variables (local)
```

## Next Steps

After setup is complete:

1. **Explore the codebase**
   - Read through the main components
   - Understand the API integration
   - Check the routing structure

2. **Customize**
   - Update branding/colors
   - Add new features
   - Modify existing pages

3. **Test thoroughly**
   - Test all user flows
   - Try different scenarios
   - Check mobile responsiveness

4. **Deploy**
   - Follow `DEPLOYMENT.md`
   - Deploy to Vercel
   - Configure production settings

## Getting Help

If you're stuck:

1. Check the [README.md](./README.md) for detailed documentation
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
3. Check Next.js docs: https://nextjs.org/docs
4. Check Stripe docs: https://stripe.com/docs
5. Check OpenAI docs: https://platform.openai.com/docs

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Stripe CLI
stripe listen           # Listen for webhooks
stripe trigger payment_intent.succeeded  # Test webhook

# Git
git status              # Check status
git add .               # Stage changes
git commit -m "message" # Commit changes
git push                # Push to remote
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_VENDOR_API_URL` | ✅ Yes | Vendor backend API URL |
| `VENDOR_API_URL` | ✅ Yes | Server-side vendor API URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ Yes | Stripe public key |
| `STRIPE_SECRET_KEY` | ✅ Yes | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | ✅ Yes | Stripe webhook secret |
| `OPENAI_API_KEY` | ✅ Yes | OpenAI API key |
| `NEXT_PUBLIC_URL` | ✅ Yes | App base URL |
| `NEXT_PUBLIC_SUPABASE_URL` | ⚪ Optional | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ⚪ Optional | Supabase anon key |

---

✅ **You're all set!** Start building amazing features! 🚀


