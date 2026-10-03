import { useState, useEffect, useCallback } from 'react'

export function useGeolocation() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  return { coords, loading, error }
}

export function useSearch(initialQuery: string) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(async (q: string) => {
    if (!q || q.length < 2) return
    setLoading(true)
    setQuery(q)
    setTimeout(() => {
      setResults([])
      setLoading(false)
    }, 500)
  }, [])

  return { query, results, loading, search, setQuery }
}
