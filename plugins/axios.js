import axios from 'axios'

var instance = axios.create({
    baseURL: process.env.logicBaseUrl
})

instance.interceptors.response.use(undefined, function (error) {
    console.log(error)
    let e = error
    if (error.response) {
        if (error.response.status === 400) {
            e = Error('Неверный логин/пароль')
        } else if ([401, 403].includes(error.response.status)) {
            e = Error('Вы неавторизованы')
        } else if (error.response.status === 404) {
            e = Error('Проблема с доступом к API')
        } else if (error.response.status === 500) {
            e = Error('Ошибка доступа к API')
        }
        return Promise.reject(e)
    } else {
        return Promise.reject(Error('Нет ответа от API'))
    }
})

export default instance
