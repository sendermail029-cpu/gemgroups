'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Maximize2, Home, ArrowRight, CheckCircle } from 'lucide-react'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="section-pad bg-light-gray">
      <div className="container-gem">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">Our Portfolio</p>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl xl:text-5xl text-dark leading-tight mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-5" />
          <p className="font-body text-mid-gray text-base max-w-xl mx-auto">
            Carefully planned communities at prime locations — engineered for maximum appreciation and quality living.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group card-luxury"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-72 overflow-hidden">
                <Image
                  src={project.gallery[0].src}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {project.badges.slice(0, 2).map((badge) => (
                    <span key={badge} className="badge-gold text-xs">{badge}</span>
                  ))}
                </div>

                {/* Price overlay */}
                <div className="absolute bottom-4 right-4 bg-dark/80 backdrop-blur-sm rounded-sm px-3 py-1.5">
                  <span className="font-heading font-bold text-gold text-sm">{project.price}</span>
                </div>

                {/* Status indicator */}
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    project.status === 'available' ? 'bg-green-500 text-white' :
                    project.status === 'limited' ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {project.status === 'available' ? 'Open' : project.status === 'limited' ? 'Limited' : 'Sold Out'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-dark group-hover:text-primary transition-colors mb-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-mid-gray">
                      <MapPin size={13} />
                      <span className="font-body text-sm">{project.location}</span>
                    </div>
                  </div>
                </div>

                <p className="font-body text-mid-gray text-sm leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>

                {/* Key stats */}
                <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-t border-b border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <Maximize2 size={14} />
                    </div>
                    <div className="font-heading font-bold text-dark text-sm">{project.acres}</div>
                    <div className="font-body text-xs text-mid-gray">Total Area</div>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <Home size={14} />
                    </div>
                    <div className="font-heading font-bold text-dark text-sm">{project.totalPlots}</div>
                    <div className="font-body text-xs text-mid-gray">Total Plots</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <MapPin size={14} />
                    </div>
                    <div className="font-heading font-bold text-dark text-sm">{project.plotSizes.split('–')[0]}+</div>
                    <div className="font-body text-xs text-mid-gray">Sq Yards</div>
                  </div>
                </div>

                {/* Highlights preview */}
                <div className="space-y-2 mb-6">
                  {project.highlights.slice(0, 3).map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <CheckCircle size={13} className="text-gold shrink-0" />
                      <span className="font-body text-xs text-mid-gray">{h}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Link href={`/projects/${project.slug}`} className="btn-primary flex-1 justify-center text-xs py-3">
                    View Project
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="border border-primary text-primary text-xs font-heading font-semibold px-4 py-3 rounded-sm hover:bg-primary hover:text-white transition-colors"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link href="/projects" className="btn-outline-dark group">
            View All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
