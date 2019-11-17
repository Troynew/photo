export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        component: './loading',
        hideInMenu: true,
      },
      {
        path: '/login',
        component: './login',
        hideInMenu: true,
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: './userManage',
      },
      {
        path: '/productManage',
        name: 'productManage',
        component: './productManage',
      },
      {
        name: 'exception',
        path: '/exception',
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
