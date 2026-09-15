import Icon from './Icon';
import styles from './MobileBar.module.css';

export default function MobileBar({ isMenuOpen, onOpenMenu }) {
  return (
    <div className={styles.barra}>
      <button
        type="button"
        className={styles.boton}
        onClick={onOpenMenu}
        aria-expanded={isMenuOpen}
        aria-controls="menu-principal"
      >
        <Icon name="menu" size={24} />
        <span className="sr-only">Abrir menú</span>
      </button>

      <a href="#inicio" className={styles.marca}>
        <img
          src="/logos/el-ingenio.png"
          alt="El Ingenio, Comuna 17"
          className={styles.logo}
          width="132"
          height="40"
        />
      </a>
    </div>
  );
}
