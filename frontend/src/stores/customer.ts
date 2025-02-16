import { create } from "zustand";
import customers from '../data/customers.json'

type Customer = {
    id: number | null
    company_name: string | null
    contact_name: string | null
    company_type: string | null
    abn: string | null
    phone: string | null
    mobile: string | null
    email: string | null
    location_address: string | null
    location_city: string | null
    location_state: string | null
    location_post_code: string | null
    postal_address: string | null
    postal_city: string | null
    postal_state: string | null
    postal_post_code: string | null
}

interface CustomerState {
    records: [],
    currentRecord: Customer | null,
    loading: boolean,
    error: string | null,
    
    // Actions
    fetchRecords: () => void
    fetchFirstRecord: () => void
    setCurrentRecord: (customer: Customer) => void
    next: () => void
    previous: () => void
    first: () => void
    save: () => void
}

export const useCustomerStore = create<CustomerState>()((set) => ({
    records: [],
    currentRecord: null,
    loading: false,
    error: null,

    fetchRecords: async () => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}company-list`)
            const data = await response.json()
            set({ loading: false, records: data })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
        }
    },

    fetchFirstRecord: async () => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}companies`);
            const data = await response.json();
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    },

    setCurrentRecord: (customer) => set({ currentRecord: customer }),
    next: () => set(async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const nextIndex = (currentIndex + 1) % state.records.length;

            const response = await fetch(`${import.meta.env.VITE_API_URL}companies/${state.records[nextIndex].id}`);
            const data = await response.json();
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    previous: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const prevIndex = (currentIndex - 1 + state.records.length) % state.records.length;

            const response = await fetch(`${import.meta.env.VITE_API_URL}companies/${state.records[prevIndex].id}`);
            const data = await response.json();
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    first: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}companies/${state.records[0].id}`);
            const data = await response.json();
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    // TODO: api post/update based on currentRecord id
    save: () => set((state) => {
        if (!state.currentRecord.id) {
            console.log(">>> post: Customer currentRecord ", state.currentRecord)
        } else {
            console.log(">>> update: Customer currentRecord ", state.currentRecord)
        }
        return { currentRecord: state.currentRecord }
    })
}))