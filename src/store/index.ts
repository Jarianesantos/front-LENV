import { create } from 'zustand'
import type { PaymentState, Medication, Pharmacy, WalletInfo } from '../types'

interface LenvState {
  darkMode: boolean
  toggleDarkMode: () => void

  paymentState: PaymentState
  setPaymentState: (s: PaymentState) => void

  currentMedication: Medication | null
  setMedication: (m: Medication | null) => void

  currentPharmacy: Pharmacy | null
  setPharmacy: (p: Pharmacy | null) => void

  wallet: WalletInfo
  setWallet: (w: WalletInfo) => void

  searchQuery: string
  setSearchQuery: (q: string) => void
}

export const useLenvStore = create<LenvState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

  paymentState: 'IDLE',
  setPaymentState: (paymentState) => set({ paymentState }),

  currentMedication: null,
  setMedication: (currentMedication) => set({ currentMedication }),

  currentPharmacy: null,
  setPharmacy: (currentPharmacy) => set({ currentPharmacy }),

  wallet: { connected: false, publicKey: null, balance: 0 },
  setWallet: (wallet) => set({ wallet }),

  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}))
