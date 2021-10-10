import { defineConfig } from 'umi';
import { routes } from './src/config/routes';

export default defineConfig({
  // ssr: {},
  // dynamicImport: {},
  publicPath: process.env.NODE_ENV === 'production' ? '/public/' : '/',
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
      'target': 'http://localhost:7001',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },
  // externals: {
  //   react: 'window.React',
  // },
  // scripts: ['http://unpkg.com/react@17.0.1/umd/react.production.min.js'],
});
