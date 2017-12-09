<template>
    <div>
        <notifications group="report" position="bottom left"></notifications>
        <report-params v-if="showParams" :params="settings.parameters" :name="settings.name" @gen-report="getReportData" class="mb-5"></report-params>
        <transition name="slide-fade">
            <report-table v-if="showReport" :items="items" :totalElements="totalElements" :pageSize="pageSize" @page-changed="getReportAnotherPageData"></report-table>
        </transition>
    </div>
</template>

<script>
    import ReportParams from '~/components/report/ReportParams.vue'
    import ReportTable from '~/components/report/ReportTable.vue'

    import axios from '~/plugins/axios'

    export default {
        data () {
            return {
                settings: {
                    parameters: []
                },
                formParams: {},
                items: [],
                showReport: false,
                showParams: false,
                totalElements: 20,
                pageSize: 20
            }
        },

        props: {
            apiMethod: {
                required: true
            }
        },

        mounted () {
            const apiToken = this.$store.state.authToken
            let report = this
            axios.get(`/api/v2/reports/${this.apiMethod}?api_key=${apiToken}`).then(({data}) => {
                report.settings = data
                report.showParams = true
            }).catch((error) => {
                console.log(error)
                report.$notify({group: 'report', type: 'error', title: 'Ошибка', text: error.toLocaleString()})
            })
        },

        components: {
            ReportParams,
            ReportTable
        },

        methods: {
            async getReportData (formParams, page = 1) {
                if (Object.keys(formParams).length > 0) {
                    this.formParams = formParams
                    const apiToken = this.$store.state.authToken
                    try {
                        const {data} = await axios.post(`/api/v2/reports/${this.apiMethod}?api_key=${apiToken}&page=${page}`, {parameters: formParams})
                        this.items = this.prepareItems(data.content)
                        this.totalElements = data.totalElements
                        this.pageSize = data.size
                        this.showReport = true
                    } catch (error) {
                        console.log(error)
                        this.$notify({group: 'report', type: 'error', title: 'Ошибка', text: error.toLocaleString()})
                    }
                } else {
                    this.$notify({group: 'report', type: 'error', title: 'Ошибка', text: 'Заполните хотя бы один параметр'})
                }
            },

            // Небольшой костыль, так как нам приходит pageable от сервера
            prepareItems (content) {
                let items = []
                content.forEach((item) => {
                    items.push(item.values)
                })
                return items
            },

            async getReportAnotherPageData (page) {
                this.getReportData(this.formParams, page)
            }
        }
    }
</script>

<style>
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>