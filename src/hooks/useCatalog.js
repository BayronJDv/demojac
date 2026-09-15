import { useMemo, useState } from 'react';
import useCarousel from './useCarousel';

const normalize = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/**
 * Concentra el estado del catálogo: categoría activa, búsqueda y
 * navegación entre resultados. La vista solo se encarga de pintar.
 */
export default function useCatalog(places, categories) {
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '');
  const [query, setQuery] = useState('');

  const visiblePlaces = useMemo(() => {
    const termino = normalize(query.trim());

    return places.filter((place) => {
      if (place.categoryId !== categoryId) return false;
      if (!termino) return true;

      return (
        normalize(place.name).includes(termino) ||
        normalize(place.description).includes(termino)
      );
    });
  }, [places, categoryId, query]);

  const { index, next, previous, goTo } = useCarousel(visiblePlaces.length);

  const categoryLabel =
    categories.find((categoria) => categoria.id === categoryId)?.label ?? '';

  return {
    categoryId,
    setCategoryId,
    query,
    setQuery,
    categoryLabel,
    visiblePlaces,
    currentPlace: visiblePlaces[index] ?? null,
    position: visiblePlaces.length === 0 ? 0 : index + 1,
    total: visiblePlaces.length,
    next,
    previous,
    goTo,
  };
}
