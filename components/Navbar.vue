<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" id="mainNav">
        <b-navbar-toggle target="sidebar"></b-navbar-toggle>

        <b-navbar-brand href="#"><logo/></b-navbar-brand>

        <b-collapse is-nav id="sidebar">
            <sidebar></sidebar>

            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <template slot="button-content">
                        <em>{{username}}</em>
                    </template>
                    <b-dropdown-item :href="oldAdminUrl + '/logout'">Выйти</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>

</template>

    <script>
        import Logo from './Logo.vue'
        import Sidebar from '~/components/Sidebar.vue'

        export default {
            data () {
                return {
                    oldAdminUrl: process.env.oldAdminUrl,
                    username: this.$store.state.username
                }
            },
            components: {
                Logo,
                Sidebar
            }
        }
    </script>