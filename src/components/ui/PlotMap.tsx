'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react'
import type { PlotInfo } from '@/types'
import { formatPrice } from '@/lib/utils'

interface PlotMapProps {
  plots: PlotInfo[]
  projectName: string
}

interface Tooltip {
  plot: PlotInfo
  x: number
  y: number
}

export default function PlotMap({ plots, projectName }: PlotMapProps) {
  const [zoom, setZoom] = useState(1)
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)
  const [selectedPlot, setSelectedPlot] = useState<PlotInfo | null>(null)

  const available = plots.filter((p) => p.status === 'available').length
  const booked = plots.filter((p) => p.status === 'booked').length
  const sold = plots.filter((p) => p.status === 'sold').length

  const getPlotClass = (status: string) => {
    switch (status) {
      case 'available': return 'plot-available'
      case 'booked': return 'plot-booked'
      case 'sold': return 'plot-sold'
      default: return 'plot-available'
    }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'booked': return 'bg-yellow-500'
      case 'sold': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-light-gray border-b border-gray-200">
        <h4 className="font-heading font-semibold text-sm text-dark">Interactive Master Plan</h4>
        <div className="flex items-center gap-4 text-xs font-body">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-primary rounded-sm opacity-70" /> Available ({available})</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-yellow-500 rounded-sm opacity-80" /> Booked ({booked})</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-500 rounded-sm opacity-80" /> Sold ({sold})</div>
        </div>
      </div>

      {/* Map area */}
      <div className="relative overflow-hidden bg-gray-50" style={{ height: 380 }}>
        {/* Zoom controls */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          <button onClick={() => setZoom(Math.min(2.5, zoom + 0.25))}
            className="w-8 h-8 bg-white shadow-sm border border-gray-200 rounded-sm flex items-center justify-center hover:bg-light-gray transition-colors">
            <ZoomIn size={14} className="text-dark" />
          </button>
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            className="w-8 h-8 bg-white shadow-sm border border-gray-200 rounded-sm flex items-center justify-center hover:bg-light-gray transition-colors">
            <ZoomOut size={14} className="text-dark" />
          </button>
          <button onClick={() => setZoom(1)}
            className="w-8 h-8 bg-white shadow-sm border border-gray-200 rounded-sm flex items-center justify-center hover:bg-light-gray transition-colors">
            <RotateCcw size={14} className="text-dark" />
          </button>
        </div>

        {/* SVG Plot Map */}
        <div className="overflow-auto w-full h-full">
          <svg
            width={600 * zoom}
            height={360 * zoom}
            viewBox="0 0 600 360"
            className="transition-all duration-300"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="600" height="360" fill="url(#grid)" />

            {/* Roads */}
            <rect x="0" y="165" width="600" height="30" fill="#d1d5db" opacity="0.8" />
            <rect x="270" y="0" width="30" height="360" fill="#d1d5db" opacity="0.8" />
            <text x="300" y="182" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="sans-serif">30ft Main Road</text>

            {/* Road labels */}
            <text x="5" y="177" fontSize="8" fill="#9ca3af" fontFamily="sans-serif">→ NH-44</text>

            {/* Clubhouse block */}
            <rect x="35" y="50" width="80" height="60" fill="#1F6FB2" opacity="0.3" rx="2" />
            <text x="75" y="78" textAnchor="middle" fontSize="8" fill="#1F6FB2" fontFamily="sans-serif" fontWeight="bold">CLUBHOUSE</text>
            <text x="75" y="90" textAnchor="middle" fontSize="7" fill="#1F6FB2" fontFamily="sans-serif">& AMENITIES</text>

            {/* Park block */}
            <rect x="450" y="50" width="80" height="60" fill="#10b981" opacity="0.2" rx="2" />
            <text x="490" y="78" textAnchor="middle" fontSize="8" fill="#10b981" fontFamily="sans-serif" fontWeight="bold">PARK</text>

            {/* Plots */}
            {plots.map((plot) => (
              <g
                key={plot.id}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  setTooltip({ plot, x: rect.left, y: rect.top })
                }}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => plot.status === 'available' && setSelectedPlot(plot)}
              >
                <rect
                  x={plot.x + 140}
                  y={plot.y + 10}
                  width={plot.width}
                  height={plot.height}
                  className={getPlotClass(plot.status)}
                  rx="1"
                />
                <text
                  x={plot.x + 140 + plot.width / 2}
                  y={plot.y + 10 + plot.height / 2 - 5}
                  textAnchor="middle"
                  fontSize="7"
                  fill="white"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  {plot.plotNumber}
                </text>
                <text
                  x={plot.x + 140 + plot.width / 2}
                  y={plot.y + 10 + plot.height / 2 + 7}
                  textAnchor="middle"
                  fontSize="6"
                  fill="white"
                  fontFamily="sans-serif"
                  pointerEvents="none"
                >
                  {plot.size} Sq
                </text>
              </g>
            ))}

            {/* Entrance */}
            <rect x="255" y="340" width="60" height="20" fill="#C9A227" opacity="0.4" rx="2" />
            <text x="285" y="354" textAnchor="middle" fontSize="8" fill="#92400e" fontFamily="sans-serif" fontWeight="bold">ENTRANCE</text>
          </svg>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute z-20 bg-dark text-white px-3 py-2 rounded-sm text-xs font-body shadow-lg pointer-events-none"
            style={{ top: 200, left: '50%', transform: 'translateX(-50%)' }}
          >
            <div className="font-heading font-bold text-sm">Plot {tooltip.plot.plotNumber}</div>
            <div>Size: {tooltip.plot.size} {tooltip.plot.unit}</div>
            <div>Facing: {tooltip.plot.facing}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-2 h-2 rounded-full ${statusColor(tooltip.plot.status)}`} />
              <span className="capitalize">{tooltip.plot.status}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected plot modal */}
      <AnimatePresence>
        {selectedPlot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-dark/50 flex items-center justify-center"
          >
            <div className="bg-white rounded-sm p-6 max-w-sm w-full mx-4 shadow-luxury">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-heading font-bold text-lg text-dark">Plot {selectedPlot.plotNumber}</h4>
                  <span className="badge-blue mt-1">Available</span>
                </div>
                <button onClick={() => setSelectedPlot(null)} className="text-mid-gray hover:text-dark">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-body text-sm text-mid-gray">Plot Size</span>
                  <span className="font-heading font-semibold text-sm">{selectedPlot.size} {selectedPlot.unit}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-body text-sm text-mid-gray">Facing</span>
                  <span className="font-heading font-semibold text-sm">{selectedPlot.facing}</span>
                </div>
                {selectedPlot.price && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-body text-sm text-mid-gray">Estimated Price</span>
                    <span className="font-heading font-bold text-sm text-primary">{formatPrice(selectedPlot.price)}</span>
                  </div>
                )}
              </div>
              <button className="btn-gold w-full justify-center text-sm py-3">
                Enquire About This Plot
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
