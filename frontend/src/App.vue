<template>
  
  <Navbar v-if="this.$store.state.isAuthenticated" />

  <router-view />
  
</template>

<style lang="scss">

.form-control {
    outline: none !important;
    box-shadow: none !important;
    border-color: none !important;
}

.form-control:focus {
    outline: black !important;
    box-shadow: black !important;
    border-color: black !important;
    border-top-color: black !important;
    border-bottom-color: black !important;
    border-left-color: black !important;
    border-right-color: black !important;

}
.cursor {
  cursor: pointer;
}

.middle-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
        width: 100%;
  }

</style>

<script>

import isAuthenticated from './auth';
import Navbar from './components/Navbar.vue';

import { toast } from 'vue3-toastify';

export default {
  components: {Navbar, },
  
  setup() {
    const notify = () => {
      toast("Wow so easy !", {
        autoClose: 1000,
      }); // ToastOptions
    }
    return { notify };
   },

  data() {
    return {
      userIsAuthenticated: isAuthenticated()
    }
  },
  mounted() {
    this.$store.commit('initializeStore');
  }
}
</script>
