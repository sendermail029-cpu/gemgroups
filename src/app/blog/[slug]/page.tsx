import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import { formatDate } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | GEM Group Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

const articleContent: Record<string, string> = {
  'why-hyderabad-outer-ring-road-is-next-investment-hotspot': `
Real estate investment in Hyderabad continues to demonstrate exceptional resilience and growth potential, particularly in the highway corridor micro-markets that have emerged as the city's next frontier.

The National Highway network radiating outward from Hyderabad has fundamentally transformed real estate dynamics. Corridors along NH-44 (Bangalore Highway) and NH-65 (Mumbai Highway) have seen consistent 15–25% year-on-year land value appreciation, driven by infrastructure development, industrial expansion, and the government's focused investment in these growth zones.

## Why Highway Corridors Outperform

Several macro factors explain why highway-adjacent land markets consistently outperform broader real estate indices:

**Infrastructure Multiplier Effect**: Every rupee of government infrastructure investment in roads, utilities, and industrial zones generates 4–6x return in adjacent land value appreciation. The development of the Regional Ring Road (RRR) and its intersection with existing national highways has created powerful price catalysts at key nodes.

**Industrial and Employment Growth**: The NIMZ (National Investment and Manufacturing Zone) near Sadashivpet on NH-65, and the expanding pharma and automobile clusters along NH-44, are creating sustained employment demand. Where jobs cluster, residential demand follows — and plotted developments offer the most accessible entry point.

**Connectivity Premium**: In a fast-growing metro like Hyderabad, time-distance to the city core is the most critical determinant of land value. Highway connectivity compresses travel time, making peripheral locations functionally proximate to the CBD.

## Due Diligence Checklist

Before investing in any plotted development, verify these critical parameters:

1. **DTCP Approval**: Check the Directorate of Town & Country Planning approval number and validity on the official website.
2. **RERA Registration**: Verify the project's RERA registration on Telangana's official RERA portal (rera.telangana.gov.in).
3. **Title Clearance**: Obtain an encumbrance certificate (EC) for the mother document land parcel.
4. **Physical Visit**: Always visit the site in person. Check connectivity, drainage, and nearby development.
5. **Bank Approval**: Projects approved by leading nationalized banks have undergone independent legal and technical scrutiny.

## Investment Outlook 2025–2030

The mid-term outlook for highway corridor plots remains strongly positive. The confluence of three major tailwinds — continued IT/ITeS expansion in Hyderabad, government capital expenditure in National Highway upgrades, and Ring Road completion — creates a rare multi-year growth runway.

Smart investors who secured positions in the 2020–2022 window have already seen 60–80% appreciation. Those entering now in newly announced DTCP projects still have substantial upside, particularly where the price-to-infrastructure ratio remains attractive.

GEM Group Projects' ongoing developments at Shadnagar (NH-44) and Sadashivpet (NH-65) represent exactly these kinds of early-mover opportunities in corridors with proven appreciation momentum.
  `,
}

const defaultContent = `
Real estate investment in Hyderabad offers some of the most compelling risk-adjusted returns available to Indian investors today. With infrastructure investment at record highs and the city's economic expansion well underway, the fundamentals for plot appreciation remain rock solid.

## Understanding the Market

Hyderabad's real estate market is driven by several key factors: a thriving IT sector, aggressive government infrastructure spending, and the emergence of new employment corridors along national highways. These factors combine to create sustained demand for land in the city's growth zones.

## Key Investment Principles

**Location First**: The single most important determinant of long-term appreciation is location — specifically, proximity to employment hubs, infrastructure corridors, and social amenities.

**Legal Compliance**: DTCP approval and RERA registration are non-negotiable for any serious investor. These designations ensure the project meets government planning standards and provides buyer protection.

**Developer Track Record**: Choose developers with demonstrated delivery capability and transparent documentation practices. GEM Group Projects has maintained a 100% delivery record across all projects.

**Holding Period**: Plotted developments yield their best returns over 5–10 year holding periods. Short-term investors should evaluate liquidity before committing.

## Why Plotted Developments?

Unlike apartments, plotted developments offer:
- Full ownership of land
- No maintenance fees or society charges
- Freedom to construct as per personal preference
- Superior long-term appreciation
- High liquidity in established corridors

## Conclusion

For investors seeking capital preservation with growth, DTCP & RERA approved plotted developments along Hyderabad's highway corridors represent one of the most compelling opportunities in Indian real estate today.
  `

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const content = articleContent[params.slug] || defaultContent
  const related = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 2)

  const paragraphs = content.trim().split('\n\n').filter(Boolean)

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/40 to-dark/20" />
        <div className="absolute inset-0 flex items-end pb-10">
          <div className="container-gem">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-gold text-sm mb-5 transition-colors">
              <ArrowLeft size={14} /> All Articles
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge-gold">{post.category}</span>
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="badge-blue">{tag}</span>
              ))}
            </div>
            <h1 className="font-heading font-extrabold text-2xl lg:text-4xl text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <div className="bg-light-gray border-b border-gray-200">
        <div className="container-gem py-3 flex flex-wrap items-center gap-5 text-xs text-mid-gray font-body">
          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-gold" />{formatDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} className="text-gold" />{post.readTime}</span>
          <span className="flex items-center gap-1.5"><Tag size={12} className="text-gold" />{post.author.name}</span>
        </div>
      </div>

      {/* Content */}
      <section className="section-pad bg-white">
        <div className="container-gem">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Article */}
            <div className="lg:col-span-2">
              <p className="font-body text-mid-gray text-base leading-relaxed mb-8 text-lg">
                {post.excerpt}
              </p>
              <div className="prose max-w-none space-y-5">
                {paragraphs.map((para, i) => {
                  if (para.startsWith('## ')) {
                    return (
                      <h2 key={i} className="font-heading font-bold text-xl text-dark mt-8 mb-3 gold-line">
                        {para.replace('## ', '')}
                      </h2>
                    )
                  }
                  if (para.startsWith('**') && para.includes('**:')) {
                    const [bold, ...rest] = para.split('**:')
                    return (
                      <p key={i} className="font-body text-dark text-sm leading-relaxed">
                        <strong className="font-heading font-bold text-primary">{bold.replace('**', '')}:</strong>
                        {rest.join('**:')}
                      </p>
                    )
                  }
                  if (/^\d+\./.test(para)) {
                    const items = para.split('\n').filter(Boolean)
                    return (
                      <ul key={i} className="space-y-3">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <CheckCircle size={14} className="text-gold shrink-0 mt-1" />
                            <span className="font-body text-sm text-dark leading-relaxed">
                              {item.replace(/^\d+\.\s*\*\*([^*]+)\*\*:/, (_, g1) => `${g1}: `).replace(/^\d+\.\s*/, '')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p key={i} className="font-body text-mid-gray text-sm leading-relaxed">
                      {para}
                    </p>
                  )
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-light-gray text-mid-gray text-xs font-body px-3 py-1 rounded-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA card */}
              <div className="bg-gradient-to-br from-primary-deep to-primary rounded-sm p-6 text-white">
                <h3 className="font-heading font-bold text-lg mb-2">Interested in Investing?</h3>
                <p className="font-body text-white/60 text-xs mb-5 leading-relaxed">
                  Explore GEM Group's DTCP & RERA approved plots along Hyderabad's top corridors.
                </p>
                <Link href="/projects" className="btn-gold w-full justify-center text-xs py-3">
                  View Projects <ArrowRight size={13} />
                </Link>
                <Link href="/contact" className="btn-outline w-full justify-center text-xs py-3 mt-2">
                  Book Site Visit
                </Link>
              </div>

              {/* Related */}
              <div>
                <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-gold mb-4">Related Articles</h4>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link key={r.id} href={`/blog/${r.slug}`} className="group flex gap-3 bg-white border border-gray-100 rounded-sm p-3 hover:border-primary/30 transition-colors">
                      <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0">
                        <Image src={r.coverImage} alt={r.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-xs text-dark group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {r.title}
                        </p>
                        <p className="font-body text-xs text-mid-gray mt-1">{r.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Project quick links */}
              <div className="bg-light-gray rounded-sm p-5">
                <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-gold mb-4">Our Projects</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Sree Laxmi Balaji Township', href: '/projects/sree-laxmi-balaji-township', loc: 'Shadnagar · NH-44' },
                    { name: 'Infiniti Counti', href: '/projects/infiniti-counti', loc: 'Sadashivpet · NH-65' },
                  ].map((p) => (
                    <Link key={p.href} href={p.href} className="group block border-l-2 border-gold pl-3 hover:border-primary transition-colors">
                      <div className="font-heading font-semibold text-xs text-dark group-hover:text-primary transition-colors">{p.name}</div>
                      <div className="font-body text-xs text-mid-gray">{p.loc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
