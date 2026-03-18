import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Home, Maximize2, CheckCircle, ArrowRight, Phone } from 'lucide-react'
import { projects } from '@/data/projects'
import CTASection from '@/components/sections/CTASection'
import { phoneNumber } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Our Projects | GEM Group Projects',
  description:
    'Explore GEM Group Projects — Sree Laxmi Balaji Township at Shadnagar (NH-44) and Infiniti Counti at Sadashivpet (NH-65). DTCP & RERA approved premium plotted developments.',
}

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-10 lg:pt-32 lg:pb-12">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/pro.png)',
            backgroundPosition: 'center -120px',
            backgroundSize: '100% auto',
          }}
        />
        <div className="container-gem relative">
          <div className="flex min-h-[260px] items-center rounded-[12px] px-6 py-8 sm:px-10 lg:min-h-[320px] lg:px-12 lg:py-10">
            <div className="max-w-3xl text-white">
              <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.26em] text-gold">
                Our Portfolio
              </p>
              <h1 className="font-heading text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Premium Plotted Developments
              </h1>
              <p className="mt-4 max-w-2xl font-body text-base leading-7 text-white/88 sm:text-lg">
                DTCP & RERA approved communities along Hyderabad&apos;s highest-growth highway corridors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-pad bg-light-gray">
        <div className="container-gem">
          <div className="space-y-12">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`group bg-white rounded-sm shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden grid lg:grid-cols-2 ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                {/* Image */}
                <div className={`relative h-64 lg:h-auto min-h-80 overflow-hidden ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Image
                    src={project.gallery[0].src}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                  <div className="absolute top-5 left-5 flex gap-2 flex-wrap">
                    {project.badges.map((badge) => (
                      <span key={badge} className="badge-gold">{badge}</span>
                    ))}
                  </div>
                  <div className="absolute bottom-5 left-5 bg-dark/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                    <span className="font-heading font-bold text-gold text-sm">{project.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-3 mb-5">
                      <div>
                        <h2 className="font-heading font-bold text-2xl text-dark mb-2 group-hover:text-primary transition-colors">
                          {project.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-gold" />
                          <span className="font-body text-sm text-mid-gray">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin size={13} className="text-primary" />
                          <span className="font-body text-sm text-primary">{project.highway}</span>
                        </div>
                      </div>
                    </div>

                    <p className="font-body text-mid-gray text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 py-5 border-t border-b border-gray-100">
                      {[
                        { icon: Maximize2, label: 'Total Area', value: project.acres },
                        { icon: Home, label: 'Total Plots', value: project.totalPlots.toString() },
                        { icon: MapPin, label: 'Plot Sizes', value: project.plotSizes },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="text-center">
                          <Icon size={14} className="text-primary mx-auto mb-1" />
                          <div className="font-heading font-bold text-dark text-sm">{value}</div>
                          <div className="font-body text-xs text-mid-gray">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Key highlights */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {project.highlights.slice(0, 4).map((h) => (
                        <div key={h} className="flex items-center gap-2">
                          <CheckCircle size={12} className="text-gold shrink-0" />
                          <span className="font-body text-xs text-mid-gray">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3">
                    <Link href={`/projects/${project.slug}`} className="btn-primary flex-1 justify-center text-xs py-3.5">
                      View Full Details
                      <ArrowRight size={14} />
                    </Link>
                    <a
                      href={`tel:${phoneNumber}`}
                      className="flex items-center gap-2 border border-gray-200 text-mid-gray hover:border-primary hover:text-primary text-xs font-heading font-semibold px-4 py-3.5 rounded-sm transition-colors"
                    >
                      <Phone size={13} />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
