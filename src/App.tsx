import { useState } from 'react'
import Header from './components/layout/Header'
import HomeScreen from './screens/HomeScreen'
import SearchResultsScreen from './screens/SearchResultsScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import PaymentStatusScreen from './screens/PaymentStatusScreen'

export type Route = 'home' | 'results' | 'checkout' | 'payment'

export default function App() {
  const [route, setRoute] = useState<Route>('home')
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = (r: Route, query?: string) => {
    if (query !== undefined) setSearchQuery(query)
    setRoute(r)
  }

  return (
    <div className="min-h-screen bg-primary-050 dark:bg-dark-bg">
      <Header navigate={navigate} />
      <main className="max-w-lg mx-auto px-4 pb-20 pt-4">
        {route === 'home' && <HomeScreen navigate={navigate} />}
        {route === 'results' && <SearchResultsScreen query={searchQuery} navigate={navigate} />}
        {route === 'checkout' && <CheckoutScreen navigate={navigate} />}
        {route === 'payment' && <PaymentStatusScreen navigate={navigate} />}
      </main>
    </div>
  )
}
