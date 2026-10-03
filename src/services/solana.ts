const DEVNET_RPC = 'https://api.devnet.solana.com'
const MAINNET_RPC = 'https://api.mainnet-beta.solana.com'

let rpcUrl = DEVNET_RPC

export function setNetwork(network: 'devnet' | 'mainnet') {
  rpcUrl = network === 'devnet' ? DEVNET_RPC : MAINNET_RPC
}

export function getRpcUrl() {
  return rpcUrl
}

export async function rpcCall(method: string, params: any[] = []) {
  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })
  return res.json()
}

export async function getBalance(publicKey: string): Promise<number> {
  const res = await rpcCall('getBalance', [publicKey])
  return res.result?.value ?? 0
}

export async function confirmTransaction(signature: string): Promise<boolean> {
  const res = await rpcCall('getSignatureStatuses', [[signature]])
  const status = res.result?.value?.[0]
  return status?.confirmationStatus === 'confirmed' || status?.confirmationStatus === 'finalized'
}

export async function getRecentBlockhash(): Promise<string> {
  const res = await rpcCall('getRecentBlockhash')
  return res.result?.value?.blockhash ?? ''
}
