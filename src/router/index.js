import VueRouter from 'vue-router'
import Vue from 'vue'
import HomePage from '../pages/HomePage.vue'
import LogIn from '../pages/LogIn.vue'
import BookingList from '../pages/BookingList.vue'

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
        component:HomePage,
        name:'homepage'
    },
    {
        path: '/login',
        component:LogIn,
        name:'login'
    },
    {
        path:'/list',
        component:BookingList,
        name:'list'
    }
]

//配置路由和组件之间的应用关系
const router = new VueRouter({
    // mode:'history',
    routes
})

//将router对象传入到Vue实例
export default router
