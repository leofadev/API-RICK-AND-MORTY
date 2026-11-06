import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from '../hooks/useDebounce';
import { GENDER, SPECIES, STATUS } from '../lib/format';
import { IconHeart, IconSearch, IconX } from './icons';

const options = (map) => Object.entries(map).map(([value, label]) => ({ value, label }));

const STATUS_OPTIONS = options(STATUS).map((o) => ({ ...o, value: o.value.toLowerCase() }));
const GENDER_OPTIONS = options(GENDER).map((o) => ({ ...o, value: o.value.toLowerCase() }));
const SPECIES_OPTIONS = options(SPECIES);

function Select({ label, value, onChange, items }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Todos</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>
    </label>
  );
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })).isRequired,
};

export default function Filters({ filters, onChange, onReset, favoritesCount }) {
  // El texto se escribe localmente y se aplica con un pequeño retraso para no saturar la API
  const [name, setName] = useState(filters.name);
  const debouncedName = useDebounce(name);

  // Solo reacciona a lo que escribe el usuario; así "Limpiar" no reaplica el texto anterior
  const currentName = useRef(filters.name);
  currentName.current = filters.name;
  useEffect(() => {
    if (debouncedName !== currentName.current) onChange({ name: debouncedName });
  }, [debouncedName, onChange]);

  const hasFilters =
    filters.name || filters.status || filters.gender || filters.species || filters.favorites;

  return (
    <section className="filters" aria-label="Filtros">
      <label className="search">
        <IconSearch />
        <input
          type="search"
          placeholder="Busca un personaje: Rick, Morty, Birdperson…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Buscar por nombre"
        />
      </label>

      <div className="filters-row">
        <Select label="Estado" value={filters.status} onChange={(status) => onChange({ status })} items={STATUS_OPTIONS} />
        <Select label="Género" value={filters.gender} onChange={(gender) => onChange({ gender })} items={GENDER_OPTIONS} />
        <Select label="Especie" value={filters.species} onChange={(species) => onChange({ species })} items={SPECIES_OPTIONS} />

        <button
          type="button"
          className={`chip ${filters.favorites ? 'is-active' : ''}`}
          aria-pressed={filters.favorites}
          onClick={() => onChange({ favorites: !filters.favorites })}
        >
          <IconHeart filled={filters.favorites} /> Favoritos
          <span className="chip-count">{favoritesCount}</span>
        </button>

        {hasFilters && (
          <button
            type="button"
            className="chip chip-ghost"
            onClick={() => {
              setName('');
              onReset();
            }}
          >
            <IconX /> Limpiar
          </button>
        )}
      </div>
    </section>
  );
}

Filters.propTypes = {
  filters: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    gender: PropTypes.string,
    species: PropTypes.string,
    favorites: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  favoritesCount: PropTypes.number.isRequired,
};
