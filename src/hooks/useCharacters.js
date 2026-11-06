import { useCallback, useEffect, useState } from 'react';
import { fetchCharacters, fetchCharactersByIds } from '../api/rickAndMorty';

const PAGE_SIZE = 20;

// Carga personajes según los filtros; en modo favoritos pagina localmente los ids guardados
export function useCharacters(filters, favoriteIds) {
  const [state, setState] = useState({ status: 'loading', characters: [], count: 0, pages: 0 });
  const [retry, setRetry] = useState(0);
  const favoritesKey = filters.favorites ? favoriteIds.join(',') : '';

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, status: 'loading' }));

    const load = filters.favorites
      ? loadFavorites(favoritesKey ? favoritesKey.split(',').map(Number) : [], filters, controller.signal)
      : fetchCharacters(filters, controller.signal).then(({ info, results }) => ({
          characters: results,
          count: info.count,
          pages: info.pages,
        }));

    load
      .then((data) => setState({ status: 'success', ...data }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState((s) => ({ ...s, status: 'error' }));
      });

    return () => controller.abort();
  }, [filters, favoritesKey, retry]);

  const reload = useCallback(() => setRetry((n) => n + 1), []);

  return { ...state, reload };
}

async function loadFavorites(ids, { page, name, status, gender, species }, signal) {
  const all = await fetchCharactersByIds(ids, signal);
  const matches = all.filter(
    (c) =>
      (!name || c.name.toLowerCase().includes(name.toLowerCase())) &&
      (!status || c.status.toLowerCase() === status) &&
      (!gender || c.gender.toLowerCase() === gender) &&
      (!species || c.species === species)
  );
  const start = (page - 1) * PAGE_SIZE;
  return {
    characters: matches.slice(start, start + PAGE_SIZE),
    count: matches.length,
    pages: Math.ceil(matches.length / PAGE_SIZE),
  };
}
