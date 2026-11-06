import PropTypes from 'prop-types';

// Iconos SVG en línea (evita una dependencia solo para 5 iconos)
const Svg = ({ children, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {children}
  </svg>
);

Svg.propTypes = { children: PropTypes.node.isRequired };

export const IconSearch = () => (
  <Svg><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>
);

export const IconX = () => (
  <Svg><path d="M18 6 6 18M6 6l12 12" /></Svg>
);

export const IconHeart = ({ filled = false }) => (
  <Svg fill={filled ? 'currentColor' : 'none'}>
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
  </Svg>
);

IconHeart.propTypes = { filled: PropTypes.bool };

export const IconChevron = ({ direction = 'right' }) => (
  <Svg>{direction === 'right' ? <path d="m9 18 6-6-6-6" /> : <path d="m15 18-6-6 6-6" />}</Svg>
);

IconChevron.propTypes = { direction: PropTypes.oneOf(['left', 'right']) };

export const IconPin = () => (
  <Svg><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>
);
