import { useState } from 'react'
import { formatPrice, formatDistance } from '../components/medication/MedicationCard'
import type { Route } from '../App'
import type { PaymentState } from '../types'

interface Props {
  navigate: (r: Route) => void
}

const STATE_MESSAGES: Record<string, { title: string; message: string }> = {
  PROCESSING: { title: 'Processando', message: 'Confirmando seu pagamento…' },
  CONFIRMED: { title: 'Sucesso', message: 'Pagamento confirmado.' },
  FAILED: { title: 'Erro', message: 'Não foi possível concluir o pagamento.' },
  CANCELLED: { title: 'Usuário cancelou', message: 'O pagamento foi cancelado.' },
  REJECTED: { title: 'Transação rejeitada', message: 'A transação foi rejeitada pela carteira.' },
}

export default function CheckoutScreen({ navigate }: Props) {
  const [state, setState] = useState<PaymentState>('CHECKOUT')

  const startPayment = () => {
    setState('WALLET_CONNECT')
    setTimeout(() => setState('AWAITING_SIGNATURE'), 1000)
    setTimeout(() => setState('PROCESSING'), 3000)
    setTimeout(() => setState('CONFIRMED'), 5000)
  }

  const cancel = () => setState('CANCELLED')

  if (state !== 'CHECKOUT') {
    const msg = STATE_MESSAGES[state]
    const isConfirmed = state === 'CONFIRMED'
    const isCancelled = state === 'CANCELLED'

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
            isConfirmed ? 'bg-success/20' : isCancelled ? 'bg-warning/20' : 'bg-primary-050'
          }`}
        >
          {isConfirmed ? '✓' : isCancelled ? '✕' : '…'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary-900 dark:text-dark-text">{msg?.title}</h2>
          <p className="text-primary-900/60 dark:text-dark-secondary mt-2">{msg?.message}</p>
        </div>
        {isConfirmed && (
          <div className="card w-full max-w-sm">
            <p className="text-xs text-primary-900/50 mb-1">Assinatura da transação</p>
            <p className="text-xs font-mono break-all text-primary-500">5KJf8...a92xQ</p>
          </div>
        )}
        <div className="flex gap-3 w-full max-w-sm">
          {isConfirmed ? (
            <button onClick={() => navigate('home')} className="btn-primary flex-1">
              Voltar ao início
            </button>
          ) : (
            <>
              <button onClick={() => setState('CHECKOUT')} className="btn-secondary flex-1">
                Tentar novamente
              </button>
              <button onClick={() => navigate('home')} className="btn-primary flex-1">
                Início
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-900 dark:text-dark-text">Resumo do pedido</h2>

      <div className="card space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-primary-900 dark:text-dark-text">Novalgina 500mg</p>
            <p className="text-sm text-primary-900/60">Dipirona monoidratada · 500 mg</p>
            <p className="text-sm text-primary-900/60">Comprimido</p>
          </div>
          <span className="bg-success text-white px-2 py-1 rounded-full text-xs">Disponível</span>
        </div>

        <div className="border-t border-info100 pt-3 space-y-2 text-sm">
          <div className="flex justify-between text-primary-900/70 dark:text-dark-secondary">
            <span>Farmácia</span>
            <span className="font-medium text-primary-900 dark:text-dark-text">Drogaria São Paulo</span>
          </div>
          <div className="flex justify-between text-primary-900/70 dark:text-dark-secondary">
            <span>Distância</span>
            <span>{formatDistance(450)}</span>
          </div>
          <div className="flex justify-between text-primary-900/70 dark:text-dark-secondary">
            <span>Preço</span>
            <span className="font-semibold text-primary-500">{formatPrice(22.5)}</span>
          </div>
        </div>

        <div className="border-t border-info100 pt-3 flex justify-between items-center">
          <span className="font-semibold text-primary-900 dark:text-dark-text">Total</span>
          <span className="text-2xl font-bold text-primary-500">{formatPrice(22.5)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <button onClick={startPayment} className="btn-primary w-full">
          Pagar com Solana
        </button>
        <button onClick={cancel} className="btn-secondary w-full">
          Cancelar
        </button>
      </div>

      <p className="text-xs text-center text-primary-900/40 dark:text-dark-secondary/60">
        Pagamento processado via Solana Devnet · Carteira Phantom
      </p>
    </div>
  )
}
