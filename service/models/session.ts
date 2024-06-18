import { Usuario } from "./usuario/profile";
import { Session } from 'express-session';

type Theme = 'light' | 'dark' | 'system';

export interface MySession extends Session {
    theme?: Theme;
    usuario?: Usuario;
}