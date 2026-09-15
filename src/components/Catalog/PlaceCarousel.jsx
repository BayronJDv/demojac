import Icon from '../ui/Icon';
import PlaceCard from './PlaceCard';
import styles from './PlaceCarousel.module.css';

export default function PlaceCarousel({
  place,
  categoryLabel,
  total,
  onNext,
  onPrevious,
}) {
  const hayVarios = total > 1;

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      onNext();
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      onPrevious();
    }
  };

  return (
    <div
      className={styles.carrusel}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Lugares de la categoría"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.slot} aria-live="polite">
        {place ? (
          <PlaceCard place={place} categoryLabel={categoryLabel} />
        ) : (
          <p className={styles.vacio}>
            No hay lugares que coincidan con la búsqueda. Cambia de categoría o
            escribe otro nombre.
          </p>
        )}
      </div>

      {hayVarios && (
        <div className={styles.controles}>
          <button type="button" className={styles.boton} onClick={onPrevious}>
            <Icon name="chevronUp" size={24} strokeWidth={2} />
            <span className="sr-only">Lugar anterior</span>
          </button>
          <button type="button" className={styles.boton} onClick={onNext}>
            <Icon name="chevronDown" size={24} strokeWidth={2} />
            <span className="sr-only">Siguiente lugar</span>
          </button>
        </div>
      )}
    </div>
  );
}
