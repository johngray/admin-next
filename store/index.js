import axios from '~/plugins/axios'

import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    plugins: [createPersistedState()],

    state: {
        authToken: null,
        username: null
    },

    mutations: {
        saveToken: function (state, token) {
            state.authToken = token
        },

        saveUsername: function (state, username) {
            state.username = username
        }
    },

    actions: {
        login: async function ({ commit }, { username, password }) {
            try {
                const { data } = await axios.post(`/api/login?username=${username}&password=${password}`)
                commit('saveToken', data)
                const r = await axios.get(`/api/users/getCurrentUser?api_key=${data}`)
                commit('saveUsername', `${r.data.surname} ${r.data.name} ${r.data.middleName}`)
            } catch (error) {
                throw error
            }
        }
    }

})

export default store
