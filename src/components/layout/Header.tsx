import type { Route } from '../../App'

interface Props {
  navigate: (r: Route) => void
}

export default function Header({ navigate }: Props) {
  return (
    <header className="bg-primary-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <button onClick={() => navigate('home')} className="flex items-center gap-2">
        <span className="text-primary-500 font-bold text-xl">LENV</span>
        <span className="text-info100 text-sm hidden sm:inline">Encontre. Pague. Retire.</span>
      </button>
      <div className="flex items-center gap-2 text-sm text-info100">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6c0 5.25 6 10 6 10s6-4.75 6-10a6 6 0 00-6-6zm0 8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
        </svg>
        <span>São Paulo, SP</span>
      </div>
    </header>
  )
}
