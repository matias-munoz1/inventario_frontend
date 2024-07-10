<template>
  <div>
    <h2>{{ types.EDIT_MODAL_TITLE }}Editar Tarea</h2>
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
          <label for="status">{{ types.STATUS_LABEL }}</label>
          <select v-model="task.status" class="form-control" id="status">
            <option :value="true">{{ types.COMPLETE }}</option>
            <option :value="false">{{ types.STATUS_NO_COMPLETE }}</option>
          </select>
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
        <div class="modal-content">
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
  data() {
    return {
      types,
      task: {},
      loading: true,
      error: null,
    }
  },
  created() {
    this.fetchTask()
  },
  methods: {
    fetchTask() {
      const taskId = this.$route.params.id
      axios
        .get(`http://localhost:3000/api/tasks/${taskId}`)
        .then((response) => {
          this.task = response.data
          this.loading = false
        })
        .catch((error) => {
          this.error = error.response.data.message || 'Error fetching task'
          this.loading = false
        })
    },
    showConfirmationModal() {
      const modal = new Modal(document.getElementById('confirmationModal'))
      modal.show()
    },
    async confirmUpdateTask() {
      const taskId = this.$route.params.id
      try {
        await axios.put(`http://localhost:3000/api/tasks/${taskId}`, this.task)
        const modal = Modal.getInstance(
          document.getElementById('confirmationModal')
        )
        modal.hide()
        this.$router.push('/')
      } catch (error) {
        this.error = error.response.data.message || 'Error updating task'
      }
    },
  },
}
</script>

<style











scoped></style>
