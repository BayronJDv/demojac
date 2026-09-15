import { useEffect, useRef } from 'react';
import Icon from '../ui/Icon';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import styles from './Sidebar.module.css';

const navItems = [
  { id: 'inicio', label: 'Inicio', href: '/', icon: 'home' },
  { id: 'nosotros', label: 'Nosotros', href: '#nosotros', icon: 'users' },
  { id: 'actividades', label: 'Actividades', href: '#actividades', icon: 'clipboard' },
  { id: 'contacto', label: 'Contacto', href: '#contacto', icon: 'phone' },
];

const socialLinks = [
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
  { id: 'x', label: 'X', href: 'https://x.com/', icon: 'x' },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
];

export default function Sidebar({ isOpen, onClose, currentSection = 'inicio' }) {
  const panelRef = useRef(null);

  useBodyScrollLock(isOpen);

  // Cerrar con Escape y mover el foco al panel al abrirse.
  useEffect(() => {
    if (!isOpen) return undefined;

    panelRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        id="menu-principal"
        ref={panelRef}
        tabIndex={-1}
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
      >
        <div className={styles.headerMovil}>
          <button type="button" className={styles.cerrar} onClick={onClose}>
            <Icon name="close" size={22} />
            <span className="sr-only">Cerrar menú</span>
          </button>
        </div>

        <a href="#inicio" className={styles.marca} onClick={onClose}>
          <img
            src="/logos/el-ingenio.png"
            alt="El Ingenio, Comuna 17"
            className={styles.logo}
            width="180"
            height="56"
          />
        </a>

        <nav aria-label="Navegación principal">
          <ul className={styles.nav}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  aria-current={currentSection === item.id ? 'page' : undefined}
                  onClick={onClose}
                >
                  <Icon name={item.icon} size={22} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.redes}>
          {socialLinks.map((red) => (
            <li key={red.id}>
              <a
                href={red.href}
                className={styles.redLink}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name={red.icon} size={20} />
                <span className="sr-only">{red.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
