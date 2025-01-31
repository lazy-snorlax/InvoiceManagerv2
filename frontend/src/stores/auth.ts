import { createStore } from "zustand/vanilla"
import { create, StateCreator } from "zustand"
import { devtools } from "zustand/middleware"
import http from "../utilities/http"
import { jwtDecode } from "jwt-decode"
import { z } from "zod"

const roles = z.enum(['admin', 'user']);

type Role = z.infer<typeof roles>;

const TokenDataSchema = z.object({
    userId: z.string(),
    roles,
})

type TokenData = z.infer<typeof TokenDataSchema>

type AuthStore = {
    // token: string
    // tokenData: TokenData | undefined

    // actions: {
    //     setToken: (token: string | undefined) => void
    //     init: () => void
    //     clearTokens: () => void
    // }
}

export const decodeAccessToken = (accessToken: string) => TokenDataSchema.parse(jwtDecode<TokenData>(accessToken));

type JungleStore = {
    bears: number
    addBear: () => void
    fishes: number
    addFish: () => void
  }


export const useAuthStore = create<JungleStore>()(
    devtools((...args) => ({
        
        bears: 0,
        addBear: () =>
            set((state) => ({ bears: state.bears + 1 }), undefined, 'jungle/addBear'),
        
        fishes: 0,
        addFish: () =>
            set(
                (state) => ({ fishes: state.fishes + 1 }),
                undefined,
                'jungle/addFish',
            ),
    })),
)