import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/pages/Welcome'
import Quiz from '@/pages/quiz/Quiz'
import Create from '@/pages/create/Create'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/quiz', name: 'Quiz', component: Quiz },
    { path: '/create', name: 'Create', component: Create },
    { path: '/', name: 'Home', component: Welcome }
  ]
})
