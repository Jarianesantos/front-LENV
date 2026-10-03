import type { Medication, Availability } from '../../types'

interface Props {
  medication: Medication
  distance: number
  price: number
  onDetail: () => void
}

const availabilityConfig: Record<Availability, { label: string; bg: string; text: string }> = {
  available: { label: 'Disponível', bg: 'bg-success', text: 'text-white' },
  limited: { label: 'Estoque limitado', bg: 'bg-warning', text: 'text-primary-900' },
  unavailable: { label: 'Indisponível', bg: 'bg-error', text: 'text-white' },
}

export function formatDistance(meters: number): string {
  return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(1)} km`
}

export function formatPrice(brl: number): string {
  return brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function MedicationCard({ medication, distance, price, onDetail }: Props) {
  const avail = availabilityConfig[medication.availability]

  return (
    <div className="card flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-primary-900 dark:text-dark-text">
              {medication.nameCommercial}
            </h3>
            {medication.hasGeneric && (
              <button
                onClick={onDetail}
                className="w-5 h-5 rounded-full bg-info100 text-primary-500 text-xs font-bold flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
                title="Existe opção genérica"
              >
                i
              </button>
            )}
          </div>
          <p className="text-sm text-primary-900/70 dark:text-dark-secondary">{medication.principleActive}</p>
          <p className="text-xs text-primary-900/50 dark:text-dark-secondary/70">
            {medication.concentration} · {medication.pharmaceuticalForm}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${avail.bg} ${avail.text}`}>
          {avail.label}
        </span>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1 text-sm text-primary-900/60 dark:text-dark-secondary">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6c0 5.25 6 10 6 10s6-4.75 6-10a6 6 0 00-6-6zm0 8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>
          <span>{formatDistance(distance)}</span>
        </div>
        <span className="text-lg font-semibold text-primary-500">{formatPrice(price)}</span>
      </div>

      <button onClick={onDetail} className="btn-primary w-full mt-2 text-sm">
        Ver detalhes
      </button>
    </div>
  )
}
