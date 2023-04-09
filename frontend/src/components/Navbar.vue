<template>
    <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
    <div class="container-fluid">
        <router-link to="/" class="navbar-brand" href="#">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link to="/products" class="nav-link" aria-current="page" href="#">Products</router-link>
            </li>
            <li class="nav-item">
            <a @click="logout" class="nav-link">Logout</a>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
            </a>
            <ul class="dropdown-menu">
                <li><router-link to="/profile" class="dropdown-item">Profile</router-link></li>
                <li>
                    <a @click="logout" class="dropdown-item cursor">Logout</a>
                </li>
            </ul>
            </li>
        </ul>
        </div>
    </div>
</nav>
</template>

<style>

.nav-item .nav-link {
    color: white !important;
    cursor: pointer;
}

</style>

<script>
export default {
    name: "Navbar",
    data() {
        return {

        }
    },
    methods: {
        logout() {
            this.$store.commit('removeToken');
            this.$router.push('/login');
        }
    }
}
</script>