import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { BibliotecaService } from '../../servicios/biblioteca.service';
import { Biblioteca, BibliotecaRequest } from '../../modelos/biblioteca.model';

/** Al menos un carácter que no sea espacio. */
const NO_SOLO_ESPACIOS = /\S/;

/**
 * Formulario para registrar bibliotecas (nombre, dirección y ciudad).
 * Envía los datos al backend con POST /bibliotecas.
 */
@Component({
  selector: 'app-biblioteca-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './biblioteca-form.component.html',
  styleUrl: './biblioteca-form.component.css'
})
export class BibliotecaFormComponent {

  /** Avisa al componente padre que se registró una biblioteca. */
  @Output() bibliotecaRegistrada = new EventEmitter<Biblioteca>();

  private readonly fb = inject(FormBuilder);
  private readonly bibliotecaService = inject(BibliotecaService);

  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern(NO_SOLO_ESPACIOS), Validators.maxLength(100)]],
    direccion: ['', [Validators.required, Validators.pattern(NO_SOLO_ESPACIOS), Validators.maxLength(150)]],
    ciudad: ['', [Validators.required, Validators.pattern(NO_SOLO_ESPACIOS), Validators.maxLength(80)]]
  });

  /** true si el campo es inválido y el usuario ya interactuó con él. */
  campoInvalido(campo: 'nombre' | 'direccion' | 'ciudad'): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.touched || control.dirty);
  }

  registrar(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.getRawValue();
    const nuevaBiblioteca: BibliotecaRequest = {
      nombre: valores.nombre.trim(),
      direccion: valores.direccion.trim(),
      ciudad: valores.ciudad.trim()
    };

    this.guardando = true;
    this.bibliotecaService.registrar(nuevaBiblioteca).subscribe({
      next: (creada) => {
        this.guardando = false;
        this.mensajeExito = `"${creada.nombre}" se registró correctamente.`;
        this.form.reset();
        this.bibliotecaRegistrada.emit(creada);
      },
      error: (err: HttpErrorResponse) => {
        this.guardando = false;
        this.mensajeError = this.describirError(err);
      }
    });
  }

  private describirError(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'No se pudo conectar con el backend. Verifica que esté corriendo en el puerto 8080.';
    }
    if (err.status === 400) {
      return 'Datos inválidos: verifica el nombre, la dirección y la ciudad.';
    }
    return 'Ocurrió un error al registrar la biblioteca.';
  }
}
