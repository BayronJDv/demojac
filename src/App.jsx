import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import GlowLights from './components/GlowLights'
import Afiliacion from './components/Afiliacion'

import './App.css'

function App() {
  const [vista, setVista] = useState('inicio') // inicio | afiliacion

  return (
    <>
      <Navbar onAfiliacion={() => setVista('afiliacion')} />
      <main className="page">
        <GlowLights />
        {vista === 'afiliacion' ? (
          <Afiliacion key="afiliacion" />
        ) : (
          <>
            <Hero />
            <Categories />
          </>
        )}
      </main>
    </>
  )
}

export default App
