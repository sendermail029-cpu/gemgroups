'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import { formatDate } from '@/lib/utils'

export default function BlogSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="container-gem">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="section-label mb-4">Latest Insights</p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-dark leading-tight gold-line">
              Real Estate <span className="text-primary">Knowledge Hub</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-outline-dark group shrink-0">
            View All Articles
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-1 group card-luxury"
          >
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blogPosts[0].coverImage}
                  alt={blogPosts[0].title}
                  fill className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="badge-gold">{blogPosts[0].category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-base text-dark group-hover:text-primary transition-colors mb-3 line-clamp-2 leading-snug">
                  {blogPosts[0].title}
                </h3>
                <p className="font-body text-sm text-mid-gray line-clamp-2 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between text-xs text-mid-gray font-body">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {formatDate(blogPosts[0].publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {blogPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other posts */}
          {blogPosts.slice(1, 3).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              className="group card-luxury"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge-blue">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-sm text-dark group-hover:text-primary transition-colors mb-2 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-body text-xs text-mid-gray line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-mid-gray font-body">
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                    <span className="flex items-center gap-1"><Tag size={10} /> {post.tags[0]}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
