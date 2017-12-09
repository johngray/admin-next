<template>
    <div>
        <navbar></navbar>
        <div class="content-wrapper">
            <b-container fluid>
                <nuxt/>
            </b-container>
        </div>
    </div>
</template>

<script>
    import Navbar from '~/components/Navbar.vue'

    export default {
        components: {
            Navbar
        }
    }
</script>
