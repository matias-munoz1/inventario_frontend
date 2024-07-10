import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../components/TaskList.vue'
import AddTask from '../components/AddTask.vue'
import EditTask from '../components/EditTask.vue'
import LoginMainComponent from '../components/LoginMainComponent.vue'

const routes = [
  { path: '/Login', component: LoginMainComponent }, // Redirecciona solo al login
  { path: '/add', component: AddTask },
  { path: '/edit/:id', component: EditTask },
  { path: '/TaskList', component: TaskList }, // Necesito llegar a ese con un boton
  { path: '/', component: LoginMainComponent },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
