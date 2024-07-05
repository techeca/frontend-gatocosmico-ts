# Frontend Gatocosmico TS

Este es el frontend del proyecto **Gatocosmico**, desarrollado en TypeScript utilizando diversas tecnologías modernas.

## Tabla de Contenidos

- [Variables de Entorno](#variables-de-entorno)
- [Instalación](#instalación)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en un archivo .env en la raíz del proyecto:

```
TOKEN_SESSION=''
API_URL='Para conectar con API REMOTA'
API_LOCAL='Para conectar con API LOCAL'
PORT=5173
```

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```

## Ejecución del Proyecto

Para iniciar el servidor de desarrollo, utiliza:

```
npm run dev
```

El proyecto estará disponible en http://localhost:5173.

## Scripts Disponibles
En el directorio del proyecto, puedes ejecutar:

`npm run dev`
Inicia el servidor de desarrollo.

`npm run build`
Construye la aplicación para producción en la carpeta `dist`.

`npm test`
Ejecuta las pruebas.

`npm run lint`
Ejecuta el linter para analizar el código y encontrar errores o inconsistencias.

## Estructura del Proyecto
Una breve descripción de la estructura de carpetas y archivos más importantes del proyecto:

```
frontend-gatocosmico-ts/
├── public/             # Archivos estáticos
│   service/            # Middlewares y control de requests
├── src/                # Código fuente del proyecto
│   ├── components/     # Componentes reutilizables
│   ├── context/        # React contexts
│   ├── hooks/          # React hooks
│   ├── pages/          # Páginas principales de la aplicación
│   ├── utils/          # Utilidades y funciones auxiliares
│   ├── App.tsx         # Componente principal de la aplicación
│   ├── entry-client.tsx# Main del lado del cliente
│   ├── entry-server.tsx# Main del lado del servidor
│   ├── index.tsx       # Punto de entrada de la aplicación
├── test/               # Pruebas
├── request.ts          # Funciones de solicitud servidor-cliente
├── server-prod.js      # Servidor para producción
├── server.ts           # Servidor para desarrollo
├── tsconfig.build.json # Configuración para service
├── tsconfig.json       # Configuración para web 
├── vite.config.ts      # Configuración de vite y vitest
```