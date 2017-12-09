<template>
    <b-form-row class="login-form">

        <b-col md="4" offset-md="4">
            <notifications group="auth" position="top"></notifications>

            <b-form @submit="onSubmit" accept-charset="UTF-8">
                <b-form-group>
                    <b-form-input placeholder="E-mail" v-model="email" required type="email"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input placeholder="Пароль" v-model="password" required type="password"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Войти</b-button>
            </b-form>
        </b-col>
    </b-form-row>
</template>

<script>
    export default {
        data () {
            return {
                email: '',
                password: '',
                isError: false,
                errorMessage: ''
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault()
                const app = this
                this.$store.dispatch('login', {username: this.email, password: this.password})
                    .then(() => {
                        app.$router.replace('/')
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$notify({
                            group: 'auth',
                            type: 'error',
                            title: 'Ошбка',
                            text: error.toLocaleString()
                        })
                    })
            }
        }
    }
</script>

<style scoped>
    .login-form {
        margin-top: 5rem;
    }
</style>
