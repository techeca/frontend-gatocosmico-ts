import { renderSSR } from './dist/service/utils/ssr.js';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import express from 'express';
//import type { Request, Response } from 'express';
//import { createServer as createViteServer } from 'vite';
import 'dotenv/config';
//import session from 'express-session';
//import { create } from 'node:domain';
import viteConfig from './dist/service/config/viteConfig.js';
import sessionMiddleware from './dist/service/middlewares/session.js';
import authentication from './dist/service/middlewares/authentication.js';
import { authorization } from './dist/service/middlewares/authorization.js';
import { usuarioRouter } from './dist/service/routes/usuario/index.js';
import { adminRouter } from './dist/service/routes/admin/index.js';
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
    app.post('/login', authentication);
    app.post('/profile', (req, res) => {
        //logout
        //req.session.id === req.sessionID;
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Hubo un error al cerrar la sesión');
            }
            res.clearCookie(req.sessionID);
            res.send('Sesión cerrada con éxito');
        });
    });
    //solicitudes privadas
    app.use('/usuario', usuarioRouter);
    app.use('/admin', adminRouter);
    app.use('*', async (req, res, next) => renderSSR(req, res, next, vite, __dirname));
    const server = app.listen(PORT, () => {
        //console.log(`URL: http://localhost:${PORT}`);
        console.log('Server ON');
        //console.log(`HEALTH: http://localhost:${PORT}/health`);
        console.log(`HELATH: /health`);
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
});
