<template>
  <div>
    <h2>{{ types.EDIT_MODAL_TITLE }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <form @submit.prevent="showConfirmationModal">
        <div class="form-group">
          <label for="title">{{ types.TITLE_LABEL }}</label>
          <input
            type="text"
            v-model="task.title"
            class="form-control"
            id="title"
          />
        </div>
        <div class="form-group">
          <label for="description">{{ types.DESCRIPTION_LABEL }}</label>
          <textarea
            v-model="task.description"
            class="form-control"
            id="description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="category">Categoría</label>
          <input
            type="text"
            v-model="task.category"
            class="form-control"
            id="category"
          />
        </div>
        <div class="form-group">
          <label for="publisher">Editorial</label>
          <input
            type="text"
            v-model="task.publisher"
            class="form-control"
            id="publisher"
          />
        </div>
        <div class="form-group">
          <label for="status">{{ types.STATUS_LABEL }}</label>
          <select v-model="task.status" class="form-control" id="status">
            <option :value="true">{{ types.COMPLETE }}</option>
            <option :value="false">{{ types.STATUS_NO_COMPLETE }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="stock">{{ types.STOCK_LABEL }}</label>
          <input
            type="number"
            v-model="task.stock"
            class="form-control"
            id="stock"
          />
        </div>
        <button type="submit" class="btn btn-primary">{{ types.SAVE }}</button>
      </form>
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
        <div class="modal-content" :class="isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark'">
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
  </div>
</template>
<script>
import axios from 'axios'
import { Modal } from 'bootstrap'
import types from '../types.js'

export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    isDarkTheme: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      types,
      task: {},
      loading: true,
      error: null,
    }
  },
  watch: {
    book: {
      immediate: true,
      handler(newBook) {
        if (newBook) {
          this.task = { ...newBook }
          this.loading = false
        }
      }
    }
  },
  methods: {
    showConfirmationModal() {
      const modal = new Modal(document.getElementById('confirmationModal'))
      modal.show()
    },
    async confirmUpdateTask() {
      try {
        await axios.put(`http://localhost:3000/api/books/${this.task.id}`, this.task)
        const modal = Modal.getInstance(
          document.getElementById('confirmationModal')
        )
        modal.hide()
        this.$emit('task-updated');
      } catch (error) {
        this.error = error.response.data.message || 'Error updating task'
      }
    },
  },
}
</script>


<style scoped>
/* Tus estilos aquí */
</style>
