import { Component, OnInit, inject } from '@angular/core';

import { BibliotecaService } from './servicios/biblioteca.service';
import { Biblioteca } from './modelos/biblioteca.model';
import { BibliotecaFormComponent } from './componentes/biblioteca-form/biblioteca-form.component';
import { LibrosTablaComponent } from './componentes/libros-tabla/libros-tabla.component';

/**
 * Componente principal: consulta GET /bibliotecas y compone la vista con
 * el formulario de registro y la tabla de libros.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BibliotecaFormComponent, LibrosTablaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private readonly bibliotecaService = inject(BibliotecaService);

  bibliotecas: Biblioteca[] = [];
  cargando = false;
  error = '';

  ngOnInit(): void {
    this.cargarBibliotecas();
  }

  /** Consulta GET /bibliotecas (bibliotecas con sus libros asociados). */
  cargarBibliotecas(): void {
    this.cargando = true;
    this.error = '';

    this.bibliotecaService.listar().subscribe({
      next: (bibliotecas) => {
        this.bibliotecas = bibliotecas;
        this.cargando = false;
      },
      error: () => {
        this.bibliotecas = [];
        this.cargando = false;
        this.error = 'No se pudo obtener la información del backend. Verifica que esté corriendo en http://localhost:8080.';
      }
    });
  }
}
