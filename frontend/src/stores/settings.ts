import { create } from "zustand";
import { devtools } from "zustand/middleware";
import http from "../utilities/http";

type Settings = {
    id: Number | null
    business_name: string | null,
    contact_name: string | null,
    logo_path: string | null,
    phone: string | null,
    mobile: string | null,
    email: string | null,
    abn: string | null,
    address: string | null,
    city: string | null,
    state: string | null,
    post_code: string | null,
    note1: string | null,
    note2: string | null,
}

interface SettingsState {
    settings: Settings | null
    loading: boolean
    error: string | null

    getSettings: () => void
    setSettings: () => void
    getLogo: () => void
    uploadLogo: (payload) => void
    save: () => void
}

export const useSettingsStore = create<SettingsState>()(
    devtools((set) => ({
        settings: null,
        loading: false,
        error: null,

        getSettings: async () => {
            set({ loading: true, error: null })
            try {
                const response = await http.get('settings')
                set({ loading: false, settings: response.data.data })
            } catch (error) {
                set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
            }
        },

        setSettings: (updatedSettings: Settings) => set({ settings: updatedSettings }),
        getLogo: async () => {
            try {
                await http.get('logo')
            } catch (error) {
                console.log(">>> getLogo err: ", error)
            }
        },
        uploadLogo: async (payload) => {
            try {
                const response = http.post(`logo`, payload, {
                    headers: { 'Content-Type': undefined }
                })
            } catch (error) {
                console.log(error)
            }
        },
        save: () => set(async (state) => {
            if (state.settings?.id == null) {
                try {
                    const response = await http.post('settings', state.settings)
                    set({ settings: response.data.data })
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
                }
            } else {
                try {
                    const response = await http.put(`settings/${state.settings.id}`, state.settings)
                    set({ settings: response.data.data })
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
                }
            }
        })
    }))
)