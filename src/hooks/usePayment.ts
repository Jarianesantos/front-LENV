import { useState, useCallback } from 'react'
import type { PaymentState, PaymentOrder } from '../types'
import { confirmTransaction } from '../services/solana'

const TRANSITIONS: Record<PaymentState, PaymentState[]> = {
  IDLE: ['CHECKOUT'],
  CHECKOUT: ['WALLET_CONNECT', 'CANCELLED'],
  WALLET_CONNECT: ['AWAITING_SIGNATURE', 'REJECTED', 'FAILED'],
  AWAITING_SIGNATURE: ['PROCESSING', 'REJECTED', 'CANCELLED'],
  PROCESSING: ['CONFIRMED', 'FAILED', 'EXPIRED'],
  CONFIRMED: ['IDLE'],
  REJECTED: ['IDLE', 'CHECKOUT'],
  FAILED: ['IDLE', 'CHECKOUT'],
  EXPIRED: ['IDLE', 'CHECKOUT'],
  CANCELLED: ['IDLE', 'CHECKOUT'],
}

export function usePayment() {
  const [state, setState] = useState<PaymentState>('IDLE')
  const [order, setOrder] = useState<PaymentOrder | null>(null)
  const [error, setError] = useState<string | null>(null)

  const transition = useCallback(
    (next: PaymentState) => {
      if (TRANSITIONS[state]?.includes(next)) {
        setState(next)
      }
    },
    [state]
  )

  const startCheckout = useCallback(() => {
    transition('CHECKOUT')
  }, [transition])

  const connectWallet = useCallback(async () => {
    transition('WALLET_CONNECT')
    // Phantom wallet connect logic here
  }, [transition])

  const requestSignature = useCallback(async () => {
    transition('AWAITING_SIGNATURE')
    // Request signature from wallet
  }, [transition])

  const processPayment = useCallback(
    async (signature: string) => {
      transition('PROCESSING')
      try {
        const confirmed = await confirmTransaction(signature)
        if (confirmed) {
          transition('CONFIRMED')
        } else {
          transition('FAILED')
          setError('Transação não confirmada')
        }
      } catch (e) {
        transition('FAILED')
        setError('Erro ao confirmar pagamento')
      }
    },
    [transition]
  )

  const cancel = useCallback(() => {
    transition('CANCELLED')
  }, [transition])

  const reset = useCallback(() => {
    setState('IDLE')
    setOrder(null)
    setError(null)
  }, [])

  return { state, order, error, startCheckout, connectWallet, requestSignature, processPayment, cancel, reset }
}
