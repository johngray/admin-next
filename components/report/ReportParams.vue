<template>
    <b-card :header="name" footer-tag="footer" class="o-hidden h-100">
        <b-form>
            <div class="form-group row col-6 h-100" v-for="param in params" :key="param.description.name">
                <label class="col-sm-4 col-form-label" :for="param.description.name">{{param.description.displayName}}</label>
                <div class="col-sm-5 my-auto">
                    <b-form-input :id="param.description.name" :name="param.description.name" type="text" v-model="form[param.description.name]"
                                  placeholder="" v-if="param.type === 'STRING'" class="form-control-sm">
                    </b-form-input>

                    <b-form-checkbox :id="param.description.name" :name="param.description.name" v-model="form[param.description.name]"
                                     v-if="param.type  === 'BOOL'" class="form-control-sm d-inline" >
                    </b-form-checkbox>

                    <b-form-checkbox :id="param.description.name" :name="param.description.name" v-model="form[param.description.name]"
                                     v-if="param.type  === 'TRUE'" class="form-control-sm d-inline" disabled>
                    </b-form-checkbox>

                    <b-form-select :id="param.description.name" :name="param.description.name" :options="param.values"
                                   v-model="form[param.description.name]" v-if="param.type === 'ALL_YES_NO'" class="form-control-sm">
                    </b-form-select>

                    <b-form-select :id="param.description.name" :name="param.description.name" :options="param.values"
                                   v-model="form[param.description.name]" multiple v-if="param.type === 'MULTISELECTOR'" class="form-control-sm">
                    </b-form-select>

                    <b-form-select :id="param.description.name" :name="param.description.name" :options="param.values"
                                   v-model="form[param.description.name]" v-if="param.type === 'SELECTOR'" class="form-control-sm">
                        <template slot="first">
                            <option value="">Все</option>
                        </template>
                    </b-form-select>

                    <flat-pickr :id="param.description.name" :name="param.description.name"
                                :config="period" class="form-control form-control-sm" placeholder="Выберите диапазон дат" v-if="param.type === 'DATE_RANGE'">
                    </flat-pickr>

                    <flat-pickr :id="param.description.name" :name="param.description.name"
                                :config="period" class="form-control form-control-sm" placeholder="Выберите диапазон дат" v-if="param.type === 'PERIOD'">
                    </flat-pickr>

                    <vue-slider :id="param.description.name" :name="param.description.name" v-model="form[param.description.name]"
                                v-if="['NUMBER_RANGE', 'PRICE_RANGE'].includes(param.type)" max="200000" :formatter="getRangeFormatter(param.type)"
                                tooltip="hover"></vue-slider>
                </div>
            </div>
        </b-form>

        <b-row no-gutters slot="footer">
            <b-button size="sm" variant="primary" href="/">Назад</b-button>
            <div class="ml-auto">
                <b-button class="mr-5" size="sm" variant="warning" @click="resetForm">Отменить</b-button>
                <b-button size="sm" variant="success" @click="generateReport">Сформировать отчёт</b-button>
            </div>
        </b-row>
    </b-card>
</template>

<script>
    import {Russian} from 'flatpickr/dist/l10n/ru'
    import moment from 'moment'
    import vueSlider from 'vue-slider-component'

    export default {
        data () {
            return {
                form: this.getFormModelFromParameters(),
                period: {
                    locale: Russian,
                    altInput: true,
                    mode: 'range',
                    onChange: this.setDateRange
                },
                single: {
                    locale: Russian,
                    altInput: true
                }
            }
        },

        props: {
            params: {
                required: true
            },
            name: {
                required: true
            }
        },

        components: {
            vueSlider
        },

        methods: {
            getFormModelFromParameters () {
                let model = {}

                this.params.forEach((p) => {
                    if (['NUMBER_RANGE', 'PRICE_RANGE'].includes(p.type)) {
                        model[p.description.name] = [0, 200000]
                    } else if (['DATE_RANGE', 'MULTISELECTOR'].includes(p.type)) {
                        model[p.description.name] = []
                    } else {
                        model[p.description.name] = Array.isArray(p.values) && p.values.length > 0 ? p.values[0].value : ''
                    }
                })

                return model
            },

            setDateRange (selectedDates, dateStr, instance) {
                this.form[instance.input.id].splice(0)
                if (selectedDates[0]) {
                    this.form[instance.input.id].push(moment(selectedDates[0]).format('DD-MM-YYYY'))
                }
                if (selectedDates[1]) {
                    this.form[instance.input.id].push(moment(selectedDates[1]).format('DD-MM-YYYY'))
                }
            },

            getRangeFormatter (type) {
                if (type === 'PRICE_RANGE') {
                    return '{value}₽'
                } else {
                    return '{value}'
                }
            },

            prepareReportData (formParams) {
                let reportData = {}
                Object.keys(formParams).forEach((key) => {
                    if (formParams[key]) {
                        if (!Array.isArray(formParams[key])) {
                            reportData[key] = new Array(formParams[key])
                        } else {
                            reportData[key] = formParams[key]
                        }
                    }
                })
                return reportData
            },

            resetForm () {
                this.form = this.getFormModelFromParameters()
            },

            generateReport () {
                this.$emit('gen-report', this.prepareReportData(this.form))
            }
        }
    }
</script>