import type { Request, Response } from 'express';

export default function createFetchRequest(req: Request, res: Response) {
    const origin = `${req.protocol}://${req.get("host")}`;
    const url = new URL(req.originalUrl || req.url, origin);
  
    const controller = new AbortController();
    res.on("close", () => controller.abort());
  
    const headers = new Headers();
  
    for (const [key, values] of Object.entries(req.headers)) {
      if (values) {
        if (Array.isArray(values)) {
          for (const value of values) {
            headers.append(key, value);
          }
        } else {
          headers.set(key, values);
        }
      }
    }

    interface Init {
        method: string;
        headers: Headers;
        signal: AbortSignal;
        body?: string;
    }
  
    const init: Init = {
      method: req.method,
      headers,
      signal: controller.signal,
    };
  
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = req.body;
    }
  
    return new Request(url.href, init);
  }