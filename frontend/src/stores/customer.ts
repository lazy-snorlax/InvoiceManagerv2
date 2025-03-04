import { create } from "zustand";
import { devtools } from "zustand/middleware";
import http from "../utilities/http";
import { toast } from "react-toastify";

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
    options: [],
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
    last: () => void
    save: () => void
    newRecord: () => void
}

export const useCustomerStore = create<CustomerState>()(devtools((set) => ({
    records: [],
    currentRecord: null,
    loading: false,
    error: null,

    fetchRecords: async () => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`company-list`)
            const data = await response.data
            set({ loading: false, records: data })
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    },

    fetchFirstRecord: async () => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`companies`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    },

    setCurrentRecord: (customer) => set({ currentRecord: customer }),
    next: () => set(async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const nextIndex = (currentIndex + 1) % state.records.length;

            const response = await http.get(`companies/${state.records[nextIndex].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    }),
    previous: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const prevIndex = (currentIndex - 1 + state.records.length) % state.records.length;

            const response = await http.get(`companies/${state.records[prevIndex].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    }),
    first: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`companies/${state.records[0].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    }),
    last: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`companies/${state.records[state.records.length-1].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    }),
    
    save: () => set(async(state) => {
        if (state.currentRecord?.id == null) {
            try {
                const response = await http.post(`companies`, state.currentRecord)
                const records = [...state.records, {id: response.data.data.id}]
                set({ loading: false, currentRecord: response.data.data, records: records })
            } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
            }
        } else {
            try {
                const response = await http.put(`companies/${state.records[0].id}`, state.currentRecord);
                const data = response.data
                set({ currentRecord: data.data })
            } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
            }
        }
        return { currentRecord: state.currentRecord }
    }),

    newRecord: () => {
        try {
            const newRecord: Customer = {
                id: null,
                company_name: null,
                contact_name: null,
                company_type: null,
                abn: null,
                phone: null,
                mobile: null,
                email: null,
                location_address: null,
                location_city: null,
                location_state: null,
                location_post_code: null,
                postal_address: null,
                postal_city: null,
                postal_state: null,
                postal_post_code: null,
            }
            set({ currentRecord: newRecord, error: null })
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    }
})))