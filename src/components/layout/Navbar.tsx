'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects', hasDropdown: true },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const projectLinks = [
  { href: '/projects/sree-laxmi-balaji-township', label: 'Sree Laxmi Balaji Township', location: 'Shadnagar, NH-44' },
  { href: '/projects/infiniti-counti', label: 'Infiniti Counti', location: 'Sadashivpet, NH-65' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setProjectsOpen(false)
    setMobileProjectsOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      {/* Top bar */}
      <div className={cn(
        'hidden lg:block border-b transition-all duration-500',
        scrolled || !isHome ? 'border-gray-100 bg-light-gray/50' : 'border-white/10 bg-primary-deep/30'
      )}>
        <div className="container-gem flex items-center justify-between py-2">
          <p className={cn('text-xs font-body', scrolled || !isHome ? 'text-mid-gray' : 'text-white/70')}>
            DTCP & RERA Approved Plotted Developments in Hyderabad
          </p>
          <div className="flex items-center gap-6">
            <a
              href="tel:+919876543210"
              className={cn('flex items-center gap-1.5 text-xs font-semibold font-heading tracking-wide transition-colors',
                scrolled || !isHome ? 'text-primary' : 'text-gold'
              )}
            >
              <Phone size={12} />
              +91 98765 43210
            </a>
            <a
              href="https://wa.me/919876543210"
              className={cn('text-xs font-semibold font-heading tracking-wide transition-colors',
                scrolled || !isHome ? 'text-primary' : 'text-gold'
              )}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="container-gem">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {logoFailed ? (
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-xl transition-all',
                  scrolled || !isHome
                    ? 'bg-primary text-white'
                    : 'bg-gold text-white'
                )}>
                  G
                </div>
              ) : (
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/90 shadow-sm ring-1 ring-black/5">
                  <Image
                    src="/images/GEM.webp"
                    alt="GEM Group Projects logo"
                    fill
                    sizes="40px"
                    className="rounded-full object-cover"
                    onError={() => setLogoFailed(true)}
                  />
                </div>
              )}
            </div>
            <div className="leading-tight">
              <div className={cn('font-heading font-bold text-sm tracking-widest uppercase transition-colors',
                scrolled || !isHome ? 'text-dark' : 'text-white'
              )}>
                GEM GROUP
              </div>
              <div className={cn('font-body text-xs tracking-[0.15em] transition-colors',
                scrolled || !isHome ? 'text-gold' : 'text-gold-light'
              )}>
                PROJECTS
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => link.hasDropdown && setProjectsOpen(true)}
                onMouseLeave={() => link.hasDropdown && setProjectsOpen(false)}
              >
                {link.hasDropdown ? (
                  <div className="flex items-center gap-1">
                    <Link
                      href={link.href}
                      className={cn(
                        'font-heading font-medium text-sm tracking-wide transition-colors py-2',
                        pathname.startsWith('/projects')
                          ? 'text-primary'
                          : scrolled || !isHome ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-gold'
                      )}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setProjectsOpen((open) => !open)}
                      className={cn(
                        'flex items-center py-2 transition-colors',
                        pathname.startsWith('/projects')
                          ? 'text-primary'
                          : scrolled || !isHome ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-gold'
                      )}
                      aria-label="Toggle projects menu"
                      aria-expanded={projectsOpen}
                    >
                      <ChevronDown size={14} className={cn('transition-transform', projectsOpen && 'rotate-180')} />
                    </button>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      'font-heading font-medium text-sm tracking-wide transition-colors py-2',
                      pathname === link.href
                        ? 'text-primary'
                        : scrolled || !isHome ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-gold'
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Active underline */}
                {pathname === link.href && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                )}

                {/* Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {projectsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white shadow-luxury border border-gray-100 rounded-sm overflow-hidden"
                      >
                        <div className="p-2">
                          {projectLinks.map((proj) => (
                            <Link
                              key={proj.href}
                              href={proj.href}
                              className="flex flex-col px-4 py-3 hover:bg-light-gray rounded-sm transition-colors group/item"
                            >
                              <span className="font-heading font-semibold text-sm text-dark group-hover/item:text-primary transition-colors">
                                {proj.label}
                              </span>
                              <span className="text-xs text-mid-gray mt-0.5">{proj.location}</span>
                            </Link>
                          ))}
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <Link href="/projects" className="block px-4 py-2 text-xs font-semibold text-primary hover:text-primary-deep tracking-wide uppercase">
                              View All Projects →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="btn-gold text-xs py-3 px-6">
              Book Site Visit
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn('lg:hidden p-2 rounded-sm transition-colors',
              scrolled || !isHome ? 'text-dark' : 'text-white'
            )}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-luxury overflow-hidden"
          >
            <div className="container-gem py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.hasDropdown ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'flex-1 py-3 px-4 font-heading font-medium text-sm rounded-sm transition-colors',
                            pathname.startsWith('/projects')
                              ? 'bg-primary/10 text-primary'
                              : 'text-dark hover:bg-light-gray'
                          )}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileProjectsOpen((open) => !open)}
                          className="p-3 text-dark"
                          aria-label="Toggle project links"
                          aria-expanded={mobileProjectsOpen}
                        >
                          <ChevronDown
                            size={18}
                            className={cn('transition-transform', mobileProjectsOpen && 'rotate-180')}
                          />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {mobileProjectsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 space-y-1 mt-1">
                              {projectLinks.map((proj) => (
                                <Link
                                  key={proj.href}
                                  href={proj.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block py-2 px-4 text-sm text-mid-gray hover:text-primary transition-colors"
                                >
                                  {proj.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'block py-3 px-4 font-heading font-medium text-sm rounded-sm transition-colors',
                        pathname === link.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-dark hover:bg-light-gray'
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-1">
                <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-gold w-full justify-center">
                  Book Site Visit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
