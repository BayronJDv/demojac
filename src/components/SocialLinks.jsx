import facebook from '../assets/logos/facebook.svg'
import instagram from '../assets/logos/instagram.svg'
import x from '../assets/logos/x.svg'
import youtube from '../assets/logos/youtube.svg'
import './SocialLinks.css'

const SOCIAL_NETWORKS = [
  { name: 'Facebook', href: 'https://facebook.com', icon: facebook },
  { name: 'Instagram', href: 'https://instagram.com', icon: instagram },
  { name: 'X', href: 'https://x.com', icon: x },
  { name: 'YouTube', href: 'https://youtube.com', icon: youtube },
]

function SocialLinks() {
  return (
    <div className="social-links">
      {SOCIAL_NETWORKS.map(({ name, href, icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={name}
          className="social-links__item"
        >
          <img src={icon} alt="" width={22} height={22} />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
