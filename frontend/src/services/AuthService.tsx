import http from "../utilities/http"
import { UserProfileToken } from "../models/User"

export const loginAPI = async (username: string, password: string) => {
    const data = await http.post<UserProfileToken>('/User/login', {
        username: username,
        password: password,
    })
    return data
}

// export const registerAPI = async (email: string, username: string, password: string) => {}
