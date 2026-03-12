export interface Project {
  id: number
  slug: string
  name: string
  tagline: string
  location: string
  city: string
  highway: string
  price: string
  pricePerSqYd: number
  acres: string
  totalPlots: number
  plotSizes: string
  status: 'available' | 'limited' | 'sold-out'
  badges: string[]
  description: string
  longDescription: string
  highlights: string[]
  amenities: Amenity[]
  heroImage?: string
  gallery: GalleryImage[]
  videos: Video[]
  brochureUrl?: string
  masterPlanUrl?: string
  mapEmbedUrl?: string
  coordinates: { lat: number; lng: number }
  reraNumber?: string
  dtcpNumber?: string
  completionDate?: string
  totalArea: string
  nearbyPlaces: NearbyPlace[]
  plots?: PlotInfo[]
}

export interface Amenity {
  icon: string
  name: string
  description?: string
}

export interface GalleryImage {
  src: string
  alt: string
  category?: string
  width?: number
  height?: number
}

export interface Video {
  id: string
  title: string
  thumbnail: string
  url: string
  duration?: string
}

export interface NearbyPlace {
  name: string
  distance: string
  category: 'school' | 'hospital' | 'highway' | 'airport' | 'business' | 'other'
}

export interface PlotInfo {
  id: number
  plotNumber: string
  size: number
  unit: string
  status: 'available' | 'booked' | 'sold'
  price?: number
  facing?: string
  x: number
  y: number
  width: number
  height: number
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content?: string
  category: string
  tags: string[]
  author: Author
  publishedAt: string
  readTime: string
  coverImage: string
  featured?: boolean
}

export interface Author {
  name: string
  avatar?: string
  role?: string
}

export interface Lead {
  id?: string
  name: string
  phone: string
  email?: string | null
  project?: string | null
  plotSize?: string | null
  message?: string | null
  source?: string | null
  createdAt?: string
  status?: string
}
