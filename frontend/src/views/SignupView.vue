<template>
    <Signup />
</template>

<script>

import Signup from '../components/Signup.vue';

export default {
    name: "SignupView",
    components: {Signup},
    
    mounted() {
        document.title = 'Sign up';
    }
}
</script>