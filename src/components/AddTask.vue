<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
    :class="isDarkTheme ? 'dark-theme' : 'light-theme'"
  >
    <div class="card shadow-lg p-4" :class="isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark'">
      <h1 class="display-4 mb-4">{{ types.ADD_NEW_TASK }}</h1>
      <form
        @submit.prevent="showConfirmationModal"
        class="needs-validation"
        novalidate
      >
        <div class="mb-3">
          <label for="title" class="form-label">{{ types.TITLE_LABEL }}</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="title"
            required
          />
          <div class="invalid-feedback">
            {{ types.PLEASE_ENTER_TITLE }}
          </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">{{
            types.DESCRIPTION_LABEL
          }}</label>
          <textarea
            class="form-control"
            id="description"
            v-model="description"
            required
            rows="3"
          ></textarea>
          <div class="invalid-feedback">
            {{ types.PLEASE_ENTER_DESCRIPTION }}
          </div>
        </div>
        <div class="mb-3">
          <label for="stock" class="form-label">{{ types.STOCK_LABEL }}</label>
          <input
            type="number"
            class="form-control"
            id="stock"
            v-model="stock"
            required
          />
          <div class="invalid-feedback">
            {{ types.PLEASE_ENTER_STOCK }}
          </div>
        </div>
        <div class="form-check mb-3">
          <input
            type="checkbox"
            class="form-check-input"
            id="status"
            v-model="status"
          />
          <label class="form-check-label" for="status">{{
            types.COMPLETE
          }}</label>
        </div>
        <button type="submit" class="btn btn-primary w-100">{{ types.ADD }}</button>
      </form>

      <!-- Modal de Confirmación -->
      <div
        class="modal fade"
        id="confirmationModal"
        tabindex="-1"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true"
        ref="confirmationModal"
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
              {{ types.CONFIRMATION_ADD_TASK }}
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
                @click="confirmAddTask"
              >
                {{ types.CONFIRM_BUTTON }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import types from '../types.js'

export default {
  name: 'AddTask',
  props: {
    isDarkTheme: Boolean,
  },
  data() {
    return {
      types,
      title: '',
      description: '',
      stock: 0,
      status: false,
    }
  },
  methods: {
    showConfirmationModal() {
      const form = this.$el.querySelector('form')
      if (form.checkValidity()) {
        const modal = new Modal(this.$refs.confirmationModal)
        modal.show()
      } else {
        form.classList.add('was-validated')
      }
    },
    async confirmAddTask() {
      try {
        const task = {
          title: this.title,
          description: this.description,
          stock: this.stock,
          status: this.status,
        }
        await axios.post('http://localhost:3000/api/tasks', task)
        const modal = Modal.getInstance(this.$refs.confirmationModal)
        modal.hide()
        this.$router.push('/')
      } catch (error) {
        console.error('Error adding task:', error)
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

.display-4 {
  font-size: 2.5rem;
  font-weight: 300;
}

.form-label {
  font-weight: 500;
}

.form-control, .form-check-input {
  border-radius: 4px;
  box-shadow: none;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.card {
  max-width: 500px;
  width: 100%;
  border-radius: 8px;
  padding: 20px;
}

.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.light-theme .form-check-input {
  border: 2px solid #000;
  background-color: #fff;
  width: 20px;
  height: 20px;
}

.light-theme .form-check-input:checked {
  background-color: #007bff;
  border-color: #007bff;
}

.light-theme .form-check-label {
  color: #212529;
}

.dark-theme .form-check-input {
  border: 2px solid #fff;
  background-color: #343a40;
  width: 20px;
  height: 20px;
}

.dark-theme .form-check-input:checked {
  background-color: #007bff;
  border-color: #007bff;
}

.dark-theme .form-check-label {
  color: #fff;
}

.was-validated .form-control:invalid {
  border-color: #dc3545;
}

.was-validated .form-control:invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.was-validated .form-check-input:invalid {
  border-color: #dc3545;
}

.was-validated .form-check-input:invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.invalid-feedback {
  display: none;
}

.was-validated .form-control:invalid ~ .invalid-feedback {
  display: block;
}

.modal-content {
  border-radius: 8px;
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
}

.modal-footer .btn {
  min-width: 100px;
}
</style>
