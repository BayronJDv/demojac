import Icon from '../ui/Icon';
import styles from './PlaceCard.module.css';

const socialIcons = {
  facebook: { icon: 'facebook', label: 'Facebook' },
  instagram: { icon: 'instagram', label: 'Instagram' },
  tiktok: { icon: 'tiktok', label: 'TikTok' },
  x: { icon: 'x', label: 'X' },
  youtube: { icon: 'youtube', label: 'YouTube' },
};

export default function PlaceCard({ place, categoryLabel }) {
  const { name, logo, description, location, socials = {} } = place;

  const redes = Object.entries(socials).filter(([red]) => socialIcons[red]);

  return (
    <article className={styles.tarjeta}>
      <span className={styles.categoria}>{categoryLabel}</span>

      <header className={styles.encabezado}>
        <img
          //src={logo}\
          src="/logos/broaster.png"
          alt={`Logo de ${name}`}
          className={styles.logo}
          width="48"
          height="48"
          loading="lazy"
        />
        <h2 className={styles.nombre}>{name}</h2>
      </header>

      <p className={styles.descripcion}>{description}</p>

      <footer className={styles.pie}>
        <a
          className={styles.ubicacion}
          href={location.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="pin" size={20} />
          <span>Ubicación</span>
        </a>

        {redes.length > 0 && (
          <ul className={styles.redes}>
            {redes.map(([red, url]) => (
              <li key={red}>
                <a href={url} target="_blank" rel="noreferrer" className={styles.redLink}>
                  <Icon name={socialIcons[red].icon} size={20} />
                  <span className="sr-only">
                    {`${socialIcons[red].label} de ${name}`}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </article>
  );
}
