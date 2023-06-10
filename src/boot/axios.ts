import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { AxiosInstance, AxiosError } from 'axios'

const api: AxiosInstance = axios.create({
    baseURL: '/data',
})

export default boot(({ app, ssrContext }) => {
    console.log(`[axios] init: ssrContext is null=${ssrContext == null}`)
    if (ssrContext == null) {
        api.defaults.baseURL = '/data'
    } else {
        api.defaults.baseURL = 'http://127.0.0.1:9100/data'
    }

    // headers doon't added when call using by the "api"
    axios.defaults.headers.common['X-Api-Key-Axios'] = 'Axios';
    axios.interceptors.request.use(
        config => {
            config.headers['X-Api-Key-Axios2'] = 'Axios2';
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    api.defaults.headers.common['X-Api-Key-Api'] = 'Api';
    api.interceptors.request.use(
        config => {
            config.headers['X-Api-Key-Api2'] = 'Api2';
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // for use inside Vue files (Options API) through this.$axios and this.$api
    app.config.globalProperties.$axios = axios
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
})

const isAxiosError = axios.isAxiosError

export { axios, api, AxiosError, isAxiosError }
