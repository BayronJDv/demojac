import { useId } from 'react';
import Icon from '../ui/Icon';
import styles from './CategorySelect.module.css';

export default function CategorySelect({ categories, value, onChange }) {
  const selectId = useId();

  return (
    <div className={styles.bloque}>
      <label htmlFor={selectId} className={styles.etiqueta}>
        Estás viendo …
      </label>

      <div className={styles.campo}>
        <select
          id={selectId}
          className={styles.select}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {categories.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={20} className={styles.flecha} />
      </div>
    </div>
  );
}
