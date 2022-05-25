import VueRouter from 'vue-router'
import Vue from 'vue'
import axios from 'axios'

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
    },
    {
        path:'/order',
        name:'order',
        component: () => import('../pages/NewOrder.vue')
    },
    {
        path:'/personal',
        name:'personal',
        component: () => import('../pages/PersonalCenter.vue')
    },
    {
        path:'/account',
        name:'account',
        component: () => import('../pages/AccountManagement.vue')
    }
]

//配置路由和组件之间的应用关系
const router = new VueRouter({
    // mode:'history',
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.path.startsWith('/login')){
        window.localStorage.removeItem('access')
        next()
    }else{
        let acc = JSON.parse(window.localStorage.getItem('access'))
        if(!acc){
            next({path:'/login'})
        }else{
            //检验token合法性
            axios({
                url:'http://localhost:9090/checkToken',
                method:'get',
                headers:{
                    token:acc.token
                }
            }).then((res)=>{
                if(!res.data){
                    alert('验证过期，请重新登录！')
                    
                    next({path:'/login'})
                }
            })
            next()
        }
    }
})

//将router对象传入到Vue实例
export default router
