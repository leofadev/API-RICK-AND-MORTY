import PropTypes from 'prop-types';
import { STATUS, translate } from '../lib/format';

export default function StatusBadge({ status }) {
  return (
    <span className={`status status-${status.toLowerCase()}`}>
      <span className="status-dot" aria-hidden="true" />
      {translate(STATUS, status)}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
