import { useState, useCallback } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import MobileBar from '../../components/ui/MobileBar';
import SearchBar from '../../components/Catalog/SearchBar';
import CategorySelect from '../../components/Catalog/CategorySelect';
import PlaceCarousel from '../../components/Catalog/PlaceCarousel';
import Footer from '../../components/Footer/Footer';
import useCatalog from '../../hooks/useCatalog';
import PublicFeed from '../../pages/FeedPage/Feed/PublicFeed';
import { categories, places } from '../../data/places';
import styles from '../../App.module.css';


export default function FeedPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const abrirMenu = useCallback(() => setIsMenuOpen(true), []);
  const cerrarMenu = useCallback(() => setIsMenuOpen(false), []);

  const {
    categoryId,
    setCategoryId,
    query,
    setQuery,
    categoryLabel,
    currentPlace,
    position,
    total,
    next,
    previous,
  } = useCatalog(places, categories);

  return (
    <div className={styles.app}>
      <MobileBar isMenuOpen={isMenuOpen} onOpenMenu={abrirMenu} />

      <main className={styles.pagina} id="inicio">
        <h1 className="sr-only">Directorio de la Comuna 17</h1>

        {/* Columna izquierda */}
        <aside className={styles.columnaIzquierda}>
          <Sidebar isOpen={isMenuOpen} onClose={cerrarMenu} />
          <CategorySelect
            categories={categories}
            value={categoryId}
            onChange={setCategoryId}
          />
          <p className={styles.contador}>
            {total === 0 ? 'Sin resultados' : `Mostrando ${position} de ${total}`}
          </p>
        </aside>

        {/* Columna central */}
        <section className={styles.columnaCentro}>
          <PublicFeed/>
        </section>

        {/* Columna derecha */}
        <aside className={styles.columnaDerecha}>
          <SearchBar value={query} onChange={setQuery} />
          <PlaceCarousel
            place={currentPlace}
            categoryLabel={categoryLabel}
            total={total}
            onNext={next}
            onPrevious={previous}
          />
        </aside>
      </main>

      <Footer />
    </div>
  );
}