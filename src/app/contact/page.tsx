import type { Metadata } from 'next'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import EnquiryForm from '@/components/ui/EnquiryForm'
import { displayPhoneNumber, getWhatsAppLink, phoneNumber } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact GEM Group Projects | Book Site Visit',
  description:
    'Contact GEM Group Projects to book a site visit, get project details, or enquire about plots in Hyderabad. Call, WhatsApp, or fill the form.',
}

const offices = [
  {
    title: 'Head Office',
    address: '#101, GEM Towers, Jubilee Hills, Hyderabad, Telangana 500033',
    phone: displayPhoneNumber,
    email: 'info@gemgroupprojects.com',
    hours: 'Mon-Sat: 9 AM - 7 PM',
  },
  {
    title: 'Site Office - Shadnagar',
    address: 'Sree Laxmi Balaji Township, Shadnagar, Ranga Reddy District',
    phone: '+91 98765 43211',
    email: 'shadnagar@gemgroupprojects.com',
    hours: 'Daily: 9 AM - 6 PM',
  },
  {
    title: 'Site Office - Sadashivpet',
    address: 'Infiniti Counti, NH-65 Highway, Sadashivpet, Sangareddy',
    phone: '+91 98765 43212',
    email: 'sadashivpet@gemgroupprojects.com',
    hours: 'Daily: 9 AM - 6 PM',
  },
]

const quickContacts = [
  {
    label: 'Call Us',
    value: displayPhoneNumber,
    href: `tel:${phoneNumber}`,
    icon: Phone,
    accent: 'bg-primary/10 text-primary ring-primary/15',
  },
  {
    label: 'WhatsApp',
    value: displayPhoneNumber,
    href: getWhatsAppLink(),
    icon: MessageCircle,
    accent: 'bg-[#25D366]/10 text-[#25D366] ring-[#25D366]/15',
    external: true,
  },
  {
    label: 'Email',
    value: 'info@gemgroupprojects.com',
    href: 'mailto:info@gemgroupprojects.com',
    icon: Mail,
    accent: 'bg-gold/10 text-gold ring-gold/15',
  },
  {
    label: 'Office Hours',
    value: 'Mon-Sat: 9 AM - 7 PM',
    icon: Clock,
    accent: 'bg-primary-deep/10 text-primary-deep ring-primary-deep/15',
  },
]

const heroImage = '/images/contact.webp'

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 lg:pt-32 lg:pb-12">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: 'center -188px',
            backgroundSize: '100% auto',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,44,79,0.88),rgba(7,44,79,0.78),rgba(7,44,79,0.52))]" />

        <div className="container-gem relative">
          <div className="flex min-h-[260px] items-center rounded-[12px] px-6 py-8 sm:px-10 lg:min-h-[320px] lg:px-12 lg:py-10">
            <div className="max-w-3xl text-white">
              <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.26em] text-gold">
                Get In Touch
              </p>
              <h1 className="font-heading text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Contact Us
              </h1>
              <p className="mt-4 max-w-xl font-body text-base leading-7 text-white/88 sm:text-lg">
                Plan a site visit, request brochures, and connect with our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-gray py-14 sm:py-16 lg:py-24">
        <div className="container-gem">
          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[22px] bg-white shadow-card sm:rounded-[28px]">
              <div className="border-b border-gray-100 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Enquiry Form
                </p>
                <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-primary-deep sm:text-3xl lg:text-4xl">
                  Send Enquiry
                </h2>
                <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  Fill in your details and our team will respond within 2 hours with project
                  information, brochure support, and site visit coordination.
                </p>
              </div>
              <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <EnquiryForm />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[22px] bg-white p-5 shadow-card sm:rounded-[28px] sm:p-8">
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Direct Access
                </p>
                <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-primary-deep sm:text-3xl">
                  Quick Contact
                </h3>
                <p className="mt-3 font-body text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  Reach the right channel faster. Every contact method below is arranged for quick action.
                </p>

                <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                  {quickContacts.map((item) => {
                    const Icon = item.icon

                    const content = (
                      <>
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${item.accent}`}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            {item.label}
                          </p>
                          <p className="mt-1 font-body text-lg leading-7 text-primary-deep break-words">
                            {item.value}
                          </p>
                        </div>
                      </>
                    )

                    if (item.href) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="flex items-start gap-4 rounded-2xl border border-slate-100 px-4 py-4 transition-all hover:border-primary/20 hover:bg-slate-50 sm:items-center sm:px-5"
                        >
                          {content}
                        </a>
                      )
                    }

                    return (
                      <div
                        key={item.label}
                        className="flex items-start gap-4 rounded-2xl border border-slate-100 px-4 py-4 sm:items-center sm:px-5"
                      >
                        {content}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-4">
                {offices.map((office) => (
                  <div key={office.title} className="rounded-[22px] bg-white p-5 shadow-card sm:rounded-[28px] sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                          Office Location
                        </p>
                        <h4 className="font-heading text-xl font-bold tracking-[-0.02em] text-primary-deep sm:text-2xl">
                          {office.title}
                        </h4>
                      </div>
                      <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
                        <MapPin size={18} />
                      </div>
                    </div>

                    <div className="mt-5 space-y-4 sm:mt-6">
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="mt-1 shrink-0 text-gold" />
                        <p className="font-body text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                          {office.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="shrink-0 text-gold" />
                        <a
                          href={`tel:${office.phone.replace(/\s/g, '')}`}
                          className="font-body text-sm text-primary-deep transition-colors hover:text-primary sm:text-base"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="shrink-0 text-gold" />
                        <a
                          href={`mailto:${office.email}`}
                          className="break-all font-body text-sm text-primary-deep transition-colors hover:text-primary sm:text-base"
                        >
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="shrink-0 text-gold" />
                        <span className="font-body text-sm text-slate-600 sm:text-base">{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[22px] bg-white shadow-card sm:rounded-[28px]">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b border-gray-100 px-5 py-6 sm:px-8 sm:py-8 lg:border-b-0 lg:border-r lg:px-10">
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Office Route
                </p>
                <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-primary-deep sm:text-3xl">
                  Find Our Hyderabad Desk
                </h3>
                <p className="mt-3 font-body text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  Visit the corporate office for brochure pickup, project consultation, and site visit planning.
                </p>
              </div>
              <div className="h-[260px] sm:h-[300px] lg:h-[340px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30445.!2d78.4!3d17.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90!2sHyderabad!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="GEM Group Hyderabad Office"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
