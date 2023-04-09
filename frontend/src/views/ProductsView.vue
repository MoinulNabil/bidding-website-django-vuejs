<template>

    <div class="container py-5">
       <div v-if="!this.$store.state.loading" class="row justify-content-center">
        <div class="col-md-12 d-flex flex-row justify-content-between">
            <h3>Your Products</h3>
            <router-link to="/add-product"  class="btn btn-dark d-flex align-items-center justify-content-center" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill mb-1 mx-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
                </svg>
                <span class="mx-1">Add New</span>
            </router-link>
        </div>
           <div class="col-md-12 table-responsive">
               <hr>
               <table v-if="products.length > 0" class="table table-hover">
               <thead>
                
                   <tr>
                   <th scope="col">Image</th>
                   <th scope="col">Product Title</th>
                   <th scope="col">Base Price</th>
                   <th scope="col">Total Bids</th>
                   <th scope="col">Created Date</th>
                   <th scope="col">Status</th>
                   <th scope="col">Actions</th>
                   </tr>
               </thead>
               <tbody class="" >
                   <tr class="" v-for="product in products" :key="product.id" >
                   <td>
                    <img class="img-fluid" style="width: 120px; height: 120px;" :src="product.thumbnail" alt="">
                   </td>
                   <td>{{ product.title }}</td>
                   <td>${{ product.price }}</td>
                   <td>{{ product.total_bids }}</td>
                   <td>{{ new Date(product.created_at).toUTCString() }}</td>
                   <td>
                    <span v-if="product.active" class="badge text-bg-success">Running</span>
                    <span v-else class="badge text-bg-dark">Closed</span>
                   </td>
                   <td>
                    <router-link class="text-decoration-none text-dark" :to="'edit-product/' + product.slug">
                        <svg cla xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square cursor mx-1" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </router-link>
                    <svg @click="deleteProduct(product.slug)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash cursor mx-1" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                    <svg  xmlns="http://www.w3.org/2000/svg" data-bs-toggle="modal" :data-bs-target="'#exampleModal2' + product.id" width="16" height="16" fill="currentColor" class="bi bi-hourglass mx-1 cursor" viewBox="0 0 16 16">
                    <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2h-7z"/>
                    </svg>
                    <!-- Product Bids Modal -->
                    <div class="modal modal-xl fade" :id="'exampleModal2' + product.id" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" :id="'exampleModalLabel2' + product.id" >Bids on {{ product.title }}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class="col-md-12 table-responsive">
                                <hr>
                                <table v-if="product.bids.length > 0" class="table table-hover">
                                <thead>
                                    
                                    <tr>
                                    <th scope="col">User Email</th>
                                    <th scope="col">User Phone</th>
                                    <th scope="col">Bid Amount</th>
                                    <th scope="col">Bid Date</th>
                                    </tr>
                                </thead>
                                <tbody class="" >
                                    <tr class="" v-for="bid in product.bids" :key="bid.id" >
                                    <td>{{ bid.user.email }}</td>
                                    <td>{{ bid.user.phone }}</td>
                                    <td>{{ bid.amount }}</td>
                                    <td>{{ new Date(bid.bid_time).toUTCString() }}</td>
                                    
                                    </tr>
                                    
                                </tbody>
                                </table>
                                <template v-else >
                                    <h3 class="text-center" >No Bids yet</h3>
                                </template>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                   </td>
                   </tr>
                   
               </tbody>
               </table>
               <div class="text-center" v-else >
                    <h3 class="text-center my-2" >You have not added any product year</h3>
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
   import {listCreateProductsUrl, retrieveUpdateDestroyProductUrl, retrieveProductBidsUrl} from '../constants';
   
   
   export default {
       name: "ProductsView",
       components: {Loader, },
       data() {
           return {
            products: [],
            errors: {},
           }
       },
       methods: {

        async getProducts() {
            try {
                this.$store.commit('setLoadingTrue');
                axios.defaults.headers = {'Authorization': `${this.$store.state.authorizationHeaderType} ${this.$store.state.user.token}`};
                const request = await axios.get(listCreateProductsUrl);
                const response = await request.data;
                this.products = response;
                this.$store.commit('setLoadingFalse');
            }
            catch(error) {
                this.$store.commit('setLoadingFalse');
                console.log(error);
            }
        
        },

        async deleteProduct(slug) {
            try {
                axios.defaults.headers = {'Authorization': `${this.$store.state.authorizationHeaderType} ${this.$store.state.user.token}`};
                const request = await axios.delete(`${retrieveUpdateDestroyProductUrl}${slug}/`);
                this.products = this.products.filter(p => p.slug !== slug);
            }
            catch(error) {
                console.log(error);
            }
        
        },
       },
       mounted() {
        document.title = "Products";
        this.getProducts();
       }
   }
   </script>