const API = 'https://rickandmortyapi.com/api';

async function request(url, signal) {
  const res = await fetch(url, { signal });
  // La API responde 404 cuando un filtro no tiene resultados
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Error ${res.status} al consultar la API`);
  return res.json();
}

const toArray = (data) => (data ? [].concat(data) : []);

export async function fetchCharacters({ page, name, status, gender, species }, signal) {
  const params = new URLSearchParams({ page });
  if (name) params.set('name', name);
  if (status) params.set('status', status);
  if (gender) params.set('gender', gender);
  if (species) params.set('species', species);

  const data = await request(`${API}/character?${params}`, signal);
  return data ?? { info: { count: 0, pages: 0 }, results: [] };
}

// Con varios ids la API devuelve un arreglo; con uno solo, un objeto
export async function fetchCharactersByIds(ids, signal) {
  if (!ids.length) return [];
  return toArray(await request(`${API}/character/${ids.join(',')}`, signal));
}

export async function fetchEpisodes(episodeUrls, signal) {
  const ids = episodeUrls.map((url) => url.split('/').pop());
  if (!ids.length) return [];
  return toArray(await request(`${API}/episode/${ids.join(',')}`, signal));
}
