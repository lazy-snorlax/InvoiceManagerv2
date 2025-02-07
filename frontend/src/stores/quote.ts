import { create } from "zustand";
import quotes from '../data/quotes.json'

type Quote = {
    id: number| null
    company: string | null
    credittype: string | null
    date: string | null
    note: string | null
    paid: string | null
    paymentdetail: string | null
    type: string | null
    transactions: []
}

interface QuoteState {
    records: Quote[],
    currentRecord: Quote | null,
    loading: boolean,
    error: string | null,
    
    // Actions
    fetchRecords: () => void
    setCurrentRecord: (quote: Quote) => void
    next: () => void
    previous: () => void
}

export const useQuoteStore = create<QuoteState>()((set) => ({
    records: [],
    currentRecord: null,
    loading: false,
    error: null,

    fetchRecords: () => {
        const data: Quote[] = quotes
        set({ records: data, currentRecord: quotes[0] || null})
    },

    // fetchRecords: async () => {
    //     set({ loading: true, error: null })
    //     try {
    //         const response = await fetch(`/api/quotes`);
    //         const data: Invoice[] = await response.json();
    //         set({ records: data, loading: false, currentRecord: data[0] || null });
    //     } catch (error) {
    //         set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
    //     }
    // },

    setCurrentRecord: (quote) => set({ currentRecord: quote }),

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