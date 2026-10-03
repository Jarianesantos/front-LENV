export type Availability = 'available' | 'limited' | 'unavailable'

export type PaymentState =
  | 'IDLE'
  | 'CHECKOUT'
  | 'WALLET_CONNECT'
  | 'AWAITING_SIGNATURE'
  | 'PROCESSING'
  | 'CONFIRMED'
  | 'REJECTED'
  | 'FAILED'
  | 'EXPIRED'
  | 'CANCELLED'

export interface Medication {
  id: string
  nameCommercial: string
  principleActive: string
  concentration: string
  pharmaceuticalForm: string
  availability: Availability
  hasGeneric: boolean
  genericPrice?: number
  referencePrice?: number
}

export interface Pharmacy {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  distance: number
  medication: Medication
  price: number
  availability: Availability
}

export interface SearchResult {
  medications: Medication[]
  total: number
}

export interface PaymentOrder {
  orderId: string
  medication: Medication
  pharmacy: Pharmacy
  price: number
  distance: number
  status: PaymentState
  transactionSignature?: string
}

export interface WalletInfo {
  connected: boolean
  publicKey: string | null
  balance: number
}
