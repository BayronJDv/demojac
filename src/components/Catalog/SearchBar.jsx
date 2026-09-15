import { useId } from 'react';
import Icon from '../ui/Icon';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Buscar un lugar' }) {
  const inputId = useId();

  return (
    <div className={styles.contenedor}>
      <label htmlFor={inputId} className="sr-only">
        Buscar lugares
      </label>
      <Icon name="search" size={20} className={styles.icono} />
      <input
        id={inputId}
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
