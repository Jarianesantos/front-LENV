import { useState, useCallback } from 'react'

interface Props {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('')
  const [listening, setListening] = useState(false)

  const debouncedSearch = useCallback(
    (() => {
      let timer: ReturnType<typeof setTimeout>
      return (q: string) => {
        clearTimeout(timer)
        timer = setTimeout(() => onSearch(q), 300)
      }
    })(),
    [onSearch]
  )

  const handleChange = (value: string) => {
    setQuery(value)
    if (value.length > 1) debouncedSearch(value)
  }

  const handleVoice = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = 'pt-BR'
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript
      setQuery(text)
      onSearch(text)
      setListening(false)
    }
    recognition.onend = () => setListening(false)
    setListening(true)
    recognition.start()
  }

  return (
    <div className="relative">
      <div className="flex items-center bg-surface-000 dark:bg-dark-surface rounded-full border border-info100 px-4 py-3 shadow-sm">
        <svg className="w-5 h-5 text-primary-900 dark:text-dark-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="O que você está procurando?"
          className="flex-1 bg-transparent outline-none text-primary-900 dark:text-dark-text placeholder:text-primary-900/40 text-base"
        />
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={handleVoice}
            className={`p-2 rounded-full transition-colors ${listening ? 'bg-error text-white' : 'hover:bg-primary-050 text-primary-500'}`}
            aria-label="Buscar por voz"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button
            className="p-2 rounded-full hover:bg-primary-050 text-primary-500 transition-colors"
            aria-label="Buscar por imagem"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
