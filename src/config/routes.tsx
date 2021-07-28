export const routes = [
  { exact: true, path: '/', redirect: '/index' },
  {
    path: '/',
    component: '@/pages/layout',
    routes: [
      {
        path: '/index',
        component: '@/pages/List',
      },
      {
        path: '/edit',
        component: '@/pages/Edit',
      },
      {
        path: '/list',
        component: '@/pages/List',
      },
      {
        path: '/detail',
        component: '@/pages/Detail',
      },
      {
        path: '/pf520',
        component: '@/pages/PF',
      },
      {
        path: '/login',
        component: '@/pages/Login',
      },
      {
        path: '/onlineEdit',
        component: '@/pages/Edit/onlineEdit',
      },
    ]
  },
]
