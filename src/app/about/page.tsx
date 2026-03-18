import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, LineChart, MapPinned, ShieldCheck, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About GEM Group Projects | Leading For Secured Life',
  description:
    'Learn about GEM Group Projects, a Hyderabad plotted development company focused on DTCP and RERA approved communities, transparent documentation, and long-term investor confidence.',
}

const highlights = [
  'DTCP and RERA aligned positioning',
  'Growth-corridor project selection',
  'Buyer-focused plotted communities',
]

const principles = [
  {
    icon: ShieldCheck,
    title: 'Trust starts with approvals',
    desc: 'Every project is presented with compliance clarity, cleaner documentation, and a buyer-first process.',
  },
  {
    icon: MapPinned,
    title: 'Locations are chosen with intent',
    desc: 'The focus stays on Hyderabad corridors where access, infrastructure, and long-term demand can support value.',
  },
  {
    icon: LineChart,
    title: 'Land is framed as an investment decision',
    desc: 'The communication is built around confidence, planning quality, and long-term holding logic.',
  },
]

const milestones = [
  {
    year: '2010',
    title: 'Foundation',
    desc: 'GEM Group began with a clear focus on plotted development opportunities in Hyderabad.',
  },
  {
    year: '2019',
    title: 'Shadnagar corridor',
    desc: 'Sree Laxmi Balaji Township strengthened the brand in an emerging NH-44 investment belt.',
  },
  {
    year: '2022',
    title: 'Scale and expansion',
    desc: 'Infiniti Counti expanded the company presence with a larger-format plotted community on NH-65.',
  },
  {
    year: 'Today',
    title: 'Approval-led identity',
    desc: 'The brand continues to grow through disciplined approvals, corridor logic, and buyer confidence.',
  },
]

const stats = [
  { value: '15+', label: 'Years of presence' },
  { value: '146+', label: 'Acres highlighted' },
  { value: '2', label: 'Flagship communities' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 lg:pt-32 lg:pb-12">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/h.png)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        />
        <div className="container-gem relative">
          <div className="flex min-h-[300px] items-center rounded-[18px] px-6 py-8 sm:px-10 lg:min-h-[360px] lg:px-12 lg:py-10">
            <div className="max-w-3xl text-white">
              <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.26em] text-gold">
                About GEM Group
              </p>
              <h1 className="font-heading text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                About Us
              </h1>
              <p className="mt-4 max-w-2xl font-body text-base leading-7 text-white/88 sm:text-lg">
                Learn how GEM Group Projects builds plotted communities through approvals, location strategy,
                and buyer confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ed] py-14 sm:py-16 lg:py-24">
        <div className="container-gem">
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="rounded-[30px] bg-white p-6 shadow-card sm:p-8 lg:p-10">
              <p className="section-label mb-4">Who We Are</p>
              <h2 className="font-display text-3xl leading-tight text-dark sm:text-4xl lg:text-5xl">
                A plotted brand built on clarity
              </h2>
              <p className="mt-5 font-body text-sm leading-7 text-slate-600 sm:text-base">
                GEM Group Projects is positioned as a focused plotted-development company rather than a broad
                real estate seller. The brand is strongest when it speaks through approvals, corridor
                strategy, and buyer confidence instead of generic sales messaging.
              </p>
              <p className="mt-4 font-body text-sm leading-7 text-slate-600 sm:text-base">
                That matters because plotted investment decisions are usually built on trust, land logic,
                documentation quality, and long-term location potential.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-[#d9ccb3] bg-[#fcfaf6] px-4 py-2 font-body text-sm text-dark/84"
                  >
                    <BadgeCheck size={15} className="text-gold" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-[#eadfca] bg-[#fcfaf6] px-5 py-5"
                  >
                    <div className="font-heading text-3xl font-extrabold text-primary-deep">{item.value}</div>
                    <div className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-slate-500">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="relative overflow-hidden rounded-[32px] bg-white p-3 shadow-card sm:p-4">
                <div className="relative h-[280px] overflow-hidden rounded-[26px] sm:h-[360px] lg:h-[400px]">
                  <Image
                    src="/images/contact.webp"
                    alt="GEM Group Projects overview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,39,70,0.08),rgba(8,39,70,0.26))]" />
                </div>
                <div className="absolute left-6 top-6 max-w-[14rem] rounded-[24px] border border-white/25 bg-[#0b3155]/72 px-4 py-3 text-white shadow-xl backdrop-blur-md sm:left-8 sm:top-8 sm:px-5 sm:py-4">
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-gold">Brand Position</p>
                  <p className="mt-2 font-body text-sm leading-6 text-white/84">
                    Premium plotted communities framed through trust, access, and long-term value.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {principles.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-[#e5dcc8] bg-white px-5 py-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#0b3155] text-white">
                      <item.icon size={18} />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-bold text-dark">{item.title}</h3>
                    <p className="mt-2 font-body text-sm leading-6 text-dark/72">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-24">
        <div className="container-gem">
          <div className="max-w-3xl">
            <p className="section-label mb-3">Growth Journey</p>
            <h2 className="font-display text-3xl leading-tight text-dark sm:text-4xl lg:text-5xl">
              Key points in the brand story
            </h2>
            <p className="mt-4 font-body text-sm leading-7 text-mid-gray sm:text-base">
              A short timeline of how GEM Group Projects shaped its plotted-development focus.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {milestones.map((item) => (
              <div
                key={item.year}
                className="grid gap-4 rounded-[28px] border border-[#eadfca] bg-[#fcfaf6] px-5 py-5 sm:px-7 sm:py-6 lg:grid-cols-[110px_1fr]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#0b3155] text-white">
                    <Target size={18} />
                  </div>
                  <div className="font-display text-3xl text-gold">{item.year}</div>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-dark">{item.title}</h3>
                  <p className="mt-2 font-body text-sm leading-7 text-dark/74 sm:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2747] py-14 text-white sm:py-16 lg:py-24">
        <div className="container-gem">
          <div className="rounded-[34px] border border-white/10 bg-white/6 px-6 py-10 backdrop-blur-sm sm:px-10 lg:px-14 lg:py-14">
            <p className="section-label mb-3 text-gold">Next Step</p>
            <h2 className="max-w-3xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Explore the projects behind the GEM Group identity
            </h2>
            <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-white/74 sm:text-base">
              If this approach matches what you want from plotted investment, review the active communities and
              connect with the team directly.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link href="/projects" className="btn-gold justify-center">
                View Projects
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline justify-center">
                Contact Sales Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
