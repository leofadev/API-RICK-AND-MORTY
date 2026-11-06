import PropTypes from 'prop-types';
import { animate } from 'animejs';
import { prefersReducedMotion } from '../lib/motion';
import { IconHeart } from './icons';

export default function FavoriteButton({ active, name, onToggle, className = '' }) {
  const handleClick = (e) => {
    if (!prefersReducedMotion()) {
      animate(e.currentTarget.querySelector('svg'), {
        scale: [{ to: 1.5, duration: 160 }, { to: 1, duration: 500, ease: 'outElastic(1, .5)' }],
      });
    }
    onToggle();
  };

  return (
    <button
      type="button"
      className={`fav ${active ? 'is-active' : ''} ${className}`}
      aria-pressed={active}
      aria-label={active ? `Quitar a ${name} de favoritos` : `Agregar a ${name} a favoritos`}
      onClick={handleClick}
    >
      <IconHeart filled={active} />
    </button>
  );
}

FavoriteButton.propTypes = {
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
};
