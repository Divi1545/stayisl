# 🏗️ IslandLoafStay Architecture

## ✅ **Frontend-Only Application**

IslandLoafStay is a **pure frontend application** built with Next.js. It does NOT connect to any database directly. All data operations are handled through the IslandLoafVendor backend API.

---

## 📊 **Data Flow Architecture**

```
┌─────────────────────────────────────────────────────┐
│  🌐 IslandLoafStay.com (Customer Site)              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Framework: Next.js 14 (App Router)                 │
│  Language: TypeScript                               │
│  Styling: Tailwind CSS + Shadcn/ui                  │
│                                                      │
│  Features:                                           │
│  • 🏠 Browse services (stays, tours, vehicles, etc) │
│  • 🔍 Advanced search & filters                     │
│  • 🤖 AI travel assistant chatbot                   │
│  • 📅 Date picker & availability checker            │
│  • 📝 Booking form (guest checkout)                 │
│  • 💳 Stripe payment integration                    │
│  • 📱 PWA support (installable on mobile)           │
│  • 🎨 Pink/coral gradient theme                     │
│                                                      │
│  ❌ NO DATABASE CONNECTION                          │
│  ❌ NO BUSINESS LOGIC                               │
│  ❌ NO COMMISSION CALCULATIONS                      │
└─────────────┬───────────────────────────────────────┘
              │
              │ 📡 REST API Calls (HTTPS)
              │
              ▼
┌─────────────────────────────────────────────────────┐
│  🏢 IslandLoafVendor.com (Backend API)              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Framework: Express.js                              │
│  Language: TypeScript/JavaScript                    │
│                                                      │
│  Responsibilities:                                   │
│  • 💾 All database operations                       │
│  • 💼 Business logic                                │
│  • 💰 Commission calculations (12.5%)              │
│  • 💳 Stripe Connect payouts                        │
│  • 📊 Vendor dashboards                             │
│  • 👨‍💼 Admin dashboards                             │
│  • 🔒 Authentication & authorization                │
│  • 📧 Email notifications                           │
│  • 🤖 AI agent coordination                         │
└─────────────┬───────────────────────────────────────┘
              │
              │ 🔌 Direct Database Connection
              │
              ▼
┌─────────────────────────────────────────────────────┐
│  🗄️ Supabase PostgreSQL Database                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  • Single source of truth                           │
│  • All tables (services, bookings, vendors, etc)    │
│  • Only accessed by IslandLoafVendor backend        │
└─────────────────────────────────────────────────────┘
```

---

## 🔌 **API Endpoints Used by Customer Site**

### **1. Browse Services**
```http
GET https://islandloafvendor.repl.co/api/public/services
```
Returns all available services with images, pricing, locations.

### **2. Service Details**
```http
GET https://islandloafvendor.repl.co/api/public/services/:id
```
Returns detailed information about a specific service.

### **3. Search Services**
```http
GET https://islandloafvendor.repl.co/api/public/search?type=stays&location=Galle&minPrice=50&maxPrice=200
```
Search with filters (type, location, price range, dates, guests).

### **4. Check Availability**
```http
GET https://islandloafvendor.repl.co/api/public/availability?serviceId=1&startDate=2026-02-01&endDate=2026-02-05
```
Returns availability status and calculated price.

### **5. Create Booking**
```http
POST https://islandloafvendor.repl.co/api/public/bookings
Body: {
  serviceId: 1,
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "+94771234567",
  startDate: "2026-02-01",
  endDate: "2026-02-05",
  guestsCount: 2,
  totalPrice: 600,
  specialRequests: "Early check-in"
}
```
Creates a pending booking and returns booking reference.

### **6. Confirm Booking (After Payment)**
```http
POST https://islandloafvendor.repl.co/api/public/bookings/confirm
Body: {
  stripeSessionId: "cs_test_...",
  status: "confirmed",
  paymentStatus: "paid"
}
```
Updates booking status after successful Stripe payment.

### **7. Lookup Booking**
```http
GET https://islandloafvendor.repl.co/api/public/bookings/lookup?email=john@example.com&reference=BK20260201000789
```
Customer can lookup their booking using email + reference.

### **8. AI Chatbot**
```http
POST https://islandloafvendor.repl.co/api/public/chat
Body: {
  messages: [
    { role: "user", content: "Find me a beachfront villa in Galle" }
  ]
}
```
Returns AI response and recommended services.

---

## 🔐 **Security Benefits**

### **Why This Architecture is Better:**

1. **🛡️ Database Security**
   - Customer site cannot access database directly
   - No database credentials exposed to frontend
   - All queries validated by backend
   - Protection against SQL injection

2. **💼 Business Logic Protection**
   - Commission rates hidden from customers
   - Vendor profit calculations server-side
   - Pricing rules can't be manipulated
   - Availability logic centralized

3. **🔒 Data Privacy**
   - Vendor information protected
   - Customer can only see public data
   - Payment processing secured
   - Sensitive data never exposed to frontend

4. **⚡ Performance**
   - Backend can implement caching
   - Database queries optimized
   - Can add CDN for static assets
   - Reduced frontend bundle size

---

## 📦 **Required Environment Variables**

### **IslandLoafStay (Customer Site)**
```bash
# Only 3 things needed! ✅
NEXT_PUBLIC_VENDOR_API_URL=https://islandloafvendor.repl.co
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
OPENAI_API_KEY=sk-proj-...

# Optional for development
NEXT_PUBLIC_USE_MOCK_DATA=true  # Uses local mock data
NEXT_PUBLIC_URL=http://localhost:3000
```

### **IslandLoafVendor (Backend)**
```bash
# This is where all the heavy config lives!
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
OPENAI_API_KEY=sk-proj-...
JWT_SECRET=...
# ... and more
```

---

## 🎯 **Development Workflow**

### **Step 1: Start Vendor Backend**
```bash
cd islandloaf-vendor
npm run dev  # Runs on port 3001
```

### **Step 2: Start Customer Site**
```bash
cd islandloaf-stay
npm run dev  # Runs on port 3000
```

### **Step 3: Test Features**
1. Browse services at http://localhost:3000
2. Try AI chatbot
3. Create a test booking
4. Use Stripe test card: 4242 4242 4242 4242

---

## 🚀 **Deployment Strategy**

### **Customer Site (Vercel)**
```
1. Push to GitHub
2. Import to Vercel
3. Add 3 environment variables
4. Deploy!
5. Done! ✅
```

### **Vendor Backend (Replit/Railway/Render)**
```
1. Deploy backend with all database configs
2. Set up Stripe webhooks
3. Configure domain
4. Point customer site to backend URL
```

---

## 📊 **Example Data Flow: Customer Books a Service**

```
1. Customer visits IslandLoafStay.com
   → Sees list of services from vendor API

2. Customer clicks "Beach Villa in Galle"
   → GET /api/public/services/123
   → Shows villa details, images, pricing

3. Customer selects dates (Feb 1-5, 2026)
   → GET /api/public/availability?serviceId=123&startDate=2026-02-01&endDate=2026-02-05
   → Vendor backend checks database
   → Returns: available=true, price=600

4. Customer fills booking form
   Name: John Doe
   Email: john@example.com
   Phone: +94771234567
   Guests: 2

5. Customer clicks "Book Now"
   → POST /api/public/bookings
   → Vendor backend:
     ✓ Validates data
     ✓ Checks availability again
     ✓ Calculates commission (600 * 0.125 = 75)
     ✓ Creates booking in database (status: pending)
     ✓ Returns booking reference: BK20260201000123

6. Customer redirected to Stripe Checkout
   → Stripe hosted payment page
   → Customer enters card: 4242 4242 4242 4242
   → Payment processed

7. Stripe webhook fires
   → POST https://islandloafvendor.repl.co/api/webhooks/stripe
   → Vendor backend:
     ✓ Verifies webhook signature
     ✓ Updates booking status to "confirmed"
     ✓ Updates payment status to "paid"
     ✓ Calculates vendor payout (600 - 75 = 525)
     ✓ Sends confirmation email
     ✓ Notifies vendor

8. Customer redirected to success page
   → Shows booking reference
   → Shows confirmation details
   → Option to download receipt
```

---

## ✅ **Verification Checklist**

- [x] ✅ No `@supabase/supabase-js` dependency
- [x] ✅ No database connection code
- [x] ✅ All data fetching via vendor API
- [x] ✅ Mock data fallback for development
- [x] ✅ Environment variables documented
- [x] ✅ Architecture clearly explained
- [x] ✅ API endpoints documented
- [x] ✅ Security benefits outlined

---

## 🎨 **Theme**

The site uses a beautiful **pink/coral gradient theme** matching the GoodBarber mobile app design:

- Primary: Pink-Rose gradient (`from-pink-400 to-rose-400`)
- Accent: Purple tones
- Buttons: Rounded-full (pill-shaped)
- Hero: Pink-Rose-Purple gradient background
- Chat: Pink theme with rounded bubbles

---

## 📚 **Key Files**

| File | Purpose |
|------|---------|
| `lib/api.ts` | ✅ All API calls to vendor backend |
| `lib/mock-data.ts` | 🧪 Mock data for development |
| `lib/types.ts` | 📝 TypeScript interfaces |
| `lib/stripe.ts` | 💳 Stripe client setup |
| `app/api/checkout/route.ts` | 💳 Create Stripe session |
| `app/api/webhooks/stripe/route.ts` | 🎣 Handle Stripe webhooks |
| `app/api/chat/route.ts` | 🤖 AI chatbot endpoint |

---

## 🎯 **Summary**

**IslandLoafStay = Pure Frontend ✅**

- No database connection
- No business logic
- No commission calculations
- Just beautiful UI + API calls
- Perfect separation of concerns!

**IslandLoafVendor = All the Heavy Lifting 💪**

- Database operations
- Business logic
- Commission management
- Vendor dashboards
- Admin controls

**Result: Simple, Secure, Maintainable! 🚀**

---

Built with ❤️ for Sri Lankan Tourism 🏝️

