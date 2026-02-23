# IslandLoafStay Testing Checklist

## ✅ Pre-Testing Setup

- [x] Development server running (`npm run dev`)
- [x] Mock data enabled and working
- [x] Images loading correctly
- [x] No console errors on initial load

## 🏠 Homepage Testing

### Visual Elements
- [ ] Hero section displays correctly
- [ ] Search bar is visible and styled properly
- [ ] Featured services grid shows 6 services with images
- [ ] Category cards display all 6 categories (Stays, Tours, Vehicles, Wellness, Tickets, Products)
- [ ] "Why Book With Us" section visible
- [ ] Footer displays with all links

### Functionality
- [ ] Click on "Explore Now" button navigates to /search
- [ ] Click on category cards filters by type
- [ ] Featured service cards are clickable and navigate to detail pages
- [ ] All images load without errors

## 🔍 Browse/Search Page Testing

### Page Load
- [ ] Page loads with all services displayed
- [ ] Filter sidebar visible on desktop
- [ ] Sort dropdown functional
- [ ] Mobile filter button visible on small screens

### Filters
- [ ] Service type filter works (Stays, Tours, etc.)
- [ ] Location filter searches correctly
- [ ] Price range filters (min/max) work
- [ ] Clear filters button resets all filters
- [ ] Filter count updates correctly

### Sorting
- [ ] Sort by Featured works
- [ ] Sort by Price (Low to High) works
- [ ] Sort by Price (High to Low) works
- [ ] Sort by Rating works

### Mobile Responsiveness
- [ ] Sheet component opens on mobile
- [ ] Filters work in mobile view
- [ ] Service grid is responsive (1 col mobile, 2 col tablet, 3 col desktop)

## 📄 Service Detail Page Testing

### Page Elements
- [ ] Main image displays correctly
- [ ] Image gallery shows multiple images (if available)
- [ ] Service name, description, location display
- [ ] Pricing information shows correctly
- [ ] Amenities list displays with check icons
- [ ] Rating and review count visible
- [ ] "Book Now" button is prominent
- [ ] Vendor information card shows
- [ ] Availability badge displays correctly

### Functionality
- [ ] Back button navigates to search page
- [ ] Image gallery thumbnails are clickable
- [ ] "Book Now" button navigates to booking page
- [ ] Chat widget button is visible
- [ ] Similar services section (if implemented)

### States
- [ ] Available service shows "Available" badge
- [ ] Unavailable service disables booking button
- [ ] All images lazy load correctly

## 📝 Booking Flow Testing

### Step 1: Dates & Guests
- [ ] Calendar displays correctly
- [ ] Can select start date
- [ ] Can select end date (only after start date)
- [ ] End date must be after start date
- [ ] Guest count input works
- [ ] Max capacity validation works
- [ ] Night count calculates correctly
- [ ] Price updates based on dates
- [ ] "Next" button validates required fields

### Step 2: Customer Details
- [ ] All input fields display
- [ ] Name field is required
- [ ] Email field is required and validates format
- [ ] Phone field is optional
- [ ] Special requests textarea works
- [ ] "Previous" button returns to step 1
- [ ] "Next" button validates email format

### Step 3: Review & Confirm
- [ ] Booking details display correctly
- [ ] Customer information shows
- [ ] Price breakdown is accurate
- [ ] Special requests display (if provided)
- [ ] "Previous" button returns to step 2
- [ ] "Proceed to Payment" button is visible

### Booking Sidebar
- [ ] Service image displays
- [ ] Service name and location show
- [ ] Selected dates display
- [ ] Total price calculates correctly
- [ ] Sidebar is sticky on desktop

## 💳 Payment Testing (Requires Stripe Keys)

### Stripe Checkout
- [ ] Clicking "Proceed to Payment" creates session
- [ ] Redirects to Stripe Checkout page
- [ ] Service name and amount display correctly
- [ ] Test card (4242 4242 4242 4242) processes successfully
- [ ] Cancel button returns to booking page

### Test Cards to Try
- [ ] Success: 4242 4242 4242 4242
- [ ] Authentication required: 4000 0025 0000 3155
- [ ] Declined: 4000 0000 0000 0002

### Post-Payment
- [ ] Successful payment redirects to success page
- [ ] Booking reference displays
- [ ] Confirmation message shows
- [ ] Links to home and booking lookup work

## 🤖 AI Chatbot Testing (Requires OpenAI Key)

### Chat Widget
- [ ] Floating chat button visible in bottom-right
- [ ] Clicking button opens chat window
- [ ] Initial greeting message displays
- [ ] Chat window is properly styled
- [ ] Close button (X) closes chat

### Chatbot Functionality
- [ ] Can type messages in input field
- [ ] Enter key sends message
- [ ] Send button works
- [ ] Loading state shows while waiting
- [ ] AI responses display correctly
- [ ] Service suggestions appear when relevant
- [ ] Clicking suggested service navigates to detail page

### Test Queries
- [ ] "Show me beachfront villas in Galle"
- [ ] "I need a tour under $100"
- [ ] "What wellness services are available?"
- [ ] "Find me accommodation in Ella"
- [ ] "Tell me about Sri Lanka"

## 📦 Package Builder Testing

### Page Load
- [ ] Package builder page loads (/packages/builder)
- [ ] Date pickers display
- [ ] Service list shows with checkboxes
- [ ] Summary sidebar is visible

### Functionality
- [ ] Can select start and end dates
- [ ] Can select multiple services
- [ ] Selected services show in sidebar
- [ ] Total price calculates correctly
- [ ] Discount applies for 3+ services (10%)
- [ ] Discount applies for 4+ services (15%)
- [ ] Can remove services from selection
- [ ] Service type filters work
- [ ] "Book Package" button enables when valid

### Calculations
- [ ] Stays multiply by number of nights
- [ ] Tours/Vehicles/Wellness use base price once
- [ ] Discount percentage is correct
- [ ] Final total is accurate

## 🔎 Booking Lookup Testing

### Lookup Form
- [ ] Email input works
- [ ] Booking reference input works
- [ ] Both fields are required
- [ ] "Find Booking" button triggers search

### Results (With Valid Booking)
- [ ] Booking details display
- [ ] Status badge shows correct color
- [ ] Dates display correctly
- [ ] Guest information shows
- [ ] Payment details visible
- [ ] Total amount displays

### Error States
- [ ] Invalid email/reference shows error message
- [ ] No results shows appropriate message
- [ ] API errors are handled gracefully

## 📱 Mobile Responsiveness Testing

### Test on Multiple Breakpoints
- [ ] Mobile (375px): All elements stack vertically
- [ ] Tablet (768px): 2-column grids where appropriate
- [ ] Desktop (1024px+): Full 3-column layouts

### Navigation
- [ ] Mobile menu button works
- [ ] Mobile menu slides out correctly
- [ ] All nav links work on mobile
- [ ] Logo is always visible

### Touch Targets
- [ ] All buttons are large enough (44x44px minimum)
- [ ] Cards are tappable
- [ ] Form inputs work with mobile keyboards
- [ ] Dropdowns work on touch devices

### Chat Widget on Mobile
- [ ] Chat button is accessible
- [ ] Chat window fits mobile screen
- [ ] Keyboard doesn't cover input
- [ ] Can scroll messages

## 🎨 Browser Compatibility Testing

### Test Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Checks for Each Browser
- [ ] Layout renders correctly
- [ ] Images load
- [ ] Forms work
- [ ] Payment flow completes
- [ ] No console errors

## ⚡ Performance Testing

### Lighthouse Scores (Target > 90)
- [ ] Performance: ___ / 100
- [ ] Accessibility: ___ / 100
- [ ] Best Practices: ___ / 100
- [ ] SEO: ___ / 100

### Load Times
- [ ] Homepage loads in < 3 seconds
- [ ] Service detail page loads in < 2 seconds
- [ ] Search/filter is responsive (< 500ms)
- [ ] Images lazy load properly

### Optimizations
- [ ] Next/Image optimization working
- [ ] Fonts loading correctly
- [ ] No layout shift on load
- [ ] Smooth scrolling

## 🔒 Security Testing

### Environment Variables
- [ ] .env.local is gitignored
- [ ] API keys not exposed in client code
- [ ] Webhook signature verified

### Input Validation
- [ ] Email validation works
- [ ] Price calculations are server-side
- [ ] SQL injection not possible
- [ ] XSS attacks prevented

## 🐛 Error Handling Testing

### Network Errors
- [ ] API fails gracefully, uses mock data
- [ ] Image load failures show placeholder
- [ ] Timeout errors are handled
- [ ] User sees friendly error messages

### Invalid States
- [ ] Invalid service ID shows 404 page
- [ ] Invalid booking reference handled
- [ ] Payment failures show error
- [ ] Form validation prevents submission

## ✨ Final Checks

### Overall User Experience
- [ ] Navigation is intuitive
- [ ] Loading states are clear
- [ ] Success messages are encouraging
- [ ] Error messages are helpful
- [ ] Design is consistent throughout
- [ ] Colors and fonts match brand
- [ ] Icons are meaningful
- [ ] Spacing is consistent

### Content
- [ ] All text is readable
- [ ] No typos or grammatical errors
- [ ] Pricing is clear
- [ ] Terms and conditions linked
- [ ] Contact information available

### Before Going Live
- [ ] Environment variables set
- [ ] Mock data disabled (USE_MOCK_DATA=false)
- [ ] Stripe in live mode (pk_live_ keys)
- [ ] OpenAI API has credits
- [ ] Domain name configured
- [ ] SSL certificate active
- [ ] Analytics installed (optional)
- [ ] Error tracking setup (optional)

---

## 📊 Test Results Summary

**Date Tested:** _________________

**Tested By:** _________________

**Pass Rate:** _____ / _____ tests passed

**Critical Issues:** _________________

**Notes:** _________________

---

## 🎉 Sign-Off

- [ ] All critical tests passed
- [ ] All blockers resolved
- [ ] Ready for deployment

**Approved By:** _________________

**Date:** _________________


