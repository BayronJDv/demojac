import SearchBar from './SearchBar'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="inicio">
      <h1 className="hero__title">
        Descubre el <span className="hero__title-accent">Ingenio</span>
      </h1>

      <p className="hero__description">
        El esfuerzo de nuestra comunidad convertido en grandes ideas. Conoce
        los proyectos y comercios que dan vida a nuestras calles y anímate a
        fortalecer la economía local.
      </p>

      <SearchBar />
    </section>
  )
}

export default Hero
