<template>

    <div class="container py-5">
        <form v-if="!this.$store.state.loading" @submit="handleSubmit" class="row justify-content-center">
            <div class="col-md-12">
                <h3>Edit Product</h3>
                <hr>
            </div>
            <div class="col-md-12 my-1">
            <div class="form-group">
                <label for="email">Product Title</label>
                <input class="form-control" name="title" v-model="title" type="text">
                <small v-if="errors.title" class="text-danger" >{{ errors.title }}</small>
            </div>
            </div>
            <div class="col-md-12 my-1">
            <div class="form-group">
                <label for="email">Thumbnail Url</label>
                <input class="form-control" name="thumbnail" v-model="thumbnail" type="url">
                <small v-if="errors.thumbnail" class="text-danger" >{{ errors.thumbnail }}</small>
            </div>
            </div>
            <div class="col-md-12 my-1">
                <div class="form-group">
                    <label for="email">End Time</label>
                    <input class="form-control" name="ending_time" v-model="ending_time" type="datetime-local">
                    <small v-if="errors.ending_time" class="text-danger" >{{ errors.ending_time }}</small>
                </div>
            </div>
            <div class="col-md-12 my-1">
                <div class="form-group">
                    <label for="email">Price</label>
                    <input class="form-control" name="price" v-model="price" type="number">
                    <small v-if="errors.price" class="text-danger" >{{ errors.price }}</small>
                </div>
            </div>
            <div class="col-md-12 my-1">
                <div class="form-group">
                    <label for="email">Description</label>
                    <textarea cols="8" rows="8" class="form-control" name="description" v-model="description" type="number"></textarea>
                </div>
            </div>
            <div class="col-md-12 my-1">
                <div class="form-group d-grid gap-2">
                    <button v-if="!submiting" type="submit" class="btn btn-dark" >Update Product</button>
                    <button v-else  class="btn btn-dark" disabled >In progrees</button>
    
                </div>
            </div>
        </form>
        <template v-else >
            <Loader />
        </template>
    </div>
        
    </template>
    
    
    <script>
    
    import axios from 'axios'

    import Loader from '../components/Loader.vue';
    import {retrieveUpdateDestroyProductUrl} from '../constants';
    
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
       
    export default {
        name: "EditProductView",
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
                id: "",
                title: "",
                thumbnail: "",
                ending_time: "",
                price: "",
                description: "",
                active: "",
                errors: {},
                submiting: false,
            }
        },
        methods: {
            formIsValid() {
                this.errors = {};
                let valid = true;
    
                if(!this.title) {
                    this.errors.title = "The field can't be blank";
                }
                if(!this.thumbnail) {
                    this.errors.thumbnail = "The field can't be blank";
                };
                if(!this.ending_time) {
                    this.errors.ending_time = "The field can't be blank";
                };
                if(!this.price) {
                    this.errors.price = "The field can't be blank";
                };
                if(Object.keys(this.errors).length > 0) {
                    valid = false;
                }
                return valid;
            },

            convertDateToDateTimeLocal(value) {
                let year = new Date(value).getFullYear();
                let month = new Date(value).getMonth() + 1;
                let day = new Date(value).getDate();
                let hour = new Date(value).getHours();
                console.log(day);
                let minute = new Date(value).getMinutes();

                if(month < 10) {
                    month = `0${month}`;
                }
                if(day < 10) {
                    day = `0${day}`;
                }
                if(hour < 10) {
                    hour = `0${hour}`;
                }
                if(minute < 10) {
                    minute = `0${minute}`;
                }
                console.log(value);
                console.log(`${year}-${month}-${day}T${hour}:${minute}`);
                return `${year}-${month}-${day}T${hour}:${minute}`;

        },

            async getProduct() {
                try{
                    this.$store.commit('setLoadingTrue');
                    axios.defaults.headers = {'Authorization': `${this.$store.state.authorizationHeaderType} ${this.$store.state.user.token}`};
                    const request = await axios.get(`${retrieveUpdateDestroyProductUrl}${this.$route.params.slug}/`);
                    const response = await request.data;
                    this.id = response.id;
                    this.title = response.title;
                    this.thumbnail = response.thumbnail;
                    console.log(response.ending_time);
                    this.ending_time = this.convertDateToDateTimeLocal(new Date(response.ending_time).toDateString());
                    this.price = response.price;
                    this.description = response.description;
                    this.$store.commit('setLoadingFalse');
                    
                    }
                    catch(error) {
                        this.$store.commit('setLoadingFalse');
                        console.log(error);
                    }
            },
    
            async handleSubmit(event) {
                event.preventDefault();
                if(this.formIsValid()) {
                    try{
                        axios.defaults.headers = {'Authorization': `${this.$store.state.authorizationHeaderType} ${this.$store.state.user.token}`};
                        const product = {
                            user: this.$store.state.user.id,
                            title: this.title,
                            thumbnail: this.thumbnail,
                            ending_time: this.ending_time,
                            price: this.price,
                            description: this.description,
                        };
                        this.submiting = true;
                        const request = await axios({
                            method: "PUT",
                            url: `${retrieveUpdateDestroyProductUrl}${this.$route.params.slug}/`,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: JSON.stringify(product)
                        });
                        const data = await request.data;
                        console.log(data);
                        this.submiting = false;
                        this.notify(
                                "Your proudct has been added successfully !",
                                "success"
                            );
                        this.$router.push({path: '/products'});
                    }
                    catch(error) {
                        console.log(error);
                        this.errors = {};
                        this.submiting = false;
                        if(error.response) {
                            if(error.response.status === 401) {
                                alert(error.response.data);
                            }
                        }
                    }
    
                }
            }
        },

        mounted() {
            document.title = 'Edit Product';
            this.getProduct();
        }
    
    }
    </script>