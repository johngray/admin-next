<template>
    <div>
        <b-row>
            <b-col lg="12" offset-md="2">
                <a class="navbar-brand" href="/"><logo/></a>
            </b-col>
        </b-row>
        <login-form/>
    </div>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import LoginForm from '~/components/LoginForm.vue'

    export default {
        name: 'login',
        components: {
            Logo,
            LoginForm
        }
    }
</script>