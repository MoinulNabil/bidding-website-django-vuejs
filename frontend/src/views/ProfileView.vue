<template>

 <div class="container py-5">
    <div v-if="!this.$store.state.loading" class="row justify-content-center align-items-center">
        <div class="col-md-9 px-4 table-responsive">
            <h3>My Bid History</h3>
            <hr>
            <table v-if="userBids.length > 0" class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Product Title</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Bidding Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="bid in userBids" :key="bid.id" >
                <td>
                    <router-link class="text-decoration-none cursor text-dark" :to="'/' + bid.product.slug" >
                        {{ bid.product.title }}
                    </router-link>
                </td>
                <td>{{ bid.amount }}</td>
                <td v-if="bid.own && !bid.product.active" >
                    <span class="badge text-bg-success">Winner</span>
                </td>
                <td v-else-if="!bid.own && !bid.product.active" >
                    <span class="badge text-bg-danger">Lost It</span>
                </td>
                <td v-else-if="!bid.own && bid.product.active" >
                    <span class="badge text-bg-warning">Pending</span>
                </td>
                <td>{{ new Date(bid.bid_time).toUTCString() }}</td>
                </tr>
                
            </tbody>
            </table>
            <template v-else >
                <h3 class="text-center" >No Bids Yet</h3>
            </template>
        </div>
        <div class="col-md-3 px-2">
            <div class="card px-4 py-4">
                <div class="card-title">
                    <h4>User Analytics</h4>
                    <hr>
                    <p><strong>Total Spent : </strong> ${{ total_spent }}</p>
                    <p><strong>Total Earned : </strong> ${{ total_earned }}</p>
                    <hr>
                </div>
            </div>
        </div>
    </div>
    <template v-else >
        <Loader />
    </template>
 </div>

</template>

<script>

import axios from 'axios'

import Loader from '../components/Loader.vue';
import {userBidHistoryUrl} from '../constants';

import moment from 'moment';


export default {
    name: "ProfileView",
    components: {Loader, },
    data() {
        return {
         userBids: [],
         total_spent: "",
         total_earned: ""
        }
    },
    methods: {
        async getUserBids() {
            try {
                this.$store.commit('setLoadingTrue');
                axios.defaults.headers = {'Authorization': `${this.$store.state.authorizationHeaderType} ${this.$store.state.user.token}`};
                const request = await axios.get(userBidHistoryUrl);
                const response = await request.data;
                this.userBids = response.bids;
                this.total_spent = response.total_spent;
                this.total_earned = response.total_earned;
                this.$store.commit('setLoadingFalse');
            }
            catch(error) {
                this.$store.commit('setLoadingFalse');
                console.log(error);
            }
        
        }
    },
    mounted() {
        document.title = "Profile";
        this.getUserBids();
    }
}
</script>