// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuthData(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, authData) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', authData);
        const token = response.data.token;
        const user = response.data.user;
        commit('setToken', token);
        commit('setUser', user);
      } catch (error) {
        throw new Error(error.response.data.message || 'Login failed.');
      }
    },
    logout({ commit }) {
      commit('clearAuthData');
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    userRole(state) {
      return state.user ? state.user.role : null;
    },
  },
});
