import { useCallback, useEffect, useState } from 'react';

/**
 * Controla el índice visible de una lista navegable.
 * @param {number} total  cantidad de elementos
 * @param {{loop?: boolean}} options
 */
export default function useCarousel(total, { loop = true } = {}) {
  const [index, setIndex] = useState(0);

  // Si cambia la lista (por ejemplo al filtrar), volvemos al inicio.
  useEffect(() => {
    setIndex(0);
  }, [total]);

  const move = useCallback(
    (step) => {
      setIndex((current) => {
        if (total === 0) return 0;
        const next = current + step;
        if (loop) return (next + total) % total;
        return Math.min(Math.max(next, 0), total - 1);
      });
    },
    [total, loop],
  );

  const next = useCallback(() => move(1), [move]);
  const previous = useCallback(() => move(-1), [move]);

  return {
    index,
    next,
    previous,
    goTo: setIndex,
    canGoNext: loop ? total > 1 : index < total - 1,
    canGoPrevious: loop ? total > 1 : index > 0,
  };
}
