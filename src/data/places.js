/**
 * Datos de ejemplo. Cuando conectes el backend, reemplaza estas constantes
 * por la respuesta de tu API manteniendo la misma forma de objeto.
 */

export const categories = [
  { id: 'restaurantes', label: 'Restaurantes' },
  { id: 'tiendas', label: 'Tiendas' },
  { id: 'salud', label: 'Salud y bienestar' },
  { id: 'educacion', label: 'Educación' },
  { id: 'deporte', label: 'Deporte' },
];

export const places = [
  {
    id: 'broaster-del-chef',
    name: 'Broaster del chef',
    categoryId: 'restaurantes',
    logo: '/logos/broaster-del-chef.png',
    description:
      'Pollo frito que cruje de verdad. Lo preparamos a diario con una receta de 11 especias y un marinado lento, para que cada presa quede jugosa por dentro y dorada por fuera.Pollo frito que cruje de verdad. Lo preparamos a diario con una receta de 11 especias y un marinado lento, para que cada presa quede jugosa por dentro y dorada por fuera.Pollo frito que cruje de verdad. Lo preparamos a diario con una receta de 11 especias y un marinado lento, para que cada presa quede jugosa por dentro y dorada por fuera.Pollo frito que cruje de verdad. Lo preparamos a diario con una receta de 11 especias y un marinado lento, para que cada presa quede jugosa por dentro y dorada por fuera.',
    location: {
      label: 'Calle 15 # 24-30, Comuna 17',
      mapUrl: 'https://maps.google.com/?q=Comuna+17+Popayan',
    },
    socials: {
      facebook: 'https://facebook.com/',
      instagram: 'https://instagram.com/',
      tiktok: 'https://tiktok.com/',
    },
  },
  {
    id: 'asadero-la-esquina',
    name: 'Asadero La Esquina',
    categoryId: 'restaurantes',
    logo: '/logos/asadero-la-esquina.png',
    description:
      'Carne a la brasa y menú del día a precio de barrio. Atendemos de lunes a sábado con almuerzos completos y parrilla al carbón desde las 5 p. m.',
    location: {
      label: 'Carrera 9 # 12-08, Comuna 17',
      mapUrl: 'https://maps.google.com/?q=Comuna+17+Popayan',
    },
    socials: {
      facebook: 'https://facebook.com/',
      instagram: 'https://instagram.com/',
    },
  },
  {
    id: 'panaderia-el-trigal',
    name: 'Panadería El Trigal',
    categoryId: 'restaurantes',
    logo: '/logos/panaderia-el-trigal.png',
    description:
      'Pan de horno desde las 5 de la mañana. Pandebono, almojábana y café pasado para arrancar el día, y tortas por encargo para cumpleaños.',
    location: {
      label: 'Calle 18 # 30-12, Comuna 17',
      mapUrl: 'https://maps.google.com/?q=Comuna+17+Popayan',
    },
    socials: {
      instagram: 'https://instagram.com/',
      tiktok: 'https://tiktok.com/',
    },
  },
  {
    id: 'variedades-mi-barrio',
    name: 'Variedades Mi Barrio',
    categoryId: 'tiendas',
    logo: '/logos/variedades-mi-barrio.png',
    description:
      'Papelería, juguetería y artículos para el hogar en un solo lugar. Hacemos fotocopias, impresiones y recargas sin salir de la comuna.',
    location: {
      label: 'Calle 16 # 27-45, Comuna 17',
      mapUrl: 'https://maps.google.com/?q=Comuna+17+Popayan',
    },
    socials: {
      facebook: 'https://facebook.com/',
      instagram: 'https://instagram.com/',
    },
  },
  {
    id: 'droguería-vida-sana',
    name: 'Droguería Vida Sana',
    categoryId: 'salud',
    logo: '/logos/drogueria-vida-sana.png',
    description:
      'Medicamentos, toma de presión y asesoría farmacéutica. Domicilios gratis dentro de la comuna con pedidos hechos antes de las 7 p. m.',
    location: {
      label: 'Carrera 11 # 14-02, Comuna 17',
      mapUrl: 'https://maps.google.com/?q=Comuna+17+Popayan',
    },
    socials: {
      facebook: 'https://facebook.com/',
    },
  },
];

export function getPlacesByCategory(categoryId) {
  return places.filter((place) => place.categoryId === categoryId);
}
