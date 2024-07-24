<template>
  <div class="container-fluid mt-5">
    <div :class="['card', 'shadow-sm', isDarkTheme ? 'bg-dark' : 'bg-light']">
      <div
        :class="[
          'card-header',
          isDarkTheme ? 'bg-dark' : 'bg-primary',
          'text-white',
          'text-center',
        ]"
      >
      
        <h2 class="mb-0">{{ types.TASK_LIST_TITLE }}</h2>
        
      </div>
      <div
        :class="[
          'card-body',
          isDarkTheme ? 'bg-dark' : 'bg-light',
          isDarkTheme ? 'text-white' : 'text-dark',
        ]"
      >
        <div v-if="error" class="alert alert-danger">
          Hubo un problema con el servidor. Por favor, inténtalo más tarde o contacta a los desarrolladores.
        </div>
        <div>
          <div class="d-flex justify-content-end mb-3">
            <select v-model="selectedFilter" class="form-control w-auto" style="margin-right: 10px;">
              <option value="title">Título</option>
              <option value="description">Descripción</option>
              <option value="category">Categoría</option>
              <option value="publisher">Editorial</option>
            </select>
            <input v-model="searchQuery" @input="filterBooks" type="text" class="form-control w-25" placeholder="Buscar libro...">
            
          </div>
          <div class="table-responsive">
            <table
              :class="[
                'table',
                'table-bordered',
                'table-hover',
                'table-striped',
                isDarkTheme ? 'table-dark' : 'table-light',
              ]"
              style="width: 100%; border-collapse: collapse;"
            >
              <thead :class="isDarkTheme ? 'thead-dark' : 'thead-light'">
                <tr>
                  <th scope="col">{{ types.ID_INCREMENTAL }}</th>
                  <th scope="col">{{ types.TITLE_LABEL }}</th>
                  <th scope="col">{{ types.DESCRIPTION_LABEL }}</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Editorial</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">{{ types.STATUS_LABEL }}</th>
                  <th scope="col">{{ types.STOCK_LABEL }}</th>
                  <th v-if="userRole !== 'viewer'" scope="col">{{ types.ACTIONS_LABEL }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in paginatedBooks" :key="book.id">
                  <td>{{ book.id }}</td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.description }}</td>
                  <td>{{ book.category }}</td>
                  <td>{{ book.publisher }}</td>
                  <td>{{ book.city }}</td>
                  <td>
                    <span :class="book.status ? 'badge bg-success' : 'badge bg-danger'">
                      {{ book.status ? 'Inventario completo' : 'Inventario pendiente' }}
                    </span>
                  </td>
                  <td>{{ book.stock }}</td>
                  <td v-if="userRole !== 'viewer'" class="actions">
                    <button @click="editBook(book.id)" class="btn btn-warning btn-sm">
                      <i class="bi bi-pencil-fill"></i> Editar
                    </button>
                    <button @click="openDeleteModal(book.id)" class="btn btn-danger btn-sm">
                      <i class="bi bi-trash-fill"></i> Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div class="modal fade" id="editTaskModal" tabindex="-1" aria-labelledby="editTaskModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" :class="isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark'">
          <div class="modal-header">
            <h5 class="modal-title" id="editTaskModalLabel">Editar Libro</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <edit-task :book="editBookData" :is-dark-theme="isDarkTheme" v-if="editBookData" @task-updated="fetchBooks"></edit-task>
            <p v-else>Book not found</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true" :class="isDarkTheme ? 'bg-dark' : 'bg-light'" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog" role="document">
        <div :class="['modal-content', isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark']">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirmar Eliminación</h5>
            <button type="button" class="close" @click="closeDeleteModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ¿Estás seguro de que deseas eliminar este libro?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Controles de paginación -->
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)">Anterior</button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="changePage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)">Siguiente</button>
        </li>
      </ul>
    </nav>
    <div class="d-flex justify-content-center px-5">
      <button v-if="userRole !== 'editor' && userRole !== 'viewer'" @click="generatePDF" class="btn btn-secondary">
  Generar Informe
  </button>
  <button @click="goToStockPage" class="btn btn-stock ml-3">Stock de Bodegas</button>
    </div>  
  </div>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';
import types from '../types.js';
import EditTask from './EditTask.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  components: {
    EditTask
  },
  props: {
    isDarkTheme: Boolean,
  },
  data() {
    return {
      isDarkTheme: true,
      types,
      books: [],
      searchQuery: '',
      filteredBooks: [],
      selectedFilter: 'title',
      error: null,
      editBookId: null,
      editBookData: null,
      currentPage: 1,
      booksPerPage: 5,
      bookIdToDelete: null,
      showDeleteModal: false,
      createdDate: new Date().toLocaleDateString(), // Fecha de creación
    };
  },
  computed: {
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      const end = start + this.booksPerPage;
      return this.filteredBooks.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.booksPerPage);
    },
    totalBooks() {
      return this.books.length;
    },
    totalStock() {
      return this.books.reduce((total, book) => total + book.stock, 0);
    },
    userRole() {
      return this.$store.getters.userRole;
    }
  },
  created() {
    this.loadBooks();
  },
  methods: {
    goToStockPage() {
      this.$router.push('/stock');
    },
    loadBooks() {
      axios.get('http://localhost:3000/api/books/')
        .then(response => {
          this.books = response.data;
          this.filteredBooks = this.books; // Inicializar libros filtrados con todos los libros
        })
        .catch(error => {
          console.error('Hubo un error al cargar los libros:', error);
          this.error = 'Hubo un problema con el servidor. Por favor, inténtalo más tarde o contacta a los desarrolladores.';
        });
    },
    filterBooks() {
      if (this.searchQuery.trim() === '') {
        this.filteredBooks = this.books;
      } else {
        const query = this.searchQuery.trim().toLowerCase();
        this.filteredBooks = this.books.filter(book => {
          switch (this.selectedFilter) {
            case 'title':
              return book.title && book.title.toLowerCase().includes(query);
            case 'description':
              return book.description && book.description.toLowerCase().includes(query);
            case 'category':
              return book.category && book.category.toLowerCase().includes(query);
            case 'publisher':
              return book.publisher && book.publisher.toLowerCase().includes(query);
            case 'city':
              return book.city && book.city.toLowerCase().includes(query);
            default:
              return false;
          }
        });
      }
      this.currentPage = 1; // Resetear a la primera página al filtrar
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    editBook(bookId) {
      const book = this.books.find((b) => b.id === bookId);
      if (book) {
        this.editBookId = bookId;
        this.editBookData = book;
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then(
          (bootstrap) => {
            const modal = new bootstrap.Modal(
              document.getElementById('editTaskModal')
            );
            modal.show();
          }
        );
      } else {
        console.error('Book not found with ID:', bookId);
        this.editBookData = null; // Asegúrate de manejar el caso donde no se encuentra el libro
      }
    },
    openDeleteModal(bookId) {
      this.bookIdToDelete = bookId;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.bookIdToDelete = null;
    },
    confirmDelete() {
      axios.delete(`http://localhost:3000/api/books/${this.bookIdToDelete}`)
        .then(response => {
          this.books = this.books.filter(book => book.id !== this.bookIdToDelete);
          this.filteredBooks = this.books;
          this.closeDeleteModal();
          alert('Libro eliminado con éxito.');
        })
        .catch(error => {
          console.error('Hubo un error al eliminar el libro:', error);
        });
    },
    generatePDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('INVENTARIO LIBRERIA EL POETA', 14, 22);
      doc.setFontSize(12);
      doc.text(`Fecha de creación: ${this.createdDate}`, 14, 30);
      doc.text(`Cantidad de libros: ${this.totalBooks}`, 14, 36);
      doc.text(`Cantidad de stock: ${this.totalStock}`, 14, 42);
      
      const columns = [
        { header: this.types.ID_INCREMENTAL, dataKey: 'id' },
        { header: this.types.TITLE_LABEL, dataKey: 'title' },
        { header: this.types.DESCRIPTION_LABEL, dataKey: 'description' },
        { header: 'Categoría', dataKey: 'category' },
        { header: 'Editorial', dataKey: 'publisher' },
        { header: 'Ciudad', dataKey: 'city' },
        { header: this.types.STOCK_LABEL, dataKey: 'stock' },
        { header: this.types.STATUS_LABEL, dataKey: 'status' },
      ];
      const rows = this.filteredBooks.map((book) => ({
        ...book,
        status: book.status ? this.types.STATUS_COMPLETE : this.types.STATUS_NO_COMPLETE,
      }));
      doc.autoTable({
        head: [columns.map(col => col.header)],
        body: rows.map(row => columns.map(col => row[col.dataKey])),
        startY: 50, // Starting after the text
      });
      doc.save('books.pdf');
    },
  },
};
</script>

<style scoped>
/* Otros estilos ... */
.btn-stock {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}
.btn-stock:hover {
  background-color: #218838;
  border-color: #1e7e34;
}
</style>