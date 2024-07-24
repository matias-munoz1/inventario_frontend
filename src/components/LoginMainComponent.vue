<template>
  <section class="vh-100" :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 login-box">
        <div class="text-center mb-4">
          <img :src="logoImage" alt="Logo del Libro" class="rounded-circle" width="100" height="100">
        </div>
        <h2 class="text-center mb-4" style="color: #fff;">BIENVENIDO</h2>
        <p class="text-center mb-4" style="color: #fff;">Inicia sesión ingresando la información a continuación</p>
        <form @submit.prevent="submitForm" class="signin-form">
          <div class="form-outline mb-4">
            <input 
              v-model="form.email" 
              type="email" 
              id="form2Example18" 
              class="form-control form-control-lg" 
              placeholder="Correo Electrónico"
              required 
            />
          </div>

          <div class="form-outline mb-4 position-relative">
            <input 
              ref="password" 
              v-model="form.password" 
              :type="passwordVisible ? 'text' : 'password'" 
              id="form2Example28" 
              class="form-control form-control-lg" 
              placeholder="Contraseña"
              required 
            />
            <span
              @click="togglePassword"
              class="fa fa-fw fa-eye field-icon toggle-password"
            ></span>
          </div>

          <div class="d-flex justify-content-between mb-4">
            <a href="#!" class="text-light">¿Olvidaste tu contraseña?</a>
          </div>

          <div class="pt-1 mb-4">
            <button class="btn btn-lg btn-block" type="submit" style="background-color: #b892d9; color: #fff;">Iniciar Sesión</button>
          </div>

          <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errorMessage: '',
      passwordVisible: false,
      backgroundImage: 'https://www.theopennotebook.com/wp-content/uploads/2016/03/shutterstock_182727164.jpg', // URL de la imagen de fondo
      logoImage: 'https://i.pinimg.com/originals/42/d8/82/42d882296cdfcea7e0f01de91713cab8.jpg' // URL de la imagen del logo
    };
  },
  methods: {
    ...mapActions(['login']),
    async submitForm() {
      if (!this.form.email || !this.form.password) {
        this.errorMessage = 'Por favor, introduce un correo electrónico y contraseña válidos.';
        return;
      }

      try {
        await this.login(this.form);
        alert('Bienvenido!');
        this.$router.push({ path: '/TaskList' });  // Asegúrate de que esta ruta exista
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style scoped>
.login-box {
  background-color: #2d3142;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
}

.field-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;
}

a {
  color: #b892d9;
}

a:hover {
  color: #a178bb;
  text-decoration: underline;
}

.form-label {
  color: #fff;
}
</style>
