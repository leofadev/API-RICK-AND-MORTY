# Rick and Morty Explorer

Explorador de personajes de **Rick and Morty** construido con React y la [Rick and Morty API](https://rickandmortyapi.com).

🔗 **Demo:** [leofadev.github.io/API-RICK-AND-MORTY](https://leofadev.github.io/API-RICK-AND-MORTY/)

## Funciones

- **Búsqueda por nombre** con *debounce* para no saturar la API
- **Filtros** por estado, género y especie
- **Paginación** numerada; los filtros y la página se guardan en la URL, así una búsqueda se puede compartir
- **Vista de detalle** con origen, ubicación y todos los episodios en los que aparece el personaje
- **Favoritos** guardados en el navegador, con filtro para verlos
- **Animaciones** con [anime.js](https://animejs.com/): tarjetas que "salen del portal", portal giratorio y transiciones del detalle
- Estados de carga (esqueletos), sin resultados y error con reintento
- Diseño responsive y accesible (diálogo nativo, foco visible, respeta *reducir movimiento*)

## Tecnologías

React 18 · Vite · anime.js 4 · CSS propio · Rick and Morty API

## Estructura

```
src/
├── api/          # Llamadas a la API (personajes, favoritos por ids, episodios)
├── components/   # Header, Filters, CharacterGrid/Card, CharacterModal, Pagination...
├── hooks/        # useCharacters, useFavorites, useUrlFilters, useDebounce
└── lib/          # Traducciones y formatos, utilidades de animación
```

## Ejecutar en local

```bash
npm install
npm run dev
```

Cada push a `main` se publica automáticamente en GitHub Pages.
