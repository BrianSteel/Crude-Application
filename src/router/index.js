import { createRouter, createWebHistory } from 'vue-router'
import Overview from '@/components/Overview.vue'
import SinglePost from '@/components/SinglePost.vue'

const routes = [
  {
    path: '/',
    name: 'overview',
    component: Overview
  },
  {
    path: '/post/:id',
    name: 'singlePost',
    component: SinglePost,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
