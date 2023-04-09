<template>
    
    <div class="card my-1">
    <img :src="product.thumbnail" class="card-img-top product-image" alt="...">
    <div class="card-body">
        <h5 class="card-title">{{ product.title.slice(0, 25) }}</h5>
        <p class="card-text font-weight-bold"><strong>${{ product.price }}</strong></p>
        <router-link :to= "'/' + product.slug" class="btn btn-dark">Bid Now</router-link>
    </div>
    </div>

</template>

<style>

    .product-image {
        width: 100%;
        height: 320px;
    }

</style>

<script>
export default {
    name: "Product",
    props: {
        product: Object
    }
}
</script>