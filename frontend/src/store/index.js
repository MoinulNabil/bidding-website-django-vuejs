import { createStore } from 'vuex'

import jwt_decode from "jwt-decode";

export default createStore({
  state: {
    user: {
      token: "",
      id: "",
      email: ""
    },
    loading: false,
    isAuthenticated: false,
    authorizationHeaderType: "Bearer"
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      let token = localStorage.getItem('token');
      if(token) {
        const payload = jwt_decode(token);
        let authenticated = Date.now() > payload.exp * 1000 ? false: true;
        if(!authenticated && token) {
          localStorage.removeItem('token');
        }
        else {
          state.user.token = token;
          state.isAuthenticated = true;
          const decoded = jwt_decode(state.user.token);
          state.user.id = decoded.user_id;
        }
      }
      else {
        state.user.token = "";
        state.isAuthenticated = false;
        state.user.id = "";
      }
  
    },

    setToken(state, data) {
      localStorage.setItem('token', data.access);
      state.user.token = data.access;
      state.isAuthenticated = true;
      const decoded = jwt_decode(data.access);
      state.user.id = decoded.user_id;
    },

    removeToken(state) {
      localStorage.removeItem('token');
      state.user.token = "";
      state.isAuthenticated = false;
      state.user.id = "";
    },
    
    setLoadingTrue(state){
      state.loading = true;
    },
    
    setLoadingFalse(state){
      state.loading = false;
    },
  },
  actions: {
  },
  modules: {
  }
})
