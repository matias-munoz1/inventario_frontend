<template>
  <section
    class="vh-100"
    style="
      background: url(https://cdn.pixabay.com/photo/2024/05/20/21/29/ai-generated-8776335_1280.jpg);
      background-size: cover;
      background-position: center;
    "
  >
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div
            class="card"
            style="
              border-radius: 1rem;
              backdrop-filter: blur(5px);
              background-color: rgba(0, 0, 0, 0.5);
            "
          >
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://cdn.pixabay.com/photo/2024/05/20/21/29/ai-generated-8776335_1280.jpg"
                  alt="login form"
                  class="img-fluid"
                  style="border-radius: 1rem 0 0 1rem"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-white">
                  <form @submit.prevent="submitForm">
                    <h5
                      class="fw-normal mb-1 pb-5"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 20px;
                        color: white;
                      "
                    >
                      Ingresa a tu cuenta
                    </h5>

                    <!-- Email input -->
                    <div class="form-outline mb-4">
                      <label
                        class="form-label"
                        for="form2Example17"
                        style="color: white"
                      >
                        Ingresa tu correo
                      </label>
                      <input
                        v-model="form.email"
                        type="email"
                        id="form2Example17"
                        class="form-control form-control-lg"
                        placeholder="Ingresa tu correo"
                      />
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-4">
                      <label
                        class="form-label"
                        for="form2Example27"
                        style="color: white"
                      >
                        Ingresa tu contraseña
                      </label>
                      <input
                        v-model="form.password"
                        type="password"
                        id="form2Example27"
                        class="form-control form-control-lg"
                        placeholder="Ingresa tu contraseña"
                      />
                    </div>

                    <!-- Submit button -->
                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Ingresar
                      </button>
                    </div>

                    <!-- Error message -->
                    <div
                      v-if="errorMessage"
                      class="alert alert-danger"
                      role="alert"
                    >
                      {{ errorMessage }}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errorMessage: '',
    }
  },
  methods: {
    submitForm() {
      // Simular validación
      if (!this.form.email || !this.form.password) {
        this.errorMessage =
          'Por favor ingresa un correo y una contraseña válidos.'
        return
      }

      // Aquí iría la lógica de autenticación real, por ejemplo, con una API
      // En este ejemplo, simplemente simulamos una respuesta después de 1 segundo
      setTimeout(() => {
        if (
          this.form.email === 'test@example.com' &&
          this.form.password === 'password'
        ) {
          alert('¡Inicio de sesión exitoso!')
          // Aquí podrías redirigir o hacer otras operaciones necesarias
        } else {
          this.errorMessage =
            'Credenciales incorrectas. Por favor intenta de nuevo.'
        }
      }, 1000) // Simulación de tiempo de respuesta de la API
    },
  },
}
</script>

<style scoped>
/* Estilos específicos para este componente, si es necesario */
</style>
