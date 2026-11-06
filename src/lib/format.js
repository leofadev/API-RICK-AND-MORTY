export const STATUS = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' };

export const GENDER = {
  Female: 'Femenino',
  Male: 'Masculino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
};

export const SPECIES = {
  Human: 'Humano',
  Alien: 'Alienígena',
  Humanoid: 'Humanoide',
  Robot: 'Robot',
  Animal: 'Animal',
  'Mythological Creature': 'Criatura mitológica',
  Poopybutthole: 'Poopybutthole',
  Cronenberg: 'Cronenberg',
  Disease: 'Enfermedad',
  unknown: 'Desconocida',
};

export const translate = (map, value) => map[value] ?? value;

export const formatPlace = (name) => (name === 'unknown' ? 'Desconocido' : name);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
