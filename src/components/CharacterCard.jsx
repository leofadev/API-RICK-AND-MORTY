import PropTypes from 'prop-types';
import { characterShape } from '../lib/shapes';
import { GENDER, SPECIES, formatPlace, translate } from '../lib/format';
import FavoriteButton from './FavoriteButton';
import StatusBadge from './StatusBadge';
import { IconPin } from './icons';

export default function CharacterCard({ character, favorite, onToggleFavorite, onOpen }) {
  const { name, image, status, species, gender, location } = character;

  return (
    <article className="card">
      <button type="button" className="card-main" onClick={onOpen} aria-label={`Ver detalle de ${name}`}>
        <span className="card-media">
          <img src={image} alt="" loading="lazy" width="300" height="300" />
          <StatusBadge status={status} />
        </span>
        <span className="card-body">
          <span className="card-name">{name}</span>
          <span className="card-meta">
            {translate(SPECIES, species)} · {translate(GENDER, gender)}
          </span>
          <span className="card-location">
            <IconPin /> {formatPlace(location.name)}
          </span>
        </span>
      </button>
      <FavoriteButton className="card-fav" active={favorite} name={name} onToggle={onToggleFavorite} />
    </article>
  );
}

CharacterCard.propTypes = {
  character: characterShape.isRequired,
  favorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
