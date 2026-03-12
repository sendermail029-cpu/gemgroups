import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, CheckCircle, Download, Phone, ArrowLeft } from 'lucide-react'
import { getProjectBySlug, projects } from '@/data/projects'
import ProjectGallery from '@/components/ui/ProjectGallery'
import PlotMap from '@/components/ui/PlotMap'
import EnquiryForm from '@/components/ui/EnquiryForm'
import { getProjectWhatsAppLink } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: `${project.name} | GEM Group Projects`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [project.gallery[0].src],
    },
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={project.heroImage || project.gallery[0].src}
          alt={project.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/50 to-transparent" />

        <div className="absolute inset-0 flex items-end pb-10">
          <div className="container-gem">
            <Link href="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-5 transition-colors">
              <ArrowLeft size={14} />
              All Projects
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.badges.map((badge) => (
                <span key={badge} className="badge-gold">{badge}</span>
              ))}
            </div>

            <h1 className="font-heading font-extrabold text-3xl lg:text-5xl text-white mb-3 leading-tight">
              {project.name}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-white/70 font-body text-sm">
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gold" />{project.location}</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary" />{project.highway}</span>
              <span className="font-heading font-bold text-gold">{project.price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats bar */}
      <div className="bg-primary-deep text-white">
        <div className="container-gem">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { label: 'Total Area', value: project.acres },
              { label: 'Total Plots', value: project.totalPlots.toString() },
              { label: 'Plot Sizes', value: project.plotSizes },
              { label: 'Starting Price', value: project.price },
            ].map(({ label, value }) => (
              <div key={label} className="text-center py-5 px-4">
                <div className="font-heading font-bold text-gold text-lg mb-0.5">{value}</div>
                <div className="font-body text-white/50 text-xs uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="section-pad bg-white">
        <div className="container-gem">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <p className="section-label mb-3">Overview</p>
                <h2 className="font-heading font-bold text-2xl text-dark mb-4 gold-line">About This Project</h2>
                <div className="prose max-w-none">
                  {project.longDescription.split('\n\n').map((para, i) => (
                    <p key={i} className="font-body text-mid-gray text-sm leading-relaxed mb-4">{para}</p>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <p className="section-label mb-3">Key Highlights</p>
                <h3 className="font-heading font-bold text-xl text-dark mb-5 gold-line">Project Features</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3 bg-light-gray p-3 rounded-sm">
                      <CheckCircle size={15} className="text-gold shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-dark">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="section-label mb-3">Facilities</p>
                <h3 className="font-heading font-bold text-xl text-dark mb-5 gold-line">Amenities</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.amenities.map((a) => (
                    <div key={a.name} className="flex items-start gap-3 bg-white border border-gray-100 p-4 rounded-sm hover:border-primary/30 transition-colors group">
                      <span className="text-2xl">{a.icon}</span>
                      <div>
                        <div className="font-heading font-semibold text-sm text-dark group-hover:text-primary transition-colors">{a.name}</div>
                        {a.description && (
                          <div className="font-body text-xs text-mid-gray mt-0.5">{a.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Plot Map */}
              {project.plots && (
                <div>
                  <p className="section-label mb-3">Layout</p>
                  <h3 className="font-heading font-bold text-xl text-dark mb-5 gold-line">Interactive Master Plan</h3>
                  <PlotMap plots={project.plots} projectName={project.name} />
                </div>
              )}

              {/* Nearby */}
              <div>
                <p className="section-label mb-3">Location Advantages</p>
                <h3 className="font-heading font-bold text-xl text-dark mb-5 gold-line">Nearby Landmarks</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.nearbyPlaces.map((place) => (
                    <div key={place.name} className="flex items-center justify-between bg-light-gray p-3 rounded-sm">
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-primary" />
                        <span className="font-body text-sm text-dark">{place.name}</span>
                      </div>
                      <span className="font-heading font-semibold text-xs text-gold">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <p className="section-label mb-3">Visual Tour</p>
                <h3 className="font-heading font-bold text-xl text-dark mb-5 gold-line">Gallery</h3>
                <ProjectGallery images={project.gallery} />
              </div>

              {/* Map */}
              <div>
                <p className="section-label mb-3">Find Us</p>
                <h3 className="font-heading font-bold text-xl text-dark mb-5 gold-line">Location Map</h3>
                <div className="rounded-sm overflow-hidden h-72 bg-gray-100">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d60000!2d${project.coordinates.lng}!3d${project.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${project.name} Location`}
                  />
                </div>
              </div>
            </div>

            {/* Right: Sticky sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Enquiry form card */}
                <div className="bg-white rounded-sm border border-gray-100 shadow-card overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-deep to-primary p-5">
                    <h3 className="font-heading font-bold text-white text-lg mb-1">Book Site Visit</h3>
                    <p className="font-body text-white/60 text-xs">Get free project details & pricing</p>
                  </div>
                  <div className="p-5">
                    <EnquiryForm defaultProject={project.slug} compact />
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={getProjectWhatsAppLink(project.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 bg-[#25D366] text-white text-xs font-heading font-semibold py-4 rounded-sm hover:bg-[#20BA5A] transition-colors"
                  >
                    <Phone size={16} />
                    WhatsApp
                  </a>
                  <a
                    href={project.brochureUrl || '#'}
                    download
                    className="flex flex-col items-center gap-2 bg-dark text-white text-xs font-heading font-semibold py-4 rounded-sm hover:bg-gray-800 transition-colors"
                  >
                    <Download size={16} />
                    Brochure
                  </a>
                </div>

                {/* RERA info */}
                {project.reraNumber && (
                  <div className="bg-green-50 border border-green-100 rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={14} className="text-green-600" />
                      <span className="font-heading font-semibold text-xs text-green-800">RERA Registered</span>
                    </div>
                    <p className="font-body text-xs text-green-700">Reg No: {project.reraNumber}</p>
                    {project.dtcpNumber && (
                      <p className="font-body text-xs text-green-700 mt-1">DTCP: {project.dtcpNumber}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
