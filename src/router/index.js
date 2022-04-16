import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:'/',
            name:"today",
            component: ()=> import('../views/Today.vue')
        },
        {
            path:'/history',
            name:"history",
            component: ()=> import('../views/History.vue')
        }
    ]
})

export default router;