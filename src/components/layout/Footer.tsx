import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter, MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">
      <div className="container-gem py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <div className="overflow-hidden rounded-full border border-white/10 bg-white shadow-sm">
                <Image
                  src="/images/GEM.png"
                  alt="GEM Group Projects logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
              <div>
                <div className="font-heading text-sm font-bold uppercase tracking-widest text-white">GEM GROUP</div>
                <div className="font-body text-xs tracking-[0.15em] text-gold">PROJECTS</div>
              </div>
            </div>
            <p className="mb-6 font-body text-sm leading-relaxed text-gray-400">
              Leading For Secured Life. Premium DTCP & RERA approved plotted developments along Hyderabad&apos;s
              fastest-growing highway corridors.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 transition-colors hover:bg-primary"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 transition-colors hover:bg-primary"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 transition-colors hover:bg-primary"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 transition-colors hover:bg-primary"
              >
                <Twitter size={16} />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 transition-colors hover:bg-[#25D366]"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-heading text-sm font-semibold uppercase tracking-widest text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/projects', label: 'All Projects' },
                { href: '/projects/sree-laxmi-balaji-township', label: 'Sree Laxmi Balaji' },
                { href: '/projects/infiniti-counti', label: 'Infiniti Counti' },
                { href: '/about', label: 'About Us' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 font-body text-sm text-gray-400 transition-colors hover:text-gold"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-heading text-sm font-semibold uppercase tracking-widest text-gold">Our Projects</h4>
            <div className="space-y-4">
              <div>
                <Link
                  href="/projects/sree-laxmi-balaji-township"
                  className="mb-1 block font-heading text-sm font-semibold text-white transition-colors hover:text-gold"
                >
                  Sree Laxmi Balaji Township
                </Link>
                <p className="text-xs text-gray-500">Shadnagar | NH-44 | 46 Acres | 578 Plots</p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-xs text-green-400">RERA Approved</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <Link
                  href="/projects/infiniti-counti"
                  className="mb-1 block font-heading text-sm font-semibold text-white transition-colors hover:text-gold"
                >
                  Infiniti Counti
                </Link>
                <p className="text-xs text-gray-500">Sadashivpet | NH-65 | 100 Acres</p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-yellow-900/40 px-2 py-0.5 text-xs text-yellow-400">Limited Plots</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-heading text-sm font-semibold uppercase tracking-widest text-gold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <p className="font-body text-sm leading-relaxed text-gray-400">
                  #101, GEM Towers, Jubilee Hills,
                  <br />
                  Hyderabad, Telangana 500033
                </p>
              </div>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-gold"
              >
                <Phone size={16} className="shrink-0 text-gold" />
                +91 98765 43210
              </a>
              <a
                href="tel:+919876543211"
                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-gold"
              >
                <Phone size={16} className="shrink-0 text-gold" />
                +91 98765 43211
              </a>
              <a
                href="mailto:info@gemgroupprojects.com"
                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-gold"
              >
                <Mail size={16} className="shrink-0 text-gold" />
                info@gemgroupprojects.com
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#20BA5A]"
              >
                <MessageCircle size={14} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-gem flex flex-col items-center justify-between gap-4 py-5 lg:flex-row">
          <p className="font-body text-xs text-gray-500">© {currentYear} GEM Group Projects. All rights reserved.</p>
          <a
            href="https://www.pandjtechnologies.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm transition-opacity hover:opacity-90"
          >
            <span className="font-body text-base text-gray-300">Designed by</span>
            <Image
              src="/images/pj.webp"
              alt="P & J Technologies"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            <span className="font-heading text-base font-semibold text-white">P &amp; J Technologies</span>
          </a>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-gray-500 transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 transition-colors hover:text-gold">
              Terms of Use
            </Link>
            <Link href="/disclaimer" className="text-xs text-gray-500 transition-colors hover:text-gold">
              Disclaimer
            </Link>
          </div>
          <p className="font-body text-xs text-gray-600">RERA Reg: P02400007485 | P03200003217</p>
        </div>
      </div>
    </footer>
  )
}
