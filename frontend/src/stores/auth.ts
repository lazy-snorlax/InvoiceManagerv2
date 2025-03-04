import { create } from "zustand"
import { devtools } from "zustand/middleware"
// import axios from "axios";
import http from "../utilities/http"
import { toast } from "react-toastify"

// const roles = z.enum(['admin', 'user']);
// type Role = z.infer<typeof roles>;

type LoggedInUserResource = {
    id : number
    name: string
    email: string
}

export type LoginForm = {
    username: string
    password: string
}
interface AuthState {
    user: LoggedInUserResource | null
    isAuthenticated: boolean,
    csrf: boolean
    loading: boolean,
    error: string | null,

    login: () => void
    logout: () => void
    get_user: () => LoggedInUserResource | null
    csrfPreflight: () => void
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user: null,
        csrf: false,
        isAuthenticated: false,

        login: async (payload: LoginForm) => {
            try {
                const response = await http.post('login', payload)
                set({ user: response.data.data, error: null })
            } catch (error) {
                toast.error("Oops, something went wrong! Error: " + error.message)
            }
        },

        logout: async () => {
            set({ loading: true, error: null })
            try {
                const response = await http.post(`logout`)
                // console.log(">>> logout attempt: ", response, response.data)
                set({ user: null })
            } catch (error) {
                toast.error("Oops, something went wrong! Error: " + error.message)
            }
        },

        get_user: async (state: AuthState) => {
            try {
                const response = await http.get(`user`)
                // console.log(">>> get user attempt: ", response, response.data)
                set({ user: response.data.data })
            } catch (error) {
                set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
                return error
            }
        },

        csrfPreflight: async () => {
            try {
                // console.log(">>> csrf preflight 3")
                await http.get(`sanctum/csrf-cookie`, { csrfPreflight: true })
                set({ csrf: true })
            } catch {
                // console.log(">>> csrf preflight failed")
            }
        }
    })),
)