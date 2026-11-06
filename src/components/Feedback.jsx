import PropTypes from 'prop-types';
import Portal from './Portal';

export function EmptyState({ favorites, onReset }) {
  return (
    <div className="feedback">
      <Portal size={96} />
      <h2>{favorites ? 'Aún no tienes favoritos aquí' : 'Ningún personaje en esta dimensión'}</h2>
      <p>
        {favorites
          ? 'Marca personajes con el corazón para verlos en esta lista.'
          : 'Prueba con otro nombre o quita algunos filtros.'}
      </p>
      <button type="button" className="btn" onClick={onReset}>Limpiar filtros</button>
    </div>
  );
}

EmptyState.propTypes = {
  favorites: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
};

export function ErrorState({ onRetry }) {
  return (
    <div className="feedback" role="alert">
      <Portal size={96} />
      <h2>El portal no respondió</h2>
      <p>No pudimos conectar con la API de Rick and Morty. Revisa tu conexión e intenta de nuevo.</p>
      <button type="button" className="btn" onClick={onRetry}>Reintentar</button>
    </div>
  );
}

ErrorState.propTypes = {
  onRetry: PropTypes.func.isRequired,
};
