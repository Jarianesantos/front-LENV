import { useState, useEffect } from 'react'
import type { Route } from '../App'
import type { PaymentState } from '../types'

interface Props {
  navigate: (r: Route) => void
}

const MESSAGES: Record<string, { title: string; message: string; icon: string; color: string }> = {
  PROCESSING: { title: 'Processando', message: 'Confirmando seu pagamento…', icon: '⏳', color: 'bg-primary-050' },
  CONFIRMED: { title: 'Sucesso', message: 'Pagamento confirmado.', icon: '✓', color: 'bg-success/20' },
  FAILED: { title: 'Erro', message: 'Não foi possível concluir o pagamento.', icon: '✕', color: 'bg-error/20' },
  CANCELLED: { title: 'Usuário cancelou', message: 'O pagamento foi cancelado.', icon: '⊘', color: 'bg-warning/20' },
}

export default function PaymentStatusScreen({ navigate }: Props) {
  const [state, setState] = useState<PaymentState>('PROCESSING')

  useEffect(() => {
    const timer = setTimeout(() => setState('CONFIRMED'), 3000)
    return () => clearTimeout(timer)
  }, [])

  const msg = MESSAGES[state] || MESSAGES.PROCESSING

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${msg.color}`}>
        {msg.icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-primary-900 dark:text-dark-text">{msg.title}</h2>
        <p className="text-primary-900/60 dark:text-dark-secondary mt-2">{msg.message}</p>
      </div>

      {state === 'CONFIRMED' && (
        <div className="card w-full max-w-sm text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-primary-900/60">Pedido</span>
            <span className="font-medium">#LENV-001</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-primary-900/60">Valor</span>
            <span className="font-medium text-primary-500">R$ 22,50</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-primary-900/60">Assinatura</span>
            <span className="font-mono text-xs text-primary-500 break-all">5KJf8...a92xQ</span>
          </div>
        </div>
      )}

      <div className="flex gap-3 w-full max-w-sm">
        <button onClick={() => navigate('home')} className="btn-primary flex-1">
          Voltar ao início
        </button>
      </div>
    </div>
  )
}
