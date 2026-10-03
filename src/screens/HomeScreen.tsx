import SearchBar from '../components/search/SearchBar'
import type { Route } from '../App'

interface Props {
  navigate: (r: Route, query?: string) => void
}

export default function HomeScreen({ navigate }: Props) {
  return (
    <div className="flex flex-col items-center pt-12 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-900 dark:text-dark-text mb-2">
          Encontre. Pague. Retire.
        </h1>
        <p className="text-base text-primary-900/60 dark:text-dark-secondary">
          Medicamentos nas farmácias mais próximas de você.
        </p>
      </div>

      <div className="w-full">
        <SearchBar onSearch={(q) => navigate('results', q)} />
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
        {[
          { icon: '🔍', label: 'Texto' },
          { icon: '📷', label: 'Imagem' },
          { icon: '🎤', label: 'Voz' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 p-4 bg-surface-000 dark:bg-dark-surface rounded-lg shadow-sm"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs text-primary-900/60 dark:text-dark-secondary">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-sm">
        <p className="text-sm text-primary-900/40 dark:text-dark-secondary/60 text-center mb-3">
          Buscas populares
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['Dipirona', 'Losartana', 'Amoxicilina', 'Omeprazol'].map((q) => (
            <button
              key={q}
              onClick={() => navigate('results', q)}
              className="px-4 py-2 bg-surface-000 dark:bg-dark-surface rounded-full text-sm text-primary-900 dark:text-dark-text shadow-sm hover:bg-primary-050 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
