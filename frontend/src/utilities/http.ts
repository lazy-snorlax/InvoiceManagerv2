import axios, { AxiosInstance, InternalAxiosRequestConfig, isAxiosError } from "axios"
import { Router, useLocation } from "react-router-dom"
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

export default {
    install: (app: App, { router }: { router: Router }) => {
        http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
            if (config.method && config.data === undefined && ["post", "put"].includes(config.method.toLowerCase())) {
                const token = useAuthStore.getState().token
                config.headers = { Authorization: `Bearer ${token}` }
                config.data = {}
            }
            return config
        })

        http.interceptors.response.use(null, async (error) => {
            if (isAxiosError(error) && error.response) {
                const location = useLocation()

                // 401: Unauthenticated
                if (error.response.status === 401) {
                    alert( error.response.data.message )
                }

                // 403: Forbidden
                if (error.response.status === 403) {
                    alert( error.response.data.message )
                }

                // 500: Internal Server Error
                if (error.response.status === 500) {
                    alert("We encountered a server error")
                }

            }

            return Promise.reject(error)
        })
    }
}