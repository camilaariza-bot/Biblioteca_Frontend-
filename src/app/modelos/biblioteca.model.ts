import { Libro } from './libro.model';

/** Biblioteca con sus libros asociados (respuesta de GET /bibliotecas). */
export interface Biblioteca {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  libros: Libro[];
}

/** Datos que se envían en POST /bibliotecas para registrar una biblioteca. */
export interface BibliotecaRequest {
  nombre: string;
  direccion: string;
  ciudad: string;
}
