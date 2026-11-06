import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { animate } from 'animejs';
import { prefersReducedMotion } from '../lib/motion';

// Portal verde de la serie: espiral SVG que gira y late
export default function Portal({ size = 64 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const spin = animate(ref.current.querySelector('.portal-swirl'), {
      rotate: { from: 0, to: 360 },
      duration: 6000,
      ease: 'linear',
      loop: true,
    });
    const pulse = animate(ref.current, {
      scale: { from: 0.94, to: 1.04 },
      duration: 1600,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });
    return () => {
      spin.revert();
      pulse.revert();
    };
  }, []);

  return (
    <svg ref={ref} className="portal" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="portal-core">
          <stop offset="0%" stopColor="#f0ffb8" />
          <stop offset="45%" stopColor="#b6e83c" />
          <stop offset="100%" stopColor="#2f8f2a" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#portal-core)" />
      <g className="portal-swirl" style={{ transformOrigin: '50px 50px' }} fill="none" strokeLinecap="round">
        <path d="M50 14a36 36 0 0 1 30 56" stroke="#e8ffa0" strokeWidth="5" />
        <path d="M50 86a36 36 0 0 1-30-56" stroke="#e8ffa0" strokeWidth="5" />
        <path d="M50 28a22 22 0 0 1 18 34" stroke="#7fcf2a" strokeWidth="4" />
        <path d="M50 72a22 22 0 0 1-18-34" stroke="#7fcf2a" strokeWidth="4" />
      </g>
    </svg>
  );
}

Portal.propTypes = {
  size: PropTypes.number,
};
