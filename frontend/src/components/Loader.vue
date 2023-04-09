<template>
    <div class="loader-component" >
        <div>
            <vue-loaders-ball-pulse-rise color="currentColor" scale="1"></vue-loaders-ball-pulse-rise>
        </div>
    </div>
</template>

<style>

.loader-component {
    height: 80vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #485fc7;
}

</style>

<script>

import 'vue-loaders/dist/vue-loaders.css';
import VueLoadersBallPulseRise from 'vue-loaders/dist/loaders/ball-pulse-rise.js';

export default {
    name: "Loader",
    components: {
        [VueLoadersBallPulseRise.component.name]: VueLoadersBallPulseRise.component
    }
}

</script>