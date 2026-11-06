import { useState } from 'react';
import { useCharacters } from './hooks/useCharacters';
import { useFavorites } from './hooks/useFavorites';
import { useUrlFilters } from './hooks/useUrlFilters';
import Header from './components/Header';
import Filters from './components/Filters';
import CharacterGrid from './components/CharacterGrid';
import SkeletonGrid from './components/SkeletonGrid';
import Pagination from './components/Pagination';
import CharacterModal from './components/CharacterModal';
import { EmptyState, ErrorState } from './components/Feedback';

export default function App() {
  const { filters, update, reset } = useUrlFilters();
  const { favorites, isFavorite, toggle } = useFavorites();
  const { status, characters, count, pages, reload } = useCharacters(filters, favorites);
  const [selected, setSelected] = useState(null);

  const changePage = (page) => {
    update({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header count={count} loading={status === 'loading'} />

      <main className="container main">
        <Filters filters={filters} onChange={update} onReset={reset} favoritesCount={favorites.length} />

        {status === 'loading' && <SkeletonGrid />}
        {status === 'error' && <ErrorState onRetry={reload} />}
        {status === 'success' &&
          (characters.length ? (
            <>
              <CharacterGrid
                characters={characters}
                isFavorite={isFavorite}
                onToggleFavorite={toggle}
                onOpen={setSelected}
              />
              <Pagination page={filters.page} pages={pages} onChange={changePage} />
            </>
          ) : (
            <EmptyState favorites={filters.favorites} onReset={reset} />
          ))}
      </main>

      <footer className="footer container">
        <p>
          Datos de <a href="https://rickandmortyapi.com" target="_blank" rel="noreferrer">The Rick and Morty API</a> ·
          Hecho por <a href="https://leofadev.github.io/Portafolio/" target="_blank" rel="noreferrer">Leonardo Pinto</a>
        </p>
      </footer>

      {selected && (
        <CharacterModal
          character={selected}
          favorite={isFavorite(selected.id)}
          onToggleFavorite={() => toggle(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
