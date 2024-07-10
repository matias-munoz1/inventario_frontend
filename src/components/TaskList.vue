<template>
  <div class="container mt-5">
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
          {{ types.SERVER_ERROR_MESSAGE }}
        </div>
        <div v-else>
          <button @click="generatePDF" class="btn btn-secondary mb-3">
            {{ types.GENERATE_PDF }}
          </button>
          <div class="table-responsive">
            <table
              :class="[
                'table',
                'table-bordered',
                'table-hover',
                'table-striped',
                isDarkTheme ? 'table-dark' : 'table-light',
              ]"
            >
              <thead :class="isDarkTheme ? 'thead-dark' : 'thead-light'">
                <tr>
                  <th scope="col">{{ types.ID_INCREMENTAL }}</th>
                  <th scope="col">{{ types.TITLE_LABEL }}</th>
                  <th scope="col">{{ types.DESCRIPTION_LABEL }}</th>
                  <th scope="col">{{ types.STATUS_LABEL }}</th>
                  <th scope="col">{{ types.STOCK_LABEL }}</th>
                  <th scope="col">{{ types.ACTIONS_LABEL }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in paginatedTasks" :key="task.id">
                  <td>{{ task.id }}</td>
                  <td>{{ task.title }}</td>
                  <td>{{ task.description }}</td>
                  <td>
                    <span
                      :class="{
                        'badge bg-success': task.status,
                        'badge bg-secondary': !task.status,
                      }"
                    >
                      {{
                        task.status
                          ? types.STATUS_COMPLETE
                          : types.STATUS_NO_COMPLETE
                      }}
                    </span>
                  </td>
                  <td>{{ task.stock }}</td>
                  <td>
                    <button
                      @click="editTask(task.id)"
                      class="btn btn-warning btn-sm me-2"
                    >
                      <i class="bi bi-pencil-fill"></i> {{ types.EDIT_TASK }}
                    </button>
                    <button
                      @click="showDeleteConfirmationModal(task.id)"
                      class="btn btn-danger btn-sm"
                    >
                      <i class="bi bi-trash-fill"></i> {{ types.DELETE }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav
            aria-label="Page navigation"
            class="d-flex justify-content-center"
          >
            <ul
              class="pagination pagination-md"
              :class="isDarkTheme ? 'pagination-dark' : 'pagination-light'"
            >
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="changePage(currentPage - 1)"
                  >{{ types.PREVIOUS_NAVIGATION }}</a
                >
              </li>
              <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: page === currentPage }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="changePage(page)"
                  >{{ page }}</a
                >
              </li>
              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="changePage(currentPage + 1)"
                  >{{ types.AFTER_NAVIGATION }}</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Modal de Edición -->
    <div
      class="modal fade"
      id="editTaskModal"
      tabindex="-1"
      aria-labelledby="editTaskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div
          :class="[
            'modal-content',
            isDarkTheme ? 'bg-dark' : 'bg-light',
            isDarkTheme ? 'text-white' : 'text-dark',
          ]"
        >
          <div class="modal-header">
            <h5 class="modal-title" id="editTaskModalLabel">
              {{ types.EDIT_MODAL_TITLE }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="showConfirmationModal">
              <div class="mb-3">
                <label for="editTitle" class="form-label">{{
                  types.TITLE_LABEL
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="editTitle"
                  v-model="editTaskData.title"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editDescription" class="form-label">{{
                  types.DESCRIPTION_LABEL
                }}</label>
                <textarea
                  class="form-control"
                  id="editDescription"
                  v-model="editTaskData.description"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="editStock" class="form-label">{{
                  types.STOCK_LABEL
                }}</label>
                <input
                  type="number"
                  class="form-control"
                  id="editStock"
                  v-model="editTaskData.stock"
                  required
                />
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="editStatus"
                  v-model="editTaskData.status"
                />
                <label class="form-check-label" for="editStatus">{{
                  types.STATUS_COMPLETE
                }}</label>
              </div>
              <button type="submit" class="btn btn-primary">
                {{ types.SAVE_BUTTON }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación -->
    <div
      class="modal fade"
      id="confirmationModal"
      tabindex="-1"
      aria-labelledby="confirmationModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div
          :class="[
            'modal-content',
            isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark',
          ]"
        >
          <div class="modal-header">
            <h5 class="modal-title" id="confirmationModalLabel">
              {{ types.CONFIRM }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {{ types.CONFIRMATION_MESSAGE }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ types.CANCEL_BUTTON }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="confirmUpdateTask"
            >
              {{ types.CONFIRM_BUTTON }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación de Eliminación -->
    <div
      class="modal fade"
      id="deleteConfirmationModal"
      tabindex="-1"
      aria-labelledby="deleteConfirmationModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div
          :class="[
            'modal-content',
            isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark',
          ]"
        >
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmationModalLabel">
              {{ types.CONFIRM_DELETION }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {{ types.DELETE_CONFIRMATION_MODAL_MESSAGE }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ types.CANCEL_BUTTON }}
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="confirmDeleteTask"
            >
              {{ types.DELETE }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { Modal } from 'bootstrap'
import types from '../types.js'

export default {
  props: {
    isDarkTheme: Boolean,
  },
  data() {
    return {
      types,
      tasks: [],
      error: null,
      editTaskData: {
        id: null,
        title: '',
        description: '',
        status: false,
        stock: 0,
      },
      taskIdToDelete: null,
      currentPage: 1,
      tasksPerPage: 5,
    }
  },
  computed: {
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.tasksPerPage
      const end = start + this.tasksPerPage
      return this.tasks.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.tasks.length / this.tasksPerPage)
    },
  },
  created() {
    this.fetchTasks()
  },
  methods: {
    fetchTasks() {
      axios
        .get('http://localhost:3000/api/tasks')
        .then((response) => {
          this.tasks = response.data
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error)
          this.error =
            'Hubo un problema con el servidor. Por favor, inténtalo más tarde o contacta a los desarrolladores.'
        })
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    editTask(taskId) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        this.editTaskData = { ...task }
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then(
          (bootstrap) => {
            const modal = new bootstrap.Modal(
              document.getElementById('editTaskModal')
            )
            modal.show()
          }
        )
      }
    },
    showConfirmationModal() {
      const modal = new Modal(document.getElementById('confirmationModal'))
      modal.show()
    },
    async confirmUpdateTask() {
      try {
        await axios.put(
          `http://localhost:3000/api/tasks/${this.editTaskData.id}`,
          this.editTaskData
        )
        const confirmationModal = Modal.getInstance(
          document.getElementById('confirmationModal')
        )
        confirmationModal.hide()
        this.fetchTasks()
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then(
          (bootstrap) => {
            const editModal = bootstrap.Modal.getInstance(
              document.getElementById('editTaskModal')
            )
            editModal.hide()
          }
        )
      } catch (error) {
        console.error('Error updating task:', error)
      }
    },
    showDeleteConfirmationModal(taskId) {
      this.taskIdToDelete = taskId
      const modal = new Modal(
        document.getElementById('deleteConfirmationModal')
      )
      modal.show()
    },
    async confirmDeleteTask() {
      try {
        await axios.delete(
          `http://localhost:3000/api/tasks/${this.taskIdToDelete}`
        )
        const deleteModal = Modal.getInstance(
          document.getElementById('deleteConfirmationModal')
        )
        deleteModal.hide()
        this.fetchTasks()
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    },
    generatePDF() {
      const doc = new jsPDF()
      const columns = [
        { header: this.types.ID_INCREMENTAL, dataKey: 'id' },
        { header: this.types.TITLE_LABEL, dataKey: 'title' },
        { header: this.types.DESCRIPTION_LABEL, dataKey: 'description' },
        { header: this.types.STOCK_LABEL, dataKey: 'stock' },
        { header: this.types.STATUS_LABEL, dataKey: 'status' },
      ]
      const rows = this.tasks.map((task) => ({
        ...task,
        status: task.status
          ? this.types.STATUS_COMPLETE
          : this.types.STATUS_NO_COMPLETE,
      }))
      doc.autoTable(columns, rows)
      doc.save('tasks.pdf')
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';

/* Estilos generales */
body {
  font-family: 'Roboto', sans-serif;
}

.container {
  max-width: 900px;
}

.card-header {
  background-color: #007bff;
  color: #ffffff;
  text-align: center;
}

.table thead th {
  vertical-align: middle;
  text-align: center;
}

.table tbody td {
  vertical-align: middle;
  text-align: center;
}

.table-responsive {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
}

.page-link {
  cursor: pointer;
  outline: none !important;
}

.bg-dark .table-dark thead th,
.bg-dark .table-dark tbody td {
  background-color: #343a40;
  color: #ffffff;
}

.bg-dark .modal-content {
  background-color: #343a40;
  color: #ffffff;
}

.bg-light .table-light thead th,
.bg-light .table-light tbody td {
  background-color: #f8f9fa;
}

.bg-light .modal-content {
  background-color: #ffffff;
  color: #000000;
}

.bg-dark .pagination-dark .page-item .page-link {
  background-color: #495057;
  color: #ffffff;
}

.bg-dark .pagination-dark .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: #ffffff;
}

.bg-light .pagination-light .page-item .page-link {
  background-color: #ffffff;
  color: #000000;
}

.bg-light .pagination-light .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: #ffffff;
}
</style>
