import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/Homepage.jsx'
import FeedPage from './pages/FeedPage/FeedPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Descubre" element={<FeedPage />} />
      <Route
        path="*"
        element={
          <div className="h-screen flex items-center justify-center bg-charcoal-950 text-cream font-body">
            <p>Página no encontrada.</p>
          </div>
        }
      />
    </Routes>
  )
}
