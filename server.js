import { renderSSR } from './service/utils/ssr.ts';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import express from 'express';
//import type { Request, Response } from 'express';
//import { createServer as createViteServer } from 'vite';
import 'dotenv/config';
//import session from 'express-session';
//import { create } from 'node:domain';
import viteConfig from './service/config/viteConfig.ts'
import sessionMiddleware from './service/middlewares/session.ts';
import authentication from './service/middlewares/authentication.ts';
import { authorization } from './service/middlewares/authorization.ts';
import { usuarioRouter } from './service/routes/usuario/index.ts';
import { adminRouter } from './service/routes/admin/index.ts';
import cookieParser from 'cookie-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5180;
//const TOKEN_SESSION = process.env.TOKEN_SESSION;
console.log(PORT);


async function createServer() {
  //Configuración de express y middlewares
  const app = express();
  const vite = await viteConfig();

  app.use(vite.middlewares);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(sessionMiddleware);
  app.use(authorization);

  //solicitudes públicas
  app.post('/login', authentication)
  app.post('/profile', (req, res) => {
    //logout
    //req.session.id === req.sessionID;
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Hubo un error al cerrar la sesión');
      }
      res.clearCookie(req.sessionID);
      res.send('Sesión cerrada con éxito')
    });
  });

  //solicitudes privadas
  app.use('/usuario', usuarioRouter);
  app.use('/admin', adminRouter)

  app.use('*', async (req, res, next) => renderSSR(req, res, next, vite, __dirname));

  const server = app.listen(PORT, () => {
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`HEALTH: http://localhost:${PORT}/health`);
  });

    // Manejo de cierre del servidor
    const handleShutdown = () => {
      console.log('Apagando el servidor...');
      server.close(() => {
        console.log('Servidor apagado correctamente.');
        process.exit(0);
      });
    };
  
    // Manejar señales de terminación (SIGINT: Ctrl+C, SIGTERM: kill)
    process.on('SIGINT', handleShutdown);
    process.on('SIGTERM', handleShutdown);
  
    return server;
}

createServer().catch(error => {
  console.error('Error al iniciar el servidor', error);
})