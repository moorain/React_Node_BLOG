import { defineConfig } from 'umi';
import { routes } from './src/config/routes';

export default defineConfig({
  history: {
    type: 'hash'
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  proxy: {
    '/api': {
      'target': 'http://localhost:8001',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },
});
