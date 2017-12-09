<template>
    <report apiMethod="sales"></report>
</template>

<script>
    import Report from '~/components/report/Report.vue'

    export default {
        middleware: 'auth',
        layout: 'authenticated',

        components: {
            Report
        }
    }
</script>