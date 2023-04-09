<template>

<div class="container py-5">
    <div v-if="!this.$store.state.loading" class="row" >
        <div class="col-md-3 px-4">
            <img class="img-fluid" style="width: 320px; height: 320px;" :src="product.thumbnail" alt="">
        </div>
        <div class="col-md-7 px-4">
            <h5 class="title" >{{ product.title }}</h5>
            <p class="title" ><strong>Base Price :</strong> ${{ product.price }}</p>
            <template v-if="product.active" >
                <p class="title" ><strong>Minimum Bidding Price :</strong> ${{ minimumPriceToBid }}</p>
                <p class="card-text"><strong>Time left:</strong> {{ remainingDays }}d {{ remainingHours }}h {{ remainingMinutes }}m</p>
                <label for="amount">Set Your Maximum Bid</label>
                <input class="form-control my-1" name="amount" v-model="amount" type="number" placeholder="$0.0">
                <small class="text-danger" v-if="errors.amount" >{{ errors.amount }}</small>
                <div class="d-grid gap-2 my-2">
                <button @click="placeBid" class="btn btn-dark" >Place your bid</button>
                </div>
            </template>
            <template v-else >
                <h5>
                    The bid is not active
                </h5>
            </template>
        </div>
        <div class="col-md-12 py-5 my-4">
            <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Product Information</button>
                <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Seller Information</button>
                <button v-if="product.winning_bid && !product.active" class="nav-link" id="nav-winner-tab" data-bs-toggle="tab" data-bs-target="#nav-winner" type="button" role="tab" aria-controls="nav-winner" aria-selected="false">Winning History</button>

            </div>
        </nav>
        <div class="tab-content my-3" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">

            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Total Bids: </strong>{{ product.total_bids }}</li>
                <li class="list-group-item">
                    <strong>Highest Bid: </strong>
                    <template v-if="product.total_bids > 0" >
                        ${{ product.highest_bid }}
                    </template>
                    <template v-else >
                        No bids yet
                    </template>
                </li>
                <li class="list-group-item my-1">
                    <p><strong>Description</strong></p>
                    {{ product.description }}
                </li>
            </ul>
            
        </div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>User Email: </strong>{{ seller.email }}</li>
                <li class="list-group-item"><strong>Phone: </strong>{{ seller.phone }}</li>
            </ul>
        </div>
        <div class="tab-pane fade" id="nav-winner" role="tabpanel" aria-labelledby="nav-winner-tab" tabindex="0">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>User Email: </strong>{{ winner.user }}</li>
                <li class="list-group-item"><strong>Amount: </strong>${{ winner.max_amount }}</li>
            </ul>
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
import axios from 'axios';

import Loader from '../components/Loader.vue';
import {retrieveProductDetailsUrl, placeBidUrl} from '../constants';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: "ProductDetailsView",
    components: {Loader, },
    setup() {
    const notify = (message, type, position='top-right') => {
      toast(message, {
        autoClose: 2000,
        type: type,
        position: position
      });
    }
    return { notify };
   },
    data() {
        return {
            product: {},
            seller: {},
            winner: {},
            user: this.$store.state.user.id,
            amount: "",
            errors: {},
            remainingDays: "",
            remainingHours: "",
            remainingMinutes: "",
            remainingSeconds: "",
            submiting: false,
        }
    },
    computed: {
        seconds: () => 1000,
        minutes () {return this.seconds * 60},
        hours() {return this.minutes * 60},
        days() {return this.hours * 24},
        minimumPriceToBid() {
            const value = this.product.total_bids > 0 ? this.product.highest_bid + 1 : this.product.price;  
            return value;
        }
    },
    methods: {
        async getProduct() {
            try {
                this.$store.commit('setLoadingTrue');
                axios.defaults.headers = {'Authorization': `${this.$store.state.authorizationHeaderType} ${this.$store.state.user.token}`};
                const request = await axios.get(`${retrieveProductDetailsUrl}${this.$route.params.slug}/`);
                const response = await request.data;
                this.product = response;
                this.seller = response.user;
                if(response.winning_bid) {
                    this.winner = response.winning_bid;
                };
                this.availableTime();
                this.$store.commit('setLoadingFalse');

            }
            catch(error) {
                this.$store.commit('setLoadingFalse');
                console.log(error);
            }
        
        },

        availableTime() {
                const endingDate = new Date(this.product.ending_time).getTime();
                const now = new Date().getTime();
                const difference = endingDate - now;
                if(difference <= 0) {
                    return false;
                }
                const days = Math.floor(difference / this.days);
                const hours = Math.floor((difference % this.days) / this.hours);
                const minutes = Math.floor((difference % this.hours) / this.minutes);
                const seconds = Math.floor((difference % this.minutes) / this.seconds);
                this.remainingDays = days;
                this.remainingHours = hours;
                this.remainingMinutes = minutes;
                this.remainingSeconds = seconds;
                return true;
        },

        amountIsValid() {
            let valid = true;
            this.errors = {};
            if(!this.amount) {
                this.errors.amount = "Please mention your price";
            }
            if(Object.keys(this.errors).length > 0) {
                valid = false;
            }
            return valid;
        },
        async placeBid() {
            if(this.amountIsValid()) {
                const data = {product: this.product.id, user: this.user, amount: this.amount};
                try {
                    this.submiting = true;
                    const request = await axios({
                        method: "POST",
                        url: placeBidUrl,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify(data)
                    });
                    const response = await request.data;
                    this.product.highest_bid = this.amount;
                    this.product.total_bids += 1;

                    this.amount = "";
                    this.notify(
                        "Your bid is successfull",
                        "success"
                    );
                    this.submiting = false;
                }
                catch(error) {
                    this.submiting = false;
                    if(error.response ) {
                        console.log(error.response);
                        if(error.response.data.amount) {
                            this.errors.amount = error.response.data.amount.join('');
                        }
                    }
                }
            }
            
        }
    },
    mounted() {
        document.title = "Product Details";
        this.getProduct();
    }
}
</script>