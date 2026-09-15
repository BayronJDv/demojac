import Icon from '../ui/Icon';
import styles from './Footer.module.css';

const columnas = [
  {
    id: 'comunidad',
    titulo: 'La comuna',
    enlaces: [
      { id: 'quienes', label: 'Quiénes somos', href: '#nosotros' },
      { id: 'juntas', label: 'Juntas de acción comunal', href: '#juntas' },
      { id: 'proyectos', label: 'Proyectos en curso', href: '#proyectos' },
    ],
  },
  {
    id: 'directorio',
    titulo: 'Directorio',
    enlaces: [
      { id: 'registrar', label: 'Registrar mi negocio', href: '#registrar' },
      { id: 'categorias', label: 'Categorías', href: '#categorias' },
      { id: 'actualizar', label: 'Actualizar datos', href: '#actualizar' },
    ],
  },
  {
    id: 'ayuda',
    titulo: 'Ayuda',
    enlaces: [
      { id: 'contacto', label: 'Contacto', href: '#contacto' },
      { id: 'preguntas', label: 'Preguntas frecuentes', href: '#faq' },
      { id: 'privacidad', label: 'Tratamiento de datos', href: '#privacidad' },
    ],
  },
];

const redes = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
  { id: 'x', label: 'X', href: 'https://x.com/', icon: 'x' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contacto">
      <div className={styles.interior}>
        <div className={styles.marca}>
          <h2 className={styles.titulo}>Jac El Ingenio</h2>
          <p className={styles.descripcion}>
            Directorio de los negocios, servicios y actividades de la Comuna 17.
          </p>
          <ul className={styles.redes}>
            {redes.map((red) => (
              <li key={red.id}>
                <a href={red.href} target="_blank" rel="noreferrer" className={styles.redLink}>
                  <Icon name={red.icon} size={20} />
                  <span className="sr-only">{red.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.columnas} aria-label="Enlaces del pie de página">
          {columnas.map((columna) => (
            <div key={columna.id}>
              <h3 className={styles.columnaTitulo}>{columna.titulo}</h3>
              <ul className={styles.lista}>
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.id}>
                    <a href={enlace.href} className={styles.enlace}>
                      {enlace.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
