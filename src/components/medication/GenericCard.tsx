import type { Medication } from '../../types'
import { formatPrice } from '../medication/MedicationCard'

interface Props {
  medication: Medication
  onClose: () => void
  onViewGeneric: () => void
}

export default function GenericCard({ medication, onClose, onViewGeneric }: Props) {
  const diff = (medication.referencePrice ?? 0) - (medication.genericPrice ?? 0)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-surface-000 dark:bg-dark-surface rounded-t-xl p-6 pb-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-info100 rounded-full mx-auto mb-4" />

        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-primary-050 text-primary-500 text-sm font-bold flex items-center justify-center">
            i
          </span>
          <h3 className="text-xl font-semibold text-primary-900 dark:text-dark-text">
            Existe opção genérica
          </h3>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/30">
            <div>
              <p className="font-semibold text-primary-900 dark:text-dark-text">
                {medication.principleActive}
              </p>
              <p className="text-xs text-primary-900/50">Genérico · Mesmo princípio ativo</p>
            </div>
            <span className="text-lg font-bold text-success">{formatPrice(medication.genericPrice ?? 0)}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-surface-050 dark:bg-dark-bg rounded-lg">
            <div>
              <p className="font-semibold text-primary-900 dark:text-dark-text">
                {medication.nameCommercial}
              </p>
              <p className="text-xs text-primary-900/50">Medicamento de referência</p>
            </div>
            <span className="text-lg font-semibold text-primary-900/60 dark:text-dark-secondary">
              {formatPrice(medication.referencePrice ?? 0)}
            </span>
          </div>

          <div className="text-center p-2 bg-accent/30 rounded-lg">
            <p className="text-sm font-semibold text-primary-900 dark:text-dark-text">
              Diferença encontrada: {formatPrice(diff)}
            </p>
          </div>
        </div>

        <div className="text-sm text-primary-900/60 dark:text-dark-secondary space-y-1 mb-6">
          <p>✓ Mesmo princípio ativo.</p>
          <p>✓ Atende aos requisitos regulatórios de equivalência.</p>
          <p>✓ Converse com o farmacêutico sobre a substituição.</p>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1 text-sm">
            Fechar
          </button>
          <button onClick={onViewGeneric} className="btn-primary flex-1 text-sm">
            Ver opção
          </button>
        </div>
      </div>
    </div>
  )
}
