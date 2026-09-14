import SocialLinks from './SocialLinks'
import logo from '../assets/el inegnio.png'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Actividades', href: '#actividades' },
  { label: 'Contacto', href: '#contacto' },
]

function Navbar({ onAfiliacion }) {
  return (
    <header className="navbar">
      <a href="#inicio" className="navbar__logo">
        <img src={logo} alt="El Ingenio - Comuna 17" />
      </a>

      <nav className="navbar__nav" aria-label="Navegación principal">
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} className="navbar__link">
            {label}
          </a>
        ))}
      </nav>

      <div className="navbar__actions">
        <SocialLinks />
        <button type="button" className="navbar__cta" onClick={onAfiliacion}>
          Afiliacion
        </button>
      </div>
    </header>
  )
}

export default Navbar
