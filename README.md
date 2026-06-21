# Interseguro Frontend

Frontend del reto tecnico construido con Next.js, React y TypeScript.

## Arquitectura

```txt
src/
  app/
    layout.tsx
    page.tsx
    globals.css

  application/
    analyzeMatrixUseCase.ts
    ensureAuthTokenUseCase.ts

  domain/
    matrix/
      matrix.types.ts
      matrix.validation.ts

  infrastructure/
    auth/
      authClient.ts
      tokenStorage.ts
    config/
      runtimeConfig.ts
    http/
      httpClient.ts
      matrixApiClient.ts

  features/
    matrix-challenge/
      components/
      MatrixChallengeView.tsx
      useMatrixChallenge.ts
      matrixChallenge.module.css
```

## Decisiones

- `domain` contiene reglas del problema, como validacion de matrices.
- `application` contiene casos de uso consumidos por la UI.
- `infrastructure` contiene detalles externos: HTTP, JWT storage y runtime config.
- `features` agrupa UI, hook, tipos y estilos de una funcionalidad concreta.
- Los estilos de la pantalla usan CSS Modules para evitar fugas globales.
- `app/globals.css` queda reservado para tokens, reset y estilos base.

## Variables

En local, `public/config.js` define:

```js
window.__APP_CONFIG__ = {
  goApiUrl: 'http://localhost:3000',
  nodeApiUrl: 'http://localhost:3001',
};
```

En Docker/Cloud Run, `config.template.js` se renderiza con:

```txt
GO_API_URL
NODE_API_URL
PORT
```

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run typecheck
npm test
npm run test:e2e
```

El frontend corre en:

```txt
http://localhost:3002
```
