import React from "react";
import ReactDOMServer from 'react-dom/server'
import createFetchRequest from '../request.js'
import './index.css'
import { createStaticHandler, createStaticRouter, StaticRouterProvider, StaticHandlerContext } from "react-router-dom/server";
import routes from "./routes.jsx";
import type { Request, Response } from 'express';
import { ThemeProvider } from "./components/theme-provider.js";
import { Session } from 'express-session';
import { UserProvider } from "./contexts/UserContext.js";
import { User } from "./contexts/UserContext.js";

type Theme = 'light' | 'dark' | 'system';

interface MyStaticHandlerContext extends StaticHandlerContext {
  theme?: Theme;
  usuario?: User;
}

export interface MySession extends Session {
  theme?: Theme;
  usuario?: User;
}

export async function renderHtml(req: Request, res: Response) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req, res);
  const result = await query(fetchRequest);

  if (result instanceof Response) {
    throw result;
  }

  // Crear un nuevo objeto MyStaticHandlerContext a partir de result
  const context: MyStaticHandlerContext = {
    ...result,
    theme: (req.session as MySession).theme,
    usuario: (req.session as MySession).usuario,
  };

  if (context instanceof Response) {
    throw context;
  }

  //console.log(context.usuario);
  
  const router = createStaticRouter(dataRoutes, context);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <UserProvider initialSession={context.usuario}>
        <ThemeProvider theme={context.theme}>
          <StaticRouterProvider router={router} context={context} />
        </ThemeProvider>
      </UserProvider>
    </React.StrictMode>
  );
}