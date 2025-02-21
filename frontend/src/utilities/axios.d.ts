import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    csrfPreflight?: boolean
    userPreflight?: boolean
    throwForbiddens?: boolean
    skipConflicts?: boolean
  }
}

export {}
