export default [{
        path: '*',
        component: (resolve) => require(['../views/system/404.vue'], resolve)
    },
    {
        path: '/',
        component: (resolve) => require(['../layout/admin.vue'], resolve),
        children: [{
                path: '',
                meta: {
                    requireLogin: true
                },
                component: (resolve) => require(['../views/index.vue'], resolve)
            },
            {
                path: '403',
                component: (resolve) => { require(['../views/system/403'], resolve) }
            },
            {
                path: '404',
                component: (resolve) => { require(['../views/system/404'], resolve) }
            },
            {
                path: '500',
                component: (resolve) => { require(['../views/system/500'], resolve) }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '业务系统',
        },
        component: (resolve) => require(['../views/login.vue'], resolve)
    },
    {
        path: '/module',
        name: 'module',
        component: (resolve) => require(['../layout/admin.vue'], resolve),
        children: [{
                path: '/',
                meta: {
                    requireLogin: true
                },
                component: (resolve) => require(['../views/module/module.vue'], resolve)
            },
            {
                path: 'operate',
                meta: {
                    requireLogin: true
                },
                component: (resolve) => { require(['../views/module/operate.vue'], resolve) }
            }
        ]
    }
];