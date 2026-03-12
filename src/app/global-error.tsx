'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-[#f7f4ed]">
        <div className="flex min-h-screen items-center justify-center px-6 py-16">
          <div className="w-full max-w-xl rounded-[28px] border border-[#eadfca] bg-white p-8 text-center shadow-card">
            <p className="section-label mb-3">Application Error</p>
            <h2 className="font-heading text-2xl font-bold text-dark sm:text-3xl">
              A critical error occurred
            </h2>
            <p className="mt-3 font-body text-sm leading-7 text-mid-gray sm:text-base">
              {error?.message || 'The app hit an unexpected error.'}
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="btn-primary mt-6 justify-center px-6 py-3 text-sm"
            >
              Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
