import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Biblioteca, BibliotecaRequest } from '../modelos/biblioteca.model';

/**
 * Servicio que consume los endpoints de Biblioteca del backend.
 */
@Injectable({ providedIn: 'root' })
export class BibliotecaService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/bibliotecas`;

  /** GET /bibliotecas -> bibliotecas con sus libros asociados. */
  listar(): Observable<Biblioteca[]> {
    return this.http.get<Biblioteca[]>(this.apiUrl);
  }

  /** POST /bibliotecas -> registra una nueva biblioteca. */
  registrar(biblioteca: BibliotecaRequest): Observable<Biblioteca> {
    return this.http.post<Biblioteca>(this.apiUrl, biblioteca);
  }
}
