import PropTypes from 'prop-types';
import Portal from './Portal';

export default function Header({ count, loading }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href={import.meta.env.BASE_URL} className="brand">
          <Portal size={56} />
          <span>
            <span className="brand-title">Rick and Morty</span>
            <span className="brand-subtitle">Explorador del multiverso</span>
          </span>
        </a>
        <p className="header-count" aria-live="polite">
          {loading ? 'Abriendo portal…' : `${count.toLocaleString('es-CO')} personajes encontrados`}
        </p>
      </div>
    </header>
  );
}

Header.propTypes = {
  count: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
