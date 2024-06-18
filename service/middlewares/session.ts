import sessionConfig from '../config/sessionConfig.js';
import type { Request, Response, NextFunction } from 'express';
import { MySession } from '../models/session.js';

/*type Theme = 'light' | 'dark' | 'system';

export interface MySession extends Session {
    theme?: Theme;
  }
*/
const TOKEN_SESSION = process.env.TOKEN_SESSION;

if (typeof TOKEN_SESSION !== 'string') {
  throw new Error('TOKEN_SESSION must be a string');
}

const sessionMiddleware = sessionConfig(TOKEN_SESSION);

const setDefaultTheme = (req: Request & { session?: MySession}, _: Response, next: NextFunction) => {
    if (!req.session.theme) {
        req.session.theme = 'dark';
    }
    next();
};


export default function (req: Request, res: Response, next: NextFunction) {
    sessionMiddleware(req, res, () => {
        setDefaultTheme(req, res, next);
    });
}