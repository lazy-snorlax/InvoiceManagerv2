import axios, { AxiosInstance, InternalAxiosRequestConfig, isAxiosError } from "axios"
import { Router, useLocation, useNavigate } from "react-router-dom"
import App from "../App"
import { useAuthStore } from "../stores/auth"

export const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const csrf = useAuthStore.getState().csrf
    console.log(">>> csrf preflight 1", config)
    if (
        config.method &&
        ['post', 'put', 'delete'].includes(config.method.toLowerCase()) &&
        csrf === false &&
        config.csrfPreflight === undefined) 
    {
        console.log(">>> csrf preflight 2")
        await useAuthStore.getState().csrfPreflight()
    }
    return config
})

http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    if (
        config.method &&
        config.data === undefined &&
        ['post', 'put'].includes(config.method.toLowerCase())
    ) {
        config.data = {}
    }
    
    console.log(">>> csrf preflight 4", config)
    return config
})

http.interceptors.response.use(null, async (error) => {
    console.log(">>> axios error 5", error, isAxiosError(error), error.response)
    if (isAxiosError(error) && error.response) {
        const route = useLocation().pathname
        const navigate = useNavigate()

        // Error Response via BLOB
        if (error.response.request.responseType === 'blob') {
            const read = (file: Blob) => {
                const reader = new FileReader()

                return new Promise((resolve, reject) => {
                    reader.onerror = () => {
                        reader.abort()
                        reject(new Error('Problem parsing file'))
                    }

                    reader.onload = () => {
                        resolve(reader.result)
                    }

                    reader.readAsText(file)
                })
            }

            const body = await read(error.response.data)
            error.response.data = JSON.parse(body as string)
        }

        // 401: Unauthenticated
        if (error.response.status === 401) {
            if (error.response.config.userPreflight === true || route.includes('login')) {
                return Promise.reject(error)
            }

            const redirect =
            !route.includes('login') &&
            !route.includes('logout') 
            // && route.meta.restricted === true
            //     ? route.path
            //     : null
            // router.replace({ name: 'login', query: { redirect } })
            navigate(`/login?redirect=${redirect}`)
            return Promise.reject(error)
        }

        // 403: Forbidden
        if (error.response.status === 403) {
            if (error.response.config.throwForbiddens !== true) {
                // await useAlert({
                //     icon: 'warning',
                //     title: 'Unauthorized',
                //     message: 'You are not authorized to access the page you have requested.',
                //     confirm: 'Return to dashboard',
                //     confirmationOnly: true,
                // })
                console.log(">>>> http: Error 403. Returning to dashboard")
                navigate('/')
            }
        }

        // 500: Internal Server Error
        if (error.response.status === 500) {
            // await useAlert({
            //     icon: 'warning',
            //     message: 'We encountered a server error. We have been alerted and will investigate.',
            //     confirmationOnly: true,
            // })

            console.log(">>>> http: Error 500")
        }
    }
    else {
        console.log(error)
    }

    return Promise.reject(error)
})

export default http;
