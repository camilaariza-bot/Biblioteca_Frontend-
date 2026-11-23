import { Component, Input } from '@angular/core';

import { Biblioteca } from '../../modelos/biblioteca.model';
import { LibroConBiblioteca } from '../../modelos/libro.model';

/**
 * Tabla de libros con su biblioteca correspondiente.
 * Recibe las bibliotecas obtenidas de GET /bibliotecas y "aplana"
 * sus libros anidados para mostrarlos en filas.
 */
@Component({
  selector: 'app-libros-tabla',
  standalone: true,
  templateUrl: './libros-tabla.component.html',
  styleUrl: './libros-tabla.component.css'
})
export class LibrosTablaComponent {

  @Input() bibliotecas: Biblioteca[] = [];
  @Input() cargando = false;
  @Input() error = '';

  /** Una fila por libro, con el nombre de la biblioteca a la que pertenece. */
  get filas(): LibroConBiblioteca[] {
    return this.bibliotecas.flatMap((biblioteca) =>
      biblioteca.libros.map((libro) => ({
        ...libro,
        biblioteca: biblioteca.nombre
      }))
    );
  }
}
