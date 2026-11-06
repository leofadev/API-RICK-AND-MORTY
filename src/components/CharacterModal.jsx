import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { animate, stagger } from 'animejs';
import { fetchEpisodes } from '../api/rickAndMorty';
import { GENDER, SPECIES, formatDate, formatPlace, translate } from '../lib/format';
import { prefersReducedMotion } from '../lib/motion';
import { characterShape } from '../lib/shapes';
import FavoriteButton from './FavoriteButton';
import StatusBadge from './StatusBadge';
import { IconX } from './icons';

function Fact({ label, value }) {
  return (
    <div className="fact">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

Fact.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default function CharacterModal({ character, favorite, onToggleFavorite, onClose }) {
  const dialogRef = useRef(null);
  const [episodes, setEpisodes] = useState({ status: 'loading', list: [] });

  // <dialog> nativo: gestiona el foco, Escape y el fondo. No se cierra en la limpieza:
  // al desmontarse sale del DOM, y cerrarlo dispararía onClose (en StrictMode, justo al abrir)
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    if (!prefersReducedMotion()) {
      animate(dialog.querySelector('.modal'), {
        opacity: { from: 0 },
        scale: { from: 0.85 },
        rotateX: { from: 12 },
        duration: 600,
        ease: 'outExpo',
      });
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchEpisodes(character.episode, controller.signal)
      .then((list) => setEpisodes({ status: 'success', list }))
      .catch((e) => e.name !== 'AbortError' && setEpisodes({ status: 'error', list: [] }));
    return () => controller.abort();
  }, [character]);

  useLayoutEffect(() => {
    if (episodes.status !== 'success' || prefersReducedMotion()) return;
    animate(dialogRef.current.querySelectorAll('.episode'), {
      opacity: { from: 0 },
      translateX: { from: -12 },
      delay: stagger(20, { start: 100 }),
      duration: 400,
      ease: 'outQuad',
    });
  }, [episodes.status]);

  const { name, image, status, species, type, gender, origin, location, created } = character;
  const first = episodes.list[0];
  const last = episodes.list.at(-1);

  return (
    <dialog
      ref={dialogRef}
      className="modal-backdrop"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className="modal">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          <IconX />
        </button>

        <div className="modal-media">
          <img src={image} alt={name} width="300" height="300" />
          <FavoriteButton className="modal-fav" active={favorite} name={name} onToggle={onToggleFavorite} />
        </div>

        <div className="modal-content">
          <StatusBadge status={status} />
          <h2 id="modal-title" className="modal-title">{name}</h2>

          <dl className="facts">
            <Fact label="Especie" value={translate(SPECIES, species)} />
            {type && <Fact label="Tipo" value={type} />}
            <Fact label="Género" value={translate(GENDER, gender)} />
            <Fact label="Origen" value={formatPlace(origin.name)} />
            <Fact label="Última ubicación" value={formatPlace(location.name)} />
            <Fact label="Registrado" value={formatDate(created)} />
          </dl>

          <section className="episodes" aria-labelledby="episodes-title">
            <h3 id="episodes-title">
              Aparece en {character.episode.length} {character.episode.length === 1 ? 'episodio' : 'episodios'}
            </h3>
            {episodes.status === 'loading' && <p className="muted">Cargando episodios…</p>}
            {episodes.status === 'error' && <p className="muted">No se pudieron cargar los episodios.</p>}
            {episodes.status === 'success' && (
              <>
                {first && (
                  <p className="muted">
                    Primera aparición: <strong>{first.episode}</strong> · {first.name}
                    {last !== first && (
                      <>
                        <br />
                        Última aparición: <strong>{last.episode}</strong> · {last.name}
                      </>
                    )}
                  </p>
                )}
                <ul className="episode-list">
                  {episodes.list.map((ep) => (
                    <li key={ep.id} className="episode" title={ep.air_date}>
                      <span className="episode-code">{ep.episode}</span> {ep.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </div>
    </dialog>
  );
}

CharacterModal.propTypes = {
  character: characterShape.isRequired,
  favorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
