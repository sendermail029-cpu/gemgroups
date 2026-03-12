import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import HeroMetricsSection from '@/components/sections/HeroMetricsSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import LocationSection from '@/components/sections/LocationSection'
import WhyInvestSection from '@/components/sections/WhyInvestSection'
import AmenitiesSection from '@/components/sections/AmenitiesSection'
import InvestmentGrowthSection from '@/components/sections/InvestmentGrowthSection'
import GallerySection from '@/components/sections/GallerySection'
import BlogSection from '@/components/sections/BlogSection'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'GEM Group Projects | Premium Plots in Hyderabad | Leading For Secured Life',
  description:
    'GEM Group Projects — Premium DTCP & RERA approved plotted developments in Hyderabad. Sree Laxmi Balaji Township (Shadnagar, NH-44) and Infiniti Counti (Sadashivpet, NH-65). Invest in secured growth corridors.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroMetricsSection />
      <AboutSection />
      <ProjectsSection />
      <LocationSection />
      <WhyInvestSection />
      <AmenitiesSection />
      <InvestmentGrowthSection />
      <GallerySection />
      <BlogSection />
      <CTASection />
    </>
  )
}
