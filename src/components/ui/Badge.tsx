import type { Availability } from '../../types'

const config: Record<Availability, { label: string; className: string }> = {
  available: { label: 'Disponível', className: 'bg-success text-white' },
  limited: { label: 'Estoque limitado', className: 'bg-warning text-primary-900' },
  unavailable: { label: 'Indisponível', className: 'bg-error text-white' },
}

export default function AvailabilityBadge({ status }: { status: Availability }) {
  const c = config[status]
  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${c.className}`}>
      {c.label}
    </span>
  )
}
