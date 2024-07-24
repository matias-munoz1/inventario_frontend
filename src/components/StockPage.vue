<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <h2>Stock Bodegas</h2>
          <ul class="list-group">
            <li v-for="store in stores" :key="store.name" class="list-group-item">
              <div class="d-flex justify-content-between align-items-center" @click="toggleBooks(store)" style="cursor: pointer;">
                <span>{{ store.name }}</span>
                <div class="d-flex align-items-center">
                  <span class="badge bg-primary rounded-pill me-2">{{ store.totalStock }}</span>
                  <i :class="store.showBooks ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
                </div>
              </div>
              <ul v-if="store.showBooks" class="list-group mt-2 w-100">
                <li v-for="book in store.books" :key="book.title" class="list-group-item d-flex justify-content-between align-items-center">
                  {{ book.title }}
                  <span class="badge bg-secondary rounded-pill">Stock: {{ book.stock }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <h2>Movimientos Recientes</h2>
          <ul class="list-group recent-movements">
            <li v-for="movement in movements" :key="movement.id" class="list-group-item">
              <div class="movement-info">
                <div><strong>Libro:</strong> {{ movement.title }}</div>
                <div><strong>Origen:</strong> {{ movement.fromCity }}</div>
                <div><strong>Destino:</strong> {{ movement.toCity }}</div>
                <div><strong>Stock Movido:</strong> {{ movement.stock }}</div>
                <div><strong>Fecha:</strong> {{ new Date(movement.createdAt).toLocaleString() }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        stores: [
          { name: 'Viña del Mar', totalStock: 0, showBooks: false, books: [] },
          { name: 'Rancagua', totalStock: 0, showBooks: false, books: [] },
          { name: 'Curicó', totalStock: 0, showBooks: false, books: [] },
          { name: 'Talca', totalStock: 0, showBooks: false, books: [] },
          { name: 'Chillán', totalStock: 0, showBooks: false, books: [] },
          { name: 'Talcahuano (Mall Trébol)', totalStock: 0, showBooks: false, books: [] },
          { name: 'Concepción', totalStock: 0, showBooks: false, books: [] },
          { name: 'Los Ángeles', totalStock: 0, showBooks: false, books: [] },
          { name: 'Temuco', totalStock: 0, showBooks: false, books: [] },
          { name: 'Valdivia', totalStock: 0, showBooks: false, books: [] },
          { name: 'Osorno', totalStock: 0, showBooks: false, books: [] },
          { name: 'Puerto Montt', totalStock: 0, showBooks: false, books: [] }
        ],
        movements: []
      };
    },
    mounted() {
      this.fetchBooks();
      this.fetchMovements();
    },
    methods: {
      toggleBooks(store) {
        store.showBooks = !store.showBooks;
      },
      fetchBooks() {
        axios.get('http://localhost:3000/api/books/')
          .then(response => {
            const books = response.data;
            books.forEach(book => {
              const store = this.stores.find(store => store.name === book.city);
              if (store) {
                store.books.push(book);
                store.totalStock += book.stock;
              }
            });
          })
          .catch(error => {
            console.error('Error fetching books:', error);
          });
      },
      fetchMovements() {
        axios.get('http://localhost:3000/api/movements/')
          .then(response => {
            this.movements = response.data;
          })
          .catch(error => {
            console.error('Error fetching movements:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  .list-group-item {
    cursor: pointer;
  }
  .recent-movements .list-group-item {
    display: flex;
    flex-direction: column;
  }
  .movement-info {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
  }
  .movement-info > div {
    margin-bottom: 5px;
  }
  .movement-info > div:last-child {
    margin-bottom: 0;
  }
  </style>
  