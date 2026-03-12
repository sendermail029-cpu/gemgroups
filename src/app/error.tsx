'use client'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#f7f4ed] px-6 py-16">
      <div className="w-full max-w-xl rounded-[28px] border border-[#eadfca] bg-white p-8 text-center shadow-card">
        <p className="section-label mb-3">Something Went Wrong</p>
        <h2 className="font-heading text-2xl font-bold text-dark sm:text-3xl">
          This page could not load
        </h2>
        <p className="mt-3 font-body text-sm leading-7 text-mid-gray sm:text-base">
          {error?.message || 'An unexpected error occurred while loading this page.'}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary mt-6 justify-center px-6 py-3 text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
