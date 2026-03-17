# GEM Group Projects — Premium Real Estate Website

> **Leading For Secured Life**

A high-end luxury real estate developer website for GEM Group Projects, Hyderabad.  
Built with **Next.js 14**, **TypeScript**, **TailwindCSS**, **Framer Motion**, and **Three.js**.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Animations | Framer Motion |
| 3D Graphics | Three.js + React Three Fiber |
| UI Components | Radix UI / shadcn-style |
| Image Opt | Next/Image + Sharp |
| Icons | Lucide React |
| State | Zustand |

---

## 📁 Project Structure

```
gem-group/
├── public/
│   ├── GEM.png                    # Company logo
│   ├── favicon.ico
│   └── brochures/                 # PDF brochures
│
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout + fonts
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css            # Global styles
│   │   ├── sitemap.ts             # SEO sitemap
│   │   ├── robots.ts              # SEO robots
│   │   ├── not-found.tsx          # 404 page
│   │   ├── about/page.tsx         # About page
│   │   ├── blog/
│   │   │   ├── page.tsx           # Blog listing
│   │   │   └── [slug]/page.tsx    # Blog post
│   │   ├── contact/page.tsx       # Contact page
│   │   ├── projects/
│   │   │   ├── page.tsx           # Projects listing
│   │   │   └── [slug]/page.tsx    # Project detail
│   │   └── api/
│   │       ├── leads/route.ts     # Lead capture API
│   │       └── upload/route.ts    # Image upload + WebP conversion
│   │
│   ├── components/
│   │   ├── 3d/
│   │   │   └── HeroScene.tsx      # Three.js 3D hero scene
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Sticky navbar with dropdown
│   │   │   └── Footer.tsx         # Full footer
│   │   ├── sections/              # Home page sections
│   │   │   ├── HeroSection.tsx    # 3D hero with CTA
│   │   │   ├── AboutSection.tsx   # About GEM
│   │   │   ├── ProjectsSection.tsx # Featured projects
│   │   │   ├── WhyInvestSection.tsx # Why invest cards
│   │   │   ├── AmenitiesSection.tsx # Amenities display
│   │   │   ├── InvestmentGrowthSection.tsx # Growth chart
│   │   │   ├── GallerySection.tsx # Masonry gallery + lightbox
│   │   │   ├── BlogSection.tsx    # Blog preview
│   │   │   └── CTASection.tsx     # Final call to action
│   │   └── ui/
│   │       ├── WhatsAppButton.tsx  # Floating WhatsApp
│   │       ├── LeadPopup.tsx       # Timed lead popup
│   │       ├── ChatBot.tsx         # AI chatbot widget
│   │       ├── EnquiryForm.tsx     # Reusable enquiry form
│   │       ├── PlotMap.tsx         # Interactive plot map SVG
│   │       └── ProjectGallery.tsx  # Project gallery + lightbox
│   │
│   ├── data/
│   │   ├── projects.ts            # All project data
│   │   └── blog.ts                # Blog post data
│   │
│   ├── lib/
│   │   └── utils.ts               # Utilities + WhatsApp helpers
│   │
│   └── types/
│       └── index.ts               # TypeScript interfaces
│
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── postcss.config.js
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Add your logo

Place your `GEM.png` logo file in the `/public/` directory.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🎨 Color System

```css
Primary Blue:   #1F6FB2
Deep Blue:      #144A7A
Luxury Gold:    #C9A227
Dark Gray:      #1E1E1E
Light Gray:     #F6F7F9
White:          #FFFFFF
```

---

## 📦 Key Features

### 🏠 Home Page (10 Sections)
1. **3D Hero** — Three.js animated land landscape with floating plot markers
2. **About GEM** — Premium brand introduction with animated counters
3. **Featured Projects** — Hover-animated project cards with full details
4. **Why Invest** — 6 animated reason cards with icons
5. **Amenities** — Luxury amenity showcase with image collage
6. **Investment Growth** — Animated bar chart showing appreciation
7. **Gallery** — Masonry grid with category filters + lightbox
8. **Blog** — Latest 3 articles preview
9. **CTA Section** — Conversion-focused with contact strip
10. **Footer** — Full company info, socials, RERA numbers

### 🏗️ Project System
- Dynamic project pages via `/projects/[slug]`
- Interactive SVG plot map with zoom, click, availability
- Plot popup with size, facing, price, availability
- Gallery with lightbox viewer
- Location map embed
- Sticky enquiry sidebar
- RERA & DTCP badge display

### 🤖 Lead Generation
- **Timed popup** (8 seconds) with project selector
- **AI Chatbot** with conversation flow: Name → Project → Phone
- **Floating WhatsApp** with quick message menu
- **Enquiry forms** on every project page
- **API endpoint** to store leads in JSON

### 📸 Image System
- All images converted to WebP via Sharp API
- Responsive sizes: 400px, 800px, 1200px, 1920px
- Lazy loading on all gallery images
- Masonry grid with virtualised rendering

### 🔍 SEO
- Meta tags on every page
- OpenGraph tags for social sharing
- Structured data (RealEstateAgent schema)
- Dynamic sitemap.xml
- robots.txt
- RERA number disclosure in footer

---

## ➕ Adding New Projects

Edit `/src/data/projects.ts` and add a new project object:

```typescript
{
  id: 3,
  slug: 'new-project-slug',
  name: 'New Project Name',
  location: 'Location, Hyderabad',
  highway: 'NH-XX Highway',
  price: '₹XX,XXX/sq yd',
  acres: '50 Acres',
  totalPlots: 400,
  plotSizes: '200–500 Sq Yards',
  status: 'available',
  badges: ['DTCP Approved', 'RERA Approved'],
  description: 'Short description...',
  longDescription: 'Full detailed description...',
  highlights: ['Highlight 1', 'Highlight 2'],
  amenities: [{ icon: '🏛️', name: 'Clubhouse', description: '...' }],
  gallery: [{ src: '/images/project.webp', alt: 'Description' }],
  videos: [],
  coordinates: { lat: 17.xx, lng: 78.xx },
  nearbyPlaces: [{ name: 'NH-XX', distance: '0.5 km', category: 'highway' }],
}
```

The new project automatically appears on:
- Home page featured projects
- Projects listing page
- Navigation dropdown
- Chatbot project options
- Lead popup project selector

---

## 📱 WhatsApp Integration

Update your WhatsApp number in `/src/lib/utils.ts`:

```typescript
export const whatsappNumber = '919876543210' // Replace with your number
```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel
```

### Self-hosted
```bash
npm run build
npm start
```

### Environment Variables (create `.env.local`)
```env
NEXT_PUBLIC_SITE_URL=https://gemgroupprojects.com
NEXT_PUBLIC_WHATSAPP=919876543210
NEXT_PUBLIC_PHONE=+919876543210
NEXT_PUBLIC_EMAIL=info@gemgroupprojects.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here
```

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 95+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |

---

## 🛠️ Customization

### Change Fonts
Edit `/src/app/layout.tsx` — import different Google Fonts.

### Change Colors
Edit `/tailwind.config.js` under `theme.extend.colors`.

### Add Blog Posts
Edit `/src/data/blog.ts` — add new post objects.

### Update Contact Info
Edit `/src/components/layout/Footer.tsx` and `/src/app/contact/page.tsx`.

---

## 📞 Support

**GEM Group Projects**  
📍 #101, GEM Towers, Jubilee Hills, Hyderabad  
📞 +91 98855 24320  
📧 info@gemgroupprojects.com  

RERA Reg: P02400007485 | P03200003217  
DTCP Approval: 46/2022

---

*© 2024 GEM Group Projects. All rights reserved.*
