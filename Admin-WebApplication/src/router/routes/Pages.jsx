import { lazy } from 'react'

const PagesRoutes = [
    {
        path: '/dashboard',
        component: lazy(() => import('../../view/main/dashboard/ecommerce')),
        layout: 'VerticalLayout',
    },
    {
        path: '/device-management/:deviceID',
        component: lazy(() => import('../../view/Devices/Detail')),
        layout: 'VerticalLayout',
    },
    {
        path: '/device-management',
        component: lazy(() => import('../../view/Devices')),
        layout: 'VerticalLayout',
    },
    {
        path: '/history-management',
        component: lazy(() => import('../../view/History')),
        layout: 'VerticalLayout',
    },
    {
        path: '/user-management/:uid',
        component: lazy(() => import('../../view/User/Detail')),
        layout: 'VerticalLayout',
    },
    {
        path: '/user-management',
        component: lazy(() => import('../../view/User')),
        layout: 'VerticalLayout',
    },
]

export default PagesRoutes
