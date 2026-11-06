import { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { animate, stagger } from 'animejs';
import { prefersReducedMotion } from '../lib/motion';
import { characterShape } from '../lib/shapes';
import CharacterCard from './CharacterCard';

export default function CharacterGrid({ characters, isFavorite, onToggleFavorite, onOpen }) {
  const ref = useRef(null);

  // Las tarjetas "salen del portal": giran y crecen en cascada cada vez que llega una página nueva
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !characters.length) return;
    const anim = animate(ref.current.children, {
      opacity: { from: 0 },
      scale: { from: 0.6 },
      rotateY: { from: -60 },
      translateY: { from: 40 },
      delay: stagger(45),
      duration: 800,
      ease: 'outExpo',
    });
    return () => anim.revert();
  }, [characters]);

  return (
    <div className="grid" ref={ref}>
      {characters.map((c) => (
        <CharacterCard
          key={c.id}
          character={c}
          favorite={isFavorite(c.id)}
          onToggleFavorite={() => onToggleFavorite(c.id)}
          onOpen={() => onOpen(c)}
        />
      ))}
    </div>
  );
}

CharacterGrid.propTypes = {
  characters: PropTypes.arrayOf(characterShape).isRequired,
  isFavorite: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
