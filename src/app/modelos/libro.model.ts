/**
 * Libro tal como lo devuelve el backend dentro de cada biblioteca
 * (GET /bibliotecas -> libros[]).
 */
export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anioPublicacion: number;
}

/**
 * Fila de la tabla de libros: el libro más el nombre de su biblioteca.
 * Se construye en el frontend a partir de la respuesta anidada.
 */
export interface LibroConBiblioteca extends Libro {
  biblioteca: string;
}
