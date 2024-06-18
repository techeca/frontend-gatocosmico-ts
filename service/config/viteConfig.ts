import { createServer as createViteServer } from 'vite';

const viteConfig = async () => await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom'
});

export default viteConfig;