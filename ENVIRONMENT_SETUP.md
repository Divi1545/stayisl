# Environment Setup Guide for IslandLoafStay

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# ============================================
# VENDOR BACKEND API
# ============================================
NEXT_PUBLIC_VENDOR_API_URL=https://islandloafvendor.repl.co
VENDOR_API_URL=https://islandloafvendor.repl.co

# Enable this to use mock data for development
NEXT_PUBLIC_USE_MOCK_DATA=true

# ============================================
# STRIPE PAYMENT INTEGRATION
# ============================================
# Get your keys from: https://dashboard.stripe.com/test/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# ============================================
# OPENAI API (for AI Chatbot)
# ============================================
# Get your key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-your_openai_api_key_here

# ============================================
# APP CONFIGURATION
# ============================================
NEXT_PUBLIC_URL=http://localhost:3000

# ============================================
# NOTE: NO SUPABASE NEEDED! ✅
# ============================================
# This is a frontend-only app. All data operations
# go through the IslandLoafVendor backend API.
# The vendor backend handles all database operations.
```

## Step-by-Step Setup Instructions

### 1. Install Dependencies

```bash
cd islandloaf-stay
npm install @radix-ui/react-checkbox
npm install
```

### 2. Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Create an account or login
3. Navigate to **Developers > API Keys**
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)
6. Add them to `.env.local`

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or login
3. Navigate to **API Keys**
4. Click **Create new secret key**
5. Copy the key (starts with `sk-proj-`)
6. Add it to `.env.local`

### 4. Setup Stripe Webhook (For Production)

1. Install Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login: `stripe login`
3. Forward webhooks to local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook signing secret (starts with `whsec_`)
5. Add it to `.env.local`

For production deployment:
1. Go to **Stripe Dashboard > Developers > Webhooks**
2. Click **Add endpoint**
3. Set URL to: `https://your-domain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `checkout.session.expired`
5. Copy the signing secret and add to Vercel environment variables

### 5. Using Mock Data (Development Mode)

If the vendor backend API is not available, the app automatically uses mock data. To explicitly enable mock data:

```bash
# In .env.local
NEXT_PUBLIC_USE_MOCK_DATA=true
```

Mock data includes:
- 8 sample services (stays, tours, vehicles, wellness)
- Located in `lib/mock-data.ts`
- Realistic pricing and descriptions

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing Payment Flow

### Test Mode (Using Stripe Test Cards)

Use these test card numbers in Stripe Checkout:

- **Success**: `4242 4242 4242 4242`
- **Requires authentication**: `4000 0025 0000 3155`
- **Declined**: `4000 0000 0000 0002`

Use any future expiry date, any 3-digit CVC, and any postal code.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from `.env.local`
4. Click **Deploy**

### 3. Configure Production Webhook

After deployment:
1. Copy your production URL (e.g., `https://islandloafstay.vercel.app`)
2. Add webhook endpoint in Stripe Dashboard:
   - URL: `https://your-domain/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.expired`
3. Copy the production webhook secret
4. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
5. Redeploy

## Troubleshooting

### Issue: Services not loading
**Solution**: Enable mock data by setting `NEXT_PUBLIC_USE_MOCK_DATA=true` in `.env.local`

### Issue: Chatbot not working
**Solution**: Verify `OPENAI_API_KEY` is set correctly and has credits available

### Issue: Payment not working
**Solution**: 
- Check `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` are correct
- Ensure using test mode keys (start with `pk_test_` and `sk_test_`)

### Issue: Webhook not receiving events
**Solution**:
- For local: Ensure Stripe CLI is running with `stripe listen`
- For production: Verify webhook URL is correct in Stripe Dashboard

## Support

For additional help:
- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Stripe Documentation](https://stripe.com/docs)
- Check [OpenAI API Documentation](https://platform.openai.com/docs)

## Security Notes

⚠️ **Never commit `.env.local` to version control!**

- `.env.local` is already in `.gitignore`
- Use Vercel environment variables for production secrets
- Rotate API keys if accidentally exposed


