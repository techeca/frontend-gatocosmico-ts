import type { Response, Request, NextFunction } from 'express';
import { MySession } from '../models/session';

export function authorization(req: Request & { session:MySession}, res: Response, next: NextFunction) {
    // Si la ruta es /home, permite el acceso
    if (req.path === '/home') {
        return next();
    }
    // Verifica si hay una sesión de usuario
    if (req.session && req.session.usuario) {
        //console.log(req.session.usuario);
        
        // Si el usuario está logueado
        if (req.path === '/login' || req.path === '/') {
          // Si está intentando acceder a /login, redirige a /profile
          return res.redirect('/profile');
        }else if(req.path.includes('/settings') && req.session.usuario.rol !== 'Administrador'){
          return res.redirect('/profile');
        } else {
          // Si está intentando acceder a otra ruta, permite el acceso
          return next();
        }
  
      } else {
        // Si no hay sesión de usuario, redirige al login
        if (req.path !== '/login') {
          return res.redirect('/login');
        }
        // Si está en /login, permite el acceso
        next();
      }
}