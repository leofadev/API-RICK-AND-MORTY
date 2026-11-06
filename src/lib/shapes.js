import PropTypes from 'prop-types';

export const characterShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  type: PropTypes.string,
  gender: PropTypes.string.isRequired,
  origin: PropTypes.shape({ name: PropTypes.string }).isRequired,
  location: PropTypes.shape({ name: PropTypes.string }).isRequired,
  episode: PropTypes.arrayOf(PropTypes.string).isRequired,
  created: PropTypes.string.isRequired,
});
