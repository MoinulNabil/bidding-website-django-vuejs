<template>

    <div class="container middle-content">
        <form @submit="handleSubmit" class="row justify-content-center">
            <div class="col-md-8">
                <Title :title="'Create your account'" />
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
                <label for="email">Phone*</label>
                <input class="form-control" name="phone" v-model="phone" type="tel">
                <small v-if="errors.phone" class="text-danger" >{{ errors.phone }}</small>
            </div>
            </div>
            <div class="col-md-8 my-1">
                <div class="form-group">
                    <label for="email">Password*</label>
                    <input class="form-control" name="password" v-model="password" type="password">
                    <small v-if="errors.password" class="text-danger" >{{ errors.password }}</small>
                </div>
            </div>
            <div class="col-md-8 my-1">
                <div class="form-group">
                    <label for="password2">Confirm Password*</label>
                    <input class="form-control" name="password2" v-model="password2" type="password">
                    <small v-if="errors.password2" class="text-danger" >{{ errors.password2 }}</small>
                </div>
            </div>
            <div class="col-md-8 my-2">
                <div class="form-group d-grid gap-2">
                    <button v-if="!submitting" class="btn btn-dark" >Register</button>
                    <button v-else class="btn btn-dark" >In progress ...</button>
                </div>
            </div>
            <div class="col-md-10 text-center my-2">
                    <p>
                        Already have an account ?
                        <router-link class="text-decoration-none mx-2" to="/login" >Login in here</router-link>
                    </p>
                </div>
        </form>
    </div>
    
</template>


<script>
import axios from 'axios';

import Title from '../components/Title.vue';
import {registrationUrl} from '../constants';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: "Signup",
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
            phone: "",
            password: "",
            password2: "",
            loading: false,
            submitting: false,
            errors: {}
        }
    },
    methods: {
        formIsValid() {
            this.errors = {};
            let valid = true;

            if(!this.email) {
                this.errors.email = "The field can't be blank";
            }
            if(!this.phone) {
                this.errors.phone = "The field can't be blank";
            };
            if(!this.password) {
                this.errors.password = "The field can't be blank";
            };
            if(!this.password2) {
                this.errors.password2 = "The field can't be blank";
            };
            if(this.password && this.password2 && this.password !== this.password2) {
                this.errors.password2 = "Passwords mismatched";
            };
            if(Object.keys(this.errors).length > 0) {
                valid = false;
            }
            return valid;
        },

        async handleSubmit(event) {
            event.preventDefault();
            if(this.formIsValid()) {
                try {
                    this.submitting = true;
                    const payload = {
                        email: this.email,
                        phone: this.phone,
                        password: this.password,
                        password2: this.password2

                    };
                    const request = await axios({
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: registrationUrl,
                        data: JSON.stringify(payload)
                    });
                    const response = await request.data;
                    this.$router.push({path: '/login'});
                    this.notify(
                            "Thank your !! Your account has been created",
                            "success"
                        );
                }
                catch(error) {
                    this.submitting = false;
                    this.errors = {};
                    if (error.response.data.username) {
                        this.errors.username = error.response.data.username.join('');
                    }
                    else{
                      this.errors.username = "";
                    }
                    if (error.response.data.email) {
                        this.errors.email = error.response.data.email.join('');
                    }
                    else {
                        this.errors.email = "";
                    }
                    if (error.response.data.phone) {
                        this.errors.phone = error.response.data.phone.join('');
                    }
                    else {
                        this.errors.phone = "";
                    }
                    this.loading = false;
                }
            }
            
        }
    }
}
</script>