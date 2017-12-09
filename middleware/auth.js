export default function ({store, redirect, query}) {
    if (query.token) {
        store.commit('saveToken', query.token)
        store.commit('saveUsername', query.username || 'Администратор')
    }

    if (!store.state.authToken) {
        redirect('/login')
    }
}
