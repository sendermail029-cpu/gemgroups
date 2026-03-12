import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="stat-number text-8xl mb-4">404</div>
        <h1 className="font-heading font-bold text-2xl text-dark mb-3">Page Not Found</h1>
        <p className="font-body text-mid-gray text-sm mb-8">
          The page you're looking for doesn't exist. It may have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary group">
            <Home size={16} />
            Go Home
          </Link>
          <Link href="/projects" className="btn-outline-dark group">
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
