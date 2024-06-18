import fs from 'node:fs';
import path from 'node:path';
import type { Request, Response, NextFunction } from 'express';
import { ViteDevServer } from 'vite';

declare module 'express-session' {
  export interface SessionData {
    theme: 'dark' | 'light' | 'system';
  }
}

export const renderSSR = async (
  req: Request,
  res: Response,
  next: NextFunction,
  vite: ViteDevServer,
  __dirname: string) => {
    const url = req.originalUrl;
  
    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      const { renderHtml } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const appHtml = await renderHtml(req, res);
  
      req.session.theme = 'system'
      //const sessionData = JSON.stringify(req.session.usuario || {});
      const html = template.replace(`<!--ssr-outlet-->`, `${appHtml}`); //<script>window.__SESSION_DATA__ = ${sessionData}</script>
  
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
        next(e);
      } else {
        next(new Error('An unknown error occurred.'));
      }
    }
  };