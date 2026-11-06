import PropTypes from 'prop-types';
import { IconChevron } from './icons';

// Páginas visibles: primera, última y dos a cada lado de la actual, con "…" en los saltos
function pageList(page, pages) {
  const list = [];
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || Math.abs(p - page) <= 2) list.push(p);
    else if (list.at(-1) !== '…') list.push('…');
  }
  return list;
}

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Paginación">
      <button type="button" className="page-btn" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Página anterior">
        <IconChevron direction="left" />
      </button>
      {pageList(page, pages).map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="page-gap">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={`page-btn ${p === page ? 'is-active' : ''}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}
      <button type="button" className="page-btn" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="Página siguiente">
        <IconChevron />
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
