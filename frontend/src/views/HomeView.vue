<template>
    
<div class="home">
    <div class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <Title :title="'Featured Bids'" />
                <hr>
            </div>
        </div>
        <div v-if="!this.$store.state.loading" class="row">
            <div class="col-md-4" v-for="bid in activeBids" :key="bid.id">
                <Product :product="bid" />
            </div>
        </div>
        <template v-else >
            <Loader />
        </template>
    </div>
</div>

</template>

<script>

import axios from 'axios';

import {listAllBidUrl} from '../constants';
import Title from '../components/Title.vue';
import Loader from '../components/Loader.vue';
import Product from '../components/Product.vue';


export default {
    name: "HomeView",
    components: {Product, Loader, Title, },
    
    data() {
        return {
            activeBids: [],
        }
    },

    methods: {
        async getAllBids() {
            try{
                this.$store.commit('setLoadingTrue');
                axios.defaults.headers = {'Authorization': `${this.$store.state.authorizationHeaderType} ${this.$store.state.user.token}`};
                const request = await axios.get(listAllBidUrl);
                const response = await request.data;
                this.activeBids = response;
                this.$store.commit('setLoadingFalse');
            }
            catch(error) {
                this.$store.commit('setLoadingFalse');
                console.log(error);
            }
        }
    },

    mounted() {
        document.title = "Home";
        this.getAllBids();
    }

}
</script>