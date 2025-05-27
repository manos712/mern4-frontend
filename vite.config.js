import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBase = env.VITE_API_BASE || '/accounts';

  const isLocalProxy = apiBase.startsWith('/');
  const proxyTarget = isLocalProxy ? 'http://localhost:5000' : undefined;

  return {
    plugins: [react()],
    server: {
      proxy: isLocalProxy
        ? {
            [apiBase]: {
              target: proxyTarget,
              changeOrigin: true,
            },
          }
        : {},
    },
  };
});
