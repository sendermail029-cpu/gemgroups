import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '919885524320'
export const phoneNumber = process.env.NEXT_PUBLIC_PHONE || '+919885524320'
export const displayPhoneNumber = '+91 98855 24320'

export function getWhatsAppLink(message?: string): string {
  const text = encodeURIComponent(
    message || 'Hello, I am interested in GEM Group Projects. Please share project details.'
  )
  return `https://wa.me/${whatsappNumber}?text=${text}`
}

export function getProjectWhatsAppLink(projectName: string): string {
  const message = `Hello, I am interested in ${projectName} by GEM Group Projects. Please share project details and arrange a site visit.`
  return getWhatsAppLink(message)
}
