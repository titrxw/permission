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
    },
    {
        path: '/organization',
        name: 'organization',
        component: (resolve) => require(['../layout/admin.vue'], resolve),
        children: [{
                path: 'department',
                meta: {
                    requireLogin: true
                },
                component: (resolve) => require(['../views/department/index.vue'], resolve)
            },
            {
                path: 'job',
                meta: {
                    requireLogin: true
                },
                component: (resolve) => { require(['../views/job/index.vue'], resolve) }
            },
            {
                path: 'role',
                meta: {
                    requireLogin: true
                },
                component: (resolve) => { require(['../views/role/index.vue'], resolve) }
            },
            {
                path: 'user',
                meta: {
                    requireLogin: true
                },
                component: (resolve) => { require(['../views/user/index.vue'], resolve) }
            },
            {
                path: 'user/detail',
                meta: {
                    requireLogin: true
                },
                component: (resolve) => { require(['../views/user/detail.vue'], resolve) }
            }
        ]
    }
];