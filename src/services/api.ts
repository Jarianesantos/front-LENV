import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export interface SearchParams {
  query?: string
  latitude?: number
  longitude?: number
  maxDistanceKm?: number
}

export async function searchMedications(params: SearchParams) {
  const res = await client.post('/search/medications', params)
  return res.data
}

export async function searchPharmacies(params: SearchParams) {
  const res = await client.post('/search/pharmacies', params)
  return res.data
}

export async function getMedication(id: string) {
  const res = await client.get(`/medications/${id}`)
  return res.data
}

export async function getPharmacy(id: string) {
  const res = await client.get(`/pharmacies/${id}`)
  return res.data
}

export default client
