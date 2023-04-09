<template>

    <div class="container middle-content">
        <form @submit="handleSubmit" class="row justify-content-center">
                <div class="col-md-8">
                    <Title :title="'Login to your account'" />
                    <hr>
                </div>
                <div class="col-md-8 my-1">
                <div class="form-group">
                    <label for="email">Email address*</label>
                    <input class="form-control" name="email" v-model="email" type="text">
                    <small v-if="errors.email" class="text-danger" >{{ errors.email }}</small>
                </div>
                </div>
                <div class="col-md-8 my-1">
                    <div class="form-group">
                        <label for="email">Password*</label>
                        <input class="form-control" name="password" v-model="password" type="password">
                        <small v-if="errors.password" class="text-danger" >{{ errors.password }}</small>
                    </div>
                </div>
                <div class="col-md-8 my-2">
                    <div class="form-group d-grid gap-2">
                        <button v-if="!submitting" class="btn btn-dark" >Login</button>
                        <button type="button" disabled v-else class="btn btn-dark" >Authenticating ...</button>
                    </div>
                </div>
                <div class="col-md-8 text-center my-2">
                    <p>
                        Dont't have an account ?
                        <router-link class="text-decoration-none mx-2" to="/signup" >Signup here</router-link>
                    </p>
                </div>
        </form>
    </div>
    
</template>


<script>

import axios from 'axios';
import {loginUlr} from '../constants';
import Title from '../components/Title.vue';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: "Login",
    components: {Title, },
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
            email: "",
            password: "",
            errors: {},
            submitting: false,
        }
    },
    methods: {
        formIsValid() {
            this.errors = {};
            let valid = true;

            if(!this.email) {
                this.errors.email = "The field can't be blank";
            }
            if(!this.password) {
                this.errors.password = "The field can't be blank";
            };
            if(Object.keys(this.errors).length > 0) {
                valid = false;
            }
            return valid;
        },

        async handleSubmit(event) {
            event.preventDefault();
            if(this.formIsValid()) {
                try{
                    this.submiting = true;
                    const payload = {email: this.email, password: this.password};
                    const request = await axios({
                        method: "POST",
                        url: loginUlr,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: payload
                    });
                    const data = await request.data;
                    console.log(data);
                    this.$store.commit('setToken', data);
                    this.submiting = false;
                    this.$router.replace(this.$route.query.redirect || '/');
                }
                catch(error) {
                    this.errors = {};
                    this.submiting = false;
                    if(error.response) {
                        if(error.response.status === 401) {
                            this.notify(
                                error.response.data.detail,
                                "error"
                            );
                        }
                    }
                }
            }
            else {
                console.log('not valid');
            }
            
        }
    }
}
</script>