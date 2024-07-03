import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';

const sessionConfig = (TOKEN_SESSION: string) => session({
    secret: TOKEN_SESSION, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // 'secure: false' si no es HTTPS
    genid: () => {
      return uuidv4();
    }
  });

  export default sessionConfig;