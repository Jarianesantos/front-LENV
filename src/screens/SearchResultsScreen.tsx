import { useState, useEffect } from 'react'
import MedicationCard from '../components/medication/MedicationCard'
import GenericCard from '../components/medication/GenericCard'
import SearchBar from '../components/search/SearchBar'
import type { Route } from '../App'
import type { Medication, Pharmacy } from '../types'

interface Props {
  query: string
  navigate: (r: Route, query?: string) => void
}

const MOCK_RESULTS: (Pharmacy & { medication: Medication })[] = [
  {
    id: '1',
    name: 'Dipirona Sódica 500mg',
    medication: {
      id: 'm1',
      nameCommercial: 'Novalgina 500mg',
      principleActive: 'Dipirona monoidratada',
      concentration: '500 mg',
      pharmaceuticalForm: 'Comprimido',
      availability: 'available',
      hasGeneric: true,
      genericPrice: 8.9,
      referencePrice: 22.5,
    },
    address: 'Av. Paulista, 1000',
    latitude: -23.5614,
    longitude: -46.6559,
    distance: 450,
    price: 22.5,
    availability: 'available',
  },
  {
    id: '2',
    name: 'Losartana Potássica 50mg',
    medication: {
      id: 'm2',
      nameCommercial: 'Cozaar 50mg',
      principleActive: 'Losartana potássica',
      concentration: '50 mg',
      pharmaceuticalForm: 'Comprimido',
      availability: 'limited',
      hasGeneric: true,
      genericPrice: 12.9,
      referencePrice: 35.0,
    },
    address: 'Rua Augusta, 500',
    latitude: -23.5559,
    longitude: -46.6623,
    distance: 780,
    price: 35.0,
    availability: 'limited',
  },
  {
    id: '3',
    name: 'Omeprazol 20mg',
    medication: {
      id: 'm3',
      nameCommercial: 'Losec 20mg',
      principleActive: 'Omeprazol',
      concentration: '20 mg',
      pharmaceuticalForm: 'Cápsula',
      availability: 'available',
      hasGeneric: false,
    },
    address: 'Rua Oscar Freire, 200',
    latitude: -23.5618,
    longitude: -46.6747,
    distance: 1200,
    price: 18.9,
    availability: 'available',
  },
]

export default function SearchResultsScreen({ query, navigate }: Props) {
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<(Pharmacy & { medication: Medication })[]>([])
  const [showGeneric, setShowGeneric] = useState<Medication | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setResults(MOCK_RESULTS)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="space-y-4">
      <SearchBar onSearch={() => {}} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-primary-900/60 dark:text-dark-secondary">
          {loading ? 'Buscando...' : `Encontramos ${results.length} farmácias perto de você.`}
        </p>
        <div className="flex bg-surface-000 dark:bg-dark-surface rounded-full p-1 shadow-sm">
          {(['list', 'map'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-primary-500 text-white'
                  : 'text-primary-900/60 dark:text-dark-secondary'
              }`}
            >
              {mode === 'list' ? 'Lista' : 'Mapa'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-5 bg-info100/50 rounded w-3/4 mb-2" />
              <div className="h-3 bg-info100/30 rounded w-1/2 mb-3" />
              <div className="flex justify-between">
                <div className="h-4 bg-info100/30 rounded w-20" />
                <div className="h-4 bg-info100/30 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-primary-900/60 dark:text-dark-secondary">Nenhum resultado encontrado</p>
          <p className="text-sm text-primary-900/40 mt-1">Tente outro termo de busca</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="space-y-4">
          {results.map((item) => (
            <MedicationCard
              key={item.id}
              medication={item.medication}
              distance={item.distance}
              price={item.price}
              onDetail={() => navigate('checkout')}
            />
          ))}
        </div>
      ) : (
        <div className="card h-64 flex items-center justify-center bg-info100/30">
          <p className="text-sm text-primary-900/50">Mapa com {results.length} farmácias</p>
        </div>
      )}

      {showGeneric && (
        <GenericCard
          medication={showGeneric}
          onClose={() => setShowGeneric(null)}
          onViewGeneric={() => setShowGeneric(null)}
        />
      )}
    </div>
  )
}
