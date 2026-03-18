import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Real Estate Blog | GEM Group Projects',
  description:
    'Expert insights on Hyderabad real estate investment, plot buying guides, highway corridor development, and investment areas near NH-44 & NH-65.',
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-10 lg:pt-32 lg:pb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/home3.webp)' }}
        />
        <div className="container-gem relative">
          <div className="flex min-h-[260px] items-center rounded-[12px] px-6 py-8 sm:px-10 lg:min-h-[320px] lg:px-12 lg:py-10">
            <div className="max-w-2xl text-white">
              <p className="section-label mb-4 text-gold">Blogs</p>
              <h1 className="font-heading text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                Blogs
              </h1>
              <p className="mt-4 max-w-xl font-body text-base leading-7 text-white/80 sm:text-lg">
                Insights, guides, and updates on real estate investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-light-gray">
        <div className="container-gem">
          {/* Featured */}
          <div className="mb-12">
            <h2 className="font-heading font-semibold text-sm uppercase tracking-widest text-gold mb-6">Featured Article</h2>
            <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-0 bg-white rounded-sm shadow-card hover:shadow-card-hover transition-all overflow-hidden">
              <div className="relative h-60 lg:h-auto overflow-hidden">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="50vw"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <span className="badge-gold mb-4 inline-flex">{featured.category}</span>
                  <h3 className="font-heading font-bold text-xl lg:text-2xl text-dark group-hover:text-primary transition-colors mb-4 leading-snug">
                    {featured.title}
                  </h3>
                  <p className="font-body text-mid-gray text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-mid-gray font-body">
                    <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(featured.publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{featured.readTime}</span>
                  </div>
                  <span className="flex items-center gap-1 text-primary text-xs font-heading font-semibold group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Rest */}
          <div>
            <h2 className="font-heading font-semibold text-sm uppercase tracking-widest text-gold mb-6">More Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-sm shadow-card hover:shadow-card-hover transition-all overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="33vw"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge-blue">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-sm text-dark group-hover:text-primary transition-colors mb-2 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-xs text-mid-gray mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-mid-gray font-body">
                      <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                      <span className="flex items-center gap-1"><Tag size={10} />{post.tags[0]}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
