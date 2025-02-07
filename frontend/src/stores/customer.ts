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
    records: Customer[],
    currentRecord: Customer | null,
    loading: boolean,
    error: string | null,
    
    // Actions
    fetchRecords: () => void
    setCurrentRecord: (customer: Customer) => void
    next: () => void
    previous: () => void
}

export const useCustomerStore = create<CustomerState>()((set) => ({
    records: [],
    currentRecord: null,
    loading: false,
    error: null,

    fetchRecords: () => {
        const data: Customer[] = customers
        set({ records: data, currentRecord: customers[0] || null})
    },

    // fetchRecords: async () => {
    //     set({ loading: true, error: null })
    //     try {
    //         const response = await fetch(`/api/customers`);
    //         const data: Invoice[] = await response.json();
    //         set({ records: data, loading: false, currentRecord: data[0] || null });
    //     } catch (error) {
    //         set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
    //     }
    // },

    setCurrentRecord: (customer) => set({ currentRecord: customer }),

    next: () => set((state) => {
        const currentIndex = state.records.indexOf(state.currentRecord!);
        const nextIndex = (currentIndex + 1) % state.records.length;
        return { currentRecord: state.records[nextIndex] };
    }),
    previous: ()=> set((state) => {
        const currentIndex = state.records.indexOf(state.currentRecord!);
        const prevIndex = (currentIndex - 1 + state.records.length) % state.records.length;
        return { currentRecord: state.records[prevIndex] };
    })
}))