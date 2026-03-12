import type { Metadata } from 'next'
import { Poppins, DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import LeadPopup from '@/components/ui/LeadPopup'
import ChatBot from '@/components/ui/ChatBot'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gemgroupprojects.com'),
  title: {
    default: 'GEM Group Projects | Leading For Secured Life | Premium Plots in Hyderabad',
    template: '%s | GEM Group Projects',
  },
  description:
    'GEM Group Projects — Premium DTCP & RERA approved plotted developments in Hyderabad. Explore Sree Laxmi Balaji Township & Infiniti Counti. Trusted real estate investments along NH-44 & NH-65.',
  keywords: [
    'plots in hyderabad',
    'dtcp approved plots',
    'rera approved plots',
    'shadnagar plots',
    'sadashivpet plots',
    'gem group projects',
    'plotted development hyderabad',
    'nh44 plots',
    'nh65 plots',
    'investment plots hyderabad',
  ],
  authors: [{ name: 'GEM Group Projects' }],
  creator: 'GEM Group Projects',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://gemgroupprojects.com',
    siteName: 'GEM Group Projects',
    title: 'GEM Group Projects | Premium Plots in Hyderabad',
    description:
      'DTCP & RERA approved premium plotted developments along NH-44 & NH-65 corridors in Hyderabad.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GEM Group Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEM Group Projects | Premium Plots in Hyderabad',
    description: 'DTCP & RERA approved premium plotted developments in Hyderabad.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'GEM Group Projects',
              description: 'Premium DTCP & RERA approved plotted developments in Hyderabad',
              url: 'https://gemgroupprojects.com',
              telephone: '+91-9876543210',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '#101, GEM Towers, Jubilee Hills',
                addressLocality: 'Hyderabad',
                addressRegion: 'Telangana',
                postalCode: '500033',
                addressCountry: 'IN',
              },
              areaServed: 'Hyderabad',
              slogan: 'Leading For Secured Life',
            }),
          }}
        />
      </head>
      <body className="font-body bg-white text-dark antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <LeadPopup />
        <ChatBot />
      </body>
    </html>
  )
}
