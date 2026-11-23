# bibliotecas-frontend

Interfaz web en **Angular** para la red de bibliotecas. Consume la API del repositorio **bibliotecas-backend**.

Funcionalidades (según el alcance de la evaluación):

1. **Inserción:** formulario para registrar bibliotecas (nombre, dirección y ciudad) → `POST /bibliotecas`.
2. **Consulta:** tabla con los libros existentes y la biblioteca a la que pertenece cada uno → datos obtenidos de `GET /bibliotecas` (no hay datos fijos en el frontend).

No existe formulario para crear libros: los libros se cargan como datos de prueba desde el backend.

## Tecnologías

| Herramienta | Versión |
|---|---|
| Node.js | 18.19+ o 20+ |
| Angular | 18 (componentes standalone) |
| TypeScript | 5.5 |

## Estructura (estructura mínima obligatoria)

```
src/
├── environments/
│   └── environment.ts                 → URL del backend (http://localhost:8080)
└── app/
    ├── modelos/                       → MODELOS (interfaces TypeScript)
    │   ├── biblioteca.model.ts        → Biblioteca, BibliotecaRequest
    │   └── libro.model.ts             → Libro, LibroConBiblioteca
    ├── servicios/                     → SERVICIOS (consumo HTTP de los endpoints de Biblioteca)
    │   └── biblioteca.service.ts      → listar() GET /bibliotecas · registrar() POST /bibliotecas
    ├── componentes/                   → COMPONENTES
    │   ├── biblioteca-form/           → formulario de registro de bibliotecas (nombre, dirección, ciudad)
    │   └── libros-tabla/              → tabla Título · Autor · Año · Biblioteca
    ├── app.component.*                → componente principal: consulta los datos y muestra formulario + tabla
    └── app.config.ts                  → provideHttpClient()
```

| Estructura mínima del enunciado | Implementación |
|---|---|
| Componentes (formulario y tabla) | `componentes/biblioteca-form`, `componentes/libros-tabla` |
| Modelos (tipos/interfaces para Biblioteca y Libro) | `modelos/biblioteca.model.ts`, `modelos/libro.model.ts` |
| Servicios (consumo HTTP de los endpoints de Biblioteca) | `servicios/biblioteca.service.ts` |

### Cómo se arma la tabla

`GET /bibliotecas` devuelve cada biblioteca con su arreglo `libros`. El componente `libros-tabla` recorre las bibliotecas y crea una fila por libro con el nombre de su biblioteca:

```ts
this.bibliotecas.flatMap(b => b.libros.map(libro => ({ ...libro, biblioteca: b.nombre })));
```

Cuando se registra una biblioteca, el formulario emite un evento y el componente principal vuelve a consultar `GET /bibliotecas`, así la vista siempre refleja lo que hay en el backend.

## Cómo ejecutar

> Requisito: el backend debe estar corriendo en `http://localhost:8080` (ver README de **bibliotecas-backend**).

Requisito: **Node.js 18.19+ o 20+** (incluye npm).

1. Clonar el repositorio (o abrir la carpeta `bibliotecas-frontend` en VS Code y usar su terminal):
   ```bash
   git clone https://github.com/camilaariza-bot/bibliotecas-frontend.git
   cd bibliotecas-frontend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
4. Abrir **http://localhost:4200** en el navegador.

Si el backend corre en otra URL, cambiarla en `src/environments/environment.ts`.

Para compilar una versión de producción: `npm run build` (queda en `dist/bibliotecas-frontend`).

## Alcance

No incluye edición, eliminación, autenticación ni formulario de libros, tal como indica el enunciado.
