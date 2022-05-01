import VueRouter from 'vue-router'
import Vue from 'vue'

//安装Vue.use插件
Vue.use(VueRouter)

//创建VueRouter对象
const routes=[
    {
        path: '/',
        redirect: '/homepage'
    },
    {
        path:'/homepage',
        name:'homepage',
        component: () => import('../pages/HomePage.vue')
    },
    {
        path: '/login',
        name:'login',
        component: () => import('../pages/LogIn.vue')
    },
    {
        path:'/list',
        name:'list',
        component: () => import('../pages/BookingList.vue')
    },
    {
        path:'/roominfo',
        name:'roominfo',
        component: () => import('../pages/RoomInfo.vue')
    },
    {
        path:'/calendar',
        name:'calendar',
        component: () => import('../pages/BookingCalendar.vue')
    }
]

//配置路由和组件之间的应用关系
const router = new VueRouter({
    // mode:'history',
    routes
})

//将router对象传入到Vue实例
export default router
