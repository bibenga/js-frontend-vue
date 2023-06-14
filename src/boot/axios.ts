import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'
import axios, { AxiosInstance } from 'axios'
import { inject } from 'vue'

export default boot(({ app, ssrContext }) => {
    console.log(`[axios] init: SERVER=${process.env.SERVER}, ssrContext is null=${ssrContext == null}`)

    let baseURL = ''
    if (ssrContext == null) {
        baseURL = '/data'
    } else {
        baseURL = 'http://127.0.0.1:9100/data'
    }
    const $api: AxiosInstance = axios.create({
        baseURL: baseURL,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-XSRF-TOKEN'
    })

    const cookies = ssrContext != null ? Cookies.parseSSR(ssrContext) : Cookies

    $api.defaults.headers.common['X-Api-Key-Api'] = 'Api';
    $api.interceptors.request.use(
        config => {
            config.headers['X-Api-Key-Api2'] = 'Api2';
            const session = cookies.get('session')
            if (session) {
                config.headers.XSessionId = `${session}`
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // for use inside Vue files (Options API) through inject<>(), this.$axios and this.$api
    app.config.globalProperties.$api = $api // this.$api
    app.provide('$api', $api) // const $api = inject<AxiosInstance>('$api')
    // app.config.globalProperties.$axios = axios // this.$axios
    // app.provide('$axios', axios) // const $axios = inject<Axios>('$axios')
})


function useApi(): { $api: AxiosInstance; isAxiosError: typeof axios.isAxiosError; } {
    const $api = inject<AxiosInstance>('$api')
    if ($api === undefined) {
        throw Error('$api is not defined inside app')
    }
    return { $api: $api, isAxiosError: axios.isAxiosError }
}

export { useApi }
