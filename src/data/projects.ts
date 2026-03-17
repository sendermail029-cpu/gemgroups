import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 1,
    slug: 'sree-laxmi-balaji-township',
    name: 'Sree Laxmi Balaji Township',
    tagline: 'DTCP & RERA Approved Premium Plotted Community',
    location: 'Shadnagar, Ranga Reddy District',
    city: 'Hyderabad',
    highway: 'NH-44 Bangalore Highway',
    price: '₹18,500/sq yd onwards',
    pricePerSqYd: 25000,
    acres: '46 Acres',
    totalPlots: 578,
    plotSizes: '165–440 Sq Yards',
    status: 'available',
    badges: ['DTCP Approved', 'RERA Approved', 'Bank Loan Available'],
    description:
      'A premium DTCP & RERA approved plotted community spread across 46 acres at Shadnagar offering 578 plots ranging from 165 to 440 sq yards — just minutes from the Bangalore Highway.',
    longDescription: `Sree Laxmi Balaji Township is a landmark plotted development that redefines premium living in the rapidly developing Shadnagar corridor. Spread across 46 lush acres, this DTCP and RERA-approved community offers 578 meticulously planned plots that harmonize modern infrastructure with serene greenery.

Strategically located along the prestigious NH-44 Bangalore Highway, residents enjoy seamless connectivity to Hyderabad's commercial hubs while being enveloped in the tranquility of well-planned surroundings.

With plot sizes ranging from 165 to 440 sq yards, Sree Laxmi Balaji Township caters to diverse investment needs — from first-time buyers seeking an accessible entry point to seasoned investors looking for premium land parcels.`,
    highlights: [
      '46 Acres Master-Planned Community',
      '578 Carefully Demarcated Plots',
      'Plot Sizes: 165–440 Sq Yards',
      'RERA Registration No. P02400007485',
      'DTCP Approval No. 46/2022',
      'Bank Loans from Leading Banks',
      'Minutes from NH-44 Bangalore Highway',
      'Clear Title & Legal Documentation',
    ],
    heroImage: '/images/gal.webp',
    amenities: [
      { icon: '🏛️', name: 'Grand Clubhouse', description: 'Premium recreation & community hall' },
      { icon: '🏊', name: 'Swimming Pool', description: 'Olympic-size heated swimming pool' },
      { icon: '🧒', name: 'Children Play Area', description: 'Safe & modern play equipment' },
      { icon: '🌳', name: 'Landscaped Parks', description: 'Lush green spaces & walking trails' },
      { icon: '🛡️', name: '24/7 Security', description: 'CCTV, boom barriers & security personnel' },
      { icon: '🛣️', name: '30ft Wide Roads', description: 'Asphalted internal roads throughout' },
      { icon: '⚡', name: 'Underground Utilities', description: 'Underground electricity & drainage' },
      { icon: '💧', name: 'Overhead Water Tank', description: 'Continuous water supply system' },
    ],
    gallery: [
      { src: '/images/gal1.webp', alt: 'Aerial view of township', category: 'aerial' },
      { src: '/images/a (1).jpeg', alt: 'Clubhouse', category: 'amenities' },
  { src:'/images/a (2).jpeg', alt: 'Swimming pool', category: 'amenities' },
  { src: '/images/a (3).webp', alt: 'Wide roads', category: 'infrastructure' },
  { src: '/images/a.png', alt: 'Premium plots', category: 'plots' },
  { src: '/images/a (4).jpeg', alt: 'Green landscaping', category: 'landscape' },
  { src: '/images/a (4).webp', alt: 'Entrance', category: 'infrastructure' },
  { src: '/images/contact.webp', alt: 'Parks', category: 'landscape' },
  { src: '/images/gal4.jpg', alt: 'Investment land', category: 'plots' },
    ],
    videos: [
      {
        id: 'v1',
        title: 'Sree Laxmi Balaji Township - Project Overview',
        thumbnail: '/images/gal.png',
        url: 'https://www.youtube.com/embed/1U_V_Iv4iho',
        duration: '3:45',
      },
    ],
    brochureUrl: '/brochures/sree-laxmi-balaji.pdf',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60893.847!2d78.0!3d17.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf0!2sShadnagar!5e0!3m2!1sen!2sin!4v1',
    coordinates: { lat: 17.03, lng: 78.0 },
    reraNumber: 'P02400007485',
    dtcpNumber: '46/2022',
    completionDate: 'December 2025',
    totalArea: '46 Acres',
    nearbyPlaces: [
      { name: 'NH-44 Bangalore Highway', distance: '0.5 km', category: 'highway' },
      { name: 'Shadnagar Town', distance: '2 km', category: 'other' },
      { name: 'Hyderabad International Airport', distance: '45 km', category: 'airport' },
      { name: 'Outer Ring Road', distance: '15 km', category: 'highway' },
      { name: 'Rajiv Gandhi International School', distance: '3 km', category: 'school' },
      { name: 'KIMS Hospital', distance: '8 km', category: 'hospital' },
    ],
    plots: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      plotNumber: `${100 + i}`,
      size: [165, 200, 240, 300, 360, 440][i % 6],
      unit: 'Sq Yds',
      status: i % 7 === 0 ? 'booked' : i % 11 === 0 ? 'sold' : 'available',
      price: 25000 * [165, 200, 240, 300, 360, 440][i % 6],
      facing: ['East', 'West', 'North', 'South'][i % 4],
      x: (i % 6) * 80 + 20,
      y: Math.floor(i / 6) * 60 + 20,
      width: 70,
      height: 50,
    })),
  },
  {
    id: 2,
    slug: 'infiniti-counti',
    name: 'Infiniti Counti',
    tagline: '100 Acre Mega Gated Community on NH-65',
    location: 'Sadashivpet, Sangareddy District',
    city: 'Hyderabad',
    highway: 'NH-65 Mumbai Highway',
    price: '₹20000/sq yd',
    pricePerSqYd: 22000,
    acres: '100 Acres',
    totalPlots: 1200,
    plotSizes: '200–600 Sq Yards',
    status: 'limited',
    badges: ['Highway Facing', 'RERA Approved', 'Bank Loan Available', 'Near NIMZ SEZ'],
    description:
      'A 100 acre mega gated community facing Mumbai NH-65 highway near Sadashivpet — surrounded by NIMZ SEZ, Woxsen Business School, and the Regional Ring Road.',
    longDescription: `Infiniti Counti stands as a visionary 100-acre mega gated community that sets a new benchmark for plotted developments in the Hyderabad region. Strategically positioned directly facing the Mumbai NH-65 highway near Sadashivpet, this landmark project offers unparalleled connectivity and investment potential.

Surrounded by transformational developments — NIMZ SEZ, Woxsen Business School, and the upcoming Regional Ring Road — Infiniti Counti sits at the epicenter of Hyderabad's next major growth corridor.

With a spectacular 40,000 sqft clubhouse and world-class amenities, this community offers a lifestyle that rivals the finest residential developments in India.`,
    highlights: [
      '100 Acres Mega Master-Planned Community',
      'Direct Highway-Facing Layout on NH-65',
      '40,000 sqft Premium Clubhouse',
      'Adjacent to NIMZ SEZ Industrial Zone',
      'Near Woxsen University & Business School',
      'Regional Ring Road (RRR) Proximity',
      'Price: ₹20000 per sq yard',
      'Bank Loans from Leading Nationalized Banks',
    ],
    amenities: [
      { icon: '🏰', name: '40,000 sqft Clubhouse', description: 'Landmark clubhouse with premium facilities' },
      { icon: '🏊', name: 'Olympic Swimming Pool', description: 'Olympic-size heated swimming pool with deck' },
      { icon: '🎾', name: 'Sports Complex', description: 'Tennis, badminton & basketball courts' },
      { icon: '🎭', name: 'Amphitheatre', description: '500-seat outdoor amphitheatre' },
      { icon: '💼', name: 'Business Lounge', description: 'Co-working & meeting spaces' },
      { icon: '🌿', name: 'Botanical Garden', description: '10-acre curated botanical garden' },
      { icon: '🛡️', name: '5-Star Security', description: 'Multi-layer perimeter security system' },
      { icon: '🚰', name: 'STP Plant', description: 'Sewage treatment & water recycling' },
    ],
    gallery: [
      { src: '/images/inf.avif', alt: 'Infiniti Counti master plan view', category: 'aerial' },
      { src: '/images/inf1.webp', alt: 'Clubhouse rendering', category: 'amenities' },
      { src: '/images/inf2.webp', alt: 'Swimming pool complex', category: 'amenities' },
      { src: '/images/inf3.webp', alt: 'Sports facilities', category: 'amenities' },
      { src: '/images/inf4.webp', alt: 'Highway frontage', category: 'infrastructure' },
      { src: '/images/villa.jpg', alt: 'Premium plots', category: 'plots' },
    ],
    videos: [




      
      {
        id: 'v2',
        title: 'Infiniti Counti - The Future of Premium Living',
        thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '4:20',
      },
    ],
    brochureUrl: '/brochures/infiniti-counti.pdf',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60893!2d77.85!3d17.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf!2sSadashivpet!5e0!3m2!1sen!2sin!4v1',
    coordinates: { lat: 17.63, lng: 77.85 },
    reraNumber: 'P03200003217',
    completionDate: 'March 2026',
    totalArea: '100 Acres',
    nearbyPlaces: [
      { name: 'NH-65 Mumbai Highway', distance: '0 km (facing)', category: 'highway' },
      { name: 'NIMZ SEZ', distance: '2 km', category: 'business' },
      { name: 'Woxsen University', distance: '4 km', category: 'school' },
      { name: 'Regional Ring Road', distance: '3 km', category: 'highway' },
      { name: 'Sadashivpet Town', distance: '5 km', category: 'other' },
      { name: 'Hyderabad International Airport', distance: '65 km', category: 'airport' },
    ],
    plots: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      plotNumber: `${200 + i}`,
      size: [200, 240, 300, 360, 440, 600][i % 6],
      unit: 'Sq Yds',
      status: i % 5 === 0 ? 'booked' : i % 9 === 0 ? 'sold' : 'available',
      price: 22000 * [200, 240, 300, 360, 440, 600][i % 6],
      facing: ['East', 'West', 'North', 'South'][i % 4],
      x: (i % 6) * 80 + 20,
      y: Math.floor(i / 6) * 60 + 20,
      width: 70,
      height: 50,
    })),
  },
]

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.status !== 'sold-out')
