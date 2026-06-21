# Interseguro Frontend

Frontend del reto tecnico construido con Next.js, React y TypeScript. La interfaz es responsive y se adapta a escritorio y pantallas pequeñas.

Consume:

- Go API: factorizacion QR, rotacion y orquestacion.
- Node API: estadisticas de matrices.

## Requisitos

- Node.js 20+
- npm
- Docker

Para pruebas E2E, los tres repos deben estar como carpetas hermanas:

```txt
workspace/
  interseguro-frontend/
  interseguro-go-api/
  interseguro-node-api/
```

## Produccion

Servicios desplegados en Google Cloud Run:

```txt
Frontend: https://interseguro-technical-challenge-745150536858.europe-west1.run.app/
Go API:   https://interseguro-go-api-745150536858.europe-west1.run.app
Node API: https://interseguro-node-api-745150536858.europe-west1.run.app
Swagger:  https://interseguro-node-api-745150536858.europe-west1.run.app/docs
OpenAPI:  https://interseguro-node-api-745150536858.europe-west1.run.app/openapi.json
```

## Despliegue en Google Cloud

Los tres servicios fueron desplegados en Google Cloud Run usando contenedores Docker:

- `interseguro-frontend`: aplicacion Next.js servida desde un contenedor Docker.
- `interseguro-go-api`: API Go/Fiber para QR, rotacion y orquestacion.
- `interseguro-node-api`: API Node/Express para estadisticas y documentacion Swagger/OpenAPI.

Cada servicio se construye como imagen Docker y se despliega de forma independiente en Cloud Run. El codigo fuente esta versionado en GitHub y Cloud Build queda conectado al repositorio correspondiente para compilar la imagen y publicar una nueva revision cuando se suben cambios.

Las variables de entorno se configuran desde Cloud Run, no quedan hardcodeadas en el codigo fuente. En produccion el frontend usa:

```txt
GO_API_URL=https://interseguro-go-api-745150536858.europe-west1.run.app
NODE_API_URL=https://interseguro-node-api-745150536858.europe-west1.run.app
```

## Levantar los tres servicios con Docker

Desde cada repo, construir las imagenes:

```bash
cd ../interseguro-node-api
docker build -t interseguro-node-api .

cd ../interseguro-go-api
docker build -t interseguro-go-api .

cd ../interseguro-frontend
docker build -t interseguro-frontend .
```

Crear red:

```bash
docker network create interseguro-net
```

Levantar Node API:

```bash
docker run --rm --name interseguro-node-api \
  --network interseguro-net \
  -e PORT=8080 \
  -e JWT_SECRET=local-development-secret \
  -e GO_API_URL=http://localhost:3000 \
  -e NODE_API_URL=http://localhost:3001 \
  -p 3001:8080 \
  interseguro-node-api
```

Levantar Go API:

```bash
docker run --rm --name interseguro-go-api \
  --network interseguro-net \
  -e PORT=3000 \
  -e JWT_SECRET=local-development-secret \
  -e NODE_API_URL=http://interseguro-node-api:8080 \
  -p 3000:3000 \
  interseguro-go-api
```

Levantar Frontend:

```bash
docker run --rm --name interseguro-frontend \
  --network interseguro-net \
  -e PORT=8080 \
  -e GO_API_URL=http://localhost:3000 \
  -e NODE_API_URL=http://localhost:3001 \
  -p 3002:8080 \
  interseguro-frontend
```

URLs:

```txt
Frontend: http://localhost:3002
Go API:   http://localhost:3000
Node API: http://localhost:3001
Swagger:  http://localhost:3001/docs
```

Nota: en frontend, `GO_API_URL` y `NODE_API_URL` deben ser URLs accesibles desde el navegador. Por eso en Docker local se usan `localhost`, no nombres internos de contenedores.

## Tests

Unit tests:

```bash
npm test
```

Typecheck:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

E2E con Playwright:

```bash
npm run test:e2e:install
npm run test:e2e
```

El E2E levanta automaticamente:

- `../interseguro-node-api`
- `../interseguro-go-api`
- frontend en `localhost:3002`

## Arquitectura

El frontend usa una arquitectura por features con separacion de capas inspirada en hexagonal/Clean Architecture.

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  icon.svg

src/
  domain/
    matrix/
      matrix.types.ts
      matrix.validation.ts
    stats/
      stats.types.ts

  application/
    analyzeMatrixUseCase.ts
    ensureAuthTokenUseCase.ts

  infrastructure/
    auth/
    config/
    http/

  features/
    matrix-challenge/
      components/
      MatrixChallengeView.tsx
      useMatrixChallenge.ts
      matrixChallenge.module.css

  shared/
    format/
```

Responsabilidades:

- `app`: entrada de Next.js.
- `domain`: tipos y reglas puras del problema.
- `application`: casos de uso consumidos por la UI.
- `infrastructure`: HTTP, configuracion runtime y token storage.
- `features`: pantalla del reto, componentes, hook y estilos.
- `shared`: utilidades reutilizables.

## Estructura de datos

```ts
type Matrix = number[][];

type MatrixRequest = {
  matrix: Matrix;
};

type MatricesRequest = {
  matrices: Matrix[];
};

type QRResult = {
  q: Matrix;
  r: Matrix;
};

type RotationResult = {
  rotated: Matrix;
};

type MatrixStats = {
  max?: number;
  min?: number;
  average?: number;
  sum?: number;
  diagonalMatrices?: Array<{
    index: number;
    isDiagonal: boolean;
  }>;
  hasDiagonalMatrix?: boolean;
};

type MatrixResult = {
  q: Matrix;
  r: Matrix;
  stats: MatrixStats;
  rotated: Matrix;
};
```

Validaciones preventivas del frontend:

- La matriz debe tener filas y columnas.
- Todos los valores deben ser numeros finitos.
- Para QR, `filas >= columnas`.
- No debe haber columnas vacias.
- Las columnas deben aportar informacion nueva para evitar fallos de QR.

## Configuracion

En local, `public/config.js` define:

```js
window.__APP_CONFIG__ = {
  goApiUrl: 'http://localhost:3000',
  nodeApiUrl: 'http://localhost:3001',
};
```

En Docker, `config.template.js` se renderiza al iniciar el contenedor con:

```txt
GO_API_URL
NODE_API_URL
PORT
```

## Scripts principales

```bash
npm run build
npm run start
npm run lint
npm run format
npm run typecheck
npm test
npm run test:e2e:install
npm run test:e2e
```
