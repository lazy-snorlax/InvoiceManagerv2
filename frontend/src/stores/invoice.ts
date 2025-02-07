import { create } from "zustand";
import invoices from '../data/invoices.json'

type Invoice = {
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

interface InvoiceState {
    invoices: Invoice[],
    currentInvoice: Invoice | null,
    loading: boolean,
    error: string | null,
    
    // Actions
    fetchInvoices: (type: string) => void
    setCurrentInvoice: (invoice: Invoice) => void
    next: () => void
    previous: () => void
}

export const useInvoiceStore = create<InvoiceState>()((set) => ({
    invoices: [],
    currentInvoice: null,
    loading: false,
    error: null,

    fetchInvoices: () => {
        const data: Invoice[] = invoices
        set({ invoices: data, currentInvoice: invoices[0] || null})
    },

    // fetchInvoices: async () => {
    //     set({ loading: true, error: null })
    //     try {
    //         const response = await fetch(`/api/invoices`);
    //         const data: Invoice[] = await response.json();
    //         set({ invoices: data, loading: false, currentInvoice: data[0] || null });
    //     } catch (error) {
    //         set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
    //     }
    // },

    setCurrentInvoice: (invoice) => set({ currentInvoice: invoice }),

    next: () => set((state) => {
        const currentIndex = state.invoices.indexOf(state.currentInvoice!);
        const nextIndex = (currentIndex + 1) % state.invoices.length;
        return { currentInvoice: state.invoices[nextIndex] };
    }),
    previous: ()=> set((state) => {
        const currentIndex = state.invoices.indexOf(state.currentInvoice!);
        const prevIndex = (currentIndex - 1 + state.invoices.length) % state.invoices.length;
        return { currentInvoice: state.invoices[prevIndex] };
    })
}))