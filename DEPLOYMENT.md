# 🚀 Deployment Guide - IslandLoafStay

Complete guide to deploy the IslandLoafStay customer booking platform to production.

## Prerequisites

Before deploying, ensure you have:

- [x] GitHub account
- [x] Vercel account (free tier is fine)
- [x] Stripe account (with test/live keys)
- [x] OpenAI API key
- [x] Vendor backend deployed and accessible
- [x] All environment variables ready

## Step 1: Prepare for Deployment

### 1.1 Test Locally

```bash
# Build the project
npm run build

# Test production build
npm run start
```

Ensure there are no build errors and everything works correctly.

### 1.2 Update Environment Variables

Create a checklist of all required environment variables:

```bash
# Required for production
NEXT_PUBLIC_VENDOR_API_URL=https://your-vendor-api.com
VENDOR_API_URL=https://your-vendor-api.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Use live keys!
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...  # Will get this later
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_URL=https://your-domain.com

# Optional
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Step 2: Deploy to Vercel

### 2.1 Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial deployment"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/islandloaf-stay.git
git branch -M main
git push -u origin main
```

### 2.2 Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Add Environment Variables:
   - Click **"Environment Variables"**
   - Add all variables from your `.env.local`
   - ⚠️ **IMPORTANT**: Use production/live keys, not test keys!

6. Click **"Deploy"**

### 2.3 Wait for Deployment

Vercel will:
- Install dependencies
- Build your Next.js app
- Deploy to production
- Provide you with a URL (e.g., `islandloaf-stay.vercel.app`)

## Step 3: Setup Custom Domain (Optional)

### 3.1 Add Domain in Vercel

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `islandloafstay.com`)
4. Follow DNS configuration instructions

### 3.2 Update Environment Variables

After domain is configured, update:

```bash
NEXT_PUBLIC_URL=https://islandloafstay.com
```

Redeploy for changes to take effect.

## Step 4: Configure Stripe Webhooks

### 4.1 Create Webhook Endpoint

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **Webhooks**
3. Click **"Add endpoint"**
4. Enter webhook URL:
   ```
   https://your-domain.com/api/webhooks/stripe
   ```
5. Select events to listen to:
   - `checkout.session.completed`
   - `checkout.session.expired`
6. Click **"Add endpoint"**

### 4.2 Get Signing Secret

1. Click on your newly created webhook
2. Reveal the **Signing secret** (starts with `whsec_`)
3. Copy this value

### 4.3 Update Environment Variable

1. Go to Vercel project settings
2. Add/update environment variable:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```
3. Redeploy the app

## Step 5: Test Production Deployment

### 5.1 Test User Flow

1. **Browse Services**
   - Visit homepage
   - Search for services
   - Apply filters
   - View service details

2. **Booking Flow**
   - Start a booking
   - Fill in all steps
   - Complete test payment
   - Verify confirmation page

3. **Chatbot**
   - Open chat widget
   - Ask questions
   - Get service recommendations

4. **Booking Lookup**
   - Go to booking lookup
   - Enter email and reference
   - Verify booking details display

### 5.2 Test Stripe Integration

1. Use Stripe test card numbers:
   - Success: `4242 4242 4242 4242`
   - Declined: `4000 0000 0000 0002`
   - Requires auth: `4000 0025 0000 3155`

2. Verify:
   - Payment processes correctly
   - Webhook receives events
   - Booking status updates
   - Confirmation email sent

### 5.3 Test AI Chatbot

1. Open chat widget
2. Ask: "Find me a villa in Galle under $200"
3. Verify AI responds and shows services
4. Test multiple queries

## Step 6: Monitor & Optimize

### 6.1 Setup Analytics

Add analytics to track:
- Page views
- Conversions
- Bounce rate
- Popular services

Recommended tools:
- Vercel Analytics (built-in)
- Google Analytics
- Mixpanel

### 6.2 Monitor Errors

1. **Vercel Logs**
   - Check function logs in Vercel dashboard
   - Monitor for API errors

2. **Stripe Dashboard**
   - Monitor webhook delivery
   - Check for failed payments

3. **OpenAI Usage**
   - Monitor API usage
   - Check for rate limits

### 6.3 Performance Optimization

Use Vercel's built-in tools:
- **Speed Insights**: Monitor Core Web Vitals
- **Analytics**: Track user behavior
- **Logs**: Debug issues

## Step 7: Going Live

### Pre-Launch Checklist

- [ ] All environment variables set to production
- [ ] Stripe webhooks configured and tested
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Test all user flows
- [ ] AI chatbot working
- [ ] Booking confirmation emails sending
- [ ] Vendor backend connected properly
- [ ] Error monitoring setup
- [ ] Analytics configured

### Launch!

1. Announce the launch
2. Share the URL
3. Monitor initial traffic
4. Be ready to fix issues quickly

## Troubleshooting

### Common Deployment Issues

**Build Fails**
```bash
# Check for TypeScript errors
npm run build

# Fix any errors before deploying
```

**Environment Variables Not Working**
- Ensure variables are added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

**Stripe Webhooks Not Firing**
- Verify webhook URL is correct
- Check webhook signing secret
- Ensure endpoint is publicly accessible
- Check Stripe dashboard for delivery attempts

**API Calls Failing**
- Verify vendor backend is accessible
- Check CORS settings
- Ensure API URLs are correct

**Chatbot Not Responding**
- Verify OpenAI API key is valid
- Check API quota/billing
- Review function logs in Vercel

### Getting Help

If you encounter issues:

1. Check Vercel function logs
2. Check Stripe webhook logs
3. Review vendor backend logs
4. Contact support

## Post-Deployment

### Regular Maintenance

1. **Weekly**
   - Check error logs
   - Monitor performance
   - Review user feedback

2. **Monthly**
   - Update dependencies
   - Review analytics
   - Optimize performance

3. **Quarterly**
   - Security audit
   - Feature updates
   - User experience improvements

### Scaling

As traffic grows:

1. **Vercel**: Automatically scales (upgrade plan if needed)
2. **Database**: Monitor Supabase usage
3. **APIs**: Watch rate limits (Stripe, OpenAI)
4. **CDN**: Images cached automatically

## Environment-Specific Configurations

### Development
```bash
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Staging (Optional)
```bash
NEXT_PUBLIC_URL=https://staging.islandloafstay.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Production
```bash
NEXT_PUBLIC_URL=https://islandloafstay.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

## Support

For deployment support:
- 📧 Email: support@islandloafstay.com
- 📚 Vercel Docs: https://vercel.com/docs
- 💳 Stripe Docs: https://stripe.com/docs
- 🤖 OpenAI Docs: https://platform.openai.com/docs

---

✅ **Your IslandLoafStay platform is now live!** 🎉


