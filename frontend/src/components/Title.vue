<template>
    
    <h3 class="title text-muted">{{ title }}</h3>

</template>

<style>

    .title {
        
    }
</style>

<script>
export default {
    name: "Title",
    props: {
        title: String
    }
}
</script>