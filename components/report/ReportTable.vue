<template>
    <b-card header="Отчет" footer-tag="footer" class="o-hidden h-100">
        <h3 v-if="itemsIsEmpty" class="text-center">По вашим параметрам не найдено ни одной записи.</h3>
        <div v-else>
            <b-table striped hover responsive :items="items"></b-table>
            <b-pagination align="center" :total-rows="totalElements" :per-page="pageSize" v-model="currentPage" class="my-0" @input="pageChanged" ></b-pagination>
        </div>
    </b-card>
</template>

<script>
    export default {
        data () {
            return {
                currentPage: 1
            }
        },

        props: {
            items: {
                required: true
            },

            totalElements: {
                required: true
            },

            pageSize: {
                required: true
            }
        },

        computed: {
            itemsIsEmpty () {
                return this.items.length === 0
            }
        },

        methods: {
            pageChanged (page) {
                this.$emit('page-changed', page)
            }
        }
    }
</script>

