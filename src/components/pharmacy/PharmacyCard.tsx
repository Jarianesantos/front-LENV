import type { Pharmacy } from '../../types'
import { formatPrice, formatDistance } from '../medication/MedicationCard'
import AvailabilityBadge from '../ui/Badge'

interface Props {
  pharmacy: Pharmacy
  onSelect: () => void
}

export default function PharmacyCard({ pharmacy, onSelect }: Props) {
  return (
    <div className="card flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-primary-900 dark:text-dark-text truncate">{pharmacy.name}</p>
        <p className="text-sm text-primary-900/60 truncate">{pharmacy.address}</p>
        <div className="flex items-center gap-3 mt-2">
          <AvailabilityBadge status={pharmacy.availability} />
          <span className="text-xs text-primary-900/50">{formatDistance(pharmacy.distance)}</span>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-2">
        <span className="text-lg font-bold text-primary-500">{formatPrice(pharmacy.price)}</span>
        <button onClick={onSelect} className="btn-primary text-xs px-4 py-2">
          Reservar
        </button>
      </div>
    </div>
  )
}
