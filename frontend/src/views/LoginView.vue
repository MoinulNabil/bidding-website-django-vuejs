<template>
    <div class="login" >
        <Login />
        
    </div>
</template>

<script>

import Login from '../components/Login.vue';

export default {
    name: "LoginView",
    components: {Login},
    mounted() {
        document.title = 'Login';
    }
}
</script>