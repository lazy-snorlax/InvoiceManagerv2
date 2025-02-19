import { create } from "zustand"
import { devtools } from "zustand/middleware"
import axios from "axios";

// const roles = z.enum(['admin', 'user']);
// type Role = z.infer<typeof roles>;

type LoggedInUserResource = {
    id : number
    username: string
}

export type LoginForm = {
    username: string
    password: string
}
interface AuthState {
    user: LoggedInUserResource | null
    loading: boolean,
    error: string | null,

    login: () => void
    logout: () => void
    get_user: () => LoggedInUserResource | null
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        login: async (payload: LoginForm) => {
            // set({ loading: true, error: null })
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}login`, payload)
                console.log(">>> login attempt: ", response, response.data)
                // set({ user: response.data })
            } catch (error) {
                // set({ error: error instanceof Error ? error.message : "Unknown error on login", loading: false })
            }
        },

        logout: async () => {
            set({ loading: true, error: null })
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}logout`)
                console.log(">>> logout attempt: ", response, response.data)
                set({ user: null })
            } catch (error) {
                set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
            }
        },

        get_user: async (state: AuthState) => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}user`)
                console.log(">>> get user attempt: ", response, response.data)
                set({ user: response.data })
            } catch (error) {
                set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
            }
            return { user: state.user }
        }
    })),
)