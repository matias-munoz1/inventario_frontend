<template>
  <div
    :class="{ 'dark-theme': isDarkTheme, 'light-theme': !isDarkTheme }"
    id="app"
  >
    <header
      :class="{ 'dark-header': isDarkTheme, 'light-header': !isDarkTheme }"
    >
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <router-link
            class="navbar-brand d-flex align-items-center ms-5"
            to="/Login"
          >
            <img src="@/assets/mainlogo.png" alt="Logo" class="me-2 logo" />
            <span>{{ types.NAME_APP }}</span>
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav mb-2 mb-lg-0 me-3">
              <li class="nav-item me-3">
                <router-link class="nav-link nav-item-hover" to="/">
                  <i class="bi bi-house-door-fill"></i>{{ types.START }}
                </router-link>
              </li>
              <li class="nav-item me-3">
                <router-link class="nav-link nav-item-hover" to="/TaskList">
                  <i class="bi bi-book-fill"></i>{{ types.INVENTARIO_DE_LIBROS }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-item-hover" to="/add-book">
                  <i class="bi bi-clipboard-plus-fill"></i> {{ types.ADD_TASK }}
                </router-link>
              </li>
              <li class="nav-item ms-3">
                <button
                  @click="toggleTheme"
                  class="btn btn-outline-secondary theme-button"
                >
                  <i v-if="isDarkTheme" class="bi bi-sun"></i>
                  <i v-else class="bi bi-moon"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div class="container mt-4">
      <router-view :is-dark-theme="isDarkTheme"></router-view>
    </div>
  </div>
</template>

<script>
import types from './types.js'

export default {
  data() {
    return {
      types,
      isDarkTheme: true,
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';

/* Estilos generales */
#app {
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

header {
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dark-header {
  background-color: #2d3e50;
}

.light-header {
  background-color: #f8f5f1;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.navbar-brand span {
  color: inherit;
}

.nav-link {
  font-size: 1.1rem;
  color: #ffffff !important;
  display: flex;
  align-items: center;
}

.nav-item-hover {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
}

.nav-item-hover:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.navbar-toggler {
  border: none;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}

.btn-outline-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-color: #ffffff;
}

.theme-button {
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
}

.btn-outline-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logo {
  width: 40px;
  height: 40px;
}

.dark-theme {
  background-color: #2d3e50;
  color: #ffffff;
}

.dark-theme .navbar {
  border-bottom: 1px solid #4e4e4e;
}

.dark-theme .card {
  border: 1px solid #4e4e4e;
}

.dark-theme .card-header {
  background-color: #4e4e4e;
}

.dark-theme .card-body {
  background-color: #2d3e50;
}

.dark-theme .table thead th {
  background-color: #4e4e4e;
  color: #ffffff;
}

.dark-theme .table tbody td {
  background-color: #2d3e50;
  color: #ffffff;
}

.light-theme {
  background-color: #f8f5f1;
  color: #2d3e50;
}

.light-theme .navbar {
  border-bottom: 1px solid #2d3e50;
}

.light-theme .navbar-brand {
  color: #2d3e50;
}

.light-theme .navbar-brand span {
  color: #2d3e50;
}

.light-theme .nav-link {
  color: #2d3e50 !important;
}

.light-theme .btn-outline-secondary {
  color: #2d3e50;
  border-color: #2d3e50;
}

.light-theme .btn-outline-secondary:hover {
  background-color: rgba(45, 62, 80, 0.1);
}

.light-theme .card {
  border: 1px solid #2d3e50;
}

.light-theme .card-header {
  background-color: #f8f5f1;
}

.light-theme .card-body {
  background-color: #ffffff;
}

.light-theme .table thead th {
  background-color: #e0e0e0;
  color: #2d3e50;
}

.light-theme .table tbody td {
  background-color: #ffffff;
  color: #2d3e50;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: inherit;
}

.theme-icon {
  width: 24px;
  height: 24px;
}
</style>
