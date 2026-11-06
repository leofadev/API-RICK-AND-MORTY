import { useCallback, useState } from 'react';

const DEFAULTS = { page: 1, name: '', status: '', gender: '', species: '', favorites: false };

function read() {
  const params = new URLSearchParams(window.location.search);
  return {
    page: Math.max(1, Number(params.get('page')) || 1),
    name: params.get('name') ?? '',
    status: params.get('status') ?? '',
    gender: params.get('gender') ?? '',
    species: params.get('species') ?? '',
    favorites: params.get('favorites') === '1',
  };
}

function write(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value === DEFAULTS[key]) return;
    params.set(key, value === true ? '1' : value);
  });
  const query = params.toString();
  window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
}

// Filtros sincronizados con la URL para poder compartir una búsqueda
export function useUrlFilters() {
  const [filters, setFilters] = useState(read);

  const update = useCallback((changes) => {
    setFilters((current) => {
      // Cualquier cambio que no sea de página vuelve a la página 1
      const next = { ...current, ...changes, ...(!('page' in changes) && { page: 1 }) };
      write(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    write(DEFAULTS);
    setFilters(DEFAULTS);
  }, []);

  return { filters, update, reset };
}
