<template>
    <b-row>
        <div class="col-xl-3 col-sm-6 mb-3">
            <b-card footer-tag="footer" bg-variant="primary" text-variant="white" class="o-hidden h-100">
                <div class="card-body-icon">
                    <i class="fas fa-fw fa-sm fa-user"></i>
                </div>
                <div class="mr-5">Поставщики</div>
                <a class="text-white clearfix small z-1" href="provider" slot="footer">
                    <span class="float-left">Построить отчет</span>
                    <span class="float-right">
                        <i class="fas fa-angle-right"></i>
                    </span>
                </a>
            </b-card>
        </div>
        <div class="col-xl-3 col-sm-6 mb-3">
            <b-card footer-tag="footer" bg-variant="warning" text-variant="white" class="o-hidden h-100">
                <div class="card-body-icon">
                    <i class="fas fa-fw fa-sm fa-map"></i>
                </div>
                <div class="mr-5">Георграфия</div>
                <a class="text-white clearfix small z-1" href="geography" slot="footer">
                    <span class="float-left">Построить отчет</span>
                    <span class="float-right">
                        <i class="fas fa-angle-right"></i>
                    </span>
                </a>
            </b-card>
        </div>
        <div class="col-xl-3 col-sm-6 mb-3">
            <b-card footer-tag="footer" bg-variant="success" text-variant="white" class="o-hidden h-100">
                <div class="card-body-icon">
                    <i class="fas fa-fw fa-sm fa-shopping-cart"></i>
                </div>
                <div class="mr-5">Товар</div>
                <a class="text-white clearfix small z-1" href="product" slot="footer">
                    <span class="float-left">Построить отчет</span>
                    <span class="float-right">
                        <i class="fas fa-angle-right"></i>
                    </span>
                </a>
            </b-card>
        </div>
        <div class="col-xl-3 col-sm-6 mb-3">
            <b-card footer-tag="footer" bg-variant="danger" text-variant="white" class="o-hidden h-100">
                <div class="card-body-icon">
                    <i class="fas fa-fw fa-sm fa-balance-scale"></i>
                </div>
                <div class="mr-5">Продажи</div>
                <a class="text-white clearfix small z-1" href="sales" slot="footer">
                    <span class="float-left">Построить отчет</span>
                    <span class="float-right">
                        <i class="fas fa-angle-right"></i>
                    </span>
                </a>
            </b-card>
        </div>
    </b-row>
</template>

<script>
    import Logo from '~/components/Logo.vue'

    export default {
        components: {
            Logo
        },
        middleware: 'auth',
        layout: 'authenticated'
    }
</script>