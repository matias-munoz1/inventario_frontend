import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../components/TaskList.vue'
import EditTask from '../components/EditTask.vue'
import LoginMainComponent from '../components/LoginMainComponent.vue'
import AddBook from '../components/AddBook.vue'

const routes = [
  { path: '/Login', component: LoginMainComponent },
  { path: '/add-book', component: AddBook }, // Ruta para agregar libros
  { path: '/edit/:id', name: 'editBook', component: EditTask },
  { path: '/TaskList', component: TaskList },
  { path: '/', component: LoginMainComponent },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
