import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../components/TaskList.vue'
import EditTask from '../components/EditTask.vue'
import LoginMainComponent from '../components/LoginMainComponent.vue'
import AddBook from '../components/AddBook.vue'
import store from '../store'
import StockPage from '../components/StockPage.vue';

const routes = [
  { path: '/Login', component: LoginMainComponent },
  { path: '/add-book', component: AddBook, meta: { roles: ['editor', 'admin'] } },
  { path: '/edit/:id', name: 'editBook', component: EditTask, meta: { roles: ['editor', 'admin'] } },
  { path: '/TaskList', component: TaskList, meta: { roles: ['viewer', 'editor', 'admin'] } },
  { path: '/stock', component: StockPage, meta: { roles: ['viewer', 'editor', 'admin'] } }, // Nueva ruta
  { path: '/', component: LoginMainComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { roles } = to.meta;
  const userRole = store.getters.userRole;

  if (roles && (!userRole || !roles.includes(userRole))) {
    return next('/Login');
  }

  next();
});

export default router
