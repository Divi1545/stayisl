# 🚀 IslandLoafStay Deployment Guide

Complete guide to deploy IslandLoafStay.com to Vercel and configure production environment.

---

## Prerequisites

- [x] Code is working locally
- [ ] All tests passed (see TESTING_CHECKLIST.md)
- [ ] GitHub account
- [ ] Vercel account
- [ ] Stripe account (live mode keys)
- [ ] OpenAI API key with credits
- [ ] Domain name (optional)

---

## Step 1: Prepare for Deployment

### 1.1 Verify .gitignore

Ensure sensitive files are not committed:

```bash
# Check .gitignore includes:
.env.local
.env*.local
.vercel
node_modules/
```

### 1.2 Remove Mock Data Flag

Update any environment files to use real API:

```bash
# Remove or set to false
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### 1.3 Build Test

Test production build locally:

```bash
npm run build
npm run start
```

Visit `http://localhost:3000` and verify everything works.

### 1.4 Check for Errors

```bash
npm run lint
```

Fix any linting errors before deployment.

---

## Step 2: Push to GitHub

### 2.1 Initialize Git (if not already)

```bash
cd islandloaf-stay
git init
```

### 2.2 Create Repository on GitHub

1. Go to [GitHub](https://github.com/new)
2. Create new repository: `islandloaf-stay`
3. **Do NOT** initialize with README (we already have one)
4. Copy the repository URL

### 2.3 Commit and Push

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: IslandLoafStay platform complete"

# Add remote
git remote add origin https://github.com/your-username/islandloaf-stay.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### 3.1 Sign Up / Login to Vercel

1. Go to [Vercel](https://vercel.com/signup)
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your repositories

### 3.2 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **"Add New..." > "Project"**
3. Import your `islandloaf-stay` repository
4. Select the repository from the list

### 3.3 Configure Project

**Framework Preset:** Next.js (auto-detected)

**Build & Output Settings:**
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

**Root Directory:** `./` (default)

Click **"Deploy"** - but wait, we need to add environment variables first!

### 3.4 Add Environment Variables

Before deployment, click **"Environment Variables"** and add these:

#### Required Variables

```bash
# Vendor API
NEXT_PUBLIC_VENDOR_API_URL=https://islandloafvendor.repl.co
VENDOR_API_URL=https://islandloafvendor.repl.co

# Stripe (LIVE MODE)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret

# OpenAI
OPENAI_API_KEY=sk-proj-your_openai_key

# App URL (update after deployment)
NEXT_PUBLIC_URL=https://islandloafstay.vercel.app
```

#### Optional Variables

```bash
# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Mock Data (disable in production)
NEXT_PUBLIC_USE_MOCK_DATA=false
```

**Important:** Set all variables to **"Production"** environment!

### 3.5 Deploy!

Click **"Deploy"** and wait for the build to complete (usually 2-3 minutes).

---

## Step 4: Configure Stripe Webhook (Production)

### 4.1 Get Your Vercel URL

After deployment, your app will be at:
```
https://islandloaf-stay.vercel.app
```
or
```
https://your-project-name.vercel.app
```

### 4.2 Create Webhook Endpoint in Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter URL: `https://your-vercel-url.vercel.app/api/webhooks/stripe`
4. Select events to listen to:
   - ✅ `checkout.session.completed`
   - ✅ `checkout.session.expired`
5. Click **"Add endpoint"**

### 4.3 Get Webhook Signing Secret

1. Click on your newly created webhook
2. Click **"Reveal" signing secret**
3. Copy the secret (starts with `whsec_`)
4. Go back to Vercel
5. Update `STRIPE_WEBHOOK_SECRET` environment variable
6. Redeploy: **Settings > Environment Variables > Redeploy**

---

## Step 5: Custom Domain (Optional)

### 5.1 Add Domain to Vercel

1. Go to your project in Vercel
2. Click **"Settings" > "Domains"**
3. Click **"Add"**
4. Enter: `islandloafstay.com`
5. Click **"Add"**

### 5.2 Configure DNS

Vercel will show you DNS records to add. Add these to your domain registrar:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 5.3 Wait for DNS Propagation

DNS changes can take 24-48 hours. Vercel will automatically issue SSL certificate when DNS is ready.

### 5.4 Update Environment Variables

Once domain is active, update:

```bash
NEXT_PUBLIC_URL=https://islandloafstay.com
```

Then redeploy.

---

## Step 6: Verify Deployment

### 6.1 Test Live Site

Visit your production URL and test:

- [ ] Homepage loads
- [ ] Services display correctly
- [ ] Search and filters work
- [ ] Service detail pages load
- [ ] Booking flow works
- [ ] Payment redirects to Stripe
- [ ] Complete a test payment
- [ ] Verify booking confirmation
- [ ] Test chatbot (if OpenAI key added)
- [ ] Check booking lookup

### 6.2 Monitor Logs

In Vercel Dashboard:
1. Go to your project
2. Click **"Deployments"**
3. Click on latest deployment
4. Check **"Function Logs"** for errors

### 6.3 Test Webhook

1. Make a test booking
2. Complete payment with test card: `4242 4242 4242 4242`
3. Check Stripe Dashboard > Events
4. Verify webhook was triggered successfully
5. Check Vercel logs for webhook processing

---

## Step 7: Production Checklist

### Security

- [ ] All API keys are in Vercel environment variables
- [ ] `.env.local` is not committed to Git
- [ ] Stripe is in live mode (not test mode)
- [ ] HTTPS/SSL is active
- [ ] Webhook signature verification working

### Functionality

- [ ] All pages load without errors
- [ ] Images load correctly
- [ ] Forms submit successfully
- [ ] Payments process correctly
- [ ] Webhooks trigger properly
- [ ] Emails send (if implemented)
- [ ] Chatbot responds (if API key added)

### Performance

- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] No console errors

### SEO

- [ ] Meta tags set correctly
- [ ] sitemap.xml generated
- [ ] robots.txt configured
- [ ] Open Graph images set

### Monitoring

- [ ] Vercel Analytics enabled
- [ ] Error tracking setup (optional)
- [ ] Uptime monitoring (optional)

---

## Step 8: Post-Deployment

### 8.1 Enable Analytics (Optional)

Vercel provides free analytics:

1. Go to project settings
2. Click **"Analytics"**
3. Enable analytics
4. Monitor traffic and performance

### 8.2 Setup Error Tracking (Optional)

Integrate with Sentry or similar:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 8.3 Configure Monitoring

Use services like:
- **UptimeRobot** - Free uptime monitoring
- **Google Search Console** - SEO monitoring
- **Google Analytics** - User analytics

### 8.4 Create Backup

Keep a backup of your code and environment variables in a secure location.

---

## Troubleshooting

### Build Fails on Vercel

**Check:**
1. Build works locally (`npm run build`)
2. All dependencies in `package.json`
3. No TypeScript errors
4. Node version compatibility

**Solution:**
```bash
# In Vercel settings, set Node version
# Settings > General > Node.js Version: 18.x or 20.x
```

### Environment Variables Not Working

**Check:**
1. Variables are set for "Production" environment
2. Variable names match exactly (case-sensitive)
3. No extra spaces in values
4. Redeployed after adding variables

**Solution:** Redeploy after any environment variable changes.

### Stripe Webhook Not Triggering

**Check:**
1. Webhook URL is correct (https://)
2. Webhook secret is correct
3. Events are selected (checkout.session.completed)
4. Webhook is not in test mode if using live keys

**Solution:**
- Check Stripe Dashboard > Webhooks > Events log
- Check Vercel Function Logs for webhook errors

### Images Not Loading

**Check:**
1. `next.config.ts` has `remotePatterns` configured
2. Image URLs are valid and accessible
3. Image domains are whitelisted

**Solution:**
```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: '**.supabase.co' },
  ],
}
```

### Chatbot Not Working

**Check:**
1. `OPENAI_API_KEY` is set correctly
2. OpenAI account has credits
3. API key has correct permissions

**Solution:** Verify key in OpenAI dashboard, check usage limits.

### API Fails in Production

**Check:**
1. Backend API is accessible from Vercel servers
2. CORS is configured on backend
3. API endpoints return correct data format

**Solution:** Enable mock data temporarily while fixing backend.

---

## Rollback Deployment

If something goes wrong:

1. Go to Vercel Dashboard
2. Click **"Deployments"**
3. Find previous working deployment
4. Click **"⋯" > "Promote to Production"**

---

## Continuous Deployment

Vercel automatically deploys on every push to main branch.

**To disable:**
1. Settings > Git
2. Uncheck "Production Branch"

**To deploy from different branch:**
1. Settings > Git
2. Change "Production Branch" to your branch name

---

## Cost Estimate

### Vercel
- **Hobby (Free):** Unlimited deployments, 100GB bandwidth
- **Pro ($20/month):** More bandwidth, team features
- **Enterprise:** Custom pricing

### Stripe
- **Free:** Payment processing fees only (2.9% + $0.30 per transaction)

### OpenAI
- **GPT-4:** ~$0.03 per 1K tokens
- Estimate: ~$20-50/month for moderate chatbot usage

### Supabase
- **Free tier:** 500MB database, 2GB bandwidth
- **Pro ($25/month):** 8GB database, 100GB bandwidth

**Total Minimum:** $0/month (using free tiers) + transaction fees
**Recommended:** ~$50-75/month for production features

---

## Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **OpenAI Docs:** https://platform.openai.com/docs
- **Supabase Docs:** https://supabase.com/docs

---

## 🎉 Congratulations!

Your IslandLoafStay platform is now live and accepting bookings!

**Next Steps:**
1. Test thoroughly with real bookings
2. Monitor error logs and user feedback
3. Iterate and improve based on usage
4. Market your platform to vendors and customers

**Good luck! 🏝️**


